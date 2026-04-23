'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus,
  MapPin,
  Tag,
  Eye,
  Edit2,
  Trash2,
  Star
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { adminListDevelopments, adminDeleteDevelopment, adminToggleFeatured } from '@/lib/api'
import { cn, formatNaira } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminDevelopments() {
  const { data: session } = useSession()
  const [developments, setDevelopments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchDevelopments = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminListDevelopments(session.accessToken as string)
        if (res.success && res.data) {
          setDevelopments(res.data.items)
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
      setDevelopments(prev => prev.filter(d => d.id !== id))
    } catch (e) { console.error(e); alert('Delete failed') }
  }

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    if (!session?.accessToken) return
    try {
      await adminToggleFeatured(session.accessToken as string, id, !featured)
      setDevelopments(prev => prev.map(d => d.id === id ? { ...d, isFeatured: !featured } : d))
    } catch (e) { console.error(e) }
  }

  const filtered = developments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.neighborhood.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Developments</h2>
          <p className="text-charcoal-light text-sm">Manage MiddlePark properties, unit inventory, and marketing status.</p>
        </div>
        <Link href="/admin/developments/new" className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit">
          <Plus size={16} /> NEW DEVELOPMENT
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 border border-cream-divider rounded-card flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search developments..."
            className="w-full pl-10 pr-4 py-2 bg-cream rounded-sm text-sm border border-transparent focus:border-green-tint focus:outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select className="bg-cream border-none rounded-sm px-4 py-2 text-sm text-charcoal focus:ring-0 w-full md:w-40">
            <option>All Status</option>
            <option>For Sale</option>
            <option>Off Plan</option>
            <option>Completed</option>
            <option>Sold Out</option>
          </select>
          <button className="p-2 bg-cream hover:bg-cream-dark rounded-sm text-charcoal-light transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Developments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-cream-divider rounded-card h-80 animate-pulse" />
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <Building2 size={48} className="mx-auto text-cream-divider mb-4" />
            <p className="text-charcoal-light italic">No developments found.</p>
          </div>
        ) : (
          filtered.map((dev) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-cream-divider rounded-card overflow-hidden group hover:shadow-xl hover:shadow-green/5 transition-all duration-300"
            >
              {/* Image Header */}
              <div className="relative h-48 bg-cream">
                {dev.images?.[0] ? (
                  <Image 
                    src={dev.images[0]} 
                    alt={dev.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-cream-divider">
                    <Building2 size={48} />
                  </div>
                )}
                
                {/* Status Pill */}
                <div className={cn(
                  "absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-white",
                  dev.status === 'for-sale' ? 'bg-green' : 
                  dev.status === 'off-plan' ? 'bg-amber-600' :
                  dev.status === 'completed' ? 'bg-blue-600' : 'bg-red'
                )}>
                  {dev.status.replace('-', ' ')}
                </div>

                {/* Featured Badge */}
                {dev.isFeatured && (
                  <div className="absolute top-4 right-4 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-amber-500 shadow-sm">
                    <Star size={14} fill="currentColor" />
                  </div>
                )}

                {/* ID Overlay */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-widest">
                  {dev.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-cormorant text-charcoal text-xl font-bold mb-1 truncate">{dev.name}</h3>
                <div className="flex items-center gap-1.5 text-charcoal-light text-xs mb-4">
                  <MapPin size={12} className="text-green" />
                  {dev.neighborhood}, {dev.city}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-0.5">Price Point</p>
                    <p className="text-charcoal text-sm font-bold">{formatNaira(Number(dev.priceFrom))}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-0.5">Units</p>
                    <p className="text-charcoal text-sm font-bold">{dev.availableUnits} / {dev.totalUnits}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-cream-divider">
                  <div className="flex items-center gap-1">
                    <Link href={`/properties/${dev.slug}`} target="_blank" className="p-2 hover:bg-cream rounded-sm text-charcoal-light hover:text-green transition-colors" title="View Public Page">
                      <Eye size={16} />
                    </Link>
                    <Link href={`/admin/developments/${dev.id}/edit`} className="p-2 hover:bg-cream rounded-sm text-charcoal-light hover:text-green transition-colors" title="Edit Development">
                      <Edit2 size={16} />
                    </Link>
                    <button onClick={() => handleToggleFeatured(dev.id, dev.isFeatured)} className="p-2 hover:bg-cream rounded-sm text-charcoal-light hover:text-amber-500 transition-colors" title="Toggle Featured">
                      <Star size={16} fill={dev.isFeatured ? 'currentColor' : 'none'} />
                    </button>
                    <button onClick={() => handleDelete(dev.id)} className="p-2 hover:bg-cream rounded-sm text-charcoal-light hover:text-red transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Link 
                    href={`/admin/developments/${dev.id}`}
                    className="text-green text-[10px] font-bold uppercase tracking-widest hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
