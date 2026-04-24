'use client'

import React, { useEffect, useState } from 'react'
import { FileText, Search, Download, Eye, Trash2, User, Building2, Plus, X, Upload } from 'lucide-react'
import { useSession } from 'next-auth/react'
import {
  adminListDocuments,
  adminUploadDocument,
  adminDeleteDocument,
  adminListClients,
} from '@/lib/api'

export default function AdminDocuments() {
  const { data: session } = useSession()
  const [docs, setDocs] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showUpload, setShowUpload] = useState(false)

  const load = async () => {
    if (!session?.accessToken) return
    setLoading(true)
    try {
      const [d, c] = await Promise.all([
        adminListDocuments(session.accessToken as string),
        adminListClients(session.accessToken as string),
      ])
      if (d.success && d.data) setDocs(d.data.items || d.data)
      if (c.success && c.data) setClients(c.data.items || c.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [session])

  const handleDelete = async (id: string) => {
    if (!session?.accessToken || !confirm('Delete this document?')) return
    try {
      await adminDeleteDocument(session.accessToken as string, id)
      setDocs(prev => prev.filter(d => d.id !== id))
    } catch (e) { console.error(e) }
  }

  const filtered = docs.filter(d => {
    const s = search.toLowerCase()
    if (s && !(d.title?.toLowerCase().includes(s) || d.user?.firstName?.toLowerCase().includes(s) || d.user?.lastName?.toLowerCase().includes(s))) return false
    if (category !== 'all' && d.category !== category) return false
    return true
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Document Vault</h2>
          <p className="text-charcoal-light text-sm">Manage allocation letters, sale agreements, and compliance records.</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit">
          <Plus size={16} /> UPLOAD DOCUMENT
        </button>
      </div>

      <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
        <div className="p-4 bg-cream/30 border-b border-cream-divider flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by filename or client..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-sm text-sm border border-cream-divider focus:border-green-tint focus:outline-none"
            />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="bg-white border border-cream-divider rounded-sm px-4 py-2 text-sm text-charcoal outline-none">
            <option value="all">All Categories</option>
            <option value="ALLOCATION_LETTER">Allocation Letters</option>
            <option value="SALE_AGREEMENT">Sale Agreements</option>
            <option value="RECEIPT">Receipts</option>
            <option value="TITLE_DEED">Title Deeds</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/50">
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Document</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Client</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Development</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Added</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-divider">
              {loading ? Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse"><td className="px-6 py-4" colSpan={5}><div className="h-4 bg-cream rounded w-full" /></td></tr>
              )) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-charcoal-light italic text-sm">No documents found.</td></tr>
              ) : filtered.map(doc => (
                <tr key={doc.id} className="hover:bg-cream/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-green" />
                      <div>
                        <p className="text-charcoal text-sm font-bold">{doc.title}</p>
                        <p className="text-charcoal-light text-[10px] uppercase font-bold tracking-widest">{doc.category} · {doc.fileSize}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-charcoal text-xs">
                      <User size={12} className="text-charcoal-light" />
                      {doc.user?.firstName} {doc.user?.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-charcoal text-xs">
                      <Building2 size={12} className="text-charcoal-light" />
                      {doc.developmentName || '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-charcoal-light text-xs">
                    {new Date(doc.createdAt || doc.issuedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-cream rounded text-charcoal-light hover:text-green transition-colors"><Eye size={18} /></a>
                      <a href={doc.fileUrl} download className="p-1.5 hover:bg-cream rounded text-charcoal-light hover:text-green transition-colors"><Download size={18} /></a>
                      <button onClick={() => handleDelete(doc.id)} className="p-1.5 hover:bg-cream rounded text-charcoal-light hover:text-red transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpload && (
        <UploadModal
          clients={clients}
          token={session?.accessToken as string}
          onClose={() => setShowUpload(false)}
          onUploaded={() => { setShowUpload(false); load() }}
        />
      )}
    </div>
  )
}

function UploadModal({ clients, token, onClose, onUploaded }: { clients: any[]; token: string; onClose: () => void; onUploaded: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('ALLOCATION_LETTER')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !userId || !title) { setError('File, client and title are required'); return }
    setSubmitting(true); setError('')
    try {
      const res = await adminUploadDocument(token, file, { userId, title, category, description })
      if (res.success) onUploaded(); else setError(res.error || 'Upload failed')
    } catch (err: any) { setError(err.message || 'Upload failed') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-card w-full max-w-lg">
        <div className="p-6 border-b border-cream-divider flex items-center justify-between">
          <h3 className="font-cormorant text-xl font-bold text-charcoal">Upload Document</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">File</label>
            <label className="flex items-center gap-2 p-3 border-2 border-dashed border-cream-divider rounded cursor-pointer hover:border-green">
              <Upload size={16} className="text-charcoal-light" />
              <span className="text-sm text-charcoal-light truncate">{file ? file.name : 'Click to select a file'}</span>
              <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Client</label>
            <select value={userId} onChange={e => setUserId(e.target.value)} className="w-full p-2 bg-cream rounded text-sm">
              <option value="">Select a client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName} — {c.email}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-cream rounded text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 bg-cream rounded text-sm">
              <option value="ALLOCATION_LETTER">Allocation Letter</option>
              <option value="SALE_AGREEMENT">Sale Agreement</option>
              <option value="RECEIPT">Receipt</option>
              <option value="TITLE_DEED">Title Deed</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-2 bg-cream rounded text-sm" />
          </div>
          {error && <p className="text-red text-xs">{error}</p>}
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-cream-divider rounded text-xs font-bold uppercase">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 bg-green text-white rounded text-xs font-bold uppercase disabled:opacity-50">
              {submitting ? 'Uploading…' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
