"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, UserCheck, UserX, Store, Mail, Phone, Calendar } from "lucide-react"
import { toast } from "sonner"

// Mock vendor data
const vendors = [
  {
    id: 1,
    businessName: "Solar Solutions Ltd",
    contactName: "John Smith",
    email: "john@solarsolutions.com",
    phone: "+234 123 456 7890",
    status: "approved",
    verificationStatus: "verified",
    joinedDate: "2024-01-15",
    totalProducts: 45,
    totalSales: 2500000,
    commission: 15,
    estimatedVolume: "₦500k-1M",
    businessType: "Distributor",
  },
  {
    id: 2,
    businessName: "Green Energy Co",
    contactName: "Sarah Johnson",
    email: "sarah@greenenergy.com",
    phone: "+234 987 654 3210",
    status: "pending",
    verificationStatus: "pending",
    joinedDate: "2024-01-14",
    totalProducts: 0,
    totalSales: 0,
    commission: 15,
    estimatedVolume: "₦200k-500k",
    businessType: "Manufacturer",
  },
  {
    id: 3,
    businessName: "EcoTech Systems",
    contactName: "Mike Wilson",
    email: "mike@ecotech.com",
    phone: "+234 555 123 4567",
    status: "approved",
    verificationStatus: "verified",
    joinedDate: "2024-01-10",
    totalProducts: 28,
    totalSales: 1800000,
    commission: 15,
    estimatedVolume: "₦1M+",
    businessType: "Retailer",
  },
  {
    id: 4,
    businessName: "Power Systems Inc",
    contactName: "Lisa Brown",
    email: "lisa@powersystems.com",
    phone: "+234 444 567 8901",
    status: "rejected",
    verificationStatus: "rejected",
    joinedDate: "2024-01-12",
    totalProducts: 0,
    totalSales: 0,
    commission: 15,
    estimatedVolume: "₦50k-200k",
    businessType: "Installer",
  },
]

export function VendorManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVendor, setSelectedVendor] = useState<any>(null)

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleApproveVendor = (vendorId: number) => {
    toast.success("Vendor approved successfully")
    // Update vendor status in real implementation
  }

  const handleRejectVendor = (vendorId: number) => {
    toast.success("Vendor rejected")
    // Update vendor status in real implementation
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Vendor Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vendors Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vendor.businessName}</div>
                        <div className="text-sm text-muted-foreground">{vendor.businessType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vendor.contactName}</div>
                        <div className="text-sm text-muted-foreground">{vendor.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                    <TableCell>{vendor.totalProducts}</TableCell>
                    <TableCell>₦{vendor.totalSales.toLocaleString()}</TableCell>
                    <TableCell>{vendor.joinedDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedVendor(vendor)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Vendor Details</DialogTitle>
                            </DialogHeader>
                            {selectedVendor && (
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Business Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Store className="h-4 w-4" />
                                        {selectedVendor.businessName}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {selectedVendor.email}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {selectedVendor.phone}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Joined {selectedVendor.joinedDate}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Performance</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Total Products:</span>
                                        <span>{selectedVendor.totalProducts}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Total Sales:</span>
                                        <span>₦{selectedVendor.totalSales.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Commission Rate:</span>
                                        <span>{selectedVendor.commission}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Estimated Volume:</span>
                                        <span>{selectedVendor.estimatedVolume}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {selectedVendor.status === "pending" && (
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button onClick={() => handleApproveVendor(selectedVendor.id)} className="flex-1">
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Approve Vendor
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleRejectVendor(selectedVendor.id)}
                                      className="flex-1"
                                    >
                                      <UserX className="h-4 w-4 mr-2" />
                                      Reject Application
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {vendor.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => handleApproveVendor(vendor.id)}>
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRejectVendor(vendor.id)}>
                              <UserX className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
