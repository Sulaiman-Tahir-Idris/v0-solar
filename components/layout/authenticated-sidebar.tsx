"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/lib/auth/auth-provider"
import { LayoutDashboard, ShoppingBag, Heart, User, Settings, Lock, LogOut, X, ShoppingBasket } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBasket,
  },
  {
    title: "My Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    title: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
  },
  {
    title: "Account Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Change Password",
    href: "/dashboard/change-password",
    icon: Lock,
  },
]

interface AuthenticatedSidebarProps {
  onClose?: () => void
}

export function AuthenticatedSidebar({ onClose }: AuthenticatedSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [loadingRoute, setLoadingRoute] = useState<string | null>(null)

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/")
    }
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleNavigation = (href: string) => {
    setLoadingRoute(href)
    // Close mobile sidebar
    if (onClose) onClose()
    // The loading state will be cleared when the new page loads
    setTimeout(() => setLoadingRoute(null), 1000)
  }

  // Check if we're on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024

  return (
    <div className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col w-64 lg:w-64">
      {/* Mobile Close Button - Only visible on mobile */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="flex-shrink-0 p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "User"} />
            <AvatarFallback>{getInitials(`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "User")}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Items - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isLoading = loadingRoute === item.href

            return (
              <Link key={item.href} href={item.href} onClick={() => handleNavigation(item.href)}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn("w-full justify-start gap-3 h-11", isActive && "bg-primary text-primary-foreground")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <Icon className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="truncate">{item.title}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout Button - Fixed at Bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 h-11"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )
}
