import { Container } from "@/components/ui/container"
import { CheckCircle } from "lucide-react"

const values = [
  {
    title: "Customer First",
    description: "Every decision we make prioritizes our customers' needs and satisfaction.",
  },
  {
    title: "Quality Excellence",
    description: "We source only the highest quality solar components from trusted global manufacturers.",
  },
  {
    title: "Transparency",
    description: "Clear pricing, honest communication, and no hidden fees in all our dealings.",
  },
  {
    title: "Innovation",
    description: "Continuously adopting the latest solar technologies and installation techniques.",
  },
  {
    title: "Sustainability",
    description: "Committed to environmental responsibility and promoting clean energy adoption.",
  },
  {
    title: "Local Expertise",
    description: "Deep understanding of Nigeria's energy challenges and climate conditions.",
  },
]

export function AboutValues() {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do at EcoSolar Tech</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
