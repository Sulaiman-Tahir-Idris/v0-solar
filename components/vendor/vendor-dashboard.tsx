"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, DollarSign, ShoppingBag, TrendingUp, Plus, Eye, Edit, BarChart3, Users, Star } from "lucide-react"
import { VendorProducts } from "./vendor-products"
import { VendorOrders } from "./vendor-orders"
import { VendorAnalytics } from "./vendor-analytics"
import { VendorSettings } from "./vendor-settings"
import { useAuth } from "@/lib/auth/auth-provider" // Import useAuth hook

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

export function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuth() // Declare useAuth hook

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

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.vendorInfo?.businessName || user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            {user?.vendorInfo?.isVerified ? (
              <Badge className="bg-green-100 text-green-800">Verified Vendor</Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-800">Pending Verification</Badge>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("orders")}>
                    View All
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
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("products")}>
                    Manage Products
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
                <Button className="h-20 flex-col gap-2" onClick={() => setActiveTab("products")}>
                  <Plus className="h-6 w-6" />
                  Add Product
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab("orders")}>
                  <ShoppingBag className="h-6 w-6" />
                  View Orders
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab("analytics")}>
                  <BarChart3 className="h-6 w-6" />
                  Analytics
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab("settings")}>
                  <Users className="h-6 w-6" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <VendorProducts />
        </TabsContent>

        <TabsContent value="orders">
          <VendorOrders />
        </TabsContent>

        <TabsContent value="analytics">
          <VendorAnalytics />
        </TabsContent>

        <TabsContent value="settings">
          <VendorSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
