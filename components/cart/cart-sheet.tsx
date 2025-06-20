"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-provider"
import { FallbackImage } from "@/components/ui/fallback-image"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  stock: number
}

interface CartItem {
  id: number
  cartId: number
  productId: number
  quantity: number
  createdAt: string
  product?: Product
}

interface Cart {
  id: number
  userId: number
  items: CartItem[]
  createdAt: string
}

export function CartSheet() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set())
  const { isAuthenticated, getCart, removeFromCart, updateCartItemQuantity, getProductById } = useAuth()
  const router = useRouter()

  const handleOpenChange = (open: boolean) => {
    if (open && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }
    setIsOpen(open)

    // Fetch cart data when opening
    if (open && isAuthenticated) {
      fetchCartWithProducts()
    }
  }

  const fetchCartWithProducts = async () => {
    if (!isAuthenticated) return

    setIsLoading(true)
    try {
      const cartData = await getCart()

      // Fetch product details for each cart item
      const itemsWithProducts = await Promise.all(
        ((cartData.items as unknown) as CartItem[]).map(async (item: CartItem) => {
          try {
            const product = await getProductById(item.productId)
            return {
              ...item,
              product: product,
            }
          } catch (error) {
            console.error(`Failed to fetch product ${item.productId}:`, error)
            return {
              ...item,
              product: {
                id: item.productId,
                name: "Product Not Found",
                price: 0,
                image: "",
                category: "Unknown",
                inStock: false,
                stock: 0,
              },
            }
          }
        }),
      )

      const enrichedCart = {
        ...cartData,
        items: itemsWithProducts,
      }

      setCart(enrichedCart)
    } catch (error) {
      console.error("Failed to fetch cart:", error)
      toast.error("Failed to load cart")
    } finally {
      setIsLoading(false)
    }
  }

  // Also fetch cart data when component mounts if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartWithProducts()
    }
  }, [isAuthenticated])

  const updateQuantity = async (itemId: number, change: number) => {
    if (!cart) return

    const item = cart.items.find((item) => item.id === itemId)
    if (!item || !item.product) return

    const newQuantity = Math.max(1, Math.min(item.product.stock, item.quantity + change))
    if (newQuantity === item.quantity) return

    setUpdatingItems((prev) => new Set(prev).add(itemId))

    try {
      await updateCartItemQuantity(itemId, newQuantity)

      // Update local cart state
      setCart((prevCart) => {
        if (!prevCart) return null

        const updatedItems = prevCart.items.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem,
        )

        return {
          ...prevCart,
          items: updatedItems,
        }
      })
    } catch (error) {
      console.error("Failed to update quantity:", error)
      toast.error("Failed to update quantity")
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const removeItem = async (itemId: number) => {
    if (!cart) return

    try {
      await removeFromCart(itemId)

      // Update local cart state
      setCart((prevCart) => {
        if (!prevCart) return null

        const updatedItems = prevCart.items.filter((cartItem) => cartItem.id !== itemId)

        return {
          ...prevCart,
          items: updatedItems,
        }
      })

      toast.success("Item removed from cart")
    } catch (error) {
      console.error("Failed to remove item:", error)
      toast.error("Failed to remove item")
    }
  }

  const subtotal =
    cart?.items.reduce((sum, item) => {
      if (!item.product) return sum
      return sum + item.product.price * item.quantity
    }, 0) || 0

  const totalItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0
  const shipping = subtotal > 50000 ? 0 : 5000
  const total = subtotal + shipping

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-muted-foreground">Loading cart...</p>
            </div>
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">Add items to your cart to see them here.</p>
              <Button asChild onClick={() => setIsOpen(false)}>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {cart.items.map((item) => {
                  if (!item.product) return null

                  return (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                        <FallbackImage
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.product.category}</p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1 || updatingItems.has(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm min-w-[20px] text-center">
                            {updatingItems.has(item.id) ? "..." : item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.product.stock || updatingItems.has(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="font-medium text-sm">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
              <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
