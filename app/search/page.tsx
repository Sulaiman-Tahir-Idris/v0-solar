"use client"

import { SearchResults } from "@/components/search/search-results"
import { SearchSuggestions } from "@/components/search/search-suggestions"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { Container } from "@/components/ui/container"
import { useAuth } from "@/lib/auth/auth-provider"
import { Suspense } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function SearchPageContent() {
  const SearchContent = () => (
    <Container className="py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Find the perfect solar products for your needs</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SearchSuggestions />
        </aside>
        <div className="lg:col-span-3">
          <SearchResults query="" category="" sort="" page={1} />
        </div>
      </div>
    </Container>
  )

  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <AuthenticatedLayout>
        <SearchContent />
      </AuthenticatedLayout>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SearchContent />
      </main>
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
