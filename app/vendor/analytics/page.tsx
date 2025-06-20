"use client"

import { VendorSidebarLayout } from "@/components/layout/vendor-sidebar-layout"
import { VendorAnalytics } from "@/components/vendor/vendor-analytics"

export default function VendorAnalyticsPage() {
  return (
    <VendorSidebarLayout>
      <VendorAnalytics />
    </VendorSidebarLayout>
  )
}
