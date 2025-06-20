"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth/auth-provider"
import { CheckCircle, Mail, AlertCircle, RefreshCw, Clock } from "lucide-react"
import { Container } from "@/components/ui/container"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("loading")
  const [message, setMessage] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(30)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)
  const { user, checkEmailVerification } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1) // ✅ CHANGED: safer state update
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  // Auto-polling for verification status
  const startPolling = useCallback(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }

    const interval = setInterval(async () => {
      if (user && !user.emailVerified) {
        try {
          const isVerified = await checkEmailVerification()
          if (isVerified) {
            const updatedUser = { ...user, emailVerified: true }
            localStorage.setItem("user", JSON.stringify(updatedUser))

            setStatus("success")
            setMessage("Email verified successfully! Redirecting to your dashboard...")

            clearInterval(interval)
            setPollingInterval(null)

            setTimeout(() => {
              switch (updatedUser.role) {
                case "admin":
                  router.push("/admin")
                  break
                case "vendor":
                  router.push("/vendor/dashboard")
                  break
                case "customer":
                default:
                  router.push("/dashboard")
                  break
              }
            }, 2000)
          }
        } catch (error) {
          console.error("Error checking verification status:", error)
        }
      }
    }, 15000)

    setPollingInterval(interval)
  }, [user, checkEmailVerification, router, pollingInterval]) // ✅ CHANGED: include pollingInterval to avoid stale closure

  // ✅ NEW: Stop polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [pollingInterval])

  useEffect(() => {
    const verifyEmail = async () => {
      // ✅ NEW: Redirect verified user accessing /verify-email without token
      if (user && user.emailVerified && !token) {
        switch (user.role) {
          case "admin":
            router.push("/admin")
            break
          case "vendor":
            router.push("/vendor/dashboard")
            break
          case "customer":
          default:
            router.push("/dashboard")
            break
        }
        return
      }

      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://eco-solar-backend.onrender.com"}/auth/verify-email?token=${token}`,
          )
          const data = await response.json()

          if (response.ok) {
            setStatus("success")
            setMessage("Email verified successfully! Redirecting to your dashboard...")

            if (user) {
              const updatedUser = { ...user, emailVerified: true }
              localStorage.setItem("user", JSON.stringify(updatedUser))

              setTimeout(() => {
                switch (user.role) {
                  case "admin":
                    router.push("/admin")
                    break
                  case "vendor":
                    router.push("/vendor/dashboard")
                    break
                  case "customer":
                  default:
                    router.push("/dashboard")
                    break
                }
              }, 2000)
            } else {
              setTimeout(() => router.push("/login"), 2000)
            }
          } else {
            setStatus("error")
            setMessage(data.message || "Verification failed")
          }
        } catch (error) {
          setStatus("error")
          setMessage("Network error occurred")
        }
      } else if (user && !user.emailVerified) {
        setStatus("pending")
        setMessage("Please check your email for the verification link")
        startPolling() // ✅ NEW: Start polling if not already
      } else {
        setStatus("pending")
        setMessage("Please log in first or use the verification link from your email")
      }
    }

    verifyEmail()
  }, [token, user, router, startPolling])

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return

    setIsResending(true)
    try {
      console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://eco-solar-backend.onrender.com"}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      )

      if (response.ok) {
        setMessage("Verification email sent! Please check your inbox.")
        setResendCooldown(90)
      } else {
        const error = await response.json()
        setMessage(error.message || "Failed to resend verification email")
      }
    } catch (error) {
      setMessage("Network error occurred while sending email")
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center">
            <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
            <p className="text-muted-foreground">Please wait while we verify your email address.</p>
          </div>
        )

      case "success":
        return (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold mb-2 text-green-700">Email Verified Successfully!</h2>
            <p className="text-muted-foreground mb-4">{message}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Redirecting to your dashboard...</span>
            </div>
          </div>
        )

      case "error":
        return (
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-semibold mb-2 text-destructive">Verification Failed</h2>
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button onClick={() => router.push("/login")} variant="outline" className="w-full">
                Back to Login
              </Button>
              {user && (
                <Button
                  onClick={handleResendVerification}
                  disabled={isResending || resendCooldown > 0}
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Resend in {formatTime(resendCooldown)}
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </Button>
              )}
            </div>
          </div>
        )

      case "pending":
        return (
          <div className="text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
            <p className="text-muted-foreground mb-4">{message}</p>
            {user && (
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a verification link to <strong>{user.email}</strong>
              </p>
            )}

            {user && !user.emailVerified && (
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-4">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Automatically checking for verification...</span>
              </div>
            )}

            <div className="space-y-2">
              {user && (
                <Button
                  onClick={handleResendVerification}
                  disabled={isResending || resendCooldown > 0}
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Resend in {formatTime(resendCooldown)}
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </Button>
              )}
              <Button onClick={() => router.push("/login")} variant="outline" className="w-full">
                Back to Login
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Container className="py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">Verify your email address to continue</CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Container>
  )
}
