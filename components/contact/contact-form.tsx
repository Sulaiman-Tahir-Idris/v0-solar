"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { LoadingButton } from "@/components/ui/loading-button"
import { Send } from "lucide-react"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    })

    setIsLoading(false)

    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a Message</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select name="subject" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="quote">Request Quote</SelectItem>
                <SelectItem value="installation">Installation Service</SelectItem>
                <SelectItem value="maintenance">Maintenance & Repair</SelectItem>
                <SelectItem value="warranty">Warranty Claim</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your solar energy needs..."
              className="min-h-[120px]"
              required
            />
          </div>

          <LoadingButton type="submit" className="w-full" loading={isLoading} loadingText="Sending...">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  )
}
