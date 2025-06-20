import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <aside className="lg:col-span-1">
              <div className="space-y-6">
                {/* User Profile Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>

                {/* Navigation */}
                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3">
                          <Skeleton className="h-4 w-4" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-20 mb-1" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Welcome Section */}
                <div>
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-4 w-96" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-8 w-12 mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Orders and Wishlist */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i}>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-8 w-20" />
                        </div>
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, j) => (
                            <div key={j} className="flex items-center gap-4 p-4 border rounded-lg">
                              <Skeleton className="w-15 h-15" />
                              <div className="flex-1">
                                <Skeleton className="h-4 w-32 mb-1" />
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-3 w-40" />
                              </div>
                            </div>
                          ))}
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
      <Footer />
    </div>
  )
}
