"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Search } from "lucide-react"
import Link from "next/link"

// Mock trending searches and categories
const trendingSearches = [
  { term: "solar panels", count: 1250 },
  { term: "400W panel", count: 890 },
  { term: "hybrid inverter", count: 675 },
  { term: "battery storage", count: 543 },
  { term: "installation service", count: 432 },
  { term: "complete solar kit", count: 321 },
]

const popularCategories = [
  { name: "Solar Panels", href: "/products?category=solar-panels", count: 24 },
  { name: "Inverters", href: "/products?category=inverters", count: 12 },
  { name: "Batteries", href: "/products?category=batteries", count: 8 },
  { name: "Complete Systems", href: "/products?category=complete-systems", count: 6 },
  { name: "Services", href: "/products?category=services", count: 4 },
]

export function SearchSuggestions() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending Searches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingSearches.map((search, index) => (
            <Link
              key={search.term}
              href={`/search?q=${encodeURIComponent(search.term)}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                <span>{search.term}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {search.count.toLocaleString()}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Browse Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {popularCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
            >
              <span>{category.name}</span>
              <Badge variant="outline" className="text-xs">
                {category.count} products
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
