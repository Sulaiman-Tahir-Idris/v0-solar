import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-muted-foreground">+234 (0) 123-456-7890</p>
              <p className="text-sm text-muted-foreground">Mon-Fri 8AM-6PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-muted-foreground">info@solartechpro.ng</p>
              <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-muted-foreground">
                123 Solar Street
                <br />
                Victoria Island, Lagos
                <br />
                Nigeria
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Business Hours</h4>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Ways to Reach Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">WhatsApp</p>
              <p className="text-sm text-muted-foreground">+234 (0) 123-456-7890</p>
            </div>
            <Badge variant="secondary">24/7</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Headphones className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Emergency Support</p>
              <p className="text-sm text-muted-foreground">For urgent technical issues</p>
            </div>
            <Badge variant="secondary">24/7</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">We provide solar installation and maintenance services across:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>• Lagos State</div>
            <div>• Ogun State</div>
            <div>• Oyo State</div>
            <div>• Osun State</div>
            <div>• Ondo State</div>
            <div>• Ekiti State</div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Don't see your area? Contact us to discuss coverage options.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
