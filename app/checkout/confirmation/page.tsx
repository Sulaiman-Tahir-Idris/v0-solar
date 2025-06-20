"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, ShoppingBag, Printer, Clock } from "lucide-react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface OrderDetails {
  orderNumber: string
  date: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
    variant: string
  }>
  subtotal: number
  discount: number
  shipping: number
  total: number
  shippingDetails: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentDetails: {
    paymentMethod: string
    cardNumber?: string
  }
}

export default function OrderConfirmation() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderNumber = searchParams.get("order")

  useEffect(() => {
    // In a real app, we would fetch order details from an API
    // For this demo, we'll use localStorage
    const savedOrder = localStorage.getItem("lastOrder")

    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder))
    } else {
      // If no order details found, redirect to home
      router.push("/")
    }
  }, [router])

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
            <h1 className="text-2xl font-bold mt-4">Loading order details...</h1>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Order Confirmation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
              <p className="text-muted-foreground">Your order has been received and is now being processed.</p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="font-semibold mb-2">Order Information</h2>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Order Number:</span> {orderDetails.orderNumber}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Order Date:</span>{" "}
                        {new Date(orderDetails.date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email:</span> {orderDetails.shippingDetails.email}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Total:</span> ₦{orderDetails.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-semibold mb-2">Estimated Delivery</h2>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-primary">
                        {estimatedDelivery.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-muted-foreground">
                        {orderDetails.shippingDetails.address}
                        <br />
                        {orderDetails.shippingDetails.city}, {orderDetails.shippingDetails.state}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded"></div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₦{orderDetails.subtotal.toLocaleString()}</span>
                  </div>
                  {orderDetails.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₦{orderDetails.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{orderDetails.shipping === 0 ? "Free" : `₦${orderDetails.shipping.toLocaleString()}`}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₦{orderDetails.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>
              <Button asChild>
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• You will receive an email confirmation shortly</li>
                <li>• We'll send you tracking information once your order ships</li>
                <li>• For questions about your order, contact us at support@solartechpro.ng</li>
              </ul>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
