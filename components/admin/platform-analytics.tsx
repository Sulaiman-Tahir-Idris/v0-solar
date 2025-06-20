"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Store, Globe } from "lucide-react"
import { useState } from "react"

// Mock platform analytics data
const platformMetrics = {
  totalRevenue: 45600000,
  totalCommission: 6840000,
  totalVendors: 156,
  totalCustomers: 2847,
  totalOrders: 1234,
  averageOrderValue: 850000,
  conversionRate: 3.2,
  customerRetention: 68.5,
}

const topVendors = [
  {
    name: "Solar Solutions Ltd",
    revenue: 12450000,
    orders: 89,
    commission: 1867500,
    growth: 15.2,
  },
  {
    name: "Green Energy Co",
    revenue: 8900000,
    orders: 65,
    commission: 1335000,
    growth: 12.8,
  },
  {
    name: "EcoTech Systems",
    revenue: 7200000,
    orders: 52,
    commission: 1080000,
    growth: 8.5,
  },
  {
    name: "Power Systems Inc",
    revenue: 5800000,
    orders: 41,
    commission: 870000,
    growth: 22.1,
  },
]

const categoryPerformance = [
  { category: "Solar Panels", revenue: 18500000, percentage: 40.5 },
  { category: "Inverters", revenue: 12300000, percentage: 27.0 },
  { category: "Batteries", revenue: 8900000, percentage: 19.5 },
  { category: "Complete Systems", revenue: 4200000, percentage: 9.2 },
  { category: "Accessories", revenue: 1700000, percentage: 3.8 },
]

const regionalData = [
  { region: "Lagos", customers: 1138, revenue: 18240000, percentage: 40 },
  { region: "Abuja", customers: 711, revenue: 11376000, percentage: 25 },
  { region: "Port Harcourt", customers: 455, revenue: 7296000, percentage: 16 },
  { region: "Kano", customers: 313, revenue: 5016000, percentage: 11 },
  { region: "Others", customers: 230, revenue: 3672000, percentage: 8 },
]

export function PlatformAnalytics() {
  const [timeRange, setTimeRange] = useState("monthly")

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Platform Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Last 7 Days</SelectItem>
            <SelectItem value="weekly">Last 4 Weeks</SelectItem>
            <SelectItem value="monthly">Last 6 Months</SelectItem>
            <SelectItem value="yearly">Last 2 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{platformMetrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +18.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Commission</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{platformMetrics.totalCommission.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.8% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalVendors}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalCustomers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +23.1% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performing Vendors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Top Performing Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{vendor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {vendor.orders} orders • ₦{vendor.revenue.toLocaleString()} revenue
                    </p>
                    <p className="text-xs text-muted-foreground">Commission: ₦{vendor.commission.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={vendor.growth > 15 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                      <TrendingUp className="h-3 w-3 mr-1" />+{vendor.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{category.category}</h4>
                      <p className="text-xs text-muted-foreground">₦{category.revenue.toLocaleString()}</p>
                    </div>
                    <Badge variant="outline">{category.percentage}%</Badge>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {regionalData.map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{region.region}</h4>
                  <Badge variant="outline">{region.percentage}%</Badge>
                </div>
                <div className="text-xs text-muted-foreground">{region.customers} customers</div>
                <div className="text-sm font-medium">₦{region.revenue.toLocaleString()}</div>
                <Progress value={region.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{platformMetrics.averageOrderValue.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +5.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.conversionRate}%</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +0.8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.customerRetention}%</div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingDown className="mr-1 h-4 w-4" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalOrders.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +14.3% from last month
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
