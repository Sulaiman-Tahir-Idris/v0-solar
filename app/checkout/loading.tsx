import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import { CheckoutSkeleton } from "@/components/loading/checkout-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          <CheckoutSkeleton />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
