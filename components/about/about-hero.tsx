import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"

export function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            About EcoSolar Tech
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Powering Nigeria's <span className="text-primary">Solar Future</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Since 2018, we've been Nigeria's leading provider of premium solar energy solutions, helping thousands of
            homes and businesses transition to clean, reliable, and affordable energy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Founded in Lagos, 2018
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              5,000+ Happy Customers
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              All 36 States Covered
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
