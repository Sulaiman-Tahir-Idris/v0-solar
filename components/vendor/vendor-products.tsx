"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  Loader2,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth/auth-provider"
import { FallbackImage } from "@/components/ui/fallback-image"

interface Product {
  id: string | number
  name: string
  slug?: string
  description?: string
  longDescription?: string
  price: number
  originalPrice?: number
  image?: string
  images?: string[]
  category?: string
  categoryId?: string | number
  vendorId?: number
  stock: number
  inStock?: boolean
  badge?: string
  sku?: string
  status?: string
  sold?: number
  createdAt?: string
  updatedAt?: string
}

interface Category {
  id: string | number
  name: string
  description?: string
}

export function VendorProducts() {
  const { createProduct, getAllProducts, getAllCategories, updateProduct, deleteProduct, user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isViewProductOpen, setIsViewProductOpen] = useState(false)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)

  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: "",
    price: "",
    originalPrice: "",
    stock: "",
    description: "",
    longDescription: "",
    image: "",
    badge: "",
  })

  // Helper function to generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const fetchProducts = async () => {
    try {
      console.log("Fetching products from backend...")
      const response = await getAllProducts()
      console.log("Products response:", response)

      const productsData = response.data || response.products || response || []
      console.log("Products data:", productsData)

      setProducts(Array.isArray(productsData) ? productsData : [])
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to load products from backend")
      setProducts([])
    }
  }

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories from backend...")
      const response = await getAllCategories()
      console.log("Categories response:", response)

      const categoriesData = response.data || response.categories || response || []
      console.log("Categories data:", categoriesData)

      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Failed to load categories from backend")
      setCategories([])
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([fetchProducts(), fetchCategories()])
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.badge && product.badge.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory =
      categoryFilter === "all" ||
      product.categoryId?.toString() === categoryFilter ||
      product.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status?: string, inStock?: boolean) => {
    if (!inStock) {
      return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
    }

    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
    }
  }

  const resetForm = () => {
    setNewProduct({
      name: "",
      categoryId: "",
      price: "",
      originalPrice: "",
      stock: "",
      description: "",
      longDescription: "",
      image: "",
      badge: "",
    })
  }

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product)
    setIsViewProductOpen(true)
  }

  const handleAddProduct = async () => {
    // Validate form
    if (!newProduct.name || !newProduct.categoryId || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill in all required fields (Name, Category, Price, Stock)")
      return
    }

    if (!user?.id) {
      toast.error("User not authenticated")
      return
    }

    setIsSubmitting(true)
    try {
      // Prepare product data to match your backend's expected format
      const productData = {
        name: newProduct.name.trim(),
        slug: generateSlug(newProduct.name.trim()),
        description: newProduct.description.trim() || "",
        longDescription: newProduct.longDescription.trim() || "",
        price: Number.parseFloat(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number.parseFloat(newProduct.originalPrice) : undefined,
        image: newProduct.image.trim() || "https://via.placeholder.com/400x300?text=No+Image",
        vendorId: user.id, // Use the current user's ID as vendorId
        stock: Number.parseInt(newProduct.stock),
        inStock: Number.parseInt(newProduct.stock) > 0,
        badge: newProduct.badge.trim() || "",
        categoryId: Number.parseInt(newProduct.categoryId), // Convert to number as your backend expects
      }

      console.log("Creating product with data:", productData)
      console.log("Payload being sent to backend:", JSON.stringify(productData, null, 2))

      const response = await createProduct(productData)
      console.log("Product created successfully:", response)

      toast.success("Product created successfully!", {
        description: "Your product has been added to the system.",
      })

      // Refresh the products list to show the new product
      await fetchProducts()

      // Close dialog and reset form
      setIsAddProductOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error creating product:", error)

      let errorMessage = "Please check your connection and try again"
      if (error instanceof Error) {
        if (error.message.includes("Validation failed")) {
          errorMessage = "Please check all required fields are filled correctly"
        } else if (error.message.includes("categoryId")) {
          errorMessage = "Invalid category selected"
        } else if (error.message.includes("price")) {
          errorMessage = "Invalid price format"
        } else if (error.message.includes("vendorId")) {
          errorMessage = "Vendor authentication failed"
        } else {
          errorMessage = error.message
        }
      }

      toast.error("Failed to create product", {
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setNewProduct({
      name: product.name,
      categoryId: product.categoryId?.toString() || "",
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      stock: product.stock.toString(),
      description: product.description || "",
      longDescription: product.longDescription || "",
      image: product.image || "",
      badge: product.badge || "",
    })
    setIsEditMode(true)
    setIsAddProductOpen(true)
  }

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return

    // Validate form
    if (!newProduct.name || !newProduct.categoryId || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      const productData = {
        name: newProduct.name.trim(),
        slug: generateSlug(newProduct.name.trim()),
        description: newProduct.description.trim(),
        longDescription: newProduct.longDescription.trim(),
        price: Number.parseFloat(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number.parseFloat(newProduct.originalPrice) : undefined,
        image: newProduct.image.trim(),
        stock: Number.parseInt(newProduct.stock),
        inStock: Number.parseInt(newProduct.stock) > 0,
        badge: newProduct.badge.trim(),
        categoryId: Number.parseInt(newProduct.categoryId),
      }

      await updateProduct(selectedProduct.id, productData)

      toast.success("Product updated successfully!")

      // Refresh the products list
      await fetchProducts()

      // Close dialog and reset form
      setIsAddProductOpen(false)
      setIsEditMode(false)
      setSelectedProduct(null)
      resetForm()
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Failed to update product", {
        description: error instanceof Error ? error.message : "Please try again",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (productId: string | number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await deleteProduct(productId)
      toast.success("Product deleted successfully")
      await fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    }
  }

  const handleCloseDialog = () => {
    setIsAddProductOpen(false)
    setIsEditMode(false)
    setSelectedProduct(null)
    resetForm()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products from backend...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <span className="text-lg sm:text-xl">Product Management ({products.length} products)</span>
            </div>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                <DialogHeader>
                  <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={newProduct.categoryId}
                        onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₦) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Original Price (₦)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.originalPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="badge">Badge/Tag</Label>
                      <Input
                        id="badge"
                        value={newProduct.badge}
                        onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                        placeholder="e.g., Best Seller, New Arrival"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Product Image URL</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Brief product description"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="longDescription">Long Description</Label>
                    <Textarea
                      id="longDescription"
                      value={newProduct.longDescription}
                      onChange={(e) => setNewProduct({ ...newProduct, longDescription: e.target.value })}
                      placeholder="Detailed product description with features and specifications"
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={handleCloseDialog}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={isEditMode ? handleUpdateProduct : handleAddProduct}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      {isEditMode ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Show message if no categories are loaded */}
          {categories.length === 0 && !isLoading && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                No categories found. You may need to create categories first before adding products.
              </p>
            </div>
          )}

          {/* Filters - Responsive */}
          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Table */}
          {products.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Product</TableHead>
                      <TableHead className="min-w-[120px]">Category</TableHead>
                      <TableHead className="min-w-[100px]">Price</TableHead>
                      <TableHead className="min-w-[80px]">Stock</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => {
                      const categoryName =
                        categories.find((cat) => cat.id.toString() === product.categoryId?.toString())?.name ||
                        product.category ||
                        "Unknown"

                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10">
                                <FallbackImage
                                  src={product.image || "/placeholder.svg?height=40&width=40"}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                  fallbackSrc="/placeholder.svg?height=40&width=40&text=Product"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                {product.badge && (
                                  <Badge variant="secondary" className="text-xs mt-1">
                                    {product.badge}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{categoryName}</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">₦{product.price.toLocaleString()}</div>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <div className="text-xs text-muted-foreground line-through">
                                  ₦{product.originalPrice.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className={product.stock <= 10 ? "text-red-600 font-medium" : "font-medium"}>
                                {product.stock}
                              </div>
                              <div className="text-xs text-muted-foreground">units</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getStatusBadge(product.status, product.inStock)}
                              <div className="text-xs text-muted-foreground">{formatDate(product.createdAt)}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewProduct(product)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProduct(product)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Start by adding your first product to your store"}
              </p>
              <Button
                onClick={() => setIsAddProductOpen(true)}
                disabled={categories.length === 0}
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              {categories.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Categories must be created first before adding products
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Details Dialog - Comprehensive View */}
      <Dialog open={isViewProductOpen} onOpenChange={setIsViewProductOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Details - {viewingProduct?.name}
            </DialogTitle>
          </DialogHeader>

          {viewingProduct && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - Image and Basic Info */}
              <div className="space-y-6">
                {/* Product Image */}
                <Card>
                  <CardContent className="p-4">
                    <div className="relative w-full h-64">
                      <FallbackImage
                        src={viewingProduct.image || "/placeholder.svg?height=300&width=400"}
                        alt={viewingProduct.name}
                        fill
                        className="rounded-lg object-cover"
                        fallbackSrc="/placeholder.svg?height=300&width=400&text=Product+Image"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Units Sold</p>
                        <p className="text-2xl font-bold">{viewingProduct.sold || 0}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-2xl font-bold">
                          ₦{((viewingProduct.sold || 0) * viewingProduct.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Stock Alert */}
                {viewingProduct.stock <= 10 && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-orange-800">
                        <AlertTriangle className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Low Stock Alert</p>
                          <p className="text-sm">Only {viewingProduct.stock} units remaining</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Product Details */}
              <div className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-lg font-semibold">{viewingProduct.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Category</Label>
                        <p className="text-sm">
                          {categories.find((cat) => cat.id.toString() === viewingProduct.categoryId?.toString())
                            ?.name || "Unknown Category"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">SKU</Label>
                        <p className="text-sm">{viewingProduct.sku || "N/A"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Current Price</Label>
                        <p className="text-xl font-bold text-green-600">₦{viewingProduct.price.toLocaleString()}</p>
                      </div>
                      {viewingProduct.originalPrice && viewingProduct.originalPrice > viewingProduct.price && (
                        <div>
                          <Label className="text-sm font-medium">Original Price</Label>
                          <p className="text-lg text-muted-foreground line-through">
                            ₦{viewingProduct.originalPrice.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Stock</Label>
                        <p
                          className={`text-lg font-semibold ${viewingProduct.stock <= 10 ? "text-red-600" : "text-green-600"}`}
                        >
                          {viewingProduct.stock} units
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="mt-1">{getStatusBadge(viewingProduct.status, viewingProduct.inStock)}</div>
                      </div>
                    </div>

                    {viewingProduct.badge && (
                      <div>
                        <Label className="text-sm font-medium">Badge</Label>
                        <div className="mt-1">
                          <Badge variant="secondary">{viewingProduct.badge}</Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Descriptions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Descriptions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {viewingProduct.description && (
                      <div>
                        <Label className="text-sm font-medium">Short Description</Label>
                        <p className="text-sm text-muted-foreground mt-1">{viewingProduct.description}</p>
                      </div>
                    )}

                    {viewingProduct.longDescription && (
                      <div>
                        <Label className="text-sm font-medium">Detailed Description</Label>
                        <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                          {viewingProduct.longDescription}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Analytics */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Created:</span>
                      </div>
                      <span>{formatDate(viewingProduct.createdAt)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Conversion Rate:</span>
                      <span className="font-medium">
                        {viewingProduct.stock > 0
                          ? Math.round(
                              ((viewingProduct.sold || 0) / (viewingProduct.stock + (viewingProduct.sold || 0))) * 100,
                            )
                          : 0}
                        %
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg. Daily Sales:</span>
                      <span className="font-medium">
                        {viewingProduct.createdAt
                          ? Math.round(
                              (viewingProduct.sold || 0) /
                                Math.max(
                                  1,
                                  Math.ceil(
                                    (Date.now() - new Date(viewingProduct.createdAt).getTime()) / (1000 * 60 * 60 * 24),
                                  ),
                                ),
                            )
                          : 0}{" "}
                        units/day
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsViewProductOpen(false)
                      handleEditProduct(viewingProduct)
                    }}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                  <Button onClick={() => window.open(`/products/${viewingProduct.id}`, "_blank")} className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Public View
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
