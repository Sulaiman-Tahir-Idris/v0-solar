import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "EcoSolar Tech transformed our home with a seamless installation. Our energy bills dropped by 80% and the system has been flawless for 2 years.",
  },
  {
    name: "Mike Chen",
    role: "Business Owner",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "Outstanding service from consultation to installation. The team was professional, punctual, and the system exceeded our energy production expectations.",
  },
  {
    name: "Emily Rodriguez",
    role: "Homeowner",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "The maintenance service is exceptional. They caught a potential issue early and fixed it quickly. Great peace of mind knowing our investment is protected.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made the switch to
            clean, renewable energy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <blockquote className="text-muted-foreground mb-6">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
