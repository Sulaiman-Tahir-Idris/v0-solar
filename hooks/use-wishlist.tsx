"use client"

import { useState, useEffect, useCallback } from "react"

// Define the wishlist item type
export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  inStock: boolean
  addedAt: string
}

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const savedWishlist = localStorage.getItem("wishlist")
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist))
        } else {
          // For demo purposes, initialize with sample data
          // In a real app, this would be empty by default
          setWishlistItems([
            {
              id: 1,
              name: "Complete Home Solar Kit",
              price: 4999,
              originalPrice: 5999,
              description: "Everything you need for a complete home solar installation.",
              image: "/placeholder.svg?height=200&width=200",
              inStock: true,
              addedAt: new Date().toISOString(),
            },
            {
              id: 2,
              name: "Professional Installation Service",
              price: 1500,
              originalPrice: 2000,
              description: "Expert installation by certified technicians.",
              image: "/placeholder.svg?height=200&width=200",
              inStock: true,
              addedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            },
            {
              id: 3,
              name: "Solar Monitoring System",
              price: 299,
              originalPrice: 399,
              description: "Real-time monitoring of your solar system performance.",
              image: "/placeholder.svg?height=200&width=200",
              inStock: false,
              addedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            },
          ])
        }
      } catch (error) {
        console.error("Error loading wishlist:", error)
        setWishlistItems([])
      } finally {
        setIsInitialized(true)
      }
    }

    loadWishlist()
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, isInitialized])

  // Add item to wishlist
  const addToWishlist = useCallback(
    async (item: WishlistItem) => {
      setIsLoading(`add-${item.id}`)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Check if item already exists in wishlist
        const exists = wishlistItems.some((wishlistItem) => wishlistItem.id === item.id)
        if (!exists) {
          setWishlistItems((prev) => [
            ...prev,
            {
              ...item,
              addedAt: new Date().toISOString(),
            },
          ])
          return true
        }
        return false
      } catch (error) {
        console.error("Error adding to wishlist:", error)
        return false
      } finally {
        setIsLoading(null)
      }
    },
    [wishlistItems],
  )

  // Remove item from wishlist
  const removeFromWishlist = useCallback(async (id: number) => {
    setIsLoading(`remove-${id}`)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setWishlistItems((prev) => prev.filter((item) => item.id !== id))
      return true
    } catch (error) {
      console.error("Error removing from wishlist:", error)
      return false
    } finally {
      setIsLoading(null)
    }
  }, [])

  // Check if item is in wishlist
  const isInWishlist = useCallback(
    (id: number) => {
      return wishlistItems.some((item) => item.id === id)
    },
    [wishlistItems],
  )

  // Move item from wishlist to cart
  const moveToCart = useCallback(async (item: WishlistItem) => {
    setIsLoading(`move-${item.id}`)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, this would add to cart via API or context
      // For now, we'll just simulate it and remove from wishlist

      // Add to cart logic would go here
      // addToCart(item)

      // Remove from wishlist
      setWishlistItems((prev) => prev.filter((wishlistItem) => wishlistItem.id !== item.id))
      return true
    } catch (error) {
      console.error("Error moving to cart:", error)
      return false
    } finally {
      setIsLoading(null)
    }
  }, [])

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    isLoading,
  }
}
