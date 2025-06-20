import { Container } from "@/components/ui/container"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactHero() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to start your solar journey? We're here to help you every step of the way.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center p-6 bg-background/50 rounded-lg border">
              <Phone className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">+234 (0) 123-456-7890</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-background/50 rounded-lg border">
              <Mail className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">info@solartechpro.ng</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-background/50 rounded-lg border">
              <MapPin className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
