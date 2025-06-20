"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-provider"
import { AdminSidebarLayout } from "@/components/layout/admin-sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Users,
  Store,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react"

// Mock data
const dashboardStats = [
  {
    title: "Total Vendors",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Store,
    description: "Active vendors on platform",
  },
  {
    title: "Total Customers",
    value: "2,847",
    change: "+23%",
    trend: "up",
    icon: Users,
    description: "Registered customers",
  },
  {
    title: "Monthly Revenue",
    value: "₦12.4M",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    description: "Platform commission earned",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8%",
    trend: "up",
    icon: ShoppingBag,
    description: "Orders this month",
  },
]

const pendingVendors = [
  {
    id: 1,
    businessName: "Solar Solutions Ltd",
    contactName: "John Smith",
    email: "john@solarsolutions.com",
    appliedDate: "2024-01-15",
    status: "pending",
    estimatedVolume: "₦500k-1M",
  },
  {
    id: 2,
    businessName: "Green Energy Co",
    contactName: "Sarah Johnson",
    email: "sarah@greenenergy.com",
    appliedDate: "2024-01-14",
    status: "pending",
    estimatedVolume: "₦200k-500k",
  },
  {
    id: 3,
    businessName: "EcoTech Systems",
    contactName: "Mike Wilson",
    email: "mike@ecotech.com",
    appliedDate: "2024-01-13",
    status: "pending",
    estimatedVolume: "₦1M+",
  },
]

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <AdminSidebarLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </AdminSidebarLayout>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <AdminSidebarLayout>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </div>
          </CardContent>
        </Card>
      </AdminSidebarLayout>
    )
  }

  return (
    <AdminSidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your marketplace, vendors, and platform analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    {stat.change} from last month
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Pending Vendor Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Pending Vendor Applications
              <Badge variant="secondary">{pendingVendors.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{vendor.businessName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact: {vendor.contactName} • {vendor.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Applied: {vendor.appliedDate} • Volume: {vendor.estimatedVolume}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                    <Button size="sm" variant="default">
                      <UserCheck className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <UserX className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Store className="mr-2 h-4 w-4" />
                Review Vendor Applications
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Recent Orders
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Platform Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Vendor "Solar Pro Ltd" approved</span>
                  <span className="text-muted-foreground ml-auto">2h ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>15 new customer registrations</span>
                  <span className="text-muted-foreground ml-auto">4h ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-purple-500" />
                  <span>₦2.3M in orders processed</span>
                  <span className="text-muted-foreground ml-auto">6h ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span>3 vendor applications pending</span>
                  <span className="text-muted-foreground ml-auto">1d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminSidebarLayout>
  )
}
