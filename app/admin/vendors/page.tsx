"use client"

import { AdminSidebarLayout } from "@/components/layout/admin-sidebar-layout"
import { VendorManagement } from "@/components/admin/vendor-management"

export default function AdminVendorsPage() {
  return (
    <AdminSidebarLayout>
      <VendorManagement />
    </AdminSidebarLayout>
  )
}
