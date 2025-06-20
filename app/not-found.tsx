import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Container className="py-16 text-center">
          <div className="space-y-6 max-w-md mx-auto">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
