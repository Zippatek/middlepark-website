'use client'
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react'
import { getPayments, getPaymentReceipt } from '@/lib/api'
import type { PortalPayments } from '@/lib/api'
import type { PaymentRecord } from '@/types'

const statusConfig = {
  PAID:     { bg: 'bg-green-tint',  text: 'text-green',       icon: CheckCircle2, label: 'PAID' },
  UPCOMING: { bg: 'bg-[#FEF3C7]',  text: 'text-[#D97706]',   icon: Clock,        label: 'UPCOMING' },
  OVERDUE:  { bg: 'bg-red-50',     text: 'text-red-600',      icon: AlertCircle,  label: 'OVERDUE' },
} as const

function formatNaira(n: number) {
  if (n == null || isNaN(n)) return '₦0';
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function PaymentsPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<PortalPayments | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  useEffect(() => {
    const token = (session as any)?.accessToken
    if (!token) return
    getPayments(token)
      .then((res) => { if (res.success && res.data) setData(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [session])

  const handleDownloadReceipt = async (id: string) => {
    const token = (session as any)?.accessToken
    if (!token) return
    setDownloadingId(id)
    try {
      const res = await getPaymentReceipt(token, parseInt(id))
      if (res.success && res.data?.receiptUrl) {
        window.open(res.data.receiptUrl, '_blank')
      }
    } catch {}
    finally { setDownloadingId(null) }
  }

  if (loading) {
    return (
      <div className="max-w-portal mx-auto space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-cream rounded-card" />)}
        </div>
        <div className="h-20 bg-cream rounded-card" />
        <div className="h-64 bg-cream rounded-card" />
      </div>
    )
  }

  const s = data?.summary
  const schedule = data?.schedule || []
  const percentPaid = s?.percentPaid ?? 0

  return (
    <div className="max-w-portal mx-auto space-y-6">
      {/* ═══ SUMMARY CARDS ═══ */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-card p-5 border border-cream-divider">
          <div className="w-10 h-10 rounded-container bg-green-tint flex items-center justify-center mb-3">
            <CreditCard size={20} className="text-green" strokeWidth={1.5} />
          </div>
          <p className="text-charcoal-light text-xs mb-1">Total Price</p>
          <p className="font-cormorant text-charcoal text-2xl font-bold">{s ? formatNaira(s.totalPrice) : '—'}</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-cream-divider">
          <div className="w-10 h-10 rounded-container bg-green-tint flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-green" strokeWidth={1.5} />
          </div>
          <p className="text-charcoal-light text-xs mb-1">Total Paid</p>
          <p className="font-cormorant text-charcoal text-2xl font-bold">{s ? formatNaira(s.totalPaid) : '—'}</p>
          <p className="text-charcoal-light text-[11px] mt-1">{percentPaid.toFixed(1)}% complete</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-cream-divider">
          <div className="w-10 h-10 rounded-container bg-[#FEF3C7] flex items-center justify-center mb-3">
            <Clock size={20} className="text-[#D97706]" strokeWidth={1.5} />
          </div>
          <p className="text-charcoal-light text-xs mb-1">Balance Remaining</p>
          <p className="font-cormorant text-charcoal text-2xl font-bold">{s ? formatNaira(s.balance) : '—'}</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-cream-divider">
          <div className="w-10 h-10 rounded-container bg-green-tint flex items-center justify-center mb-3">
            <AlertCircle size={20} className="text-green" strokeWidth={1.5} />
          </div>
          <p className="text-charcoal-light text-xs mb-1">Next Payment</p>
          <p className="font-cormorant text-charcoal text-2xl font-bold">
            {s?.nextPayment ? formatNaira(s.nextPayment.amount) : 'None'}
          </p>
          {s?.nextPayment && (
            <p className="text-charcoal-light text-[11px] mt-1">Due: {formatDate(s.nextPayment.dueDate)}</p>
          )}
        </div>
      </motion.div>

      {/* ═══ PROGRESS BAR ═══ */}
      <motion.div
        className="bg-white rounded-card p-6 border border-cream-divider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-cormorant text-charcoal text-lg font-bold">Payment Progress</h3>
          <span className="text-green text-sm font-bold">{percentPaid.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 bg-cream rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentPaid}%` }}
            transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-charcoal-light text-xs">₦0</span>
          <span className="text-charcoal-light text-xs">{s ? formatNaira(s.totalPrice) : '—'}</span>
        </div>
      </motion.div>

      {/* ═══ PAYMENT SCHEDULE TABLE ═══ */}
      <motion.div
        className="bg-white rounded-card border border-cream-divider overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="p-6 pb-4 flex items-center justify-between">
          <h3 className="font-cormorant text-charcoal text-lg font-bold">Payment Schedule</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-cream-divider bg-cream">
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">#</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Milestone</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Due Date</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((payment: PaymentRecord, idx: number) => {
                const status = payment.status.toUpperCase() as keyof typeof statusConfig
                const config = statusConfig[status] || statusConfig.UPCOMING
                return (
                  <tr key={payment.id} className="border-b border-cream-divider hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4 text-charcoal-light text-sm">{payment.instalment ?? idx + 1}</td>
                    <td className="px-6 py-4 text-charcoal text-sm font-medium">{payment.milestoneLabel}</td>
                    <td className="px-6 py-4 text-charcoal text-sm font-semibold">{formatNaira(Number(payment.amount))}</td>
                    <td className="px-6 py-4 text-charcoal-light text-sm">{formatDate(payment.dueDate)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-badge text-[10px] font-semibold uppercase tracking-wider ${config.bg} ${config.text}`}>
                        <config.icon size={10} />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {payment.status === 'paid' ? (
                        <button
                          onClick={() => handleDownloadReceipt(payment.id)}
                          disabled={downloadingId === payment.id}
                          className="text-green text-xs font-medium hover:underline disabled:opacity-50 inline-flex items-center gap-1"
                        >
                          {downloadingId === payment.id ? (
                            <span className="w-3 h-3 border border-green border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Download size={12} />
                          )}
                          Download
                        </button>
                      ) : (
                        <span className="text-charcoal-light text-xs">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
