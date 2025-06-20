"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth/auth-provider"

export function CartPage() {
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const [isClearing, setIsClearing] = useState(false)
  const router = useRouter()
  const { cart, removeFromCart, updateCartItemQuantity, clearCart, refreshCart, isAuthenticated } = useAuth()

  // Refresh cart when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart()
    }
  }, [isAuthenticated, refreshCart])

  // Get cart items and ensure they have valid product data
  const cartItems = cart?.items?.filter((item) => item && item.product && item.product.id) || []

  const handleQuantityUpdate = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(itemId)
    try {
      await updateCartItemQuantity(itemId, newQuantity)
      toast.success("Cart updated")
    } catch (error) {
      console.error("Failed to update quantity:", error)
      toast.error("Failed to update cart")
    } finally {
      setIsUpdating(null)
    }
  }

  const handleRemoveItem = async (itemId: number, productName: string) => {
    setIsUpdating(itemId)
    try {
      await removeFromCart(itemId)
      toast.success(`${productName} removed from cart`)
    } catch (error) {
      console.error("Failed to remove item:", error)
      toast.error("Failed to remove item")
    } finally {
      setIsUpdating(null)
    }
  }

  const handleClearCart = async () => {
    setIsClearing(true)
    try {
      await clearCart()
      toast.success("Cart cleared")
    } catch (error) {
      console.error("Failed to clear cart:", error)
      toast.error("Failed to clear cart")
    } finally {
      setIsClearing(false)
    }
  }

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    if (!isAuthenticated) {
      toast.error("Please sign in to proceed with checkout")
      router.push("/login?redirect=/checkout")
      return
    }

    // Save cart to localStorage as backup before navigating
    try {
      localStorage.setItem("checkoutCart", JSON.stringify(cartItems))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }

    // Navigate to checkout
    router.push("/checkout")
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  const discount = 0 // You can implement discount logic here
  const shipping = subtotal > 50000 ? 0 : 5000 // Free shipping over ₦50,000
  const total = subtotal - discount + shipping

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">Please sign in</h2>
        <p className="text-muted-foreground mb-6">Sign in to view your cart and saved items.</p>
        <Button onClick={() => router.push("/login")}>Sign In</Button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Button onClick={() => router.push("/products")}>
          Continue Shopping
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative bg-muted rounded">
                    <Image
                      src={item.product?.image || "/placeholder.svg"}
                      alt={item.product?.name || "Product"}
                      fill
                      className="object-cover rounded"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product?.name}</h3>
                    <p className="text-sm text-muted-foreground">Category: {item.product?.category}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isUpdating === item.id}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                          disabled={isUpdating === item.id}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₦{((item.product?.price || 0) * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₦{(item.product?.price || 0).toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveItem(item.id, item.product?.name || "Item")}
                    disabled={isUpdating === item.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={handleClearCart} disabled={isClearing}>
              {isClearing ? "Clearing..." : "Clear Cart"}
            </Button>
            <Button variant="ghost" onClick={() => router.push("/products")}>
              Continue Shopping
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
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
              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleProceedToCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {subtotal < 50000 && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Add ₦{(50000 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
