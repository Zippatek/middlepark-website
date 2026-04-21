'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, X, MapPin } from 'lucide-react'
import { SectionHeader, DevelopmentCard } from '@/components/ui'
import type { Development, DevelopmentStatus } from '@/types'
import { getDevelopments } from '@/lib/api'

// The mock data has been replaced by API fetch below


const statusFilters: { label: string; value: DevelopmentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'For Sale', value: 'for-sale' },
  { label: 'Off-Plan', value: 'off-plan' },
  { label: 'Completed', value: 'completed' },
  { label: 'Sold Out', value: 'sold-out' },
]

const neighborhoods = ['All Areas', 'Dakibiyu', 'Katampe Extension', 'Apo', 'Maitama', 'Gwarinpa']

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

function DevelopmentsContent() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DevelopmentStatus | 'all'>('all')
  const [areaFilter, setAreaFilter] = useState('All Areas')
  const [developments, setDevelopments] = useState<Development[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  // Pre-populate search from hero search bar
  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setSearch(q)
  }, [searchParams])

  // Fetch from API whenever filters change
  useEffect(() => {
    setLoading(true)
    getDevelopments({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      neighborhood: areaFilter !== 'All Areas' ? areaFilter : undefined,
      search: search || undefined,
    })
      .then((res) => {
        if (res.success && res.data) {
          setDevelopments(res.data.items)
          setTotal(res.data.total)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [search, statusFilter, areaFilter])

  const hasActiveFilters = statusFilter !== 'all' || areaFilter !== 'All Areas' || search !== ''

  return (
    <>
      {/* Page Hero */}
      <section className="bg-charcoal-dark pt-navbar-offset">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="overline text-white/70 text-xs uppercase tracking-widest mb-3">
              Our Portfolio
            </p>
            <h1 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Our Developments
            </h1>
            <p className="text-white/75 text-base max-w-[540px] leading-relaxed font-sans">
              Browse our portfolio of carefully crafted estates across Nigeria. Every title verified.
              Every unit built to last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-cream-divider sticky top-navbar z-30">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-[400px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-light" />
              <input
                type="text"
                placeholder="Search developments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-cream-border bg-white text-charcoal placeholder-charcoal-light text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all duration-150"
                id="developments-search"
              />
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`px-3.5 py-2 rounded-sm text-xs font-medium uppercase tracking-wide transition-all duration-200 ${
                    statusFilter === f.value
                      ? 'bg-green text-white'
                      : 'bg-green-tint text-charcoal hover:bg-green-muted'
                  }`}
                  id={`filter-${f.value}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Area Dropdown */}
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2.5 rounded-sm border border-cream-border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent cursor-pointer"
                id="filter-area"
              >
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearch('')
                  setStatusFilter('all')
                  setAreaFilter('All Areas')
                }}
                className="flex items-center gap-1 text-charcoal-light text-xs hover:text-green transition-colors duration-200"
                id="clear-filters"
              >
                <X size={14} />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Development Grid */}
      <section className="section-padding bg-cream" id="developments-grid">
        <div className="middlepark-container">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" />
            </div>
          ) : developments.length > 0 ? (
            <>
              <p className="text-charcoal-light text-sm mb-8">
                Showing {developments.length}{total > developments.length ? ` of ${total}` : ''} development{total !== 1 ? 's' : ''}
              </p>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                key={`${statusFilter}-${areaFilter}-${search}`}
                variants={staggerContainer}
              >
                {developments.map((dev) => (
                  <motion.div key={dev.id} variants={staggerItem}>
                    <DevelopmentCard development={dev} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-green-tint flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-green-muted" />
              </div>
              <h3 className="font-cormorant text-charcoal text-2xl font-bold mb-2">
                No developments found
              </h3>
              <p className="text-charcoal-light text-sm mb-6">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setStatusFilter('all')
                  setAreaFilter('All Areas')
                }}
                className="text-green text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  )
}

export default function DevelopmentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-navbar-offset flex items-center justify-center bg-cream">
        <div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DevelopmentsContent />
    </Suspense>
  )
}
