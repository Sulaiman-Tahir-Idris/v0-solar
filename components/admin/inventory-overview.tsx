"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, AlertTriangle, TrendingUp, TrendingDown, Eye } from "lucide-react"
import { useState } from "react"

// Mock inventory data
const inventoryStats = {
  totalProducts: 1247,
  lowStockItems: 23,
  outOfStockItems: 8,
  pendingApproval: 15,
}

const categoryInventory = [
  {
    category: "Solar Panels",
    totalProducts: 456,
    inStock: 12450,
    lowStock: 8,
    outOfStock: 2,
    value: 18500000,
  },
  {
    category: "Inverters",
    totalProducts: 234,
    inStock: 1890,
    lowStock: 5,
    outOfStock: 1,
    value: 12300000,
  },
  {
    category: "Batteries",
    totalProducts: 189,
    inStock: 567,
    lowStock: 6,
    outOfStock: 3,
    value: 8900000,
  },
  {
    category: "Controllers",
    totalProducts: 156,
    inStock: 2340,
    lowStock: 3,
    outOfStock: 1,
    value: 4200000,
  },
  {
    category: "Accessories",
    totalProducts: 212,
    inStock: 5670,
    lowStock: 1,
    outOfStock: 1,
    value: 1700000,
  },
]

const lowStockProducts = [
  {
    id: 1,
    name: "SolarMax Pro 400W Panel",
    vendor: "Solar Solutions Ltd",
    currentStock: 8,
    minStock: 20,
    category: "Solar Panels",
    lastRestocked: "2024-01-10",
  },
  {
    id: 2,
    name: "EnergyStore 10kWh Battery",
    vendor: "Green Energy Co",
    currentStock: 3,
    minStock: 10,
    category: "Batteries",
    lastRestocked: "2024-01-08",
  },
  {
    id: 3,
    name: "Solar Charge Controller 60A",
    vendor: "EcoTech Systems",
    currentStock: 5,
    minStock: 15,
    category: "Controllers",
    lastRestocked: "2024-01-12",
  },
]

const pendingProducts = [
  {
    id: 1,
    name: "Advanced Solar Panel 500W",
    vendor: "New Solar Tech",
    category: "Solar Panels",
    submittedDate: "2024-01-18",
    price: 399000,
  },
  {
    id: 2,
    name: "Smart Inverter 8000W",
    vendor: "Power Systems Inc",
    category: "Inverters",
    submittedDate: "2024-01-17",
    price: 1899000,
  },
  {
    id: 3,
    name: "Lithium Battery 15kWh",
    vendor: "Energy Storage Co",
    category: "Batteries",
    submittedDate: "2024-01-16",
    price: 4299000,
  },
]

export function InventoryOverview() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return "out_of_stock"
    if (current <= min) return "low_stock"
    return "in_stock"
  }

  const getStockBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Overview</h2>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalProducts.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12 new this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStockItems}</div>
            <div className="flex items-center text-xs text-yellow-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +3 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inventoryStats.outOfStockItems}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inventoryStats.pendingApproval}</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +5 new submissions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryInventory.map((category, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{category.category}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{category.totalProducts} products</Badge>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Stock:</span>
                    <div className="font-medium">{category.inStock.toLocaleString()} units</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Low Stock:</span>
                    <div className="font-medium text-yellow-600">{category.lowStock} items</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Out of Stock:</span>
                    <div className="font-medium text-red-600">{category.outOfStock} items</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Value:</span>
                    <div className="font-medium">₦{category.value.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.vendor} • {product.category}
                    </p>
                    <p className="text-xs text-muted-foreground">Last restocked: {product.lastRestocked}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-red-600 font-medium">{product.currentStock}</span>
                      <span className="text-muted-foreground"> / {product.minStock}</span>
                    </div>
                    {getStockBadge(getStockStatus(product.currentStock, product.minStock))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Product Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              Pending Product Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.vendor} • {product.category}
                    </p>
                    <p className="text-xs text-muted-foreground">Submitted: {product.submittedDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium mb-2">₦{product.price.toLocaleString()}</div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
