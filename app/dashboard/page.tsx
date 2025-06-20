import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"

export default function DashboardPage() {
  return (
    <AuthenticatedLayout>
      <DashboardOverview />
    </AuthenticatedLayout>
  )
}
