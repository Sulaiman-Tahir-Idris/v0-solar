import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight, Shield, Users, Wrench } from "lucide-react"
import Link from "next/link"

export function ServicesHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Solar
              <span className="text-green-600 block">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              From initial consultation to ongoing maintenance, we provide comprehensive solar solutions tailored to
              your energy needs. Our certified technicians ensure optimal performance and longevity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="#services">
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Free Quote</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">5-Year Warranty</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Certified Experts</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Wrench className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">24/7 Support</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Solar installation team"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">1000+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Installations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
