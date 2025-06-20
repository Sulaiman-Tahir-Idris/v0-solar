import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Container } from "@/components/ui/container"

export default function WishlistLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </Container>
      </div>

      <main className="flex-1">
        <Container className="py-8">
          <Skeleton className="h-6 w-64 mb-6" />

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </aside>
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Skeleton className="h-10 flex-1" />
                      <div className="flex gap-2">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="flex h-full">
                        <div className="w-1/3">
                          <Skeleton className="h-full w-full" />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col">
                          <div className="flex-1">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-2/3 mb-4" />
                          </div>
                          <div className="flex gap-2 mt-auto">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 w-9" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <div className="border-t py-8 bg-muted/40">
        <Container>
          <Skeleton className="h-32 w-full" />
        </Container>
      </div>
    </div>
  )
}
