import { ChangePasswordPage } from "@/components/dashboard/change-password-page"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

export default function ChangePassword() {
  return (
    <AuthenticatedLayout>
      <ChangePasswordPage />
    </AuthenticatedLayout>
  )
}
