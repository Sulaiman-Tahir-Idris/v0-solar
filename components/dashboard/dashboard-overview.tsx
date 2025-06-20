"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Package, Heart, ArrowRight, Zap, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth/auth-provider"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Order {
  id: number
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: string
  paymentMethod: "card" | "transfer" | "cash"
  items: Array<{
    productId: number
    quantity: number
    price: number
  }>
  createdAt: string
  updatedAt: string
}

const quickActions = [
  {
    title: "Browse Products",
    description: "Explore our solar solutions",
    icon: ShoppingBag,
    href: "/products",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Book Installation",
    description: "Schedule professional setup",
    icon: Zap,
    href: "/services",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Get Support",
    description: "Contact our expert team",
    icon: Star,
    href: "/dashboard/support",
    color: "bg-purple-500 hover:bg-purple-600",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800"
    case "shipped":
      return "bg-blue-100 text-blue-800"
    case "processing":
      return "bg-yellow-100 text-yellow-800"
    case "pending":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Delivered"
    case "shipped":
      return "Shipped"
    case "processing":
      return "Processing"
    case "pending":
      return "Pending"
    default:
      return "Unknown"
  }
}

export function DashboardOverview() {
  const { user, getAllOrders } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [wishlistCount] = useState(12) // This would come from wishlist API when implemented

  const firstName = user?.firstName || user?.name?.split(" ")[0] || "User"

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoadingOrders(true)
        const fetchedOrders = await getAllOrders()
        const ordersArray = Array.isArray(fetchedOrders) ? fetchedOrders : []
        setOrders(ordersArray)
      } catch (error) {
        console.error("Failed to fetch orders for dashboard:", error)
        setOrders([])
      } finally {
        setIsLoadingOrders(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user, getAllOrders])

  // Calculate stats from real data
  const activeOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing" || order.status === "shipped",
  ).length

  const recentActivity = orders
    .slice(0, 2) // Get latest 2 orders
    .map((order) => ({
      id: `ORD-${order.id}`,
      type: "order",
      title:
        order.status === "delivered"
          ? "Order Delivered"
          : order.status === "shipped"
            ? "Order Shipped"
            : order.status === "processing"
              ? "Order Processing"
              : "Order Placed",
      description: `${order.items?.length || 0} item(s) - ₦${order.totalAmount.toLocaleString()}`,
      date: new Date(order.createdAt).toLocaleDateString(),
      status: order.status,
      image: "/placeholder.svg?height=40&width=40",
    }))

  // Quick stats with real data
  const quickStats = [
    {
      title: "Active Orders",
      value: isLoadingOrders ? "..." : activeOrders.toString(),
      description: "Orders in progress",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/dashboard/orders",
    },
    {
      title: "Wishlist Items",
      value: wishlistCount.toString(),
      description: "Saved products",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/dashboard/wishlist",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {firstName}! 👋</h1>
        <p className="text-muted-foreground text-lg">Here's what's happening with your solar journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <Link href={stat.href}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">
                        {isLoadingOrders && stat.title === "Active Orders" ? <LoadingSpinner size="sm" /> : stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                    <div className={`p-4 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
                  asChild
                >
                  <Link href={action.href}>
                    <div className={`p-3 rounded-full text-white ${action.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/orders">
              View All Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingOrders ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No recent activity</p>
              <Button className="mt-4" asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.description}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{activity.title}</p>
                    <Badge className={getStatusColor(activity.status)} variant="secondary">
                      {getStatusText(activity.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
