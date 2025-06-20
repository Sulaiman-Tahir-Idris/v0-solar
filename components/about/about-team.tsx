import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const team = [
  {
    name: "Adebayo Ogundimu",
    role: "Founder & CEO",
    bio: "15+ years in renewable energy. Former Shell engineer with passion for sustainable solutions.",
    image: "/placeholder.svg?height=300&width=300",
    expertise: ["Business Strategy", "Renewable Energy", "Team Leadership"],
  },
  {
    name: "Fatima Al-Hassan",
    role: "Head of Engineering",
    bio: "Solar systems expert with 12+ years designing and installing commercial solar projects.",
    image: "/placeholder.svg?height=300&width=300",
    expertise: ["System Design", "Project Management", "Quality Control"],
  },
  {
    name: "Chinedu Okwu",
    role: "Head of Operations",
    bio: "Operations specialist ensuring seamless delivery and customer satisfaction nationwide.",
    image: "/placeholder.svg?height=300&width=300",
    expertise: ["Operations", "Logistics", "Customer Service"],
  },
  {
    name: "Aisha Bello",
    role: "Head of Sales",
    bio: "Sales leader helping customers find the perfect solar solutions for their needs.",
    image: "/placeholder.svg?height=300&width=300",
    expertise: ["Sales Strategy", "Customer Relations", "Market Analysis"],
  },
]

export function AboutTeam() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our experienced team of solar experts, engineers, and customer service professionals are dedicated to
            delivering exceptional solar solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
