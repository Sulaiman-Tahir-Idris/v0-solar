"use client"

import { VendorSidebarLayout } from "@/components/layout/vendor-sidebar-layout"
import { VendorOrders } from "@/components/vendor/vendor-orders"

export default function VendorOrdersPage() {
  return (
    <VendorSidebarLayout>
      <VendorOrders />
    </VendorSidebarLayout>
  )
}
