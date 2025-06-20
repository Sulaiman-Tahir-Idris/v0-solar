"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock product data for search
const searchableProducts = [
  {
    id: 1,
    name: "SolarMax Pro 400W Panel",
    category: "Solar Panels",
    price: 299,
    image: "/placeholder.svg?height=60&width=60",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "PowerInvert 5000W Hybrid",
    category: "Inverters",
    price: 1299,
    image: "/placeholder.svg?height=60&width=60",
    badge: "New",
  },
  {
    id: 3,
    name: "EnergyStore 10kWh Battery",
    category: "Batteries",
    price: 2999,
    image: "/placeholder.svg?height=60&width=60",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Complete Home Solar Kit",
    category: "Complete Systems",
    price: 4999,
    image: "/placeholder.svg?height=60&width=60",
    badge: "Complete Kit",
  },
  {
    id: 5,
    name: "Professional Installation Service",
    category: "Services",
    price: 1500,
    image: "/placeholder.svg?height=60&width=60",
    badge: "Service",
  },
  {
    id: 6,
    name: "SolarGuard 300W Panel",
    category: "Solar Panels",
    price: 249,
    image: "/placeholder.svg?height=60&width=60",
    badge: "Budget",
  },
]

// Popular search terms
const popularSearches = [
  "solar panels",
  "inverters",
  "batteries",
  "installation",
  "400W panel",
  "hybrid inverter",
  "complete kit",
  "maintenance",
]

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState<typeof searchableProducts>([])
  const [filteredCategories, setFilteredCategories] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Handle search filtering
  useEffect(() => {
    if (query.trim()) {
      const filtered = searchableProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredProducts(filtered.slice(0, 5)) // Limit to 5 results

      const categories = Array.from(
        new Set(
          searchableProducts
            .filter((product) => product.category.toLowerCase().includes(query.toLowerCase()))
            .map((product) => product.category),
        ),
      ).slice(0, 3) // Limit to 3 categories
      setFilteredCategories(categories)
    } else {
      setFilteredProducts([])
      setFilteredCategories([])
    }
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
      setRecentSearches(newRecentSearches)
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))

      // Navigate to search results
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
      setQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query)
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {query ? (
              // Search results
              <div className="p-4">
                {filteredProducts.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Products</h3>
                    <div className="space-y-2">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{product.category}</div>
                          </div>
                          <div className="text-sm font-medium">₦{product.price.toLocaleString()}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredCategories.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {filteredCategories.map((category) => (
                        <Link
                          key={category}
                          href={`/products?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                            {category}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => handleSearch(query)}>
                    <Search className="mr-2 h-4 w-4" />
                    Search for "{query}"
                  </Button>
                </div>
              </div>
            ) : (
              // Default state - recent searches and popular
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
                      <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start text-sm h-8"
                          onClick={() => handleSearch(search)}
                        >
                          <Clock className="mr-2 h-3 w-3" />
                          {search}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <Button
                        key={search}
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
