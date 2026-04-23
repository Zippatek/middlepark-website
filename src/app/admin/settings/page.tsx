'use client'
export const dynamic = 'force-dynamic'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { User, Shield, LogOut } from 'lucide-react'

export default function AdminSettingsPage() {
  const { data: session } = useSession()
  const user: any = session?.user || {}

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-cormorant text-charcoal text-3xl font-bold mb-1">Settings</h1>
        <p className="text-charcoal-light text-sm">Your admin account details.</p>
      </div>

      <section className="bg-white rounded-card border border-cream-divider p-6">
        <div className="flex items-center gap-2 mb-4">
          <User size={16} className="text-green" />
          <h2 className="font-cormorant text-charcoal text-lg font-bold">Profile</h2>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-charcoal-light text-xs uppercase tracking-widest font-bold mb-1">Name</dt>
            <dd className="text-charcoal">{user.firstName || user.name || '—'} {user.lastName || ''}</dd>
          </div>
          <div>
            <dt className="text-charcoal-light text-xs uppercase tracking-widest font-bold mb-1">Email</dt>
            <dd className="text-charcoal">{user.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-charcoal-light text-xs uppercase tracking-widest font-bold mb-1">Role</dt>
            <dd className="text-charcoal">{user.role || '—'}</dd>
          </div>
          <div>
            <dt className="text-charcoal-light text-xs uppercase tracking-widest font-bold mb-1">User ID</dt>
            <dd className="text-charcoal-light text-xs break-all">{user.id || '—'}</dd>
          </div>
        </dl>
      </section>

      <section className="bg-white rounded-card border border-cream-divider p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-green" />
          <h2 className="font-cormorant text-charcoal text-lg font-bold">Session</h2>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red/10 hover:bg-red/20 text-red rounded text-xs font-bold uppercase tracking-widest transition-all"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </section>
    </div>
  )
}
