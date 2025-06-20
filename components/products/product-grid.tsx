"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/products/product-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/lib/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react"

export function ProductGrid() {
  const { getAllProducts } = useAuth()
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const params: any = {
          page: currentPage,
          limit: productsPerPage,
        }

        // Add sorting
        switch (sortBy) {
          case "price-low":
            params.sortBy = "price"
            params.sortOrder = "asc"
            break
          case "price-high":
            params.sortBy = "price"
            params.sortOrder = "desc"
            break
          case "rating":
            params.sortBy = "rating"
            params.sortOrder = "desc"
            break
          case "newest":
            params.sortBy = "createdAt"
            params.sortOrder = "desc"
            break
          default:
            params.sortBy = "featured"
        }

        const response = await getAllProducts(params)
        const data = response.data || response || []

        // Handle both paginated and non-paginated responses
        if (Array.isArray(data)) {
          setProducts(data)
          setTotalProducts(data.length)
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products)
          setTotalProducts(data.total || data.products.length)
        } else {
          setProducts([])
          setTotalProducts(0)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products")
        console.error("Error fetching products:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [getAllProducts, currentPage, productsPerPage, sortBy])

  // Reset to first page when sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [sortBy])

  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage + 1
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>,
    )

    // First page
    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(1)}
          className="h-8 w-8 p-0"
        >
          1
        </Button>,
      )
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>,
        )
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="h-8 w-8 p-0"
        >
          {i}
        </Button>,
      )
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>,
        )
      }
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className="h-8 w-8 p-0"
        >
          {totalPages}
        </Button>,
      )
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>,
    )

    return buttons
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex}-{endIndex} of {totalProducts} products
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
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
              className="rounded-r-none h-8 w-8"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" : "space-y-4"}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && <div className="flex items-center justify-center gap-2 pt-8">{renderPaginationButtons()}</div>}

      {/* Pagination Info */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  )
}
