import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Users, Zap, MapPin, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Happy Customers",
    description: "Homes and businesses powered",
  },
  {
    icon: Zap,
    value: "50MW+",
    label: "Energy Generated",
    description: "Clean power capacity installed",
  },
  {
    icon: MapPin,
    value: "36",
    label: "States Covered",
    description: "Nationwide service network",
  },
  {
    icon: Award,
    value: "6",
    label: "Years Experience",
    description: "Industry expertise and trust",
  },
]

export function AboutStats() {
  return (
    <section className="py-16 bg-muted/30">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
