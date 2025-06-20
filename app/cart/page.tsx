"use client"

import { CartPage } from "@/components/cart/cart-page"
import { Container } from "@/components/ui/container"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthenticatedHeader } from "@/components/layout/authenticated-header"
import { useAuth } from "@/lib/auth/auth-provider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Cart() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated ? <AuthenticatedHeader onMenuClick={() => { /* handle menu click */ }} /> : <Header />}
      <main className="flex-1">
        <Container className="py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CartPage />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
