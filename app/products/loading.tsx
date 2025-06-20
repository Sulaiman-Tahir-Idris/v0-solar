import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import { ProductGridSkeleton } from "@/components/loading/product-card-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Page Header */}
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar Skeleton */}
            <aside className="lg:col-span-1">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>

                {/* Location Filter */}
                <Card>
                  <div className="p-4">
                    <Skeleton className="h-5 w-16 mb-3" />
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <Skeleton className="h-4 w-8" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Price Range Filter */}
                <Card>
                  <div className="p-4">
                    <Skeleton className="h-5 w-20 mb-3" />
                    <Skeleton className="h-2 w-full mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </Card>

                {/* Categories Filter */}
                <Card>
                  <div className="p-4">
                    <Skeleton className="h-5 w-20 mb-3" />
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-4 w-6" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-4 w-32" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-48" />
                  <div className="flex border rounded-md">
                    <Skeleton className="h-10 w-10 rounded-r-none" />
                    <Skeleton className="h-10 w-10 rounded-l-none" />
                  </div>
                </div>
              </div>

              <ProductGridSkeleton count={6} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
