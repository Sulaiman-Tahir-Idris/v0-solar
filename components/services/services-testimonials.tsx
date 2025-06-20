import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function ServicesTestimonials() {
  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Homeowner, Lagos",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "EcoSolar Tech transformed our home with their professional installation. Our electricity bills have dropped by 80% and the system works flawlessly.",
    },
    {
      name: "Sarah Okafor",
      role: "Business Owner, Abuja",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "The maintenance service is exceptional. They keep our commercial system running at peak performance with regular check-ups and quick repairs when needed.",
    },
    {
      name: "Michael Eze",
      role: "Engineer, Port Harcourt",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "From consultation to installation, the team was professional and knowledgeable. The energy audit helped us optimize our entire electrical system.",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</p>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
