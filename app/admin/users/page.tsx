"use client"

import { AdminSidebarLayout } from "@/components/layout/admin-sidebar-layout"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <AdminSidebarLayout>
      <UserManagement />
    </AdminSidebarLayout>
  )
}
