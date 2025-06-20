import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Sun, Leaf, Shield } from "lucide-react"

export function AboutMission() {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To make clean, reliable solar energy accessible to every Nigerian home and business, while building a
              sustainable future for generations to come.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                  <Sun className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Reliable Energy</h3>
              <p className="text-muted-foreground">
                Providing consistent, high-quality solar solutions that you can depend on, even during grid outages and
                power challenges.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Environmental Impact</h3>
              <p className="text-muted-foreground">
                Reducing carbon footprint and promoting sustainable living through clean energy adoption across Nigeria.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Using only premium components with comprehensive warranties and professional installation by certified
                technicians.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}
