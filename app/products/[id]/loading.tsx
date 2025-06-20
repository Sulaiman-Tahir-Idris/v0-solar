import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import { ProductDetailSkeleton } from "@/components/loading/product-detail-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
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
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          <ProductDetailSkeleton />

          {/* Reviews Section Skeleton */}
          <div className="mb-16">
            <Skeleton className="h-8 w-48 mb-6" />

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Rating Summary */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="h-12 w-12" />
                  <div>
                    <div className="flex gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-5 w-5" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-2 flex-1" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review */}
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-6" />
                      ))}
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-4" />
                      ))}
                    </div>
                  </div>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex items-center gap-6">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Skeleton key={j} className="h-3 w-3" />
                        ))}
                      </div>
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
