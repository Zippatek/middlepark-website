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
  Shield,
  Users,
  Building2,
  Landmark,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePortalStore } from '@/lib/store'
import { useSession, signOut } from 'next-auth/react'
import { logoutUser } from '@/lib/api'

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
  const { data: session } = useSession()

  const handleLogout = async () => {
    const token = (session as any)?.accessToken
    if (token) {
      try {
        await logoutUser(token)
      } catch (e) {
        // Ignore errors (e.g. if token already expired/invalid)
      }
    }
    await signOut({ callbackUrl: '/login' })
  }

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
              <img src="/logos/middlepark-icon.png" alt="MP" className="h-7 w-auto" />
            ) : (
              <img src="/logos/primary-logo.png" alt="MiddlePark Properties" className="h-7 w-auto" />
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
          {!collapsed && (
            <p className="px-4 text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-2">
              Client Portal
            </p>
          )}
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

          {/* Admin Section */}
          {((session?.user as any)?.role === 'SUPER_ADMIN' || (session?.user as any)?.role === 'ADMIN') && (
            <div className={cn("pt-6 mt-6 border-t border-cream-divider", collapsed && "border-none pt-0 mt-0")}>
              {!collapsed && (
                <p className="px-4 text-[10px] font-bold text-red/60 uppercase tracking-widest mb-2">
                  Administration
                </p>
              )}
              <div className="space-y-1">
                {[
                  { label: 'Admin Home', icon: Shield, href: '/admin' },
                  { label: 'All Clients', icon: Users, href: '/admin/clients' },
                  { label: 'Developments', icon: Building2, href: '/admin/developments' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      'flex items-center gap-3 py-3 px-4 text-charcoal-light/40 cursor-not-allowed',
                      collapsed && 'justify-center px-2'
                    )}
                    title={`${item.label} (Coming Soon)`}
                  >
                    <item.icon size={20} strokeWidth={1.5} className="shrink-0" />
                    {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
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
              <span className="text-green text-xs font-bold">
                {session?.user?.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'MP'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-avatar bg-cream-dark flex items-center justify-center shrink-0">
                <span className="text-green text-xs font-bold">
                  {session?.user?.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'MP'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-charcoal text-sm font-medium truncate">{session?.user?.name || 'User'}</p>
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter",
                    (session?.user as any)?.role === 'SUPER_ADMIN' || (session?.user as any)?.role === 'ADMIN'
                      ? "bg-red text-white"
                      : "bg-green-tint text-green"
                  )}>
                    {(session?.user as any)?.role || 'Client'}
                  </span>
                  <p className="text-charcoal-light text-[10px] truncate">{session?.user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
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
