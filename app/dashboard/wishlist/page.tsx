"use client"

import { WishlistPage } from "@/components/wishlist/wishlist-page"
import { AuthenticatedHeader } from "@/components/layout/authenticated-header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useAuth } from "@/lib/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function WishlistRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthenticatedHeader onMenuClick={() => {}} />
      <main className="flex-1">
        <Container className="py-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Wishlist</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <WishlistPage />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
