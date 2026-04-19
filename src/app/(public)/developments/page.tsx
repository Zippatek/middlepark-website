'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X, MapPin } from 'lucide-react'
import { SectionHeader, DevelopmentCard } from '@/components/ui'
import type { Development, DevelopmentStatus } from '@/types'

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const allDevelopments: Development[] = [
  {
    id: 'MP-ABJ-0012',
    name: 'Dakibiyu Estate Phase 2',
    slug: 'dakibiyu-estate-phase-2',
    tagline: 'Where modern living meets nature',
    description: 'A 40-unit gated community of 4 and 5-bedroom terrace duplexes in Dakibiyu.',
    status: 'for-sale',
    location: 'Plot 2045, Dakibiyu District, Abuja',
    neighborhood: 'Dakibiyu',
    city: 'Abuja',
    priceFrom: 95000000,
    priceTo: 120000000,
    unitTypes: [],
    totalUnits: 40,
    availableUnits: 12,
    bedrooms: [4, 5],
    bathrooms: [4, 5],
    sizeRange: '260–320 SQM',
    images: ['/images/dev-dakibiyu-1.jpg'],
    amenities: ['24/7 Security', 'Landscaped Gardens', 'Prepaid Meters', 'Covered Parking'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2025-06-01',
    completionDate: '2027-03-01',
    developer: { name: 'MiddlePark Sales Team', email: 'info@middleparkproperties.com', phone: '08055269579' },
  },
  {
    id: 'MP-ABJ-0015',
    name: 'Katampe Heights',
    slug: 'katampe-heights',
    tagline: 'Elevated living in the heart of Abuja',
    description: 'A collection of 24 carefully designed 5-bedroom detached duplexes.',
    status: 'off-plan',
    location: 'Plot 1089, Katampe Extension, Abuja',
    neighborhood: 'Katampe Extension',
    city: 'Abuja',
    priceFrom: 150000000,
    priceTo: 180000000,
    unitTypes: [],
    totalUnits: 24,
    availableUnits: 24,
    bedrooms: [5],
    bathrooms: [6],
    sizeRange: '380–420 SQM',
    images: ['/images/dev-katampe-1.jpg'],
    amenities: ['Estate Club House', 'Swimming Pool', 'Underground Parking', 'Smart Home Ready'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2025-09-15',
    completionDate: '2028-06-01',
    developer: { name: 'MiddlePark Sales Team', email: 'info@middleparkproperties.com', phone: '08055269579' },
  },
  {
    id: 'MP-ABJ-0018',
    name: 'Apo Residences',
    slug: 'apo-residences',
    tagline: 'Accessible homes, uncompromised quality',
    description: 'A 60-unit community of 3 and 4-bedroom terrace homes in Apo District.',
    status: 'for-sale',
    location: 'Plot 567, Apo District, Abuja',
    neighborhood: 'Apo',
    city: 'Abuja',
    priceFrom: 65000000,
    priceTo: 85000000,
    unitTypes: [],
    totalUnits: 60,
    availableUnits: 28,
    bedrooms: [3, 4],
    bathrooms: [3, 4],
    sizeRange: '200–280 SQM',
    images: ['/images/dev-apo-1.jpg'],
    amenities: ['Perimeter Fencing', 'Borehole Water', 'Tarred Roads', 'Green Areas'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2025-03-01',
    completionDate: '2026-12-01',
    developer: { name: 'MiddlePark Sales Team', email: 'info@middleparkproperties.com', phone: '08055269579' },
  },
  {
    id: 'MP-ABJ-0020',
    name: 'Maitama Gardens',
    slug: 'maitama-gardens',
    tagline: 'The quieter side of Maitama',
    description: 'An exclusive 12-unit enclave of 5-bedroom fully detached homes in Maitama.',
    status: 'completed',
    location: 'Plot 890, Maitama District, Abuja',
    neighborhood: 'Maitama',
    city: 'Abuja',
    priceFrom: 250000000,
    priceTo: 300000000,
    unitTypes: [],
    totalUnits: 12,
    availableUnits: 2,
    bedrooms: [5],
    bathrooms: [6],
    sizeRange: '420–500 SQM',
    images: ['/images/dev-maitama-1.jpg'],
    amenities: ['Private Gardens', 'Staff Quarters', 'Smart Home System', 'Underground Parking'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2024-01-15',
    completionDate: '2025-12-01',
    developer: { name: 'MiddlePark Sales Team', email: 'info@middleparkproperties.com', phone: '08055269579' },
  },
  {
    id: 'MP-ABJ-0022',
    name: 'Gwarinpa Terraces',
    slug: 'gwarinpa-terraces',
    tagline: 'Quality homes, friendly neighbourhood',
    description: 'A 32-unit terrace development in the heart of Gwarinpa.',
    status: 'sold-out',
    location: 'Plot 445, Gwarinpa Estate, Abuja',
    neighborhood: 'Gwarinpa',
    city: 'Abuja',
    priceFrom: 75000000,
    priceTo: 90000000,
    unitTypes: [],
    totalUnits: 32,
    availableUnits: 0,
    bedrooms: [3, 4],
    bathrooms: [3, 4],
    sizeRange: '220–260 SQM',
    images: ['/images/dev-gwarinpa-1.jpg'],
    amenities: ['Gated Community', 'Children Play Area', 'Gym', 'Tarred Roads'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2023-06-01',
    completionDate: '2025-06-01',
    developer: { name: 'MiddlePark Sales Team', email: 'info@middleparkproperties.com', phone: '08055269579' },
  },
  {
    id: 'MP-ABJ-0025',
    name: 'Dakibiyu Estate Phase 3',
    slug: 'dakibiyu-estate-phase-3',
    tagline: 'The next chapter in Dakibiyu',
    description: 'A 50-unit expansion of the Dakibiyu Estate with enhanced community features.',
    status: 'off-plan',
    location: 'Plot 2100, Dakibiyu District, Abuja',
    neighborhood: 'Dakibiyu',
    city: 'Abuja',
    priceFrom: 105000000,
    priceTo: 135000000,
    unitTypes: [],
    totalUnits: 50,
    availableUnits: 50,
    bedrooms: [4, 5],
    bathrooms: [4, 5],
    sizeRange: '270–340 SQM',
    images: ['/images/dev-dakibiyu-2.jpg'],
    amenities: ['24/7 Security', 'Community Centre', 'Jogging Track', 'Solar Backup'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2026-01-01',
    completionDate: '2028-12-01',
    developer: { name: 'MiddlePark Sales Team', email: 'info@middleparkproperties.com', phone: '08055269579' },
  },
]

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

export default function DevelopmentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DevelopmentStatus | 'all'>('all')
  const [areaFilter, setAreaFilter] = useState('All Areas')

  const filtered = useMemo(() => {
    return allDevelopments.filter((dev) => {
      if (statusFilter !== 'all' && dev.status !== statusFilter) return false
      if (areaFilter !== 'All Areas' && dev.neighborhood !== areaFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          dev.name.toLowerCase().includes(q) ||
          dev.neighborhood.toLowerCase().includes(q) ||
          dev.id.toLowerCase().includes(q)
        )
      }
      return true
    })
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
              Browse our portfolio of carefully crafted estates across Abuja. Every title verified.
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
          {filtered.length > 0 ? (
            <>
              <p className="text-charcoal-light text-sm mb-8">
                Showing {filtered.length} development{filtered.length !== 1 ? 's' : ''}
              </p>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                key={`${statusFilter}-${areaFilter}-${search}`}
                variants={staggerContainer}
              >
                {filtered.map((dev) => (
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
