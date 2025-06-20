"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Building, Loader2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth/auth-provider"
import type { ShippingDetails, PaymentDetails } from "./checkout-page"

interface CartItem {
  id: number
  productId: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    inStock: boolean
    stock: number
  }
}

interface OrderReviewProps {
  shippingDetails: ShippingDetails
  paymentDetails: PaymentDetails
  cartItems: CartItem[]
  onBack: () => void
  onPlaceOrder: () => void
  isProcessing: boolean
}

export function OrderReview({
  shippingDetails,
  paymentDetails,
  cartItems: initialCartItems,
  onBack,
  onPlaceOrder,
  isProcessing,
}: OrderReviewProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isLoadingPrices, setIsLoadingPrices] = useState(false)
  const [priceChanges, setPriceChanges] = useState<
    Array<{
      productId: number
      oldPrice: number
      newPrice: number
      productName: string
    }>
  >([])
  const { getProductById } = useAuth()

  // Fetch updated prices when component mounts
  useEffect(() => {
    const fetchUpdatedPrices = async () => {
      if (!initialCartItems.length) return

      setIsLoadingPrices(true)
      const changes: Array<{
        productId: number
        oldPrice: number
        newPrice: number
        productName: string
      }> = []

      try {
        const updatedItems = await Promise.all(
          initialCartItems.map(async (item) => {
            try {
              // Fetch fresh product data from database
              const freshProduct = await getProductById(item.productId)
              const oldPrice = item.product.price
              const newPrice = freshProduct.price

              // Check if price has changed
              if (oldPrice !== newPrice) {
                changes.push({
                  productId: item.productId,
                  oldPrice,
                  newPrice,
                  productName: item.product.name,
                })
              }

              // Return updated cart item with fresh product data
              return {
                ...item,
                product: {
                  ...item.product,
                  ...freshProduct,
                  price: newPrice,
                  inStock: freshProduct.inStock,
                  stock: freshProduct.stock,
                },
              }
            } catch (error) {
              console.error(`Failed to fetch updated price for product ${item.productId}:`, error)
              // Return original item if fetch fails
              return item
            }
          }),
        )

        setCartItems(updatedItems)
        setPriceChanges(changes)

        // Show price change notifications
        if (changes.length > 0) {
          changes.forEach((change) => {
            const priceDirection = change.newPrice > change.oldPrice ? "increased" : "decreased"
            const priceDiff = Math.abs(change.newPrice - change.oldPrice)

            toast.warning(`Price Update`, {
              description: `${change.productName} price has ${priceDirection} by ₦${priceDiff.toLocaleString()}`,
            })
          })
        }
      } catch (error) {
        console.error("Failed to fetch updated prices:", error)
        toast.error("Failed to update prices", {
          description: "Using cached prices. Please refresh if needed.",
        })
      } finally {
        setIsLoadingPrices(false)
      }
    }

    fetchUpdatedPrices()
  }, [initialCartItems, getProductById])

  // Calculate totals using updated cart items
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.product?.price || 0
    return sum + itemPrice * item.quantity
  }, 0)

  const discount = 0 // No discount in this example
  const shipping = subtotal > 50000 ? 0 : 5000 // Free shipping over ₦50,000
  const total = subtotal - discount + shipping

  const getPaymentMethodIcon = () => {
    switch (paymentDetails.paymentMethod) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "transfer":
        return <Building className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getPaymentMethodName = () => {
    switch (paymentDetails.paymentMethod) {
      case "card":
        return "Credit / Debit Card"
      case "transfer":
        return "Bank Transfer"
      case "cash":
        return "Cash on Delivery"
      default:
        return "Credit / Debit Card"
    }
  }

  // Check if any items are out of stock
  const outOfStockItems = cartItems.filter((item) => !item.product?.inStock)
  const hasOutOfStockItems = outOfStockItems.length > 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>
            <p className="text-muted-foreground">Please review your order details before placing your order.</p>
            {isLoadingPrices && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating prices...
              </div>
            )}
          </div>

          {/* Price change alerts */}
          {priceChanges.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800">Price Changes Detected</h3>
                  <div className="mt-2 space-y-1">
                    {priceChanges.map((change) => (
                      <p key={change.productId} className="text-sm text-yellow-700">
                        {change.productName}: ₦{change.oldPrice.toLocaleString()} → ₦{change.newPrice.toLocaleString()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Out of stock alerts */}
          {hasOutOfStockItems && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800">Items Out of Stock</h3>
                  <div className="mt-2 space-y-1">
                    {outOfStockItems.map((item) => (
                      <p key={item.id} className="text-sm text-red-700">
                        {item.product?.name} is currently out of stock
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-medium">Order Items</h3>
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemPrice = item.product?.price || 0
                const itemTotal = itemPrice * item.quantity
                const isOutOfStock = !item.product?.inStock

                return (
                  <div key={item.id} className={`flex gap-4 ${isOutOfStock ? "opacity-60" : ""}`}>
                    <div className="w-16 h-16 relative bg-muted rounded">
                      <Image
                        src={item.product?.image || "/placeholder.svg"}
                        alt={item.product?.name || "Product"}
                        fill
                        className="object-cover rounded"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
                      <p className="text-sm text-muted-foreground">Category: {item.product?.category || "Unknown"}</p>
                      {isOutOfStock && <p className="text-sm text-red-600 font-medium">Out of Stock</p>}
                      <div className="flex justify-between mt-1">
                        <p className="text-sm">
                          Qty: {item.quantity} × ₦{itemPrice.toLocaleString()}
                        </p>
                        <p className="font-medium">₦{itemTotal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="font-medium">
                  {shippingDetails.firstName} {shippingDetails.lastName}
                </p>
                <p>{shippingDetails.address}</p>
                <p>
                  {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}
                </p>
                <p>{shippingDetails.country}</p>
                <p className="mt-2">{shippingDetails.phone}</p>
                <p>{shippingDetails.email}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Payment Method</h3>
              <div className="bg-muted p-3 rounded-md text-sm">
                <div className="flex items-center gap-2">
                  {getPaymentMethodIcon()}
                  <span className="font-medium">{getPaymentMethodName()}</span>
                </div>
                {paymentDetails.paymentMethod === "card" && paymentDetails.cardNumber && (
                  <p className="mt-1">Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} disabled={isProcessing}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payment
            </Button>
            <Button
              type="button"
              size="lg"
              className="flex-1"
              onClick={onPlaceOrder}
              disabled={isProcessing || hasOutOfStockItems || isLoadingPrices}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : hasOutOfStockItems ? (
                "Cannot Place Order - Items Out of Stock"
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
