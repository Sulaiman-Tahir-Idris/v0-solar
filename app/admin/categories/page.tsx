"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-provider"
import { AdminSidebarLayout } from "@/components/layout/admin-sidebar-layout"
import { CategoryManagement } from "@/components/admin/category-management"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function AdminCategoriesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <AdminSidebarLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </AdminSidebarLayout>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <AdminSidebarLayout>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </div>
          </CardContent>
        </Card>
      </AdminSidebarLayout>
    )
  }

  return (
    <AdminSidebarLayout>
      <CategoryManagement />
    </AdminSidebarLayout>
  )
}
