import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CheckoutSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Skeleton className="h-8 w-24 mb-6" />

        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center w-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
                {i < 2 && <Skeleton className="w-full h-0.5 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Skeleton className="h-12 w-full md:w-auto" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />

            <div className="space-y-4 mb-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-16 h-16" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-16 mb-1" />
                    <div className="flex justify-between mt-1">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
