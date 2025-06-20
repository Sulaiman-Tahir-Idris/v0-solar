"use client"

import { useState } from "react"
import { X, Mail, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-provider"
import { toast } from "sonner"

export function EmailVerificationBanner() {
  const { user, resendVerification } = useAuth()
  const [isDismissed, setIsDismissed] = useState(false)
  const [isResending, setIsResending] = useState(false)

  // Don't show banner if user is verified, not logged in, or dismissed
  if (!user || user.emailVerified || isDismissed) {
    return null
  }

  const handleResendVerification = async () => {
    setIsResending(true)
    try {
      await resendVerification()
      toast.success("Verification email sent! Please check your inbox.")
    } catch (error) {
      toast.error("Failed to send verification email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-amber-600" />
          <div className="flex-1">
            <p className="text-sm text-amber-800">
              <span className="font-medium">Please verify your email address</span>
              {" - "}
              We sent a verification link to <span className="font-medium">{user.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendVerification}
            disabled={isResending}
            className="bg-white border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            {isResending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Resend Email
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
