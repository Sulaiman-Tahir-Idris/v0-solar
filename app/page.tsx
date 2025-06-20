import { Hero } from "@/components/home/hero"
import { FeaturedProducts } from "@/components/home/featured-products"
import { ServicesCTA } from "@/components/home/services-cta"
import { Stats } from "@/components/home/stats"
import { Testimonials } from "@/components/home/testimonials"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedProducts />
        <ServicesCTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
