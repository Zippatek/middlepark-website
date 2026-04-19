'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Home,
  CreditCard,
  FileText,
  CalendarDays,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePortalStore } from '@/lib/store'

const navItems = [
  { label: 'Overview', href: '/portal', icon: LayoutDashboard },
  { label: 'My Unit', href: '/portal/my-unit', icon: Home },
  { label: 'Payments', href: '/portal/payments', icon: CreditCard },
  { label: 'Documents', href: '/portal/documents', icon: FileText },
  { label: 'Site Visits', href: '/portal/site-visits', icon: CalendarDays },
  { label: 'Settings', href: '/portal/settings', icon: Settings },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const collapsed = usePortalStore((state) => state.sidebarCollapsed)
  const toggleSidebar = usePortalStore((state) => state.toggleSidebar)
  const setSidebarCollapsed = usePortalStore((state) => state.setSidebarCollapsed)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white border-r border-cream-divider z-40',
          'transition-all duration-300',
          collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
        )}
        style={{ boxShadow: '2px 0 16px rgba(0, 0, 0, 0.04)' }}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-navbar border-b border-cream-divider px-5',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          <Link href="/" className="flex items-center shrink-0">
            {collapsed ? (
              <img src="/logos/Icon Green.svg" alt="MP" className="h-7 w-auto" />
            ) : (
              <img src="/logos/Full Color.svg" alt="MiddlePark Properties" className="h-7 w-auto" />
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className={cn(
              'p-1.5 rounded-sm text-charcoal-light hover:text-charcoal hover:bg-green-tint transition-all duration-200',
              collapsed && 'hidden'
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto mp-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/portal' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 py-3 transition-all duration-150',
                  collapsed ? 'justify-center px-2 rounded-lg' : 'px-4 rounded-r-lg',
                  isActive
                    ? 'bg-green-tint border-l-[3px] border-green text-charcoal'
                    : 'text-charcoal-light hover:bg-green-tint hover:text-charcoal'
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    'shrink-0',
                    isActive ? 'text-green' : ''
                  )}
                  strokeWidth={1.5}
                />
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Collapse Toggle (when collapsed) */}
        {collapsed && (
          <div className="px-3 py-2">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-charcoal-light hover:text-charcoal hover:bg-green-tint transition-all duration-200"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* User Card */}
        <div className={cn(
          'border-t border-cream-divider p-4',
          collapsed && 'px-3 py-3'
        )}>
          {collapsed ? (
            <div className="w-9 h-9 rounded-avatar bg-cream-dark flex items-center justify-center mx-auto">
              <span className="text-green text-xs font-bold">AB</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-avatar bg-cream-dark flex items-center justify-center shrink-0">
                <span className="text-green text-xs font-bold">AB</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-charcoal text-sm font-medium truncate">Aisha Bello</p>
                <p className="text-charcoal-light text-[11px] truncate">info@middleparkproperties.com</p>
              </div>
              <button
                className="p-1.5 rounded-sm text-charcoal-light hover:text-charcoal transition-colors"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cream-divider z-40 px-2 py-1.5">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/portal' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors duration-200',
                  isActive ? 'text-green' : 'text-charcoal-light'
                )}
              >
                <item.icon size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
