import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your EcoSolar Tech account</p>
            </div>

            <LoginForm />

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up here
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
