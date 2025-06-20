"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  User,
  MapPin,
  Hash,
} from "lucide-react"
import { toast } from "sonner"

// Mock vendor orders data
const vendorOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+234 123 456 7890",
    },
    products: [
      {
        name: "SolarMax Pro 400W Panel",
        quantity: 2,
        price: 299000,
        sku: "SMP-400W-PRO",
      },
    ],
    total: 598000,
    status: "pending",
    paymentStatus: "paid",
    shippingAddress: "123 Main St, Lagos, Nigeria",
    orderDate: "2024-01-15T10:30:00Z",
    expectedDelivery: "2024-01-20",
    trackingNumber: "",
    notes: "",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+234 987 654 3210",
    },
    products: [
      {
        name: "PowerInvert 5000W Hybrid",
        quantity: 1,
        price: 1299000,
        sku: "PI-5000W-HYB",
      },
    ],
    total: 1299000,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "456 Oak Ave, Abuja, Nigeria",
    orderDate: "2024-01-14T14:20:00Z",
    expectedDelivery: "2024-01-19",
    trackingNumber: "TRK123456789",
    notes: "Customer requested expedited shipping",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+234 555 123 4567",
    },
    products: [
      {
        name: "EnergyStore 10kWh Battery",
        quantity: 1,
        price: 2999000,
        sku: "ES-10KWH-LI",
      },
    ],
    total: 2999000,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "789 Pine St, Port Harcourt, Nigeria",
    orderDate: "2024-01-13T09:15:00Z",
    expectedDelivery: "2024-01-18",
    trackingNumber: "TRK987654321",
    notes: "",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Lisa Brown",
      email: "lisa@example.com",
      phone: "+234 444 567 8901",
    },
    products: [
      {
        name: "Solar Charge Controller 60A",
        quantity: 3,
        price: 89000,
        sku: "SCC-60A-MPPT",
      },
    ],
    total: 267000,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: "321 Elm St, Kano, Nigeria",
    orderDate: "2024-01-10T16:45:00Z",
    expectedDelivery: "2024-01-15",
    trackingNumber: "TRK456789123",
    notes: "Installation service requested",
  },
]

export function VendorOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [orderNotes, setOrderNotes] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredOrders = vendorOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Package className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Truck className="h-3 w-3 mr-1" />
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`)
    // Update order status in real implementation
  }

  const handleAddTracking = (orderId: string) => {
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number")
      return
    }

    toast.success("Tracking number added successfully")
    setTrackingNumber("")
    // Update tracking number in real implementation
  }

  const handleAddNotes = (orderId: string) => {
    toast.success("Notes updated successfully")
    setOrderNotes("")
    // Update order notes in real implementation
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setTrackingNumber(order.trackingNumber || "")
    setOrderNotes(order.notes || "")
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Simplified Orders Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Order ID</TableHead>
                    <TableHead className="min-w-[200px]">Customer</TableHead>
                    <TableHead className="min-w-[120px]">Payment</TableHead>
                    <TableHead className="min-w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">₦{order.total.toLocaleString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                          <div className="flex items-center gap-1">{getStatusBadge(order.status)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getPaymentBadge(order.paymentStatus)}
                          <div className="text-sm text-muted-foreground">{formatDate(order.orderDate)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openOrderDetails(order)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                              className="text-xs px-2 py-1 h-8"
                            >
                              Process
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                              className="text-xs px-2 py-1 h-8"
                            >
                              Ship
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Orders will appear here when customers purchase your products"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details - {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - Order Info */}
              <div className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm">{selectedOrder.customer.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm">{selectedOrder.customer.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm">{selectedOrder.customer.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Order Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Order Date</Label>
                        <p className="text-sm">{formatDate(selectedOrder.orderDate)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Expected Delivery</Label>
                        <p className="text-sm">{selectedOrder.expectedDelivery}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Payment</Label>
                        <div className="mt-1">{getPaymentBadge(selectedOrder.paymentStatus)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedOrder.shippingAddress}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Products & Actions */}
              <div className="space-y-6">
                {/* Products */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Products</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedOrder.products.map((product: any, index: number) => (
                      <div key={index} className="flex justify-between items-start p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                          <div className="text-xs text-muted-foreground">Qty: {product.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">
                            ₦{(product.price * product.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 border-t font-semibold">
                      <span>Total</span>
                      <span>₦{selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Management */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Order Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Status Update */}
                    <div>
                      <Label className="text-sm font-medium">Update Status</Label>
                      <Select
                        defaultValue={selectedOrder.status}
                        onValueChange={(value) => handleUpdateOrderStatus(selectedOrder.id, value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tracking Number */}
                    <div>
                      <Label className="text-sm font-medium">Tracking Number</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          placeholder="Enter tracking number"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={() => handleAddTracking(selectedOrder.id)} size="sm">
                          Add
                        </Button>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <p className="text-xs text-muted-foreground mt-1">Current: {selectedOrder.trackingNumber}</p>
                      )}
                    </div>

                    {/* Order Notes */}
                    <div>
                      <Label className="text-sm font-medium">Order Notes</Label>
                      <Textarea
                        placeholder="Add notes about this order..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows={3}
                        className="mt-1"
                      />
                      <Button onClick={() => handleAddNotes(selectedOrder.id)} size="sm" className="mt-2">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Save Notes
                      </Button>
                      {selectedOrder.notes && (
                        <div className="mt-2 p-2 bg-muted rounded text-sm">{selectedOrder.notes}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
