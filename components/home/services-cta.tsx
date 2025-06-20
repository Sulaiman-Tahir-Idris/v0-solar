import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const services = [
  {
    icon: Zap,
    title: "Installation",
    description:
      "Professional solar panel installation by certified technicians",
    features: ["Free consultation", "25-year warranty", "Same-day service"],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Keep your solar system running at peak performance",
    features: [
      "Annual inspections",
      "Cleaning service",
      "Performance monitoring",
    ],
  },
  {
    icon: Shield,
    title: "Repair",
    description: "Quick and reliable repair services for all solar equipment",
    features: ["24/7 emergency", "Genuine parts", "Expert diagnosis"],
  },
  {
    icon: Clock,
    title: "Monitoring",
    description: "Real-time system monitoring and performance optimization",
    features: ["Mobile app", "Alerts & reports", "Remote diagnostics"],
  },
];

export function ServicesCTA() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Professional Solar Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From installation to maintenance, our certified technicians ensure
            your solar system performs optimally
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center justify-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Solar Service?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our expert technicians are ready to help with installation,
            maintenance, or repairs. Get a free consultation and quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/services">Request Service</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
