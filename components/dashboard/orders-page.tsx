"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, XCircle, Clock, Eye, X } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-provider"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { toast } from "sonner"

interface Order {
  id: number
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: string
  paymentMethod: "card" | "transfer" | "cash"
  createdAt: string
  updatedAt: string
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { getAllOrders, updateOrderStatus } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const fetchedOrders = await getAllOrders()
        const ordersArray = Array.isArray(fetchedOrders) ? fetchedOrders : []
        setOrders(ordersArray)
      } catch (err) {
        console.error("Failed to fetch orders:", err)
        setError(err instanceof Error ? err.message : "Failed to load orders")
        setOrders([])
        toast.error("Failed to load orders", {
          description: "Please try refreshing the page.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [getAllOrders])

  const handleCancelOrder = async (orderId: number) => {
    try {
      await updateOrderStatus(orderId, "cancelled")

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: "cancelled" as const } : order)),
      )

      toast.success("Order cancelled successfully")
      setIsModalOpen(false)
    } catch (error) {
      console.error("Failed to cancel order:", error)
      toast.error("Failed to cancel order", {
        description: "Please try again.",
      })
    }
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />
      case "processing":
        return <Package className="h-3 w-3" />
      case "shipped":
        return <Truck className="h-3 w-3" />
      case "delivered":
        return <CheckCircle className="h-3 w-3" />
      case "cancelled":
        return <XCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "default"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {!orders || orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button onClick={() => (window.location.href = "/products")}>Browse Products</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order History ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="py-3">Order</TableHead>
                    <TableHead className="py-3">Date</TableHead>
                    <TableHead className="py-3">Status</TableHead>
                    <TableHead className="py-3">Total</TableHead>
                    <TableHead className="py-3 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-b last:border-b-0">
                      <TableCell className="py-3 font-medium">ORD-{order.id}</TableCell>
                      <TableCell className="py-3 text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 font-medium">₦{order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === "pending" && (
                            <Button variant="destructive" size="sm" onClick={() => handleCancelOrder(order.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3 p-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">ORD-{order.id}</div>
                    <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{formatDate(order.createdAt)}</span>
                    <span className="font-medium">₦{order.totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {order.status === "pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-lg">
              Order ORD-{selectedOrder?.id}
              {selectedOrder && (
                <Badge variant={getStatusColor(selectedOrder.status)} className="flex items-center gap-1">
                  {getStatusIcon(selectedOrder.status)}
                  <span className="capitalize">{selectedOrder.status}</span>
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Order Information */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order ID</span>
                    <p className="font-medium">ORD-{selectedOrder.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date</span>
                    <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Payment</span>
                    <p className="font-medium capitalize">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total</span>
                    <p className="font-medium">₦{selectedOrder.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Delivery Address */}
              <div>
                <h4 className="font-medium mb-2">Delivery Address</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedOrder.shippingAddress}</p>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                {selectedOrder.status === "pending" && (
                  <Button variant="destructive" className="flex-1" onClick={() => handleCancelOrder(selectedOrder.id)}>
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
