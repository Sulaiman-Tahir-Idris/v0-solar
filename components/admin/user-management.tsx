"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, UserCheck, UserX, Users, Mail, Calendar, Shield } from "lucide-react"
import { toast } from "sonner"

// Mock user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    status: "active",
    joinedDate: "2024-01-15",
    lastLogin: "2024-01-20",
    totalOrders: 5,
    totalSpent: 1500000,
    location: "Lagos, Nigeria",
  },
  {
    id: 2,
    name: "Solar Solutions Ltd",
    email: "contact@solarsolutions.com",
    role: "vendor",
    status: "active",
    joinedDate: "2024-01-10",
    lastLogin: "2024-01-20",
    totalOrders: 89,
    totalSpent: 12450000,
    location: "Abuja, Nigeria",
  },
  {
    id: 3,
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "customer",
    status: "active",
    joinedDate: "2024-01-12",
    lastLogin: "2024-01-19",
    totalOrders: 3,
    totalSpent: 890000,
    location: "Port Harcourt, Nigeria",
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "customer",
    status: "suspended",
    joinedDate: "2024-01-08",
    lastLogin: "2024-01-18",
    totalOrders: 1,
    totalSpent: 299000,
    location: "Kano, Nigeria",
  },
  {
    id: 5,
    name: "Green Energy Co",
    email: "info@greenenergy.com",
    role: "vendor",
    status: "pending",
    joinedDate: "2024-01-14",
    lastLogin: "2024-01-20",
    totalOrders: 0,
    totalSpent: 0,
    location: "Lagos, Nigeria",
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSuspendUser = (userId: number) => {
    toast.success("User suspended successfully")
    // Update user status in real implementation
  }

  const handleActivateUser = (userId: number) => {
    toast.success("User activated successfully")
    // Update user status in real implementation
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "customer":
        return <Badge className="bg-blue-100 text-blue-800">Customer</Badge>
      case "vendor":
        return <Badge className="bg-purple-100 text-purple-800">Vendor</Badge>
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="customer">Customers</SelectItem>
                <SelectItem value="vendor">Vendors</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.totalOrders}</TableCell>
                    <TableCell>₦{user.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(user.joinedDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>User Details</DialogTitle>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Personal Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        {selectedUser.name}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {selectedUser.email}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Joined {formatDate(selectedUser.joinedDate)}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        Last login: {formatDate(selectedUser.lastLogin)}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Activity Summary</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Role:</span>
                                        <span>{getRoleBadge(selectedUser.role)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Status:</span>
                                        <span>{getStatusBadge(selectedUser.status)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Total Orders:</span>
                                        <span>{selectedUser.totalOrders}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Total Spent:</span>
                                        <span>₦{selectedUser.totalSpent.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Location:</span>
                                        <span>{selectedUser.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-2 pt-4 border-t">
                                  {selectedUser.status === "active" ? (
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleSuspendUser(selectedUser.id)}
                                      className="flex-1"
                                    >
                                      <UserX className="h-4 w-4 mr-2" />
                                      Suspend User
                                    </Button>
                                  ) : (
                                    <Button onClick={() => handleActivateUser(selectedUser.id)} className="flex-1">
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Activate User
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {user.status === "active" ? (
                          <Button size="sm" variant="destructive" onClick={() => handleSuspendUser(user.id)}>
                            <UserX className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => handleActivateUser(user.id)}>
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">
                {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Users will appear here as they register"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
