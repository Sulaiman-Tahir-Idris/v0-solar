"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingButton } from "@/components/ui/loading-button"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-provider"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const user = await login(email, password)

      // Role-based redirect logic
      let redirectUrl = "/dashboard" // default fallback

      if (callbackUrl && callbackUrl !== "/dashboard") {
        // If there's a specific callback URL, use it
        redirectUrl = decodeURIComponent(callbackUrl)
      } else {
        // Determine redirect based on user role
        switch (user.role) {
          case "admin":
            redirectUrl = "/admin"
            break
          case "vendor":
            redirectUrl = "/vendor/dashboard"
            break
          case "customer":
          default:
            redirectUrl = "/dashboard"
            break
        }
      }

      router.push(redirectUrl)
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
            Remember me
          </Label>
        </div>
        <LoadingButton type="submit" className="w-full" loading={isLoading}>
          Sign In
        </LoadingButton>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <SocialLoginButtons />
    </div>
  )
}
