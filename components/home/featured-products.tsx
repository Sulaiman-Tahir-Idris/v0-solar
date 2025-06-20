import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const featuredProducts = [
  {
    id: 1,
    name: "SolarMax Pro 400W Panel",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    description:
      "High-efficiency monocrystalline solar panel with 25-year warranty",
  },
  {
    id: 2,
    name: "PowerInvert 5000W Hybrid",
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
    description:
      "Smart hybrid inverter with battery backup and grid-tie capability",
  },
  {
    id: 3,
    name: "EnergyStore 10kWh Battery",
    price: 2999,
    originalPrice: 3299,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Popular",
    description: "Lithium-ion battery system with smart energy management",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Solar Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our top-rated solar equipment trusted by thousands of
            customers worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {product.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="destructive" className="text-xs  bg-red-500">
                    Save ₦
                    {(product.originalPrice - product.price).toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
                <Button size="icon" variant="outline">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
