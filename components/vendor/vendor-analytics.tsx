"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Package, ShoppingBag, Users, Star } from "lucide-react"
import { useState } from "react"

// Mock analytics data
const salesData = {
  daily: [
    { date: "2024-01-15", sales: 450000, orders: 3 },
    { date: "2024-01-14", sales: 1299000, orders: 1 },
    { date: "2024-01-13", sales: 2999000, orders: 1 },
    { date: "2024-01-12", sales: 267000, orders: 3 },
    { date: "2024-01-11", sales: 598000, orders: 2 },
    { date: "2024-01-10", sales: 890000, orders: 4 },
    { date: "2024-01-09", sales: 1200000, orders: 2 },
  ],
  monthly: [
    { month: "Jan 2024", sales: 12450000, orders: 89 },
    { month: "Dec 2023", sales: 10200000, orders: 76 },
    { month: "Nov 2023", sales: 8900000, orders: 65 },
    { month: "Oct 2023", sales: 11300000, orders: 82 },
  ],
}

const topProducts = [
  {
    name: "SolarMax Pro 400W Panel",
    sales: 45,
    revenue: 13455000,
    percentage: 35,
  },
  {
    name: "PowerInvert 5000W Hybrid",
    sales: 23,
    revenue: 29877000,
    percentage: 25,
  },
  {
    name: "EnergyStore 10kWh Battery",
    sales: 12,
    revenue: 35988000,
    percentage: 20,
  },
  {
    name: "Solar Charge Controller 60A",
    sales: 8,
    revenue: 712000,
    percentage: 10,
  },
  {
    name: "Complete Home Solar Kit",
    sales: 6,
    revenue: 29994000,
    percentage: 10,
  },
]

const customerInsights = [
  { location: "Lagos", customers: 45, percentage: 40 },
  { location: "Abuja", customers: 28, percentage: 25 },
  { location: "Port Harcourt", customers: 18, percentage: 16 },
  { location: "Kano", customers: 12, percentage: 11 },
  { location: "Others", customers: 9, percentage: 8 },
]

export function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState("monthly")

  const currentData = salesData[timeRange as keyof typeof salesData]
  const totalSales = currentData.reduce((sum, item) => sum + item.sales, 0)
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0)
  const averageOrderValue = totalSales / totalOrders

  // Calculate trends (mock calculation)
  const salesTrend = 12.5 // +12.5%
  const ordersTrend = 8.3 // +8.3%
  const customersTrend = 15.2 // +15.2%

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Last 7 Days</SelectItem>
            <SelectItem value="monthly">Last 4 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalSales.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />+{salesTrend}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />+{ordersTrend}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{Math.round(averageOrderValue).toLocaleString()}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />+{customersTrend}% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} sales • ₦{product.revenue.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline">{product.percentage}%</Badge>
                  </div>
                  <Progress value={product.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerInsights.map((insight, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{insight.location}</h4>
                      <p className="text-xs text-muted-foreground">{insight.customers} customers</p>
                    </div>
                    <Badge variant="outline">{insight.percentage}%</Badge>
                  </div>
                  <Progress value={insight.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Sales Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sales Chart</h3>
              <p className="text-muted-foreground">Interactive sales chart would be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">3.2%</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +0.5% from last month
            </div>
            <p className="text-sm text-muted-foreground mt-2">Visitors who made a purchase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-3xl font-bold">4.8</div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +0.2 from last month
            </div>
            <p className="text-sm text-muted-foreground mt-2">Based on 156 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">1.2%</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingDown className="mr-1 h-4 w-4" />
              -0.3% from last month
            </div>
            <p className="text-sm text-muted-foreground mt-2">Products returned by customers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
