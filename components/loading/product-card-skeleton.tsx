import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductCardSkeletonProps {
  viewMode?: "grid" | "list"
}

export function ProductCardSkeleton({ viewMode = "grid" }: ProductCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <Skeleton className="w-48 h-48" />
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4" />
                ))}
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <Skeleton className="w-full h-48" />
          <Skeleton className="absolute top-3 left-3 h-6 w-16" />
          <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />

        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>

        <Skeleton className="h-5 w-20" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
      </CardFooter>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 6, viewMode = "grid" }: { count?: number; viewMode?: "grid" | "list" }) {
  return (
    <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} viewMode={viewMode} />
      ))}
    </div>
  )
}
