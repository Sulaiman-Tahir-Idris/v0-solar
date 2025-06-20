"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProductDetail } from "@/components/products/product-detail"
import { ProductReviews } from "@/components/products/product-reviews"
import { RelatedProducts } from "@/components/products/related-products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { Container } from "@/components/ui/container"
import { useAuth } from "@/lib/auth/auth-provider"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { isAuthenticated, getProductById } = useAuth()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Unwrap params using React.use()
  const { id } = use(params)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await getProductById(id)
        setProduct(response.data || response)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product")
        console.error("Error fetching product:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id, getProductById])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Product not found"}</p>
          <Button onClick={() => router.push("/products")}>Back to Products</Button>
        </div>
      </div>
    )
  }

  const ProductContent = () => (
    <Container className="py-8">
      {/* <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category?.toLowerCase()}`}>
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <div className="space-y-8">
        <ProductDetail product={product} />
        <ProductReviews productId={product.id} />
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </Container>
  )

  if (isAuthenticated) {
    return (
      <AuthenticatedLayout>
        <ProductContent />
      </AuthenticatedLayout>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductContent />
      </main>
      <Footer />
    </div>
  )
}
