"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, Check } from "lucide-react"
import { toast } from "sonner"
import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "@/lib/auth/auth-provider"
import { FallbackImage } from "@/components/ui/fallback-image"

interface ProductDetailProps {
  product: {
    id: number
    name: string
    category: string
    price: number
    originalPrice?: number
    rating?: number
    reviews?: number
    image?: string
    images?: string[]
    badge?: string
    description: string
    longDescription?: string
    inStock: boolean
    variants?: Array<{ name: string; price: number }>
    specifications?: Array<{ name: string; value: string }>
    features?: string[]
    stock?: number
    sku?: string
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  // Provide default values to prevent undefined errors
  const defaultVariant = { name: "Standard", price: product.price }
  const variants = product.variants && product.variants.length > 0 ? product.variants : [defaultVariant]
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "/placeholder.svg?height=600&width=600"]
  const specifications = product.specifications || []
  const features = product.features || []

  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { isInWishlist, addToWishlist, removeFromWishlist, isLoading } = useWishlist()
  const { isAuthenticated, addToCart } = useAuth()
  const router = useRouter()

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    setIsAddingToCart(true)
    try {
      await addToCart(product.id, quantity)
      toast.success("Added to cart", {
        description: `${quantity} x ${product.name} (${selectedVariant.name}) added to your cart.`,
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

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock || 100, quantity + change))
    setQuantity(newQuantity)
  }

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id)
        toast.success("Removed from wishlist")
      } else {
        await addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || "",
          description: product.description,
          inStock: product.inStock,
          addedAt: new Date().toISOString(),
        })
        toast.success("Added to wishlist")
      }
    } catch (error) {
      toast.error("Failed to update wishlist")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
          <FallbackImage
            src={selectedImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="outline" className="bg-black/80 text-white border-white text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === image ? "border-primary" : "border-muted"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <FallbackImage
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{product.category}</Badge>
            {product.badge && <Badge variant="default">{product.badge}</Badge>}
          </div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {product.rating && product.reviews && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating!) ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">₦{selectedVariant.price.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > selectedVariant.price && (
              <span className="text-xl text-muted-foreground line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        {/* Variants */}
        {variants.length > 1 && (
          <div>
            <h3 className="font-medium mb-3">Choose Variant</h3>
            <RadioGroup
              value={selectedVariant.name}
              onValueChange={(value) => {
                const variant = variants.find((v) => v.name === value)
                if (variant) setSelectedVariant(variant)
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                {variants.map((variant) => (
                  <div key={variant.name} className="flex items-center space-x-2">
                    <RadioGroupItem value={variant.name} id={variant.name} />
                    <Label htmlFor={variant.name} className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>{variant.name}</span>
                        <span className="font-medium">₦{variant.price.toLocaleString()}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product.stock || 100)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {product.stock && <span className="text-sm text-muted-foreground">{product.stock} available</span>}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleWishlistToggle}
              disabled={!!isLoading}
              className={isWishlisted ? "text-red-500 border-red-200" : ""}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Info Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over ₦50,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">2 Year Warranty</p>
              <p className="text-xs text-muted-foreground">Full coverage</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">30 Day Returns</p>
              <p className="text-xs text-muted-foreground">No questions asked</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="space-y-4">
            <p className="text-muted-foreground">{product.longDescription || product.description}</p>
          </TabsContent>
          <TabsContent value="specifications" className="space-y-4">
            {specifications.length > 0 ? (
              <div className="space-y-2">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{spec.name}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No specifications available.</p>
            )}
          </TabsContent>
          <TabsContent value="features" className="space-y-4">
            {features.length > 0 ? (
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No features listed.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
