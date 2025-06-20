"use client"

import { AdminSidebarLayout } from "@/components/layout/admin-sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminOrdersPage() {
  return (
    <AdminSidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Monitor and manage all platform orders</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Order management interface coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </AdminSidebarLayout>
  )
}
