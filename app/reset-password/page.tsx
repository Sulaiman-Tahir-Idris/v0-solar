"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // Basic token validation
  const isValidToken = token && token.length > 20

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-muted-foreground">Create a new password for your account</p>
            </div>

            {!isValidToken ? (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Invalid or missing reset token</AlertTitle>
                  <AlertDescription>
                    The password reset link is invalid or has expired. Please request a new password reset link.
                  </AlertDescription>
                </Alert>
                <div className="text-center mt-4">
                  <Button asChild>
                    <Link href="/forgot-password">Request New Reset Link</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <ResetPasswordForm token={token} />
            )}

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
