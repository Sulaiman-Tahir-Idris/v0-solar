"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth/auth-provider"
import { Building, CreditCard, Bell, Shield, CheckCircle, DollarSign, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export function VendorSettings() {
  const { user, changePassword, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Business Information State
  const [businessInfo, setBusinessInfo] = useState({
    businessName: user?.vendorInfo?.businessName || "SolarTech Solutions",
    businessAddress: user?.vendorInfo?.businessAddress || "123 Solar Street, Lagos, Nigeria",
    businessPhone: user?.vendorInfo?.businessPhone || "+234 801 234 5678",
    businessEmail: user?.vendorInfo?.businessEmail || "business@solartech.com",
    taxId: user?.vendorInfo?.taxId || "TIN123456789",
    description: "Leading supplier of high-quality solar energy solutions in Nigeria.",
  })

  // Banking Information State
  const [bankingInfo, setBankingInfo] = useState({
    accountName: user?.vendorInfo?.bankDetails?.accountName || "SolarTech Solutions Ltd",
    accountNumber: user?.vendorInfo?.bankDetails?.accountNumber || "1234567890",
    bankName: user?.vendorInfo?.bankDetails?.bankName || "First Bank of Nigeria",
    routingNumber: "044150149",
  })

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    paymentNotifications: true,
    inventoryAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
  })

  const handleChangePassword = async () => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long")
      return
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      toast.error("New password must be different from current password")
      return
    }

    setIsLoading(true)
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword)
      toast.success("Password changed successfully")

      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      toast.error(error.message || "Failed to change password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveBusinessInfo = async () => {
    setIsLoading(true)
    try {
      // Update profile with vendor-specific information
      const profileUpdate = {
        vendorInfo: {
          ...user?.vendorInfo,
          businessName: businessInfo.businessName,
          businessAddress: businessInfo.businessAddress,
          businessPhone: businessInfo.businessPhone,
          businessEmail: businessInfo.businessEmail,
          taxId: businessInfo.taxId,
          description: businessInfo.description,
        },
      }

      await updateProfile(profileUpdate)
      toast.success("Business information updated successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to update business information")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveBankingInfo = async () => {
    setIsLoading(true)
    try {
      // Update profile with banking information
      const profileUpdate = {
        vendorInfo: {
          ...user?.vendorInfo,
          bankDetails: {
            accountName: bankingInfo.accountName,
            accountNumber: bankingInfo.accountNumber,
            bankName: bankingInfo.bankName,
            routingNumber: bankingInfo.routingNumber,
          },
        },
      }

      await updateProfile(profileUpdate)
      toast.success("Banking information updated successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to update banking information")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    try {
      // Update profile with notification preferences
      const profileUpdate = {
        vendorInfo: {
          ...user?.vendorInfo,
          notificationPreferences: notifications,
        },
      }

      await updateProfile(profileUpdate)
      toast.success("Notification preferences updated successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to update notification preferences")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Vendor Settings</h2>
          <p className="text-muted-foreground mt-1">Manage your vendor account and preferences</p>
        </div>
        <Badge className="bg-green-100 text-green-800 w-fit">
          <CheckCircle className="h-4 w-4 mr-2" />
          Verified Vendor
        </Badge>
      </div>

      <div className="grid gap-8">
        {/* Business Information */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={businessInfo.businessName}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessName: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessEmail" className="text-sm font-medium">
                  Business Email
                </Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={businessInfo.businessEmail}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessEmail: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessPhone" className="text-sm font-medium">
                  Business Phone
                </Label>
                <Input
                  id="businessPhone"
                  value={businessInfo.businessPhone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessPhone: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId" className="text-sm font-medium">
                  Tax ID
                </Label>
                <Input
                  id="taxId"
                  value={businessInfo.taxId}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, taxId: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress" className="text-sm font-medium">
                Business Address
              </Label>
              <Textarea
                id="businessAddress"
                value={businessInfo.businessAddress}
                onChange={(e) => setBusinessInfo({ ...businessInfo, businessAddress: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Business Description
              </Label>
              <Textarea
                id="description"
                value={businessInfo.description}
                onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                rows={4}
                placeholder="Describe your business and what you offer..."
                className="resize-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveBusinessInfo} disabled={isLoading} className="px-8">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Banking Information */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              Banking Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountName" className="text-sm font-medium">
                  Account Name
                </Label>
                <Input
                  id="accountName"
                  value={bankingInfo.accountName}
                  onChange={(e) => setBankingInfo({ ...bankingInfo, accountName: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-sm font-medium">
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  value={bankingInfo.accountNumber}
                  onChange={(e) => setBankingInfo({ ...bankingInfo, accountNumber: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm font-medium">
                  Bank Name
                </Label>
                <Input
                  id="bankName"
                  value={bankingInfo.bankName}
                  onChange={(e) => setBankingInfo({ ...bankingInfo, bankName: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routingNumber" className="text-sm font-medium">
                  Routing Number
                </Label>
                <Input
                  id="routingNumber"
                  value={bankingInfo.routingNumber}
                  onChange={(e) => setBankingInfo({ ...bankingInfo, routingNumber: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>

            {/* Commission Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Commission & Payout Information
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="text-sm text-blue-700 mb-1">Commission Rate</div>
                  <div className="font-bold text-lg text-blue-900">15%</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="text-sm text-blue-700 mb-1">Payout Schedule</div>
                  <div className="font-bold text-lg text-blue-900">Weekly</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="text-sm text-blue-700 mb-1">Minimum Payout</div>
                  <div className="font-bold text-lg text-blue-900">₦10,000</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="text-sm text-blue-700 mb-1">Next Payout</div>
                  <div className="font-bold text-lg text-blue-900">Jan 22, 2024</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveBankingInfo} disabled={isLoading} className="px-8">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bell className="h-5 w-5 text-orange-600" />
              </div>
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">Order Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified when you receive new orders</p>
                </div>
                <Switch
                  checked={notifications.orderNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, orderNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">Payment Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified about payment updates and payouts</p>
                </div>
                <Switch
                  checked={notifications.paymentNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, paymentNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">Inventory Alerts</h4>
                  <p className="text-sm text-muted-foreground">Get alerted when products are running low</p>
                </div>
                <Switch
                  checked={notifications.inventoryAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, inventoryAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">Marketing Emails</h4>
                  <p className="text-sm text-muted-foreground">Receive marketing tips and platform updates</p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">Weekly Reports</h4>
                  <p className="text-sm text-muted-foreground">Receive weekly sales and performance reports</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveNotifications} disabled={isLoading} className="px-8">
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Change Password */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Change Password</h4>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm font-medium">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      className="h-11 pr-10"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter your current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility("current")}
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        className="h-11 pr-10"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        className="h-11 pr-10"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button onClick={handleChangePassword} disabled={isLoading} className="px-8">
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" className="px-6">
                  Enable 2FA
                </Button>
              </div>
            </div>

            {/* Account Verification Status */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Account Verification Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Email Verification</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Phone Verification</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Business Verification</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
