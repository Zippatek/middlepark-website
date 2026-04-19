import React from 'react'
import { PortalSidebar } from '@/components/layout/PortalSidebar'
import { PortalTopbar } from '@/components/layout/PortalTopbar'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Sidebar */}
      <PortalSidebar />

      {/* Main Content Area */}
      <div className="lg:ml-sidebar transition-all duration-300">
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
