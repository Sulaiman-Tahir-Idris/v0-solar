"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-provider"
import { WishlistButton } from "@/components/wishlist/wishlist-button"
import { FallbackImage } from "@/components/ui/fallback-image"

interface ProductCardProps {
  product: {
    id: number
    name: string
    category: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    badge?: string
    description: string
    inStock: boolean
    variants: Array<{ name: string; price: number }>
  }
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { isAuthenticated, addToCart } = useAuth()
  const router = useRouter()

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    setIsAddingToCart(true)
    try {
      await addToCart(product.id, 1)
      toast.success("Added to cart", {
        description: `${product.name} added to your cart.`,
      })
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast.error("Failed to add to cart", {
        description: "Please try again.",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/4 relative">
            <Link href={`/products/${product.id}`}>
              <div className="relative h-28">
                <FallbackImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </Link>
          </div>
          <div className="w-3/4 p-3 flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-2">
                  <Link href={`/products/${product.id}`} className="hover:underline">
                    <h3 className="font-medium mb-1 text-sm line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                </div>
                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.price}
                  productImage={product.image}
                />
              </div>
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-sm">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
              {/* Stock status in details */}
              <Badge variant={product.inStock ? "secondary" : "destructive"} className="text-xs w-fit mb-2">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <div className="flex gap-2 mt-auto">
              <Button
                variant="default"
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                <Link href={`/products/${product.id}`}>View</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 h-full flex flex-col group hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Link href={`/products/${product.id}`}>
          <FallbackImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>
        <div
          className={`absolute top-2 right-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <WishlistButton
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
            productImage={product.image}
          />
        </div>
      </div>
      <CardContent className="p-2 flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <Star className="h-2.5 w-2.5 fill-primary text-primary" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded text-[9px]">
            {product.category}
          </span>
        </div>
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-medium mb-1 line-clamp-2 text-xs leading-tight">{product.name}</h3>
        </Link>
        <p className="text-[10px] text-muted-foreground mb-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs">₦{product.price.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {/* Stock status badge in details area */}
          <Badge variant={product.inStock ? "secondary" : "destructive"} className="text-xs">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <Button
          className="w-full text-xs h-7"
          variant={isHovered ? "default" : "outline"}
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
        >
          <ShoppingCart className="h-2.5 w-2.5 mr-1" />
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
