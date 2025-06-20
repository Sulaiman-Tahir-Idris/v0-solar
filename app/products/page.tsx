"use client"

import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthenticatedHeader } from "@/components/layout/authenticated-header"
import { Container } from "@/components/ui/container"
import { useAuth } from "@/lib/auth/auth-provider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ProductsPage() {
  const { isAuthenticated } = useAuth()

  const ProductsContent = () => (
    <Container className="py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Solar Products</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our comprehensive range of high-quality solar equipment and installation services
        </p>
      </div>

      {/* Sidebar Layout */}
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block flex-shrink-0">
          <ProductFilters />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <ProductGrid />
        </main>
      </div>
    </Container>
  )

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated ? <AuthenticatedHeader onMenuClick={() => { /* TODO: implement menu click handler */ }} /> : <Header />}
      <main className="flex-1">
        <ProductsContent />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
