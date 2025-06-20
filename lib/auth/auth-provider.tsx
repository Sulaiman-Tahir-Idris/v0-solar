"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useRef } from "react"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  name?: string // Add computed name field
  phone: string
  role: "customer" | "vendor" | "admin"
  emailVerified: boolean
  createdAt: string
  avatar?: string
  location?: string
  // Vendor-specific fields (will be added later when vendor system is integrated)
  vendorInfo?: {
    businessName: string
    businessAddress: string
    businessPhone: string
    businessEmail: string
    taxId: string
    bankDetails: {
      accountName: string
      accountNumber: string
      bankName: string
    }
    isVerified: boolean
    verificationStatus: "pending" | "approved" | "rejected"
    joinedDate: string
    totalProducts: number
    totalSales: number
    commission: number
  }
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

interface CartItem {
  id: number
  productId: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    inStock: boolean
    stock: number
  }
  createdAt: string
  updatedAt: string
}

interface Cart {
  id: number
  userId: number
  items: CartItem[]
  totalItems: number
  subtotal: number
  createdAt: string
  updatedAt: string
}

interface OrderItem {
  productId: number
  quantity: number
  price: number
}

interface Order {
  id: number
  userId: number
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: string
  paymentMethod: "card" | "transfer" | "cash"
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

interface CreateOrderData {
  totalAmount: number
  shippingAddress: string
  paymentMethod: "card" | "transfer" | "cash"
  items: OrderItem[]
}

interface UpdateOrderData {
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress?: string
  paymentMethod?: "card" | "transfer" | "cash"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  cart: Cart | null
  cartItemCount: number
  refreshCart: () => Promise<void>
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string, phone: string) => Promise<User>
  refreshToken: () => Promise<void>
  checkEmailVerification: () => Promise<boolean>
  resendVerification: () => Promise<void>
  updateUser: (updatedUser: User) => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  fetchProfile: () => Promise<User>
  updateProfile: (profileData: Partial<User>) => Promise<User>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  // Products API methods
  getAllProducts: (params?: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    page?: number
    limit?: number
  }) => Promise<any>
  getProductById: (id: string | number) => Promise<any>
  createProduct: (productData: any) => Promise<any>
  updateProduct: (id: string | number, productData: any) => Promise<any>
  deleteProduct: (id: string | number) => Promise<any>
  // Categories API methods
  getAllCategories: () => Promise<any>
  getCategoryById: (id: string | number) => Promise<any>
  createCategory: (categoryData: any) => Promise<any>
  updateCategory: (id: string | number, categoryData: any) => Promise<any>
  deleteCategory: (id: string | number) => Promise<any>
  // Cart API methods
  getCart: () => Promise<Cart>
  addToCart: (productId: number, quantity: number) => Promise<CartItem>
  removeFromCart: (itemId: number) => Promise<void>
  clearCart: () => Promise<void>
  updateCartItemQuantity: (itemId: number, quantity: number) => Promise<CartItem>
  // Order API methods
  createOrder: (orderData: CreateOrderData) => Promise<Order>
  getAllOrders: () => Promise<Order[]>
  getOrderById: (id: string | number) => Promise<Order>
  updateOrder: (id: string | number, updateData: UpdateOrderData) => Promise<Order>
  updateOrderStatus: (id: string | number, status: Order["status"]) => Promise<Order>
  testBackendConnection: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// API Base URL - adjust this to match your backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://eco-solar-backend.onrender.com"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState<Cart | null>(null)
  const [cartItemCount, setCartItemCount] = useState(0)

  // Product cache to prevent repeated API calls
  const [productCache, setProductCache] = useState<Map<number, any>>(new Map())

  // Prevent multiple simultaneous cart refreshes
  const cartRefreshInProgress = useRef(false)

  // API helper function with automatic token handling
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        // Handle 401 Unauthorized - token might be expired
        if (response.status === 401) {
          // Clear auth state and redirect to login
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("user")
          document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          setUser(null)
          setCart(null)
          setCartItemCount(0)
          window.location.href = "/login"
          throw new Error("Session expired. Please log in again.")
        }

        const error = await response.json().catch(() => ({ message: `HTTP Error ${response.status}` }))
        throw new Error(error.message || `HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error(`API call failed to ${url}:`, error)
      throw error
    }
  }

  // Function to refresh cart data with debouncing
  const refreshCart = async () => {
    if (!user || cartRefreshInProgress.current) {
      return
    }

    cartRefreshInProgress.current = true

    try {
      const cartData = await getCart()
      setCart(cartData)

      // Calculate total items from actual cart items
      const totalItems =
        cartData.items?.reduce((sum: number, item: any) => {
          return sum + (item.quantity || 0)
        }, 0) || 0

      setCartItemCount(totalItems)
    } catch (error) {
      console.error("Failed to refresh cart:", error)
      setCart(null)
      setCartItemCount(0)
    } finally {
      cartRefreshInProgress.current = false
    }
  }

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const savedUser = localStorage.getItem("user")

        if (token && savedUser) {
          // Verify token is still valid by fetching fresh profile data
          try {
            const profileData = await apiCall("/profile")
            setUser(profileData)
            localStorage.setItem("user", JSON.stringify(profileData))

            // Set auth token in cookie for middleware
            document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`

            // Load cart data for authenticated user (only once)
            await refreshCart()
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("user")
            document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
            setCart(null)
            setCartItemCount(0)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Only refresh cart when user changes (not on every render)
  useEffect(() => {
    if (user && !cart) {
      refreshCart()
    } else if (!user) {
      setCart(null)
      setCartItemCount(0)
    }
  }, [user, cart])

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true)
    try {
      const response: AuthResponse = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      // Store tokens and user data
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.user))

      // Set auth token in cookie for middleware
      document.cookie = `accessToken=${response.accessToken}; path=/; max-age=86400; SameSite=Lax`

      setUser(response.user)
      // Cart will be loaded by useEffect
      return response.user
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
  ): Promise<User> => {
    setIsLoading(true)
    try {
      const response: AuthResponse = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName, phone }),
      })

      // Store tokens and user data
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.user))

      // Set auth token in cookie for middleware
      document.cookie = `accessToken=${response.accessToken}; path=/; max-age=86400; SameSite=Lax`

      setUser(response.user)
      // Cart will be loaded by useEffect
      return response.user
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    const token = localStorage.getItem("accessToken")
    const currentUser = user

    if (!token) {
      // No token, just clear local state
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      setUser(null)
      setCart(null)
      setCartItemCount(0)
      return
    }

    try {
      // Send logout request with user role for backend tracking
      await apiCall("/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: currentUser?.role,
          userId: currentUser?.id,
        }),
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Continue with cleanup even if API call fails
    } finally {
      // Clear all authentication data
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      setUser(null)
      setCart(null)
      setCartItemCount(0)
      setProductCache(new Map()) // Clear product cache
      cartRefreshInProgress.current = false // Reset cart refresh flag

      // Optional: Clear any role-specific cached data
      if (currentUser?.role === "vendor") {
        localStorage.removeItem("vendorProducts")
        localStorage.removeItem("vendorOrders")
      } else if (currentUser?.role === "admin") {
        localStorage.removeItem("adminCache")
      }
    }
  }

  const refreshToken = async (): Promise<void> => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken")
      if (!storedRefreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await apiCall("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      })

      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)

      // Update cookie as well
      document.cookie = `accessToken=${response.accessToken}; path=/; max-age=86400; SameSite=Lax`
    } catch (error) {
      // Refresh failed, clear auth state
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      setUser(null)
      setCart(null)
      setCartItemCount(0)
      throw error
    }
  }

  const checkEmailVerification = async (): Promise<boolean> => {
    try {
      const response = await apiCall("/auth/verify-status")
      // Update user verification status if it has changed
      if (user && response.emailVerified !== user.emailVerified) {
        const updatedUser = { ...user, emailVerified: response.emailVerified }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
      return response.emailVerified
    } catch (error) {
      throw error
    }
  }

  const resendVerification = async (): Promise<void> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      await apiCall("/auth/resend-verification", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      throw error
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await apiCall("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      await apiCall("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      })
    } catch (error) {
      throw error
    }
  }

  // Profile-related methods with proper authorization
  const fetchProfile = async (): Promise<User> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      const profileData = await apiCall("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(profileData)
      localStorage.setItem("user", JSON.stringify(profileData))
      return profileData
    } catch (error) {
      throw error
    }
  }

  const updateProfile = async (profileData: Partial<User>): Promise<User> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      const updatedUser = await apiCall("/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return updatedUser
    } catch (error) {
      throw error
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      await apiCall("/profile/password", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
    } catch (error) {
      throw error
    }
  }

  // Products API methods
  const getAllProducts = async (params?: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    page?: number
    limit?: number
  }) => {
    const searchParams = new URLSearchParams()

    if (params?.category) searchParams.append("category", params.category)
    if (params?.search) searchParams.append("search", params.search)
    if (params?.minPrice) searchParams.append("minPrice", params.minPrice.toString())
    if (params?.maxPrice) searchParams.append("maxPrice", params.maxPrice.toString())
    if (params?.inStock) searchParams.append("inStock", params.inStock.toString())
    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())

    const queryString = searchParams.toString()
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`

    return apiCall(endpoint)
  }

  const getProductById = async (id: string | number) => {
    const productId = Number(id)

    // Check cache first
    if (productCache.has(productId)) {
      return productCache.get(productId)
    }

    try {
      const product = await apiCall(`/products/${id}`)

      // Cache the product
      setProductCache((prev) => new Map(prev).set(productId, product))

      return product
    } catch (error) {
      throw error
    }
  }

  const createProduct = async (productData: {
    name: string
    description: string
    price: number
    originalPrice?: number
    categoryId: string
    images: string[]
    specifications?: Array<{ name: string; value: string }>
    features?: string[]
    variants?: Array<{ name: string; price: number }>
    stock: number
    sku: string
  }) => {
    return apiCall("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  }

  const updateProduct = async (
    id: string | number,
    productData: Partial<{
      name: string
      description: string
      price: number
      originalPrice?: number
      categoryId: string
      images: string[]
      specifications?: Array<{ name: string; value: string }>
      features?: string[]
      variants?: Array<{ name: string; price: number }>
      stock: number
      sku: string
    }>,
  ) => {
    const result = await apiCall(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(productData),
    })

    // Update cache
    const productId = Number(id)
    if (productCache.has(productId)) {
      setProductCache((prev) => new Map(prev).set(productId, result))
    }

    return result
  }

  const deleteProduct = async (id: string | number) => {
    const result = await apiCall(`/products/${id}`, {
      method: "DELETE",
    })

    // Remove from cache
    const productId = Number(id)
    setProductCache((prev) => {
      const newCache = new Map(prev)
      newCache.delete(productId)
      return newCache
    })

    return result
  }

  // Categories API methods
  const getAllCategories = async () => {
    return apiCall("/categories")
  }

  const getCategoryById = async (id: string | number) => {
    return apiCall(`/categories/${id}`)
  }

  const createCategory = async (categoryData: {
    name: string
    description?: string
    image?: string
    parentId?: string
  }) => {
    return apiCall("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  }

  const updateCategory = async (
    id: string | number,
    categoryData: Partial<{
      name: string
      description?: string
      image?: string
      parentId?: string
    }>,
  ) => {
    return apiCall(`/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(categoryData),
    })
  }

  const deleteCategory = async (id: string | number) => {
    return apiCall(`/categories/${id}`, {
      method: "DELETE",
    })
  }

  // Cart API methods
  const getCart = async (): Promise<Cart> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      const cartData = await apiCall("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Ensure items have product data populated
      if (cartData.items && cartData.items.length > 0) {
        const itemsWithProducts = await Promise.all(
          cartData.items.map(async (item: any) => {
            try {
              if (!item.product) {
                const product = await getProductById(item.productId)
                return {
                  ...item,
                  product: product,
                }
              }
              return item
            } catch (error) {
              console.error(`Failed to fetch product ${item.productId}:`, error)
              // Return item with placeholder product data
              return {
                ...item,
                product: {
                  id: item.productId,
                  name: "Product Not Found",
                  price: 0,
                  image: "",
                  category: "Unknown",
                  inStock: false,
                  stock: 0,
                },
              }
            }
          }),
        )

        const enrichedCart = {
          ...cartData,
          items: itemsWithProducts,
          totalItems: itemsWithProducts.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0),
          subtotal: itemsWithProducts.reduce((sum: number, item: any) => {
            return sum + (item.product?.price || 0) * (item.quantity || 0)
          }, 0),
        }

        return enrichedCart
      }

      return {
        ...cartData,
        totalItems: 0,
        subtotal: 0,
      }
    } catch (error) {
      console.error("Failed to get cart:", error)
      throw error
    }
  }

  const addToCart = async (productId: number, quantity: number): Promise<CartItem> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    // Try different possible endpoint structures
    const endpointsToTry = [
      "/cart/add", // Original specification
      "/api/cart/add", // Common API prefix
      "/cart", // Alternative structure
      "/api/cart", // API prefix alternative
    ]

    let lastError: Error | null = null

    for (const endpoint of endpointsToTry) {
      try {
        const result = await apiCall(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        })

        // Refresh cart after successful addition
        await refreshCart()

        return result
      } catch (error) {
        lastError = error as Error
        continue
      }
    }

    // If all endpoints failed, throw the last error
    throw lastError || new Error("Failed to add item to cart")
  }

  const removeFromCart = async (itemId: number): Promise<void> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      await apiCall(`/cart/item/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Refresh cart after successful removal
      await refreshCart()
    } catch (error) {
      throw error
    }
  }

  const clearCart = async (): Promise<void> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      await apiCall("/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Refresh cart after successful clear
      await refreshCart()
    } catch (error) {
      throw error
    }
  }

  const updateCartItemQuantity = async (itemId: number, quantity: number): Promise<CartItem> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      const result = await apiCall(`/cart/item/${itemId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      })

      // Refresh cart after successful update
      await refreshCart()

      return result
    } catch (error) {
      throw error
    }
  }

  // Order API methods
  const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      const result = await apiCall("/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      // Clear cart after successful order creation
      await clearCart()

      return result
    } catch (error) {
      console.error("Failed to create order:", error)
      throw error
    }
  }

  const getAllOrders = async (): Promise<Order[]> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      const result = await apiCall("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Handle both array response and paginated response
      return Array.isArray(result) ? result : result.data || result.orders || []
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      throw error
    }
  }

  const getOrderById = async (id: string | number): Promise<Order> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      return await apiCall(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error)
      throw error
    }
  }

  const updateOrder = async (id: string | number, updateData: UpdateOrderData): Promise<Order> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      return await apiCall(`/orders/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
    } catch (error) {
      console.error(`Failed to update order ${id}:`, error)
      throw error
    }
  }

  const updateOrderStatus = async (id: string | number, status: Order["status"]): Promise<Order> => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found. Please log in again.")
    }

    try {
      return await apiCall(`/orders/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
    } catch (error) {
      console.error(`Failed to update order status for ${id}:`, error)
      throw error
    }
  }

  const testBackendConnection = async (): Promise<void> => {
    try {
      // Test basic connectivity
      const response = await fetch(API_BASE_URL)
      if (response.status === 404) {
        console.log("Backend is running but endpoint not found")
      } else {
        console.log("Backend connection successful")
      }
    } catch (error) {
      console.error("Backend connection failed:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        cart,
        cartItemCount,
        refreshCart,
        login,
        logout,
        register,
        refreshToken,
        checkEmailVerification,
        resendVerification,
        updateUser,
        forgotPassword,
        resetPassword,
        fetchProfile,
        updateProfile,
        changePassword,
        // Products API methods
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        // Categories API methods
        getAllCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
        // Cart API methods
        getCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        // Order API methods
        createOrder,
        getAllOrders,
        getOrderById,
        updateOrder,
        updateOrderStatus,
        testBackendConnection,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
