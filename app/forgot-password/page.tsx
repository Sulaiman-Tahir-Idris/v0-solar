import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
              <p className="text-muted-foreground">Enter your email to receive a password reset link</p>
            </div>

            <ForgotPasswordForm />

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
