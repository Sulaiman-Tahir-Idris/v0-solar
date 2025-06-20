"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { LoadingButton } from "@/components/ui/loading-button"
import { useAuth } from "@/lib/auth/auth-provider"
import { User, Upload, Trash2, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export function ProfilePage() {
  const { user, updateProfile, fetchProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  })

  // Load profile data on component mount
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
      })
    }
  }, [user])

  const handleRefreshProfile = async () => {
    setIsFetching(true)
    try {
      await fetchProfile()
      toast.success("Profile refreshed successfully!")
    } catch (error) {
      toast.error("Failed to refresh profile")
    } finally {
      setIsFetching(false)
    }
  }

  const handleProfileUpdate = async () => {
    setIsLoading(true)
    try {
      // Only send updatable fields
      const updateData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
      }
      await updateProfile(updateData)
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
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

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your personal information</p>
        </div>
        <Button variant="outline" onClick={handleRefreshProfile} disabled={isFetching} className="w-full sm:w-auto">
          <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh Profile
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={`${user?.firstName || profileData.firstName} ${user?.lastName || profileData.lastName}`.trim() || "User"} />
              <AvatarFallback className="text-xl sm:text-2xl">
                {getInitials(`${user?.firstName || profileData.firstName} ${user?.lastName || profileData.lastName}`.trim())}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled
                className="bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">Email address cannot be changed for security reasons.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                disabled
                className="bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                placeholder="Location is managed by the system"
              />
              <p className="text-xs text-muted-foreground">
                Location is automatically determined and cannot be changed.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/settings">Go to Account Settings</Link>
            </Button>
            <LoadingButton onClick={handleProfileUpdate} loading={isLoading} className="w-full sm:w-auto">
              Save Changes
            </LoadingButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
