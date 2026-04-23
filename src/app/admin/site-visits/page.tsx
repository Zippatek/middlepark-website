'use client'

import React, { useEffect, useState } from 'react'
import { Calendar, Clock, User, MoreVertical, Plus, Building2, X, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { adminListSiteVisits, adminCreateSiteVisit, adminUpdateSiteVisit, adminDeleteSiteVisit, adminListClients, adminListDevelopments } from '@/lib/api'
import { cn } from '@/lib/utils'

export default function AdminSiteVisits() {
  const { data: session } = useSession()
  const [visits, setVisits] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [developments, setDevelopments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'UPCOMING' | 'COMPLETED' | 'CANCELLED'>('UPCOMING')
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    if (!session?.accessToken) return
    setLoading(true)
    try {
      const [v, c, d] = await Promise.all([
        adminListSiteVisits(session.accessToken as string),
        adminListClients(session.accessToken as string),
        adminListDevelopments(session.accessToken as string),
      ])
      if (v.success && v.data) setVisits(v.data)
      if (c.success && c.data) setClients(c.data.items)
      if (d.success && d.data) setDevelopments(d.data.items)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [session])

  const updateStatus = async (id: string, status: string) => {
    if (!session?.accessToken) return
    try {
      await adminUpdateSiteVisit(session.accessToken as string, id, { status })
      setVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v))
    } catch (e) { console.error(e) }
  }

  const remove = async (id: string) => {
    if (!session?.accessToken || !confirm('Delete this visit?')) return
    try {
      await adminDeleteSiteVisit(session.accessToken as string, id)
      setVisits(prev => prev.filter(v => v.id !== id))
    } catch (e) { console.error(e) }
  }

  const filtered = visits.filter(v => (v.status || 'UPCOMING').toUpperCase() === tab)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Site Visits</h2>
          <p className="text-charcoal-light text-sm">Coordinate property tours and site inspections.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit">
          <Plus size={16} /> SCHEDULE VISIT
        </button>
      </div>

      <div className="bg-white p-2 border border-cream-divider rounded-card inline-flex gap-1">
        {(['UPCOMING', 'COMPLETED', 'CANCELLED'] as const).map(s => (
          <button key={s} onClick={() => setTab(s)} className={cn(
            "px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
            tab === s ? "bg-green text-white" : "text-charcoal-light hover:bg-cream"
          )}>{s}</button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? <div className="text-charcoal-light text-sm">Loading…</div>
          : filtered.length === 0 ? <div className="bg-white border border-cream-divider rounded-card p-12 text-center text-charcoal-light italic text-sm">No {tab.toLowerCase()} visits.</div>
          : filtered.map(v => (
            <div key={v.id} className="bg-white p-6 border border-cream-divider rounded-card">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-cream rounded-xl border border-cream-divider">
                  <p className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest">
                    {new Date(v.visitDate).toLocaleString('default', { month: 'short' })}
                  </p>
                  <p className="text-2xl font-cormorant font-bold text-charcoal">{new Date(v.visitDate).getDate()}</p>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-charcoal text-sm font-bold">{v.user?.firstName} {v.user?.lastName}</h4>
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest bg-cream">{v.confirmationNumber}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                      <Building2 size={12} className="text-green" /> {v.development?.name || '—'}
                    </div>
                    <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                      <Clock size={12} className="text-green" /> {v.visitTime || '—'}
                    </div>
                    {v.guide && <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                      <User size={12} className="text-green" /> Guide: {v.guide}
                    </div>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {tab === 'UPCOMING' && <>
                    <button onClick={() => updateStatus(v.id, 'COMPLETED')} className="px-3 py-1.5 bg-green/10 text-green rounded text-[10px] font-bold uppercase">COMPLETE</button>
                    <button onClick={() => updateStatus(v.id, 'CANCELLED')} className="px-3 py-1.5 bg-cream rounded text-[10px] font-bold uppercase text-charcoal">CANCEL</button>
                  </>}
                  <button onClick={() => remove(v.id)} className="p-2 hover:bg-cream rounded text-charcoal-light hover:text-red"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {showForm && <VisitForm
        token={session?.accessToken as string}
        clients={clients}
        developments={developments}
        onClose={() => setShowForm(false)}
        onSaved={() => { setShowForm(false); load() }}
      />}
    </div>
  )
}

function VisitForm({ token, clients, developments, onClose, onSaved }: any) {
  const [userId, setUserId] = useState('')
  const [developmentId, setDevelopmentId] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('10:00')
  const [guide, setGuide] = useState('')
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !developmentId || !visitDate) { setErr('Client, development and date are required'); return }
    setBusy(true); setErr('')
    try {
      const res = await adminCreateSiteVisit(token, { userId, developmentId, visitDate, visitTime, guide, notes })
      if (res.success) onSaved(); else setErr(res.error || 'Create failed')
    } catch (e: any) { setErr(e.message || 'Create failed') }
    finally { setBusy(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-card w-full max-w-lg">
        <div className="p-6 border-b border-cream-divider flex items-center justify-between">
          <h3 className="font-cormorant text-xl font-bold text-charcoal">Schedule Site Visit</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Client</label>
            <select value={userId} onChange={e => setUserId(e.target.value)} className="w-full p-2 bg-cream rounded text-sm">
              <option value="">Select client</option>
              {clients.map((c: any) => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Development</label>
            <select value={developmentId} onChange={e => setDevelopmentId(e.target.value)} className="w-full p-2 bg-cream rounded text-sm">
              <option value="">Select development</option>
              {developments.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Date</label>
              <input type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Time</label>
              <input type="time" value={visitTime} onChange={e => setVisitTime(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Guide</label>
            <input value={guide} onChange={e => setGuide(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full p-2 bg-cream rounded text-sm" />
          </div>
          {err && <p className="text-red text-xs">{err}</p>}
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-cream-divider rounded text-xs font-bold uppercase">Cancel</button>
            <button type="submit" disabled={busy} className="px-4 py-2 bg-green text-white rounded text-xs font-bold uppercase disabled:opacity-50">
              {busy ? 'Saving…' : 'Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
