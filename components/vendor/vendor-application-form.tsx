"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Building, Mail, CreditCard, FileText, Upload } from "lucide-react"

export function VendorApplicationForm() {
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    website: "",
    yearEstablished: "",

    // Contact Person
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    position: "",

    // Business Documents
    taxId: "",
    businessLicense: "",

    // Banking Information
    bankName: "",
    accountName: "",
    accountNumber: "",

    // Product Information
    productCategories: [] as string[],
    estimatedMonthlyVolume: "",

    // Additional Information
    businessDescription: "",
    whyJoin: "",

    // Agreements
    agreeToTerms: false,
    agreeToCommission: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const productCategories = [
    "Solar Panels",
    "Inverters",
    "Batteries",
    "Complete Systems",
    "Installation Services",
    "Maintenance Services",
    "Accessories",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.agreeToTerms || !formData.agreeToCommission) {
        toast.error("Please agree to all terms and conditions")
        return
      }

      // Mock API call - replace with actual submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you within 2-3 business days.",
      })

      router.push("/vendor/application-success")
    } catch (error) {
      toast.error("Failed to submit application", {
        description: "Please try again or contact support if the problem persists.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      productCategories: prev.productCategories.includes(category)
        ? prev.productCategories.filter((c) => c !== category)
        : [...prev.productCategories, category],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select value={formData.businessType} onValueChange={(value) => updateFormData("businessType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                  <SelectItem value="installer">Installer/Service Provider</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address *</Label>
            <Textarea
              id="businessAddress"
              value={formData.businessAddress}
              onChange={(e) => updateFormData("businessAddress", e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessPhone">Business Phone *</Label>
              <Input
                id="businessPhone"
                type="tel"
                value={formData.businessPhone}
                onChange={(e) => updateFormData("businessPhone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email *</Label>
              <Input
                id="businessEmail"
                type="email"
                value={formData.businessEmail}
                onChange={(e) => updateFormData("businessEmail", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData("website", e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearEstablished">Year Established *</Label>
            <Input
              id="yearEstablished"
              type="number"
              min="1900"
              max="2024"
              value={formData.yearEstablished}
              onChange={(e) => updateFormData("yearEstablished", e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Person */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Primary Contact Person
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Full Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position/Title *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => updateFormData("position", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone *</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Business Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID/TIN *</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => updateFormData("taxId", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessLicense">Business License Number</Label>
              <Input
                id="businessLicense"
                value={formData.businessLicense}
                onChange={(e) => updateFormData("businessLicense", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Document Uploads</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload business registration, tax certificate, and other relevant documents
              </p>
              <Button type="button" variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banking Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Banking Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => updateFormData("bankName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name *</Label>
              <Input
                id="accountName"
                value={formData.accountName}
                onChange={(e) => updateFormData("accountName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => updateFormData("accountNumber", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Information */}
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Product Categories *</Label>
            <div className="grid md:grid-cols-2 gap-2">
              {productCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={formData.productCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={category} className="cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedMonthlyVolume">Estimated Monthly Sales Volume *</Label>
            <Select
              value={formData.estimatedMonthlyVolume}
              onValueChange={(value) => updateFormData("estimatedMonthlyVolume", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select volume range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50k">₦0 - ₦50,000</SelectItem>
                <SelectItem value="50k-200k">₦50,000 - ₦200,000</SelectItem>
                <SelectItem value="200k-500k">₦200,000 - ₦500,000</SelectItem>
                <SelectItem value="500k-1m">₦500,000 - ₦1,000,000</SelectItem>
                <SelectItem value="1m+">₦1,000,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description *</Label>
            <Textarea
              id="businessDescription"
              value={formData.businessDescription}
              onChange={(e) => updateFormData("businessDescription", e.target.value)}
              placeholder="Tell us about your business, products, and services..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyJoin">Why do you want to join our marketplace? *</Label>
            <Textarea
              id="whyJoin"
              value={formData.whyJoin}
              onChange={(e) => updateFormData("whyJoin", e.target.value)}
              placeholder="Explain your motivation and how you plan to contribute..."
              rows={3}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => updateFormData("agreeToTerms", checked)}
            />
            <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
              I agree to the{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Vendor Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Privacy Policy
              </Button>
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToCommission"
              checked={formData.agreeToCommission}
              onCheckedChange={(checked) => updateFormData("agreeToCommission", checked)}
            />
            <Label htmlFor="agreeToCommission" className="text-sm leading-relaxed">
              I understand and agree to the commission structure (15% platform fee on all sales)
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button type="submit" size="lg" disabled={isLoading} className="min-w-48">
          {isLoading ? "Submitting Application..." : "Submit Application"}
        </Button>
      </div>
    </form>
  )
}
