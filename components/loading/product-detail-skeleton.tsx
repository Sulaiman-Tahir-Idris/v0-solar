import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      {/* Product Images */}
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5" />
              ))}
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Variant Selection */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <Skeleton className="h-5 w-16 mb-3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-4 w-24 ml-4" />
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>

        {/* Product Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="md:col-span-2">
        <div className="flex gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between border-b pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
