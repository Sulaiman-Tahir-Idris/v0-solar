"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth/auth-provider"
import { User, ShoppingBag, Heart, Settings, CreditCard, MapPin, Bell, HelpCircle, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: User,
    description: "Account overview and quick stats",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
    description: "View and track your orders",
    badge: "3",
  },
  {
    name: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
    description: "Your saved products",
    badge: "12",
  },
  {
    name: "Addresses",
    href: "/dashboard/addresses",
    icon: MapPin,
    description: "Manage shipping addresses",
  },
  {
    name: "Payment Methods",
    href: "/dashboard/payment-methods",
    icon: CreditCard,
    description: "Saved cards and payment options",
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    description: "Manage your preferences",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Account and privacy settings",
  },
  {
    name: "Help & Support",
    href: "/dashboard/support",
    icon: HelpCircle,
    description: "Get help and contact support",
  },
]

export function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
              <AvatarFallback className="text-lg">{getInitials(user?.name || "User")}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {user?.role === "customer" ? "Customer" : user?.role}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/dashboard/settings">Edit Profile</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-0">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted",
                    isActive ? "bg-primary/10 text-primary border-r-2 border-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </Link>
              )
            })}
          </nav>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card>
        <CardContent className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Button variant="outline" size="sm" className="mb-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="ml-2">{isMobileMenuOpen ? "Close" : "Menu"}</span>
        </Button>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="mb-6">
            <SidebarContent />
          </div>
        )}
      </div>
    </>
  )
}
