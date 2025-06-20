import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export function ServicesPricing() {
  const packages = [
    {
      name: "Basic",
      description: "Perfect for small homes and apartments",
      price: "₦750,000",
      originalPrice: "₦850,000",
      features: [
        "2-3kW solar system",
        "Basic installation",
        "1-year warranty",
        "Email support",
        "Performance monitoring",
        "Grid-tie connection",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for medium-sized homes and small businesses",
      price: "₦1,500,000",
      originalPrice: "₦1,750,000",
      features: [
        "5-7kW solar system",
        "Premium installation",
        "3-year warranty",
        "Phone & email support",
        "Advanced monitoring",
        "Battery backup option",
        "Maintenance package",
        "Energy audit included",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Complete solution for large homes and businesses",
      price: "₦3,000,000",
      originalPrice: "₦3,500,000",
      features: [
        "10-15kW solar system",
        "Premium installation",
        "5-year warranty",
        "24/7 priority support",
        "Real-time monitoring",
        "Battery backup included",
        "Annual maintenance",
        "Energy audit & optimization",
        "Custom system design",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Service Packages</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect package for your energy needs. All packages include professional installation and ongoing
            support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative ${pkg.popular ? "ring-2 ring-green-600 scale-105" : ""} hover:shadow-lg transition-all duration-300`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 hover:bg-green-700">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription className="text-base">{pkg.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-green-600">{pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through">{pkg.originalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">One-time payment</p>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${pkg.popular ? "bg-green-600 hover:bg-green-700" : ""}`}
                  variant={pkg.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Need a custom solution? We offer tailored packages for unique requirements.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Request Custom Quote</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
