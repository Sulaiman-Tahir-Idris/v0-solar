import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStats } from "@/components/about/about-stats"
import { AboutMission } from "@/components/about/about-mission"
import { AboutTeam } from "@/components/about/about-team"
import { AboutValues } from "@/components/about/about-values"
import { AboutCta } from "@/components/about/about-cta"

export const metadata = {
  title: "About Us - EcoSolar Tech",
  description:
    "Learn about EcoSolar Tech's mission to provide sustainable solar energy solutions across Nigeria. Meet our team and discover our commitment to clean energy.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
            <div className="min-h-screen">
        <AboutHero />
        <AboutStats />
        <AboutMission />
        <AboutValues />
        {/* <AboutTeam /> */}
        <AboutCta />
            </div>
        <Footer />
    </div>
  )
}
