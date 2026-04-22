'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2,
  Clock,
  MoreVertical,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { adminListEnquiries, adminUpdateEnquiryStatus } from '@/lib/api'
import { cn } from '@/lib/utils'

export default function AdminEnquiries() {
  const { data: session } = useSession()
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const fetchEnquiries = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminListEnquiries(session.accessToken as string, {
          status: filterStatus !== 'all' ? filterStatus : undefined
        })
        if (res.success && res.data) {
          setEnquiries(res.data.items)
        }
      } catch (error) {
        console.error('Failed to fetch enquiries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [session, filterStatus])

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!session?.accessToken) return
    try {
      await adminUpdateEnquiryStatus(session.accessToken as string, id, newStatus)
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-cormorant text-charcoal text-3xl font-bold">Enquiries</h2>
        <p className="text-charcoal-light text-sm">Track and respond to interest from potential MiddlePark home owners.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-cream-divider rounded-card">
          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-1">New Leads</p>
          <div className="flex items-center justify-between">
            <p className="font-cormorant text-charcoal text-3xl font-bold">
              {enquiries.filter(e => e.status === 'new').length}
            </p>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <MessageSquare size={18} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 border border-cream-divider rounded-card">
          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-1">Qualified</p>
          <div className="flex items-center justify-between">
            <p className="font-cormorant text-charcoal text-3xl font-bold">
              {enquiries.filter(e => e.status === 'qualified').length}
            </p>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <CheckCircle2 size={18} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 border border-cream-divider rounded-card">
          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-1">Conversion Rate</p>
          <div className="flex items-center justify-between">
            <p className="font-cormorant text-charcoal text-3xl font-bold">12.5%</p>
            <div className="p-2 bg-green-tint text-green rounded-lg">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {['all', 'new', 'contacted', 'qualified', 'converted'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  filterStatus === status 
                    ? "bg-green text-white" 
                    : "bg-white border border-cream-divider text-charcoal-light hover:border-green-tint"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-cream-divider rounded-card h-24 animate-pulse" />
            ))
          ) : enquiries.length === 0 ? (
            <div className="bg-white border border-cream-divider rounded-card p-20 text-center">
              <p className="text-charcoal-light italic">No enquiries found.</p>
            </div>
          ) : (
            enquiries.map((enq) => (
              <motion.div
                key={enq.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-cream-divider rounded-card p-6 hover:shadow-md transition-shadow relative group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "mt-1 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold",
                      enq.status === 'new' ? "bg-blue-50 text-blue-600" : "bg-cream text-charcoal-light"
                    )}>
                      {enq.fullName[0]}
                    </div>
                    <div>
                      <h4 className="text-charcoal text-sm font-bold">{enq.fullName}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                          <Mail size={12} className="text-green" /> {enq.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                          <Phone size={12} className="text-green" /> {enq.phone}
                        </div>
                        {enq.developmentName && (
                          <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                            <Building2 size={12} className="text-green" /> {enq.developmentName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-charcoal-light text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-1 mb-1">
                        <Clock size={12} /> {new Date(enq.createdAt).toLocaleDateString()}
                      </p>
                      <select 
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className="bg-cream border-none rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-charcoal focus:ring-0"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <button className="p-2 hover:bg-cream rounded-sm text-charcoal-light">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {enq.message && (
                  <div className="mt-4 pt-4 border-t border-cream-divider">
                    <p className="text-charcoal text-xs leading-relaxed italic">
                      "{enq.message}"
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
