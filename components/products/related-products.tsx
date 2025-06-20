"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "SolarMax Pro 400W Panel",
    category: "Solar Panels",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    description: "High-efficiency monocrystalline solar panel with 25-year warranty",
    inStock: true,
  },
  {
    id: 2,
    name: "PowerInvert 5000W Hybrid",
    category: "Inverters",
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    description: "Smart hybrid inverter with battery backup and grid-tie capability",
    inStock: true,
  },
  {
    id: 3,
    name: "EnergyStore 10kWh Battery",
    category: "Batteries",
    price: 2999,
    originalPrice: 3299,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Popular",
    description: "Lithium-ion battery system with smart energy management",
    inStock: true,
  },
  {
    id: 4,
    name: "Complete Home Solar Kit",
    category: "Complete Systems",
    price: 4999,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Complete Kit",
    description: "Everything you need for a 5kW home solar installation",
    inStock: true,
  },
  {
    id: 5,
    name: "Professional Installation Service",
    category: "Services",
    price: 1500,
    originalPrice: 2000,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Service",
    description: "Professional solar panel installation by certified technicians",
    inStock: true,
  },
  {
    id: 6,
    name: "SolarGuard 300W Panel",
    category: "Solar Panels",
    price: 249,
    originalPrice: 299,
    rating: 4.6,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Budget",
    description: "Reliable polycrystalline solar panel for budget-conscious customers",
    inStock: false,
  },
]

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([0, 1, 2, 3])
  const [isMobile, setIsMobile] = useState(false)

  // Filter out the current product and get products in the same category
  const relatedProducts = allProducts.filter(
    (product) => product.id !== currentProductId && product.category === category,
  )

  // If not enough products in the same category, add some from other categories
  const otherProducts = allProducts.filter(
    (product) => product.id !== currentProductId && product.category !== category,
  )

  // Combine to ensure we have enough products
  const displayProducts = [...relatedProducts, ...otherProducts].slice(0, 8)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Adjust visible products based on screen size
      if (window.innerWidth < 640) {
        setVisibleProducts([0])
      } else if (window.innerWidth < 1024) {
        setVisibleProducts([0, 1])
      } else {
        setVisibleProducts([0, 1, 2, 3])
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleNext = () => {
    if (visibleProducts[visibleProducts.length - 1] < displayProducts.length - 1) {
      const newVisibleProducts = visibleProducts.map((index) => index + 1)
      setVisibleProducts(newVisibleProducts)
    }
  }

  const handlePrev = () => {
    if (visibleProducts[0] > 0) {
      const newVisibleProducts = visibleProducts.map((index) => index - 1)
      setVisibleProducts(newVisibleProducts)
    }
  }

  const handleAddToCart = (productId: number) => {
    toast.success("Added to cart", {
      description: `${displayProducts.find((p) => p.id === productId)?.name} added to your cart.`,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={visibleProducts[0] === 0}
            className="hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={visibleProducts[visibleProducts.length - 1] >= displayProducts.length - 1}
            className="hidden sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isMobile
          ? displayProducts
              .slice(0, 4)
              .map((product) => <RelatedProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />)
          : visibleProducts.map((index) => {
              if (index < displayProducts.length) {
                return (
                  <RelatedProductCard
                    key={displayProducts[index].id}
                    product={displayProducts[index]}
                    onAddToCart={handleAddToCart}
                  />
                )
              }
              return null
            })}
      </div>

      <div className="flex justify-center mt-6 sm:hidden">
        <Button variant="outline" asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  )
}

interface RelatedProductCardProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    image: string
    badge: string
    description: string
    inStock: boolean
  }
  onAddToCart: (productId: number) => void
}

function RelatedProductCard({ product, onAddToCart }: RelatedProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <Badge className="absolute top-3 left-3" variant="secondary">
            {product.badge}
          </Badge>
        </Link>
      </div>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">₦{product.price.toLocaleString()}</span>
          {product.price < product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1" size="sm" asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
        <Button size="icon" variant="outline" onClick={() => onAddToCart(product.id)} disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
