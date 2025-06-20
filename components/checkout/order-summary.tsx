import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  cartItems: Array<{
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
}

export function OrderSummary({ cartItems, subtotal, discount, shipping, total }: OrderSummaryProps) {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 relative bg-muted rounded">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  sizes="64px"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">Variant: {item.variant}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₦{discount.toLocaleString()}</span>
            </div>
          )}

          {shipping > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₦{shipping.toLocaleString()}</span>
            </div>
          )}

          <Separator className="my-2" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-muted/50 flex flex-col items-start gap-2">
        <h3 className="font-medium">We Accept</h3>
        <div className="flex gap-2">
          <div className="bg-background rounded p-1 h-8 w-12 flex items-center justify-center">
            <Image src="/placeholder.svg?height=20&width=30&text=Visa" alt="Visa" width={30} height={20} />
          </div>
          <div className="bg-background rounded p-1 h-8 w-12 flex items-center justify-center">
            <Image src="/placeholder.svg?height=20&width=30&text=MasterCard" alt="MasterCard" width={30} height={20} />
          </div>
          <div className="bg-background rounded p-1 h-8 w-12 flex items-center justify-center">
            <Image src="/placeholder.svg?height=20&width=30&text=Paystack" alt="Paystack" width={30} height={20} />
          </div>
          <div className="bg-background rounded p-1 h-8 w-12 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=20&width=30&text=Flutterwave"
              alt="Flutterwave"
              width={30}
              height={20}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
