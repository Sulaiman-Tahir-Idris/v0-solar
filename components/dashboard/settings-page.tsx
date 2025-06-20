"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { LoadingButton } from "@/components/ui/loading-button"
import { Bell, Shield, Smartphone, Mail } from "lucide-react"
import { toast } from "sonner"

export function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailOrders: true,
    emailSecurity: true,
    pushMarketing: false,
    pushOrders: true,
    pushSecurity: true,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    dataCollection: true,
    analytics: true,
  })

  const handleNotificationUpdate = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLoading(false)
    toast.success("Notification preferences updated!")
  }

  const handlePrivacyUpdate = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLoading(false)
    toast.success("Privacy settings updated!")
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Account Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your notification preferences and privacy settings
        </p>
      </div>

      {/* Notification Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <p className="font-medium">Marketing emails</p>
                  <p className="text-sm text-muted-foreground">Receive emails about new products and promotions</p>
                </div>
                <Switch
                  checked={notifications.emailMarketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <p className="font-medium">Order updates</p>
                  <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                </div>
                <Switch
                  checked={notifications.emailOrders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailOrders: checked })}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <p className="font-medium">Security alerts</p>
                  <p className="text-sm text-muted-foreground">Important security notifications</p>
                </div>
                <Switch
                  checked={notifications.emailSecurity}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailSecurity: checked })}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Push Notifications */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Push Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <p className="font-medium">Marketing notifications</p>
                  <p className="text-sm text-muted-foreground">Push notifications about promotions</p>
                </div>
                <Switch
                  checked={notifications.pushMarketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushMarketing: checked })}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <p className="font-medium">Order updates</p>
                  <p className="text-sm text-muted-foreground">Push notifications for order changes</p>
                </div>
                <Switch
                  checked={notifications.pushOrders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushOrders: checked })}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <p className="font-medium">Security alerts</p>
                  <p className="text-sm text-muted-foreground">Critical security notifications</p>
                </div>
                <Switch
                  checked={notifications.pushSecurity}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushSecurity: checked })}
                />
              </div>
            </div>
          </div>

          <LoadingButton onClick={handleNotificationUpdate} loading={isLoading} className="w-full sm:w-auto">
            Save Preferences
          </LoadingButton>
        </CardContent>
      </Card>

      {/* Privacy Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <p className="font-medium">Profile visibility</p>
                <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
              </div>
              <Select
                value={privacy.profileVisibility}
                onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
              >
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <p className="font-medium">Show email address</p>
                <p className="text-sm text-muted-foreground">Display your email on your public profile</p>
              </div>
              <Switch
                checked={privacy.showEmail}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <p className="font-medium">Show phone number</p>
                <p className="text-sm text-muted-foreground">Display your phone number on your profile</p>
              </div>
              <Switch
                checked={privacy.showPhone}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <p className="font-medium">Data collection</p>
                <p className="text-sm text-muted-foreground">Allow us to collect data to improve your experience</p>
              </div>
              <Switch
                checked={privacy.dataCollection}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, dataCollection: checked })}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1">
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
              </div>
              <Switch
                checked={privacy.analytics}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
              />
            </div>
          </div>

          <LoadingButton onClick={handlePrivacyUpdate} loading={isLoading} className="w-full sm:w-auto">
            Save Settings
          </LoadingButton>
        </CardContent>
      </Card>
    </div>
  )
}
