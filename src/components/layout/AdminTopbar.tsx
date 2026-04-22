'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Search, Menu, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminTopbar() {
  const pathname = usePathname()
  
  // Breadcrumb title logic
  const getPageTitle = () => {
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length <= 1) return 'Dashboard Overview'
    const last = parts[parts.length - 1]
    return last.charAt(0).toUpperCase() + last.slice(1)
  }

  return (
    <header className="h-16 sticky top-0 bg-white/80 backdrop-blur-md border-b border-cream-divider z-30 px-6 lg:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-charcoal-light hover:text-charcoal transition-colors">
          <Menu size={20} />
        </button>
        <h1 className="font-cormorant text-charcoal text-xl font-bold">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center relative">
          <Search size={16} className="absolute left-3 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2 bg-cream rounded-sm text-xs border border-transparent focus:border-green-tint focus:outline-none w-64 transition-all"
          />
        </div>
        
        <button className="relative p-2 text-charcoal-light hover:text-charcoal transition-colors">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red rounded-full border-2 border-white" />
        </button>

        <div className="w-px h-6 bg-cream-divider mx-1" />

        <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-cream transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-green-tint flex items-center justify-center">
            <User size={16} className="text-green" />
          </div>
        </div>
      </div>
    </header>
  )
}
