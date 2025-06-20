import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/20">
      <Container className="py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Power Your Future with{" "}
                <span className="text-primary">Solar Energy</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Professional solar installation, maintenance, and premium solar
                products. Join thousands of satisfied customers who've made the
                switch to clean energy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Solar Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">
                  <Play className="mr-2 h-4 w-4" />
                  Request Service
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">
                  Installations
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Solar panel installation"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/30 rounded-full blur-xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
