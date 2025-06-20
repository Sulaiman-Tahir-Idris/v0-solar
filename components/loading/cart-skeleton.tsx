import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CartSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Skeleton className="h-8 w-64 mb-6" />

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <Skeleton className="w-full sm:w-32 h-32" />
                <CardContent className="flex-1 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-6 w-8" />
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-4 w-20 ml-2" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-16" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
