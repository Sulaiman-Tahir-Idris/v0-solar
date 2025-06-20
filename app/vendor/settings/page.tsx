"use client"

import { VendorSidebarLayout } from "@/components/layout/vendor-sidebar-layout"
import { VendorSettings } from "@/components/vendor/vendor-settings"

export default function VendorSettingsPage() {
  return (
    <VendorSidebarLayout>
      <VendorSettings />
    </VendorSidebarLayout>
  )
}
