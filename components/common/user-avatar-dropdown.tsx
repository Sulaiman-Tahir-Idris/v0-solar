"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth/auth-provider"
import { User, Settings, LogOut, Shield, Store, ShoppingBag, Heart, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserAvatarDropdown() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      // Force redirect even if logout API fails
      router.push("/")
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) {
      return user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U"
    }
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getRoleIcon = () => {
    switch (user.role) {
      case "admin":
        return <Shield className="mr-2 h-4 w-4" />
      case "vendor":
        return <Store className="mr-2 h-4 w-4" />
      default:
        return <User className="mr-2 h-4 w-4" />
    }
  }

  const getRoleLabel = () => {
    switch (user.role) {
      case "admin":
        return "Admin"
      case "vendor":
        return "Vendor"
      case "customer":
        return "Customer"
      default:
        return "User"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={`${user.firstName || ""} ${user.lastName || ""}`}
            />
            <AvatarFallback>{getInitials(user.firstName || "", user.lastName || "")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName || ""} {user.lastName || ""}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              {getRoleIcon()}
              {getRoleLabel()}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <User className="mr-2 h-4 w-4" />
          <span>My Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/orders")}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/wishlist")}>
          <Heart className="mr-2 h-4 w-4" />
          <span>Wishlist</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/payment-methods")}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Payment Methods</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
