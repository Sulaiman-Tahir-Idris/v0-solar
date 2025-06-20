"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth/auth-provider"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  Store,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"

interface VendorSidebarLayoutProps {
  children: React.ReactNode
}

export function VendorSidebarLayout({ children }: VendorSidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [productCount, setProductCount] = useState<number>(0)
  const [orderCount, setOrderCount] = useState<number>(0) // Default to 0 instead of 12
  const { user, logout, getAllProducts } = useAuth()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Fetch product count
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await getAllProducts()
        const productsData = response.data || response.products || response || []
        setProductCount(Array.isArray(productsData) ? productsData.length : 0)
      } catch (error) {
        console.error("Error fetching product count:", error)
        setProductCount(0)
      }
    }

    if (user?.role === "vendor") {
      fetchProductCount()
    }
  }, [user, getAllProducts])

  const navigationItems = [
    {
      name: "Overview",
      href: "/vendor/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/vendor/products",
      icon: Package,
      badge: productCount > 0 ? productCount.toString() : undefined,
    },
    {
      name: "Orders",
      href: "/vendor/orders",
      icon: ShoppingBag,
      badge: orderCount > 0 ? orderCount.toString() : undefined,
    },
    {
      name: "Analytics",
      href: "/vendor/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/vendor/settings",
      icon: Settings,
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Store className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-lg truncate">SolarHub</h2>
            <p className="text-xs text-muted-foreground">Vendor Portal</p>
          </div>
        </div>
      </div>

      {/* Vendor Status - Always show as Verified */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.vendorInfo?.businessName || "Your Business"}</p>
            <p className="text-xs text-muted-foreground">Vendor Account</p>
          </div>
          <Badge className="bg-green-100 text-green-800 text-xs flex-shrink-0">Verified</Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{item.name}</span>
              {item.badge && (
                <Badge variant={isActive ? "secondary" : "outline"} className="text-xs flex-shrink-0">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Vendor"} />
            <AvatarFallback className="text-sm">{getInitials(user?.name || "Vendor")}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:bg-card lg:border-r">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-card border-r">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products, orders..." className="pl-10" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content with responsive padding */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
