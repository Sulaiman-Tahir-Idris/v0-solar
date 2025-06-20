import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Settings, Wrench, BarChart3, Battery, Headphones, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ServicesList() {
  const services = [
    {
      icon: Zap,
      title: "Solar Installation",
      description: "Complete solar panel installation for residential and commercial properties.",
      features: ["Site assessment", "System design", "Professional installation", "Grid connection"],
      price: "From ₦500,000",
      color: "text-yellow-600",
    },
    {
      icon: Settings,
      title: "System Maintenance",
      description: "Regular maintenance to ensure optimal performance and longevity.",
      features: ["Panel cleaning", "Performance monitoring", "Component inspection", "Preventive care"],
      price: "From ₦25,000/visit",
      color: "text-blue-600",
    },
    {
      icon: Wrench,
      title: "Repair Services",
      description: "Quick and reliable repair services for all solar system components.",
      features: ["Emergency repairs", "Component replacement", "System diagnostics", "24/7 availability"],
      price: "From ₦15,000",
      color: "text-red-600",
    },
    {
      icon: BarChart3,
      title: "Energy Auditing",
      description: "Comprehensive energy assessment to optimize your solar investment.",
      features: ["Energy consumption analysis", "Efficiency recommendations", "ROI calculations", "Custom reports"],
      price: "From ₦50,000",
      color: "text-green-600",
    },
    {
      icon: Battery,
      title: "Battery Solutions",
      description: "Energy storage solutions for backup power and grid independence.",
      features: ["Battery installation", "Backup systems", "Grid-tie solutions", "Monitoring setup"],
      price: "From ₦300,000",
      color: "text-purple-600",
    },
    {
      icon: Headphones,
      title: "Consultation",
      description: "Expert consultation to help you make informed solar decisions.",
      features: ["Free initial consultation", "Custom system design", "Financial planning", "Permit assistance"],
      price: "Free consultation",
      color: "text-orange-600",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive solar solutions tailored to meet your specific energy needs and budget requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">{service.price}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">
                      Get Quote <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
