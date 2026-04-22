'use client'

import React from 'react'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { AdminTopbar } from '@/components/layout/AdminTopbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  // Protect admin routes
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="w-12 h-12 border-4 border-green-tint border-t-green rounded-full animate-spin" />
      </div>
    )
  }

  const role = (session?.user as any)?.role
  if (!session || (role !== 'SUPER_ADMIN' && role !== 'ADMIN')) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#F8F7F3] font-sans">
      <AdminSidebar />
      <div className="flex flex-col lg:pl-64 min-h-screen">
        <AdminTopbar />
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
