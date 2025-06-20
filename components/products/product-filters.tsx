"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-provider"

const brands = [
  { id: "solarmax", name: "SolarMax", count: 15 },
  { id: "powerinvert", name: "PowerInvert", count: 12 },
  { id: "energystore", name: "EnergyStore", count: 8 },
  { id: "solarguard", name: "SolarGuard", count: 10 },
]

const locations = [
  { id: "lagos", name: "Lagos", surcharge: 0 },
  { id: "abuja", name: "Abuja", surcharge: 5 },
  { id: "kano", name: "Kano", surcharge: 10 },
  { id: "port-harcourt", name: "Port Harcourt", surcharge: 8 },
  { id: "ibadan", name: "Ibadan", surcharge: 3 },
]

export function ProductFilters() {
  const { getAllCategories } = useAuth()
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories()
        setCategories(response.data || response || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [getAllCategories])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedLocation("")
    setMinPrice("")
    setMaxPrice("")
    setInStockOnly(false)
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (selectedLocation ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0)

  return (
    <div className="w-64 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Active Filters</h3>
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return (
                <Badge key={categoryId} variant="secondary" className="text-xs flex items-center gap-1">
                  {category?.name || categoryId}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(categoryId)} />
                </Badge>
              )
            })}
            {selectedBrands.map((brandId) => {
              const brand = brands.find((b) => b.id === brandId)
              return (
                <Badge key={brandId} variant="secondary" className="text-xs flex items-center gap-1">
                  {brand?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brandId)} />
                </Badge>
              )
            })}
            {selectedLocation && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                {locations.find((l) => l.id === selectedLocation)?.name}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation("")} />
              </Badge>
            )}
            {(minPrice || maxPrice) && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                Price Range
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    setMinPrice("")
                    setMaxPrice("")
                  }}
                />
              </Badge>
            )}
            {inStockOnly && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                In Stock Only
                <X className="h-3 w-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoadingCategories ? (
            <div className="text-sm text-muted-foreground">Loading categories...</div>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <Label htmlFor={category.id} className="flex-1 cursor-pointer text-sm">
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs text-muted-foreground">({category.productCount || 0})</span>
                  </div>
                </Label>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">No categories available</div>
          )}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price" className="text-xs">
                Min Price
              </Label>
              <Input
                id="min-price"
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs">
                Max Price
              </Label>
              <Input
                id="max-price"
                type="number"
                placeholder="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.id}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <Label htmlFor={brand.id} className="flex-1 cursor-pointer text-sm">
                <div className="flex items-center justify-between">
                  <span>{brand.name}</span>
                  <span className="text-xs text-muted-foreground">({brand.count})</span>
                </div>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center space-x-2">
              <Checkbox
                id={location.id}
                checked={selectedLocation === location.id}
                onCheckedChange={() => setSelectedLocation(selectedLocation === location.id ? "" : location.id)}
              />
              <Label htmlFor={location.id} className="flex-1 cursor-pointer text-sm">
                <div className="flex items-center justify-between">
                  <span>{location.name}</span>
                  {location.surcharge > 0 && (
                    <Badge variant="outline" className="text-xs">
                      +{location.surcharge}%
                    </Badge>
                  )}
                </div>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked === true)}
            />
            <Label htmlFor="in-stock" className="cursor-pointer text-sm">
              In stock only
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
