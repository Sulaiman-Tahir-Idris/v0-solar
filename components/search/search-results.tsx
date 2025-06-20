"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X, Grid, List } from "lucide-react"
import Link from "next/link"

// Mock product data - same as in product-grid.tsx
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
    variants: [
      { name: "400W", price: 299 },
      { name: "450W", price: 329 },
      { name: "500W", price: 359 },
    ],
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
    variants: [
      { name: "3000W", price: 999 },
      { name: "5000W", price: 1299 },
      { name: "8000W", price: 1799 },
    ],
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
    variants: [
      { name: "5kWh", price: 1599 },
      { name: "10kWh", price: 2999 },
      { name: "15kWh", price: 4299 },
    ],
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
    variants: [
      { name: "3kW System", price: 3499 },
      { name: "5kW System", price: 4999 },
      { name: "8kW System", price: 7499 },
    ],
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
    variants: [
      { name: "Residential", price: 1500 },
      { name: "Commercial", price: 2500 },
      { name: "Industrial", price: 4000 },
    ],
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
    variants: [
      { name: "250W", price: 219 },
      { name: "300W", price: 249 },
      { name: "350W", price: 279 },
    ],
  },
]

const categories = [
  { id: "solar-panels", name: "Solar Panels", count: 2 },
  { id: "inverters", name: "Inverters", count: 1 },
  { id: "batteries", name: "Batteries", count: 1 },
  { id: "complete-systems", name: "Complete Systems", count: 1 },
  { id: "services", name: "Services", count: 1 },
]

interface SearchResultsProps {
  query: string
  category: string
  sort: string
  page: number
}

export function SearchResults({ query, category, sort, page }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Filter products based on search query and filters
  useEffect(() => {
    let filtered = allProducts

    // Text search
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((cat) => product.category.toLowerCase().replace(/\s+/g, "-") === cat),
      )
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Sort products
    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // Mock newest sort - in real app would use creation date
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Relevance - products matching query first
        if (query) {
          filtered.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase())
            const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase())
            if (aNameMatch && !bNameMatch) return -1
            if (!aNameMatch && bNameMatch) return 1
            return 0
          })
        }
    }

    setFilteredProducts(filtered)
  }, [query, selectedCategories, priceRange, inStockOnly, sort])

  const updateURL = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`/search?${params.toString()}`)
  }

  const toggleCategory = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(newCategories)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 10000])
    setInStockOnly(false)
  }

  const activeFiltersCount = selectedCategories.length + (inStockOnly ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{query ? `Search results for "${query}"` : "All Products"}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={sort} onValueChange={(value) => updateURL({ sort: value })}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategories.map((categoryId) => {
            const category = categories.find((c) => c.id === categoryId)
            return (
              <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                {category?.name}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(categoryId)} />
              </Badge>
            )
          })}
          {inStockOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              In Stock Only
              <X className="h-3 w-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={cat.id}
                        checked={selectedCategories.includes(cat.id)}
                        onCheckedChange={() => toggleCategory(cat.id)}
                      />
                      <Label htmlFor={cat.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-sm text-muted-foreground">({cat.count})</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                  <span>₦{priceRange[0].toLocaleString()}</span>
                  <span>₦{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="font-medium mb-3">Availability</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(checked === true)}
                  />
                  <Label htmlFor="in-stock" className="cursor-pointer">
                    In stock only
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  {query
                    ? `We couldn't find any products matching "${query}". Try adjusting your search or filters.`
                    : "No products match your current filters. Try adjusting your criteria."}
                </p>
                <div className="flex justify-center gap-4">
                  {query && (
                    <Button variant="outline" asChild>
                      <Link href="/products">Browse All Products</Link>
                    </Button>
                  )}
                  {activeFiltersCount > 0 && <Button onClick={clearFilters}>Clear Filters</Button>}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
