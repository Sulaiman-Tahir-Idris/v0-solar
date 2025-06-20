"use client"

import { VendorSidebarLayout } from "@/components/layout/vendor-sidebar-layout"
import { VendorProducts } from "@/components/vendor/vendor-products"

export default function VendorProductsPage() {
  return (
    <VendorSidebarLayout>
      <VendorProducts />
    </VendorSidebarLayout>
  )
}
