'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { adminListPayments, adminUpdatePaymentStatus } from '@/lib/api'
import { cn, formatNaira } from '@/lib/utils'

export default function AdminPayments() {
  const { data: session } = useSession()
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const fetchPayments = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminListPayments(session.accessToken as string, {
          status: filterStatus !== 'all' ? filterStatus : undefined
        })
        if (res.success && res.data) {
          setPayments(res.data.items)
        }
      } catch (error) {
        console.error('Failed to fetch payments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [session, filterStatus])

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!session?.accessToken) return
    try {
      await adminUpdatePaymentStatus(session.accessToken as string, id, status)
      setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p))
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Payment Schedule</h2>
          <p className="text-charcoal-light text-sm">Monitor revenue collection, verify bank transfers, and issue receipts.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-cream-divider text-charcoal px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2">
            <Download size={16} /> EXPORT RECONCILIATION
          </button>
        </div>
      </div>

      {/* Tabs / Filters */}
      <div className="bg-white p-2 border border-cream-divider rounded-card inline-flex gap-1">
        {['all', 'paid', 'upcoming', 'overdue'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={cn(
              "px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              filterStatus === status 
                ? "bg-green text-white shadow-lg shadow-green/20" 
                : "text-charcoal-light hover:bg-cream"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream/50">
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Client / Reference</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Milestone</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Due Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-divider">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-40" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-32" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-24" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-20" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-cream rounded w-16" /></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-charcoal-light italic text-sm">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-cream/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-cream flex items-center justify-center text-charcoal-light">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="text-charcoal text-sm font-bold">
                            {p.user?.firstName} {p.user?.lastName}
                          </p>
                          <p className="text-charcoal-light text-[10px] font-mono">{p.reference}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-charcoal text-xs font-medium">
                      Instalment #{p.instalment} — {p.milestoneLabel}
                    </td>
                    <td className="px-6 py-4 text-charcoal text-sm font-bold">
                      {formatNaira(p.amount)}
                    </td>
                    <td className="px-6 py-4 text-charcoal-light text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-green" />
                        {new Date(p.dueDate).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={p.status}
                        onChange={(e) => handleStatusUpdate(p.id, e.target.value)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border-none ring-0 focus:ring-0 cursor-pointer",
                          p.status === 'PAID' ? "bg-green/10 text-green" : 
                          p.status === 'OVERDUE' ? "bg-red/10 text-red" : "bg-amber-100 text-amber-600"
                        )}
                      >
                        <option value="PAID">Paid</option>
                        <option value="UPCOMING">Upcoming</option>
                        <option value="OVERDUE">Overdue</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-cream rounded-sm text-charcoal-light opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </button>
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
