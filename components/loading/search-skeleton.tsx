import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SearchSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-48" />
          <div className="flex border rounded-md">
            <Skeleton className="h-10 w-10 rounded-r-none" />
            <Skeleton className="h-10 w-10 rounded-l-none" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>

              {/* Categories */}
              <div>
                <Skeleton className="h-5 w-20 mb-3" />
                <div className="space-y-2">
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

              {/* Price Range */}
              <div>
                <Skeleton className="h-5 w-20 mb-3" />
                <Skeleton className="h-2 w-full mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-3" />

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-4" />
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
                <div className="p-4 pt-0 flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
