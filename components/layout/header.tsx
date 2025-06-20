"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, Sun } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-provider"
import { UserAvatarDropdown } from "@/components/common/user-avatar-dropdown"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Container } from "@/components/ui/container"
import { SearchBar } from "@/components/search/search-bar"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, cartItemCount } = useAuth()

  const navigation = [
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SolarTech Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Add SearchBar here */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs flex items-center justify-center min-w-[1.5rem] bg-blue-500 text-white hover:bg-blue-600">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>

          <ThemeToggle />

          {isAuthenticated ? (
            <UserAvatarDropdown />
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Sun className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">SolarTech Pro</span>
                </div>

                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium py-2 border-b border-border"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {!isAuthenticated && (
                  <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Theme</p>
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
