"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth/auth-provider"
import { Plus, Edit, Trash2, Search, Tag, Package, Folder, FolderOpen } from "lucide-react"

interface Category {
  id: number
  name: string
  description?: string
  image?: string
  parentId?: number
  parent?: Category
  children?: Category[]
  productCount?: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

// Generate slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    parentId: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()
  const { getAllCategories, getAllProducts, createCategory, updateCategory, deleteCategory } = useAuth()

  // Fetch categories and product counts
  const fetchCategoriesWithProductCounts = async () => {
    try {
      setLoading(true)

      // Fetch categories
      const categoriesResponse = await getAllCategories()
      const categoriesData = categoriesResponse.data || categoriesResponse || []

      // Fetch all products to count by category
      const productsResponse = await getAllProducts()
      const productsData = productsResponse.data || productsResponse || []

      // Count products per category
      const productCounts: { [key: string]: number } = {}
      productsData.forEach((product: any) => {
        const categoryId = product.categoryId?.toString()
        if (categoryId) {
          productCounts[categoryId] = (productCounts[categoryId] || 0) + 1
        }
      })

      // Add product counts to categories
      const categoriesWithCounts = categoriesData.map((category: any) => ({
        ...category,
        productCount: productCounts[category.id?.toString()] || 0,
        isActive: category.isActive !== false, // Default to true if not specified
      }))

      setCategories(categoriesWithCounts)
    } catch (error: any) {
      console.error("Error fetching categories:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to fetch categories",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoriesWithProductCounts()
  }, [])

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get parent categories for dropdown
  const parentCategories = categories.filter((cat) => !cat.parentId)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const categoryData = {
        name: formData.name.trim(),
        slug: generateSlug(formData.name.trim()),
        description: formData.description.trim() || undefined,
        image: formData.image.trim() || undefined,
        parentId: formData.parentId ? Number.parseInt(formData.parentId) : undefined,
      }

      if (selectedCategory) {
        // Update existing category
        await updateCategory(selectedCategory.id, categoryData)
        toast({
          title: "Success",
          description: "Category updated successfully",
        })
        setIsEditDialogOpen(false)
      } else {
        // Create new category
        await createCategory(categoryData)
        toast({
          title: "Success",
          description: "Category created successfully",
        })
        setIsCreateDialogOpen(false)
      }

      // Reset form and refresh data
      setFormData({ name: "", description: "", image: "", parentId: "" })
      setSelectedCategory(null)
      fetchCategoriesWithProductCounts()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save category",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Handle edit
  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      parentId: category.parentId?.toString() || "",
    })
    setIsEditDialogOpen(true)
  }

  // Handle delete
  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId)
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      fetchCategoriesWithProductCounts()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({ name: "", description: "", image: "", parentId: "" })
    setSelectedCategory(null)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Category Management</h1>
            <p className="text-muted-foreground">Manage product categories and subcategories</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">Manage product categories and subcategories</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>Add a new product category to organize your marketplace.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Solar Panels"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the category"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent">Parent Category</Label>
                  <Select
                    value={formData.parentId}
                    onValueChange={(value) => setFormData({ ...formData, parentId: value === "none" ? "" : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Parent (Top Level)</SelectItem>
                      {parentCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Tag className="h-3 w-3" />
          {filteredCategories.length} Categories
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Package className="h-3 w-3" />
          {filteredCategories.reduce((total, cat) => total + (cat.productCount || 0), 0)} Products
        </Badge>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {category.parentId ? (
                    <Folder className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <FolderOpen className="h-4 w-4 text-primary" />
                  )}
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{category.name}"? This action cannot be undone and will
                          affect {category.productCount || 0} products.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(category.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {category.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
              )}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3 text-muted-foreground" />
                    <span
                      className={`font-medium ${category.productCount && category.productCount > 0 ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      {category.productCount || 0} products
                    </span>
                  </div>
                  {category.parent && (
                    <Badge variant="outline" className="text-xs">
                      {category.parent.name}
                    </Badge>
                  )}
                </div>
                <Badge variant={category.isActive !== false ? "default" : "secondary"}>
                  {category.isActive !== false ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Tag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm ? "No categories match your search." : "Get started by creating your first category."}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category information.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Category Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Solar Panels"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the category"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-parent">Parent Category</Label>
                <Select
                  value={formData.parentId}
                  onValueChange={(value) => setFormData({ ...formData, parentId: value === "none" ? "" : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Parent (Top Level)</SelectItem>
                    {parentCategories
                      .filter((cat) => cat.id !== selectedCategory?.id)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Updating..." : "Update Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
