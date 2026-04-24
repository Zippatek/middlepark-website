'use client'

import React, { useEffect, useState } from 'react'
import {
  Building2,
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Star,
  ChevronDown,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import {
  adminListDevelopments,
  adminDeleteDevelopment,
  adminToggleFeatured,
} from '@/lib/api'
import { cn, formatNaira } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

type Status = 'for-sale' | 'off-plan' | 'completed' | 'sold-out'

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  'for-sale': { bg: 'bg-green/10', text: 'text-green', label: 'For Sale' },
  'off-plan': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Off Plan' },
  'completed': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Completed' },
  'sold-out': { bg: 'bg-red-100', text: 'text-red-700', label: 'Sold Out' },
}

export default function AdminDevelopments() {
  const { data: session } = useSession()
  const [developments, setDevelopments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchDevelopments = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminListDevelopments(session.accessToken as string)
        if (res.success && res.data) {
          setDevelopments((res.data as any).items ?? res.data)
        }
      } catch (error) {
        console.error('Failed to fetch developments:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDevelopments()
  }, [session])

  const handleDelete = async (id: string) => {
    if (!session?.accessToken || !confirm('Delete this development? This cannot be undone.')) return
    try {
      await adminDeleteDevelopment(session.accessToken as string, id)
      setDevelopments((prev) => prev.filter((d) => d.id !== id))
    } catch (e) {
      console.error(e)
      alert('Delete failed')
    }
  }

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    if (!session?.accessToken) return
    // Optimistic
    setDevelopments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFeatured: !featured } : d))
    )
    try {
      await adminToggleFeatured(session.accessToken as string, id, !featured)
    } catch (e) {
      console.error(e)
      setDevelopments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isFeatured: featured } : d))
      )
    }
  }

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = developments.filter((d) => {
    const q = search.toLowerCase()
    const matchesText =
      !q ||
      d.name?.toLowerCase().includes(q) ||
      d.neighborhood?.toLowerCase().includes(q) ||
      d.id?.toLowerCase().includes(q)
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter
    const matchesFeatured = !featuredOnly || d.isFeatured
    return matchesText && matchesStatus && matchesFeatured
  })

  const allSelected = filtered.length > 0 && filtered.every((d) => selected.has(d.id))
  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(filtered.map((d) => d.id)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Developments</h2>
          <p className="text-charcoal-light text-sm">
            {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
            {selected.size > 0 && ` · ${selected.size} selected`}
          </p>
        </div>
        <Link
          href="/admin/developments/new"
          className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit hover:bg-green-dark transition-colors"
        >
          <Plus size={16} /> NEW DEVELOPMENT
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-cream-divider rounded-card p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search by name, ID, or neighborhood…"
            className="w-full pl-10 pr-4 py-2 bg-cream rounded-sm text-sm border border-transparent focus:border-green-tint focus:outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-cream rounded-sm pl-3 pr-9 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green/20"
            >
              <option value="all">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="off-plan">Off Plan</option>
              <option value="completed">Completed</option>
              <option value="sold-out">Sold Out</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light pointer-events-none" />
          </div>
          <label className="flex items-center gap-2 px-3 py-2 bg-cream rounded-sm text-sm text-charcoal cursor-pointer hover:bg-cream-dark transition-colors">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              className="accent-green"
            />
            Featured only
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream/60 text-left text-[11px] uppercase tracking-widest text-charcoal-light">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="accent-green"
                  />
                </th>
                <th className="px-2 py-3 w-20">Image</th>
                <th className="px-2 py-3 w-20">Featured</th>
                <th className="px-3 py-3 w-28">Status</th>
                <th className="px-3 py-3">Listing Title</th>
                <th className="px-3 py-3 w-48">Neighborhood</th>
                <th className="px-3 py-3 w-36 text-right">Price From</th>
                <th className="px-3 py-3 w-24 text-center">Units</th>
                <th className="px-3 py-3 w-32">ID</th>
                <th className="px-3 py-3 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-t border-cream-divider">
                    <td colSpan={10} className="px-4 py-4">
                      <div className="h-8 bg-cream animate-pulse rounded-sm" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-20 text-center">
                    <Building2 size={40} className="mx-auto text-cream-divider mb-3" />
                    <p className="text-charcoal-light italic text-sm">No developments found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((dev) => {
                  const s = STATUS_STYLES[dev.status] ?? {
                    bg: 'bg-cream',
                    text: 'text-charcoal',
                    label: dev.status,
                  }
                  const isSelected = selected.has(dev.id)
                  return (
                    <tr
                      key={dev.id}
                      className={cn(
                        'border-t border-cream-divider hover:bg-cream/40 transition-colors group',
                        isSelected && 'bg-green-tint/30'
                      )}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(dev.id)}
                          className="accent-green"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <Link
                          href={`/admin/developments/${dev.id}/edit`}
                          className="block relative w-14 h-11 rounded-[6px] overflow-hidden bg-cream"
                        >
                          {dev.images?.[0] ? (
                            <Image
                              src={dev.images[0]}
                              alt={dev.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : (
                            <Building2
                              size={20}
                              className="absolute inset-0 m-auto text-cream-divider"
                            />
                          )}
                        </Link>
                      </td>
                      <td className="px-2 py-3">
                        <button
                          onClick={() => handleToggleFeatured(dev.id, dev.isFeatured)}
                          className={cn(
                            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                            dev.isFeatured ? 'bg-green' : 'bg-cream-divider'
                          )}
                          title="Toggle featured"
                          aria-label="Toggle featured"
                        >
                          <span
                            className={cn(
                              'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
                              dev.isFeatured ? 'translate-x-4' : 'translate-x-0.5'
                            )}
                          />
                        </button>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold',
                            s.bg,
                            s.text
                          )}
                        >
                          {s.label}
                        </span>
                      </td>
                      <td className="px-3 py-3 min-w-0">
                        <Link
                          href={`/admin/developments/${dev.id}/edit`}
                          className="font-semibold text-charcoal hover:text-green transition-colors line-clamp-1"
                          title={dev.name}
                        >
                          {dev.name}
                        </Link>
                        {dev.tagline && (
                          <p
                            className="text-[11px] text-charcoal-light line-clamp-1 mt-0.5"
                            title={dev.tagline}
                          >
                            {dev.tagline}
                          </p>
                        )}
                      </td>
                      <td className="px-3 py-3 text-charcoal-light">
                        <span className="line-clamp-1" title={`${dev.neighborhood}, ${dev.city}`}>
                          {dev.neighborhood}
                          {dev.city ? `, ${dev.city}` : ''}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-charcoal tabular-nums">
                        {formatNaira(Number(dev.priceFrom))}
                      </td>
                      <td className="px-3 py-3 text-center text-charcoal tabular-nums">
                        <span className="font-semibold">{dev.availableUnits}</span>
                        <span className="text-charcoal-light"> / {dev.totalUnits}</span>
                      </td>
                      <td className="px-3 py-3">
                        <code className="text-[11px] font-mono text-charcoal-light">{dev.id}</code>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/developments/${dev.slug}`}
                            target="_blank"
                            className="p-1.5 hover:bg-cream rounded-sm text-charcoal-light hover:text-green transition-colors"
                            title="View public page"
                          >
                            <Eye size={14} />
                          </Link>
                          <Link
                            href={`/admin/developments/${dev.id}/edit`}
                            className="p-1.5 hover:bg-cream rounded-sm text-charcoal-light hover:text-green transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </Link>
                          <button
                            onClick={() => handleToggleFeatured(dev.id, dev.isFeatured)}
                            className={cn(
                              'p-1.5 hover:bg-cream rounded-sm transition-colors',
                              dev.isFeatured ? 'text-amber-500' : 'text-charcoal-light hover:text-amber-500'
                            )}
                            title="Toggle featured"
                          >
                            <Star size={14} fill={dev.isFeatured ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={() => handleDelete(dev.id)}
                            className="p-1.5 hover:bg-red-50 rounded-sm text-charcoal-light hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
