"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { ImageProps } from "next/image"

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function FallbackImage({
  src,
  fallbackSrc = "/placeholder.svg?height=400&width=400",
  alt,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Check if the URL is obviously invalid
  const isInvalidUrl = (url: string): boolean => {
    if (!url || typeof url !== "string") return true

    // Check for common invalid patterns
    const invalidPatterns = ["example.com", "localhost", "test.com", "sample.com", "demo.com"]

    return invalidPatterns.some((pattern) => url.includes(pattern))
  }

  useEffect(() => {
    // Reset states when src changes
    setHasError(false)
    setIsLoading(true)

    // If URL is obviously invalid, use fallback immediately
    if (isInvalidUrl(src as string)) {
      setImgSrc(fallbackSrc)
      setHasError(true)
      setIsLoading(false)
      return
    }

    setImgSrc(src as string)
  }, [src, fallbackSrc])

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative">
      <Image
        {...props}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-200 ${
          isLoading ? "opacity-50" : "opacity-100"
        } ${props.className || ""}`}
      />

      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state indicator (optional) */}
      {hasError && (
        <div className="absolute top-2 right-2 bg-muted/80 rounded-full p-1">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
