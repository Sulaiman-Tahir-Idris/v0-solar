import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesOverview } from "@/components/services/services-overview"
import { ServicesList } from "@/components/services/services-list"
import { ServicesProcess } from "@/components/services/services-process"
import { ServicesPricing } from "@/components/services/services-pricing"
import { ServicesTestimonials } from "@/components/services/services-testimonials"
import { ServicesCTA } from "@/components/services/services-cta"

export const metadata: Metadata = {
  title: "Solar Services | Installation, Maintenance & Repair | EcoSolar Tech",
  description:
    "Professional solar installation, maintenance, and repair services. Expert technicians, quality guarantee, and comprehensive support across Nigeria.",
  keywords: "solar installation, solar maintenance, solar repair, solar services Nigeria",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ServicesHero />
      <ServicesOverview />
      <ServicesList />
      <ServicesProcess />
      <ServicesPricing />
      <ServicesTestimonials />
      <ServicesCTA />
    </div>
  )
}
