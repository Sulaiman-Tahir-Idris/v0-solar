import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Interactive Map</h3>
            <p className="text-muted-foreground text-sm">
              Map integration would be implemented here
              <br />
              (Google Maps, Mapbox, etc.)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
