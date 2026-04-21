'use client'
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  Eye,
  Search,
  FileCheck,
  Receipt,
  ShieldCheck,
  File,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getDocuments, downloadDocument } from '@/lib/api'
import type { Document } from '@/types'

const CATEGORY_TABS = [
  { label: 'All',          value: 'all' },
  { label: 'Legal',        value: 'ALLOCATION_LETTER,SALE_AGREEMENT' },
  { label: 'Financial',    value: 'PAYMENT_RECEIPT' },
  { label: 'Construction', value: 'COMPLIANCE_DOCUMENT,OTHER' },
]

function docIcon(category: string) {
  if (category === 'PAYMENT_RECEIPT') return Receipt
  if (category === 'SALE_AGREEMENT' || category === 'ALLOCATION_LETTER') return FileCheck
  if (category === 'COMPLIANCE_DOCUMENT') return ShieldCheck
  return File
}

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function DocumentsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  useEffect(() => {
    const token = (session as any)?.accessToken
    if (!token) return
    setLoading(true)
    const category = activeTab !== 'all' ? activeTab : undefined
    getDocuments(token, { category, search: search || undefined })
      .then((res) => { if (res.success && res.data) setDocuments(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [session, activeTab, search])

  const handleDownload = async (id: string) => {
    const token = (session as any)?.accessToken
    if (!token) return
    setDownloadingId(id)
    try {
      const res = await downloadDocument(token, id)
      if (res.success && res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank')
      }
    } catch {}
    finally { setDownloadingId(null) }
  }

  // Count by category for tab badges
  const countForTab = (val: string) =>
    val === 'all'
      ? documents.length
      : documents.filter((d) => val.split(',').includes(d.category)).length

  return (
    <div className="max-w-portal mx-auto space-y-6">
      {/* ═══ HEADER ═══ */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="font-cormorant text-charcoal text-xl font-bold">Your Documents</h2>
          <p className="text-charcoal-light text-sm">Access and download all your property documents.</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-sm border border-cream-border bg-white text-charcoal placeholder-charcoal-light text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent w-full sm:w-[240px]"
            id="documents-search"
          />
        </div>
      </motion.div>

      {/* ═══ TABS ═══ */}
      <motion.div
        className="flex items-center gap-2 overflow-x-auto pb-1"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wide transition-all duration-200 shrink-0',
              activeTab === tab.value
                ? 'bg-green text-white'
                : 'bg-green-tint text-charcoal hover:bg-green-muted'
            )}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* ═══ DOCUMENT LIST ═══ */}
      <motion.div
        className="bg-white rounded-card border border-cream-divider overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {loading ? (
          <div className="divide-y divide-cream-divider animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-container bg-cream shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-cream rounded w-2/3" />
                  <div className="h-2 bg-cream rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : documents.length > 0 ? (
          <div className="divide-y divide-cream-divider">
            {documents.map((doc) => {
              const Icon = docIcon(doc.category)
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-cream/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-container bg-green-tint flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-green" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-charcoal text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-charcoal-light text-xs">
                      {formatDate(doc.issuedAt)} {doc.fileSize && `· ${doc.fileSize}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDownload(doc.id)}
                      disabled={downloadingId === doc.id}
                      className="p-2 rounded-sm text-charcoal-light hover:text-green hover:bg-green-tint transition-all disabled:opacity-50"
                      aria-label="Download"
                      title="Download"
                    >
                      {downloadingId === doc.id ? (
                        <span className="w-4 h-4 border border-green border-t-transparent rounded-full animate-spin block" />
                      ) : (
                        <Download size={16} />
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText size={40} className="text-green-muted mx-auto mb-3" />
            <p className="text-charcoal text-sm font-medium">No documents found</p>
            <p className="text-charcoal-light text-xs mt-1">Try adjusting your search or filter.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
