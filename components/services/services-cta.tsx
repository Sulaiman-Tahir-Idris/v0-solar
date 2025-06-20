import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export function ServicesCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
            Join thousands of satisfied customers who have made the switch to clean, renewable energy. Get your free
            consultation today and start saving on your electricity bills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Get Free Quote
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600"
              asChild
            >
              <Link href="tel:+2348123456789">
                <MessageCircle className="mr-2 h-4 w-4" />
                Call Now: +234 812 345 6789
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="opacity-90">+234 812 345 6789</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="opacity-90">info@solartechpro.ng</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="opacity-90">Available 24/7</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
