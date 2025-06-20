import { Container } from "@/components/ui/container"
import { CheckCircle } from "lucide-react"

export function ServicesOverview() {
  const benefits = [
    "Professional installation by certified technicians",
    "Comprehensive system design and planning",
    "Quality equipment from trusted manufacturers",
    "Ongoing maintenance and monitoring",
    "Emergency repair services available",
    "5-year comprehensive warranty coverage",
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Solar Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We handle every aspect of your solar journey, from initial consultation to long-term maintenance, ensuring
            you get the most from your investment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our Services?</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Service Coverage</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Residential</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Home installations</li>
                  <li>• Rooftop systems</li>
                  <li>• Battery backup</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Commercial</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Office buildings</li>
                  <li>• Industrial facilities</li>
                  <li>• Large-scale systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
