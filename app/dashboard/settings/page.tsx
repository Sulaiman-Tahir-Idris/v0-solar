import { SettingsPage } from "@/components/dashboard/settings-page"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

export default function Settings() {
  return (
    <AuthenticatedLayout>
      <SettingsPage />
    </AuthenticatedLayout>
  )
}
