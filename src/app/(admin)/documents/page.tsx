'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Eye,
  Trash2,
  User,
  Building2,
  Plus
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

export default function AdminDocuments() {
  const { data: session } = useSession()
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mocking for now
    setTimeout(() => {
      setDocs([
        { id: 1, name: 'Allocation Letter - Bakare', client: 'Tunde Bakare', development: 'Dakibiyu Ph 2', category: 'Letter', size: '1.2 MB', date: '2026-04-10' },
        { id: 2, name: 'Payment Receipt #MP-1022', client: 'Aisha Yusuf', development: 'The Residences', category: 'Receipt', size: '450 KB', date: '2026-04-12' },
        { id: 3, name: 'Sale Agreement - Final', client: 'Chidi Okoro', development: 'MiddlePark Heights', category: 'Agreement', size: '2.8 MB', date: '2026-04-05' },
      ])
      setLoading(false)
    }, 800)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Document Vault</h2>
          <p className="text-charcoal-light text-sm">Manage allocation letters, sale agreements, and compliance records.</p>
        </div>
        <button className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit">
          <Plus size={16} /> UPLOAD DOCUMENT
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
        <div className="p-4 bg-cream/30 border-b border-cream-divider flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
            <input
              type="text"
              placeholder="Search by filename, client or development..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-sm text-sm border border-cream-divider focus:border-green-tint focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-cream-divider rounded-sm px-4 py-2 text-sm text-charcoal outline-none">
              <option>All Categories</option>
              <option>Allocation Letters</option>
              <option>Agreements</option>
              <option>Receipts</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/50">
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Document Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Client</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Development</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Added On</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-divider">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-48" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-32" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-40" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-20" /></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : (
                docs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-cream/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-green" />
                        <div>
                          <p className="text-charcoal text-sm font-bold">{doc.name}</p>
                          <p className="text-charcoal-light text-[10px] uppercase font-bold tracking-widest">{doc.category} · {doc.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-charcoal text-xs">
                        <User size={12} className="text-charcoal-light" />
                        {doc.client}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-charcoal text-xs">
                        <Building2 size={12} className="text-charcoal-light" />
                        {doc.development}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-charcoal-light text-xs">
                      {new Date(doc.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-cream rounded text-charcoal-light hover:text-green transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="p-1.5 hover:bg-cream rounded text-charcoal-light hover:text-red transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
