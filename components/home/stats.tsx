import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, Award, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Happy Customers",
    description: "Satisfied homeowners and businesses",
  },
  {
    icon: Zap,
    value: "50MW+",
    label: "Solar Installed",
    description: "Clean energy capacity deployed",
  },
  {
    icon: Award,
    value: "98%",
    label: "Satisfaction Rate",
    description: "Customer satisfaction score",
  },
  {
    icon: Leaf,
    value: "25,000T",
    label: "CO₂ Saved",
    description: "Carbon emissions prevented",
  },
];

export function Stats() {
  return (
    <section className="py-16 bg-primary/5">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="text-center border-0 shadow-none bg-transparent"
              >
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
