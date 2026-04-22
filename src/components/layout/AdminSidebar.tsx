'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  CalendarDays,
  Settings,
  LogOut,
  Shield,
  Search,
  ChevronRight,
  MessageSquare,
  BarChart3,
  Globe,
  CreditCard
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'

const adminNavItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Clients', href: '/admin/clients', icon: Users },
  { label: 'Developments', href: '/admin/developments', icon: Building2 },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Documents', href: '/admin/documents', icon: FileText },
  { label: 'Site Visits', href: '/admin/site-visits', icon: CalendarDays },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

const systemNavItems = [
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Public Site', href: '/', icon: Globe },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-full bg-white border-r border-cream-divider z-40">
      {/* Brand Logo */}
      <div className="flex items-center h-16 px-6 border-b border-cream-divider">
        <Link href="/admin" className="flex items-center gap-1">
          <span className="font-bold font-cormorant text-charcoal text-lg">MIDDLE</span>
          <span className="font-bold font-cormorant text-green text-lg">PARK</span>
          <span className="ml-1.5 px-1.5 py-0.5 rounded-sm bg-red/10 text-red text-[10px] font-bold">ADMIN</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-8 overflow-y-auto mp-scrollbar">
        {/* Main Menu */}
        <div>
          <p className="px-3 text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-4">
            Management
          </p>
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-green-tint text-charcoal border-l-[3px] border-green rounded-l-none'
                      : 'text-charcoal-light hover:bg-green-tint hover:text-charcoal'
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn('shrink-0', isActive ? 'text-green' : '')}
                    strokeWidth={1.5}
                  />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* System Menu */}
        <div>
          <p className="px-3 text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-4">
            System
          </p>
          <nav className="space-y-1">
            {systemNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-green-tint text-charcoal'
                      : 'text-charcoal-light hover:bg-green-tint hover:text-charcoal'
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn('shrink-0', isActive ? 'text-green' : '')}
                    strokeWidth={1.5}
                  />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* User Card */}
      <div className="p-4 border-t border-cream-divider">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-cream">
          <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center text-white font-bold text-sm">
            {session?.user?.name?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-charcoal text-sm font-bold truncate">
              {session?.user?.name || 'Admin'}
            </p>
            <p className="text-charcoal-light text-[10px] truncate">
              {(session?.user as any)?.role || 'SUPER_ADMIN'}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-1.5 rounded-lg text-charcoal-light hover:text-red hover:bg-red/10 transition-all"
            title="Log out"
          >
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </aside>
  )
}
