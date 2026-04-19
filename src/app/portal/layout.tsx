'use client'

import React from 'react'
import { PortalSidebar } from '@/components/layout/PortalSidebar'
import { PortalTopbar } from '@/components/layout/PortalTopbar'
import { usePortalStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarCollapsed = usePortalStore((state) => state.sidebarCollapsed)

  return (
    <div className="min-h-screen bg-cream">
      {/* Sidebar */}
      <PortalSidebar />

      {/* Main Content Area */}
      <div 
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"
        )}
      >
        {/* Topbar */}
        <PortalTopbar />

        {/* Page Content */}
        <main className="p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}

