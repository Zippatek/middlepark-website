'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  File,
  FileCheck,
  Receipt,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'All', value: 'all', count: 8 },
  { label: 'Legal', value: 'legal', count: 3 },
  { label: 'Financial', value: 'financial', count: 3 },
  { label: 'Construction', value: 'construction', count: 2 },
]

const documents = [
  {
    id: 1,
    name: 'Offer Letter — Unit 12B',
    category: 'legal',
    date: 'Jan 15, 2025',
    size: '245 KB',
    icon: FileCheck,
  },
  {
    id: 2,
    name: 'Sales Agreement',
    category: 'legal',
    date: 'Jan 20, 2025',
    size: '1.2 MB',
    icon: FileCheck,
  },
  {
    id: 3,
    name: 'Title Deed — AGIS Certificate',
    category: 'legal',
    date: 'Feb 01, 2025',
    size: '890 KB',
    icon: ShieldCheck,
  },
  {
    id: 4,
    name: 'Payment Receipt — Initial Deposit',
    category: 'financial',
    date: 'Jan 15, 2025',
    size: '120 KB',
    icon: Receipt,
  },
  {
    id: 5,
    name: 'Payment Receipt — 2nd Instalment',
    category: 'financial',
    date: 'Apr 15, 2025',
    size: '118 KB',
    icon: Receipt,
  },
  {
    id: 6,
    name: 'Payment Schedule (Updated)',
    category: 'financial',
    date: 'Mar 01, 2025',
    size: '95 KB',
    icon: Receipt,
  },
  {
    id: 7,
    name: 'Construction Update — Q1 2025',
    category: 'construction',
    date: 'Mar 01, 2025',
    size: '3.4 MB',
    icon: File,
  },
  {
    id: 8,
    name: 'Construction Update — Q4 2025',
    category: 'construction',
    date: 'Dec 15, 2025',
    size: '4.1 MB',
    icon: File,
  },
]

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = documents.filter((doc) => {
    if (activeTab !== 'all' && doc.category !== activeTab) return false
    if (search) {
      return doc.name.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

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
            className="pl-9 pr-4 py-2 rounded-sm border border-cream-border bg-white text-charcoal placeholder-charcoal-light text-sm focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent w-full sm:w-[240px]"
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
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wide transition-all duration-200 shrink-0',
              activeTab === tab.value
                ? 'bg-red text-white'
                : 'bg-green-tint text-charcoal hover:bg-green-muted'
            )}
          >
            {tab.label}
            <span className={cn(
              'ml-1.5 text-[10px]',
              activeTab === tab.value ? 'text-white/70' : 'text-charcoal-light'
            )}>
              ({tab.count})
            </span>
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
        {filtered.length > 0 ? (
          <div className="divide-y divide-cream-divider">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-cream/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-container bg-red-tint flex items-center justify-center shrink-0">
                  <doc.icon size={18} className="text-red" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-charcoal text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-charcoal-light text-xs">
                    {doc.date} · {doc.size}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="p-2 rounded-sm text-charcoal-light hover:text-charcoal hover:bg-cream transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Preview"
                    title="Preview"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-2 rounded-sm text-charcoal-light hover:text-red hover:bg-red-tint transition-all"
                    aria-label="Download"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
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
