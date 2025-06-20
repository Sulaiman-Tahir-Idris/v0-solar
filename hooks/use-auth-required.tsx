"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-provider"

/**
 * Hook to require authentication for client components
 * @param redirectTo Optional path to redirect to if not authenticated (defaults to /login)
 * @returns The authenticated user or redirects
 */
export function useAuthRequired(redirectTo?: string) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only check after initial loading is complete
    if (!isLoading && !isAuthenticated) {
      const loginPath = redirectTo || `/login?callbackUrl=${encodeURIComponent(pathname)}`
      router.push(loginPath)
    }
  }, [isAuthenticated, isLoading, router, pathname, redirectTo])

  return { user, isLoading }
}
