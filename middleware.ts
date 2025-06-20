import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of paths that require authentication
const PROTECTED_PATHS = ["/cart", "/checkout", "/dashboard", "/wishlist", "/account", "/orders", "/admin", "/vendor"]

// Role-specific paths
const ADMIN_PATHS = ["/admin"]
const VENDOR_PATHS = ["/vendor"]

// List of paths that are always public
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/contact",
  "/services",
  "/terms",
  "/privacy",
  "/products", // Allow browsing products without login
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is explicitly public
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check if the path is protected
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // If it's not a protected path, allow access
  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // Check for authentication token in cookies
  const accessToken = request.cookies.get("accessToken")?.value

  // Also check localStorage through a custom header that will be set by the client
  const authHeader = request.headers.get("x-auth-token")

  // If no token and trying to access protected route, redirect to login
  if (!accessToken && !authHeader && isProtectedPath) {
    const url = new URL("/login", request.url)
    // Store the original URL to redirect back after login
    url.searchParams.set("callbackUrl", encodeURIComponent(request.url))
    return NextResponse.redirect(url)
  }

  // For role-specific paths, we'll let the page components handle the role checking
  // since we can't easily decode JWT in middleware without additional dependencies

  return NextResponse.next()
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
