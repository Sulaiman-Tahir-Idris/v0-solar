"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckoutSteps } from "@/components/checkout/checkout-steps"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderReview } from "@/components/checkout/order-review"
import { OrderSummary } from "@/components/checkout/order-summary"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth/auth-provider"

export type ShippingDetails = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  saveAddress: boolean
}

export type PaymentDetails = {
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: string
  saveCard: boolean
  paymentMethod: "card" | "transfer" | "cash"
}

export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isInitializing, setIsInitializing] = useState(true)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    saveAddress: false,
  })
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    paymentMethod: "card",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { cart, createOrder, isLoading, isAuthenticated, user } = useAuth()

  // Initialize checkout - ensure cart is loaded
  useEffect(() => {
    const initializeCheckout = async () => {
      if (!isAuthenticated && !isLoading) {
        toast.error("Please sign in to proceed with checkout")
        router.push("/login?redirect=/checkout")
        return
      }

      if (isAuthenticated && !isLoading) {
        // Try to get cart from localStorage first (backup)
        const savedCart = localStorage.getItem("checkoutCart")
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart)
            setCartItems(parsedCart)
          } catch (error) {
            console.error("Failed to parse saved cart:", error)
          }
        }

        // Wait for cart to be available from context
        setTimeout(() => {
          if (cart?.items) {
            const validItems = cart.items.filter((item: any) => item.product)
            setCartItems(validItems)

            // Save to localStorage as backup
            localStorage.setItem("checkoutCart", JSON.stringify(validItems))
          }
          setIsInitializing(false)
        }, 500)
      }
    }

    initializeCheckout()
  }, [isAuthenticated, isLoading, router])

  // Update cart items when cart changes
  useEffect(() => {
    if (cart?.items) {
      const validItems = cart.items.filter((item: any) => {
        return item && item.product && item.product.id && item.quantity > 0
      })

      setCartItems(validItems)

      // Save to localStorage as backup
      if (validItems.length > 0) {
        localStorage.setItem("checkoutCart", JSON.stringify(validItems))
      }
    }
  }, [cart])

  // Pre-fill shipping details with user info
  useEffect(() => {
    if (user && !shippingDetails.firstName) {
      setShippingDetails((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [user, shippingDetails.firstName])

  // Show loading while initializing
  if (isLoading || isInitializing) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading checkout...</p>
          <p className="text-sm text-muted-foreground mt-2">{isLoading ? "Authenticating..." : "Loading cart..."}</p>
        </div>
      </div>
    )
  }

  // Check authentication
  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please sign in</h2>
        <p className="text-muted-foreground mb-6">You need to be signed in to proceed with checkout.</p>
        <button
          onClick={() => router.push("/login?redirect=/checkout")}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
        >
          Sign In
        </button>
      </div>
    )
  }

  // Calculate totals (removed shipping fee)
  const subtotal = cartItems.reduce((sum, item) => {
    if (!item.product) return sum
    return sum + item.product.price * item.quantity
  }, 0)

  const discount = 0
  const shipping = 0 // Removed shipping fee
  const total = subtotal - discount + shipping

  const handleShippingSubmit = (data: ShippingDetails) => {
    setShippingDetails(data)
    setCurrentStep(2)
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (data: PaymentDetails) => {
    setPaymentDetails(data)
    setCurrentStep(3)
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    // Validate required fields
    if (!shippingDetails.address || !shippingDetails.city) {
      toast.error("Please complete shipping information")
      return
    }

    if (!paymentDetails.paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    setIsProcessing(true)

    try {
      // Prepare shipping address
      const shippingAddress = `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.country}`

      // Prepare order items from cart
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product?.price || 0,
      }))

      // Create order using the API
      const orderData = {
        totalAmount: total,
        shippingAddress,
        paymentMethod: paymentDetails.paymentMethod,
        items: orderItems,
      }

      const createdOrder = await createOrder(orderData)

      // Store order details for dashboard access
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderNumber: `ORD-${createdOrder.id}`,
          orderId: createdOrder.id,
          date: createdOrder.createdAt,
          items: cartItems,
          subtotal,
          discount,
          shipping,
          total,
          shippingDetails,
          paymentDetails: {
            ...paymentDetails,
            cardNumber: paymentDetails.cardNumber ? `**** **** **** ${paymentDetails.cardNumber.slice(-4)}` : "",
            cvv: "***",
          },
          status: createdOrder.status,
        }),
      )

      // Clear checkout cart from localStorage
      localStorage.removeItem("checkoutCart")

      // Show success message with order details
      toast.success("Order placed successfully!", {
        description: `Your order #ORD-${createdOrder.id} has been placed. Redirecting to dashboard...`,
        duration: 3000,
      })

      // Wait a moment for the user to see the success message, then redirect
      setTimeout(() => {
        router.push("/dashboard/orders")
      }, 2000)
    } catch (error) {
      console.error("Failed to create order:", error)

      let errorMessage = "Please try again."
      if (error instanceof Error) {
        if (error.message.includes("Session expired")) {
          errorMessage = "Your session has expired. Please log in again."
          router.push("/login")
          return
        } else if (error.message.includes("cart")) {
          errorMessage = "There was an issue with your cart. Please refresh and try again."
        } else {
          errorMessage = error.message
        }
      }

      toast.error("Failed to place order", {
        description: errorMessage,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Show message if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to your cart before checking out.</p>
        <div className="space-x-4">
          <button
            onClick={() => router.push("/products")}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
          >
            Browse Products
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:bg-secondary/90"
          >
            Back to Cart
          </button>
        </div>
      </div>
    )
  }

  // Transform cart items for OrderSummary component
  const orderSummaryItems = cartItems.map((item) => ({
    id: item.productId,
    name: item.product?.name || "",
    price: item.product?.price || 0,
    quantity: item.quantity,
    image: item.product?.image || "",
    variant: item.product?.category || "",
  }))

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <CheckoutSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />

        {currentStep === 1 && <ShippingForm onSubmit={handleShippingSubmit} defaultValues={shippingDetails} />}
        {currentStep === 2 && (
          <PaymentForm onSubmit={handlePaymentSubmit} defaultValues={paymentDetails} onBack={() => setCurrentStep(1)} />
        )}
        {currentStep === 3 && (
          <OrderReview
            shippingDetails={shippingDetails}
            paymentDetails={paymentDetails}
            cartItems={cartItems}
            onBack={() => setCurrentStep(2)}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
          />
        )}
      </div>

      <div>
        <OrderSummary
          cartItems={orderSummaryItems}
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={total}
        />
      </div>
    </div>
  )
}
