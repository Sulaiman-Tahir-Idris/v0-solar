import { ProfilePage } from "@/components/dashboard/profile-page"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

export default function Profile() {
  return (
    <AuthenticatedLayout>
      <ProfilePage />
    </AuthenticatedLayout>
  )
}
