import { RegisterForm } from "@/components/auth/register-form"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <Container>
          <div className="max-w-md mx-auto">
            {/* <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">Join EcoSolar Tech and start your solar journey</p>
            </div> */}

            <RegisterForm />

            {/* <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div> */}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
