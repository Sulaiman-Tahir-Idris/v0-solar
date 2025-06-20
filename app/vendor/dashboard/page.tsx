"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-provider"
import { VendorSidebarLayout } from "@/components/layout/vendor-sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Package,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Users,
  Star,
} from "lucide-react"

// Mock data for vendor dashboard
const vendorStats = [
  {
    title: "Total Products",
    value: "25",
    change: "+3",
    trend: "up",
    icon: Package,
    description: "Active products in catalog",
  },
  {
    title: "Monthly Revenue",
    value: "₦450,000",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
    description: "Revenue this month",
  },
  {
    title: "Total Orders",
    value: "89",
    change: "+8",
    trend: "up",
    icon: ShoppingBag,
    description: "Orders this month",
  },
  {
    title: "Customer Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
    description: "Average customer rating",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "SolarMax Pro 400W Panel",
    amount: 299000,
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Sarah Smith",
    product: "PowerInvert 5000W Hybrid",
    amount: 1299000,
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "EnergyStore 10kWh Battery",
    amount: 2999000,
    status: "delivered",
    date: "2024-01-13",
  },
]

const topProducts = [
  {
    id: 1,
    name: "SolarMax Pro 400W Panel",
    sales: 45,
    revenue: 13455000,
    stock: 120,
  },
  {
    id: 2,
    name: "PowerInvert 5000W Hybrid",
    sales: 23,
    revenue: 29877000,
    stock: 45,
  },
  {
    id: 3,
    name: "EnergyStore 10kWh Battery",
    sales: 12,
    revenue: 35988000,
    stock: 8,
  },
]

export default function VendorDashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "vendor")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "shipped":
        return <Badge className="bg-yellow-100 text-yellow-800">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <VendorSidebarLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </VendorSidebarLayout>
    )
  }

  if (!user || user.role !== "vendor") {
    return (
      <VendorSidebarLayout>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </div>
          </CardContent>
        </Card>
      </VendorSidebarLayout>
    )
  }

  return (
    <VendorSidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.vendorInfo?.businessName || user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            {user?.vendorInfo?.isVerified ? (
              <Badge className="bg-green-100 text-green-800">Verified Vendor</Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-800">Pending Verification</Badge>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendorStats.map((stat, index) => {
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Orders
                <Button size="sm" variant="outline" asChild>
                  <a href="/vendor/orders">View All</a>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customer} • {order.product}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₦{order.amount.toLocaleString()}</div>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Top Performing Products
                <Button size="sm" variant="outline" asChild>
                  <a href="/vendor/products">Manage Products</a>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sales • Stock: {product.stock}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₦{product.revenue.toLocaleString()}</div>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2" asChild>
                <a href="/vendor/products">
                  <Plus className="h-6 w-6" />
                  Add Product
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <a href="/vendor/orders">
                  <ShoppingBag className="h-6 w-6" />
                  View Orders
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <a href="/vendor/analytics">
                  <BarChart3 className="h-6 w-6" />
                  Analytics
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <a href="/vendor/settings">
                  <Users className="h-6 w-6" />
                  Settings
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorSidebarLayout>
  )
}
