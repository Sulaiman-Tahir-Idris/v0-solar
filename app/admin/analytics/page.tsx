"use client"

import { AdminSidebarLayout } from "@/components/layout/admin-sidebar-layout"
import { PlatformAnalytics } from "@/components/admin/platform-analytics"

export default function AdminAnalyticsPage() {
  return (
    <AdminSidebarLayout>
      <PlatformAnalytics />
    </AdminSidebarLayout>
  )
}
