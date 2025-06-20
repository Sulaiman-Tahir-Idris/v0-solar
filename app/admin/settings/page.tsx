"use client"

import { AdminSidebarLayout } from "@/components/layout/admin-sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSettingsPage() {
  return (
    <AdminSidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Settings interface coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </AdminSidebarLayout>
  )
}
