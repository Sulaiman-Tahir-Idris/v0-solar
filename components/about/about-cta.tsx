import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Phone, Mail } from "lucide-react"
import Link from "next/link"

export function AboutCta() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Container>
        <Card className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made the switch to clean, reliable solar energy. Let's
            discuss your solar needs today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+234 (0) 123-456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@solartechpro.ng</span>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}
