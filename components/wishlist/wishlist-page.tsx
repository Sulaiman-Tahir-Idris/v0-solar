"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton } from "@/components/ui/loading-button"
import { Heart, ShoppingCart, Trash2, Search, Filter, ArrowUpDown, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useWishlist } from "@/hooks/use-wishlist"

// Define the WishlistItem type if not already imported
type WishlistItem = {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string
  inStock: boolean
  addedAt: string | Date
}

export function WishlistPage() {
  const { wishlistItems, removeFromWishlist, moveToCart, isLoading } = useWishlist()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [filterAvailability, setFilterAvailability] = useState("all")

  // Filter and sort wishlist items
  const filteredItems = wishlistItems
    .filter((item) => {
      // Filter by search query
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by availability
      const matchesAvailability =
        filterAvailability === "all" ||
        (filterAvailability === "in-stock" && item.inStock) ||
        (filterAvailability === "out-of-stock" && !item.inStock)

      return matchesSearch && matchesAvailability
    })
    .sort((a, b) => {
      // Sort by selected order
      switch (sortOrder) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "newest":
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      }
    })

  const handleRemoveItem = (id: number) => {
    removeFromWishlist(id)
    toast.success("Item removed from wishlist")
  }

  const handleMoveToCart = (item: any) => {
    if (!item.inStock) {
      toast.error("This item is currently out of stock")
      return
    }

    moveToCart(item)
    toast.success("Item moved to cart", {
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      {wishlistItems.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search wishlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-full sm:w-40">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wishlist Items */}
      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">Items you save to your wishlist will appear here.</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : filteredItems.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No matching items found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setFilterAvailability("all")
                setSortOrder("newest")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item: WishlistItem) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex h-full">
            <div className="w-1/3 relative">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="outline" className="bg-black/80 text-white border-white">
                Out of Stock
                  </Badge>
                </div>
              )}
            </div>
            <div className="w-2/3 p-4 flex flex-col">
              <div className="flex-1">
                <Link href={`/products/${item.id}`} className="hover:underline">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold">₦{item.price.toLocaleString()}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ₦{item.originalPrice.toLocaleString()}
                </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <LoadingButton
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleMoveToCart(item)}
                  disabled={!item.inStock}
                  loading={isLoading === `move-${item.id}`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </LoadingButton>
                <LoadingButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  loading={isLoading === `remove-${item.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </LoadingButton>
              </div>
            </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
