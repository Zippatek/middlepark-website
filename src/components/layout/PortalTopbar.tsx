'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/portal': 'Overview',
  '/portal/my-unit': 'My Unit',
  '/portal/payments': 'Payments',
  '/portal/documents': 'Documents',
  '/portal/site-visits': 'Site Visits',
  '/portal/settings': 'Settings',
}

export function PortalTopbar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'Portal'

  return (
    <header
      className="h-topbar bg-white border-b border-cream-divider flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30"
      style={{ boxShadow: '0 2px 8px rgba(90, 91, 95, 0.06)' }}
    >
      {/* Page Title */}
      <div>
        <h1 className="font-cormorant text-charcoal text-xl lg:text-2xl font-bold">
          {title}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:block relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[220px] pl-9 pr-4 py-2 rounded-sm border border-cream-border bg-cream text-charcoal placeholder-charcoal-light text-sm focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent transition-all duration-150"
            id="portal-search"
          />
        </div>

        {/* Notification Bell */}
        <button
          className="relative p-2.5 rounded-lg text-charcoal-light hover:text-charcoal hover:bg-green-tint transition-all duration-200"
          aria-label="View notifications"
          id="portal-notifications"
        >
          <Bell size={20} strokeWidth={1.5} />
          {/* Notification dot */}
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red" />
        </button>

        {/* Mobile search */}
        <button
          className="md:hidden p-2.5 rounded-lg text-charcoal-light hover:text-charcoal hover:bg-green-tint transition-all duration-200"
          aria-label="Search"
        >
          <Search size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
