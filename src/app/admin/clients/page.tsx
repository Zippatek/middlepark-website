'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Plus
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { adminListClients, adminCreateClient, adminActivateClient } from '@/lib/api'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function AdminClients() {
  const { data: session } = useSession()
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminListClients(session.accessToken as string)
        if (res.success && res.data) {
          setClients(res.data.items)
        }
      } catch (error) {
        console.error('Failed to fetch clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [session])

  const reload = async () => {
    if (!session?.accessToken) return
    const res = await adminListClients(session.accessToken as string)
    if (res.success && res.data) setClients(res.data.items)
  }

  const toggleActive = async (id: string) => {
    if (!session?.accessToken) return
    try {
      await adminActivateClient(session.accessToken as string, id)
      reload()
    } catch (e) { console.error(e) }
  }

  const filteredClients = clients.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Client Management</h2>
          <p className="text-charcoal-light text-sm">Manage all registered MiddlePark clients and their property allocations.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit">
          <Plus size={16} /> REGISTER NEW CLIENT
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 border border-cream-divider rounded-card flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="w-full pl-10 pr-4 py-2 bg-cream rounded-sm text-sm border border-transparent focus:border-green-tint focus:outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select className="bg-cream border-none rounded-sm px-4 py-2 text-sm text-charcoal focus:ring-0 w-full md:w-40">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="p-2 bg-cream hover:bg-cream-dark rounded-sm text-charcoal-light transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/50">
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Client Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Assigned Unit</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Joined</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-divider">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-32" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-48" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-24" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-16" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-20" /></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-charcoal-light italic text-sm">
                    No clients found matching your search.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-cream/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-tint flex items-center justify-center text-green font-bold text-xs">
                          {client.firstName[0]}{client.lastName[0]}
                        </div>
                        <div>
                          <p className="text-charcoal text-sm font-bold">{client.firstName} {client.lastName}</p>
                          <p className="text-charcoal-light text-[10px]">ID: {client.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-charcoal-light text-xs">
                          <Mail size={12} className="text-green" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-charcoal-light text-xs">
                          <Phone size={12} className="text-green" />
                          {client.phone || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {client.clientUnit ? (
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-charcoal-light" />
                          <span className="text-charcoal text-xs font-medium">
                            {client.clientUnit.unitNumber} ({client.clientUnit.unitType})
                          </span>
                        </div>
                      ) : (
                        <span className="text-charcoal-light/50 text-[10px] italic">No unit assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
                        client.isActive ? "bg-green/10 text-green" : "bg-red/10 text-red"
                      )}>
                        {client.isActive ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        {client.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-charcoal-light text-xs">
                      {new Date(client.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/clients/${client.id}`}
                          className="p-1.5 hover:bg-cream rounded text-charcoal-light hover:text-green transition-colors"
                          title="View Details"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <button className="p-1.5 hover:bg-cream rounded text-charcoal-light hover:text-charcoal transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 bg-cream/30 border-t border-cream-divider flex items-center justify-between">
          <p className="text-charcoal-light text-[10px] uppercase font-bold tracking-widest">
            Showing {filteredClients.length} of {clients.length} clients
          </p>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 bg-white border border-cream-divider rounded text-xs text-charcoal-light disabled:opacity-50">Prev</button>
            <button disabled className="px-3 py-1 bg-white border border-cream-divider rounded text-xs text-charcoal-light disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
      {showForm && <ClientForm token={session?.accessToken as string} onClose={() => setShowForm(false)} onCreated={() => { setShowForm(false); reload() }} />}
    </div>
  )
}

function ClientForm({ token, onClose, onCreated }: { token: string; onClose: () => void; onCreated: () => void }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      const res = await adminCreateClient(token, { firstName, lastName, email, phone, password })
      if (res.success) onCreated(); else setErr(res.error || 'Create failed')
    } catch (e: any) { setErr(e.message || 'Create failed') }
    finally { setBusy(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-card w-full max-w-lg">
        <div className="p-6 border-b border-cream-divider flex items-center justify-between">
          <h3 className="font-cormorant text-xl font-bold text-charcoal">Register New Client</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">First Name</label>
              <input required value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Last Name</label>
              <input required value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Temporary Password</label>
            <input required type="text" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
            <p className="text-[10px] text-charcoal-light mt-1">Share this with the client; they can change it after login.</p>
          </div>
          {err && <p className="text-red text-xs">{err}</p>}
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-cream-divider rounded text-xs font-bold uppercase">Cancel</button>
            <button type="submit" disabled={busy} className="px-4 py-2 bg-green text-white rounded text-xs font-bold uppercase disabled:opacity-50">
              {busy ? 'Saving…' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
