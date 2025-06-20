"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth/auth-provider"
import { toast } from "sonner"

// Mock review data
const mockReviews = [
  {
    id: 1,
    user: {
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "2023-12-15",
    title: "Excellent performance and easy installation",
    content:
      "I've had these panels installed for 6 months now and they've exceeded my expectations. Power output is consistent even on cloudy days, and the installation was straightforward with the included mounting hardware. Highly recommended for anyone looking to start their solar journey.",
    helpful: 24,
    unhelpful: 2,
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "2023-11-03",
    title: "Great value for money",
    content:
      "These panels offer excellent value for the price point. I've compared with several other brands and these provide the best balance of efficiency and cost. The only minor issue was a slight delay in delivery, but the performance makes up for it.",
    helpful: 15,
    unhelpful: 1,
    verified: true,
  },
  {
    id: 3,
    user: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "2023-10-22",
    title: "Impressive durability",
    content:
      "We had a severe hailstorm last month and I was worried about damage to my newly installed solar panels. To my surprise, they survived without a scratch! The build quality is exceptional and performance has been consistent. Customer service was also very helpful with my questions.",
    helpful: 32,
    unhelpful: 0,
    verified: true,
  },
  {
    id: 4,
    user: {
      name: "Aisha Okafor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 3,
    date: "2023-09-14",
    title: "Good product but installation instructions could be better",
    content:
      "The panels themselves are working well and generating good power, but the installation instructions were confusing. I had to hire a professional to complete the installation which added to the cost. Once installed though, they've been performing well.",
    helpful: 8,
    unhelpful: 3,
    verified: true,
  },
]

// Calculate rating distribution
const ratingCounts = [0, 0, 0, 0, 0]
mockReviews.forEach((review) => {
  ratingCounts[review.rating - 1]++
})
const totalReviews = mockReviews.length
const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews

interface ProductReviewsProps {
  productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { isAuthenticated } = useAuth()
  const [reviewText, setReviewText] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [helpfulClicks, setHelpfulClicks] = useState<Record<number, "helpful" | "unhelpful" | null>>({})

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error("Please sign in", {
        description: "You need to be signed in to leave a review.",
      })
      return
    }

    if (userRating === 0) {
      toast.error("Rating required", {
        description: "Please select a star rating for your review.",
      })
      return
    }

    if (!reviewTitle.trim()) {
      toast.error("Title required", {
        description: "Please add a title for your review.",
      })
      return
    }

    if (!reviewText.trim()) {
      toast.error("Review required", {
        description: "Please write your review before submitting.",
      })
      return
    }

    // In a real app, this would send the review to an API
    toast.success("Review submitted", {
      description: "Thank you for your feedback! Your review will be published after moderation.",
    })
    setReviewText("")
    setReviewTitle("")
    setUserRating(0)
  }

  const handleHelpfulClick = (reviewId: number, type: "helpful" | "unhelpful") => {
    if (!isAuthenticated) {
      toast.error("Please sign in", {
        description: "You need to be signed in to mark reviews as helpful.",
      })
      return
    }

    const currentValue = helpfulClicks[reviewId]

    // If already clicked the same button, remove the vote
    if (currentValue === type) {
      setHelpfulClicks({ ...helpfulClicks, [reviewId]: null })
      return
    }

    setHelpfulClicks({ ...helpfulClicks, [reviewId]: type })
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating) ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Based on {totalReviews} reviews</div>
              </div>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating - 1]
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="w-12 text-sm">{rating} stars</div>
                    <Progress value={percentage} className="h-2" />
                    <div className="w-12 text-sm text-right">{count}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Write a Review */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Your Rating</div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="p-1"
                      onMouseEnter={() => setHoveredRating(i + 1)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRatingClick(i + 1)}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          i < (hoveredRating || userRating) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-title" className="text-sm font-medium">
                  Review Title
                </label>
                <input
                  id="review-title"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="Summarize your experience"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="review-content" className="text-sm font-medium">
                  Your Review
                </label>
                <Textarea
                  id="review-content"
                  placeholder="Share your experience with this product..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={!isAuthenticated}>
                {isAuthenticated ? "Submit Review" : "Sign in to Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                    <AvatarFallback>
                      {review.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {review.user.name}
                      {review.verified && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-muted-foreground mb-4">{review.content}</p>

              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className={helpfulClicks[review.id] === "helpful" ? "text-primary" : ""}
                  onClick={() => handleHelpfulClick(review.id, "helpful")}
                >
                  <ThumbsUp
                    className={`mr-1 h-4 w-4 ${helpfulClicks[review.id] === "helpful" ? "fill-primary" : ""}`}
                  />
                  Helpful ({helpfulClicks[review.id] === "helpful" ? review.helpful + 1 : review.helpful})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={helpfulClicks[review.id] === "unhelpful" ? "text-primary" : ""}
                  onClick={() => handleHelpfulClick(review.id, "unhelpful")}
                >
                  <ThumbsDown
                    className={`mr-1 h-4 w-4 ${helpfulClicks[review.id] === "unhelpful" ? "fill-primary" : ""}`}
                  />
                  Not Helpful ({helpfulClicks[review.id] === "unhelpful" ? review.unhelpful + 1 : review.unhelpful})
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Custom Badge component for verified purchases
function Badge({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  )
}
