"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import type { ShippingDetails } from "./checkout-page"

interface ShippingFormProps {
  onSubmit: (data: ShippingDetails) => void
  defaultValues: ShippingDetails
}

// Nigerian states
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

export function ShippingForm({ onSubmit, defaultValues }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingDetails>(defaultValues)
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({})

  const updateFormData = (field: keyof ShippingDetails, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingDetails, string>> = {}

    // Required fields
    const requiredFields: Array<keyof ShippingDetails> = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.phone && !/^[0-9+\s()-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                  placeholder="+234"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">
                  Street Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                    <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">
                    Postal Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => updateFormData("postalCode", e.target.value)}
                    className={errors.postalCode ? "border-destructive" : ""}
                  />
                  {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={formData.country} disabled />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="saveAddress"
                  checked={formData.saveAddress}
                  onCheckedChange={(checked) => updateFormData("saveAddress", Boolean(checked))}
                />
                <Label htmlFor="saveAddress" className="text-sm">
                  Save this address for future orders
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full md:w-auto">
              Continue to Payment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
