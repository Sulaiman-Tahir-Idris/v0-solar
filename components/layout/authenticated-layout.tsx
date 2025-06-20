"use client"

import type React from "react"
import { useState } from "react"
import { AuthenticatedSidebar } from "./authenticated-sidebar"
import { AuthenticatedHeader } from "./authenticated-header"
import { Container } from "@/components/ui/container"
import { EmailVerificationBanner } from "@/components/auth/email-verification-banner"
import { cn } from "@/lib/utils"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Email Verification Banner */}
      <EmailVerificationBanner />

      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <AuthenticatedHeader onMenuClick={() => setSidebarOpen(true)} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar - Desktop: Always visible, Mobile: Overlay */}
        <div
          className={cn(
            "flex-shrink-0 w-64 lg:w-64",
            // Mobile: overlay sidebar
            "fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0",
            "transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <AuthenticatedSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <Container className="max-w-none px-0 sm:px-4">{children}</Container>
          </div>
        </main>
      </div>
    </div>
  )
}
