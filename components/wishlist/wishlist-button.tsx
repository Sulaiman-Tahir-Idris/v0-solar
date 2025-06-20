"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "@/lib/auth/auth-provider"

interface WishlistButtonProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
  variant?: "icon" | "default"
  className?: string
}

export function WishlistButton({
  productId,
  productName,
  productPrice,
  productImage,
  variant = "icon",
  className = "",
}: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist, isLoading } = useWishlist()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const isWishlisted = isInWishlist(productId)

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    if (isWishlisted) {
      await removeFromWishlist(productId)
      toast.success("Removed from wishlist", {
        description: "Product removed from your wishlist.",
      })
    } else {
      const productForWishlist = {
        id: productId,
        name: productName,
        price: productPrice,
        description: "",
        image: productImage,
        inStock: true,
        addedAt: new Date().toISOString(),
      }

      await addToWishlist(productForWishlist)
      toast.success("Added to wishlist", {
        description: "Product added to your wishlist.",
      })
    }
  }

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        className={`${isWishlisted ? "text-red-500" : ""} ${className}`}
        onClick={handleToggleWishlist}
        disabled={isLoading === `add-${productId}` || isLoading === `remove-${productId}`}
      >
        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      className={`${isWishlisted ? "text-red-500" : ""} ${className}`}
      onClick={handleToggleWishlist}
      disabled={isLoading === `add-${productId}` || isLoading === `remove-${productId}`}
    >
      <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-red-500" : ""}`} />
      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  )
}
