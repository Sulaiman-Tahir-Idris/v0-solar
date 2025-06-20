"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Building, Landmark } from "lucide-react"
import type { PaymentDetails } from "./checkout-page"
import Image from "next/image"

interface PaymentFormProps {
  onSubmit: (data: PaymentDetails) => void
  onBack: () => void
  defaultValues: PaymentDetails
}

export function PaymentForm({ onSubmit, onBack, defaultValues }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentDetails>(defaultValues)
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentDetails, string>>>({})

  const updateFormData = (field: keyof PaymentDetails, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentDetails, string>> = {}

    if (formData.paymentMethod === "card") {
      // Card validation
      if (!formData.cardName) {
        newErrors.cardName = "Cardholder name is required"
      }

      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required"
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number"
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required"
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Please use MM/YY format"
      }

      if (!formData.cvv) {
        newErrors.cvv = "CVV is required"
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV"
      }
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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => updateFormData("paymentMethod", value as PaymentDetails["paymentMethod"])}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="payment-card" />
                <Label htmlFor="payment-card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  Credit / Debit Card
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank-transfer" id="payment-bank" />
                <Label htmlFor="payment-bank" className="flex items-center gap-2 cursor-pointer">
                  <Building className="h-4 w-4" />
                  Bank Transfer
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paystack" id="payment-paystack" />
                <Label htmlFor="payment-paystack" className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=16&width=16&text=P" alt="Paystack" width={16} height={16} />
                  </div>
                  Paystack
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flutterwave" id="payment-flutterwave" />
                <Label htmlFor="payment-flutterwave" className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=16&width=16&text=F" alt="Flutterwave" width={16} height={16} />
                  </div>
                  Flutterwave
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.paymentMethod === "card" && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">Card Details</h3>

              <div className="space-y-2">
                <Label htmlFor="cardName">
                  Cardholder Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cardName"
                  value={formData.cardName}
                  onChange={(e) => updateFormData("cardName", e.target.value)}
                  className={errors.cardName ? "border-destructive" : ""}
                  placeholder="As it appears on your card"
                />
                {errors.cardName && <p className="text-sm text-destructive">{errors.cardName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">
                  Card Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => updateFormData("cardNumber", formatCardNumber(e.target.value))}
                  className={errors.cardNumber ? "border-destructive" : ""}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">
                    Expiry Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => updateFormData("expiryDate", formatExpiryDate(e.target.value))}
                    className={errors.expiryDate ? "border-destructive" : ""}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">
                    CVV <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => updateFormData("cvv", e.target.value)}
                    className={errors.cvv ? "border-destructive" : ""}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="saveCard"
                  checked={formData.saveCard}
                  onCheckedChange={(checked) => updateFormData("saveCard", Boolean(checked))}
                />
                <Label htmlFor="saveCard" className="text-sm">
                  Save this card for future payments
                </Label>
              </div>
            </div>
          )}

          {formData.paymentMethod === "bank-transfer" && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2 bg-muted p-4 rounded-md">
                <Landmark className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Bank Transfer Instructions</p>
                  <p className="text-sm text-muted-foreground">
                    After placing your order, you will receive bank details to complete your payment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {(formData.paymentMethod === "paystack" || formData.paymentMethod === "flutterwave") && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2 bg-muted p-4 rounded-md">
                <Image
                  src={`/placeholder.svg?height=20&width=20&text=${formData.paymentMethod === "paystack" ? "P" : "F"}`}
                  alt={formData.paymentMethod === "paystack" ? "Paystack" : "Flutterwave"}
                  width={20}
                  height={20}
                />
                <div>
                  <p className="font-medium">
                    {formData.paymentMethod === "paystack" ? "Paystack" : "Flutterwave"} Payment
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to complete your payment after reviewing your order.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shipping
            </Button>
            <Button type="submit" size="lg" className="flex-1">
              Continue to Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
