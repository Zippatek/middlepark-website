'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Download,
} from 'lucide-react'

const paymentSummary = {
  totalPrice: '₦95,000,000',
  totalPaid: '₦62,500,000',
  balance: '₦32,500,000',
  percentPaid: 65.8,
  nextDue: '₦8,125,000',
  nextDate: 'April 15, 2026',
}

const payments = [
  { id: 1, description: 'Initial Deposit', amount: '₦14,250,000', date: 'Jan 15, 2025', status: 'paid' as const },
  { id: 2, description: '2nd Instalment', amount: '₦12,062,500', date: 'Apr 15, 2025', status: 'paid' as const },
  { id: 3, description: '3rd Instalment', amount: '₦12,062,500', date: 'Jul 15, 2025', status: 'paid' as const },
  { id: 4, description: '4th Instalment', amount: '₦12,062,500', date: 'Oct 15, 2025', status: 'paid' as const },
  { id: 5, description: '5th Instalment', amount: '₦12,062,500', date: 'Jan 15, 2026', status: 'paid' as const },
  { id: 6, description: '6th Instalment', amount: '₦8,125,000', date: 'Apr 15, 2026', status: 'upcoming' as const },
  { id: 7, description: '7th Instalment', amount: '₦8,125,000', date: 'Jul 15, 2026', status: 'upcoming' as const },
  { id: 8, description: '8th Instalment', amount: '₦8,125,000', date: 'Oct 15, 2026', status: 'upcoming' as const },
  { id: 9, description: 'Final Payment', amount: '₦8,125,000', date: 'Jan 15, 2027', status: 'upcoming' as const },
]

const statusConfig = {
  paid: { bg: 'bg-green-tint', text: 'text-green', icon: CheckCircle2, label: 'PAID' },
  upcoming: { bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]', icon: Clock, label: 'UPCOMING' },
  overdue: { bg: 'bg-green-tint', text: 'text-green', icon: AlertCircle, label: 'OVERDUE' },
}

export default function PaymentsPage() {
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
          <p className="font-cormorant text-charcoal text-2xl font-bold">{paymentSummary.totalPrice}</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-cream-divider">
          <div className="w-10 h-10 rounded-container bg-green-tint flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-green" strokeWidth={1.5} />
          </div>
          <p className="text-charcoal-light text-xs mb-1">Total Paid</p>
          <p className="font-cormorant text-charcoal text-2xl font-bold">{paymentSummary.totalPaid}</p>
          <p className="text-charcoal-light text-[11px] mt-1">{paymentSummary.percentPaid}% complete</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-cream-divider">
          <div className="w-10 h-10 rounded-container bg-[#FEF3C7] flex items-center justify-center mb-3">
            <Clock size={20} className="text-[#D97706]" strokeWidth={1.5} />
          </div>
          <p className="text-charcoal-light text-xs mb-1">Balance Remaining</p>
          <p className="font-cormorant text-charcoal text-2xl font-bold">{paymentSummary.balance}</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-cream-divider">
          <div className="w-10 h-10 rounded-container bg-green-tint flex items-center justify-center mb-3">
            <AlertCircle size={20} className="text-green" strokeWidth={1.5} />
          </div>
          <p className="text-charcoal-light text-xs mb-1">Next Payment</p>
          <p className="font-cormorant text-charcoal text-2xl font-bold">{paymentSummary.nextDue}</p>
          <p className="text-charcoal-light text-[11px] mt-1">Due: {paymentSummary.nextDate}</p>
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
          <span className="text-green text-sm font-bold">{paymentSummary.percentPaid}%</span>
        </div>
        <div className="w-full h-3 bg-cream rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${paymentSummary.percentPaid}%` }}
            transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-charcoal-light text-xs">₦0</span>
          <span className="text-charcoal-light text-xs">{paymentSummary.totalPrice}</span>
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
          <button className="flex items-center gap-1.5 text-green text-xs font-medium hover:underline">
            <Download size={12} /> Export PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-cream-divider bg-cream">
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">#</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Description</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Due Date</th>
                <th className="text-left px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-charcoal-light text-[11px] font-semibold uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => {
                const config = statusConfig[payment.status]
                return (
                  <tr key={payment.id} className="border-b border-cream-divider hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4 text-charcoal-light text-sm">{payment.id}</td>
                    <td className="px-6 py-4 text-charcoal text-sm font-medium">{payment.description}</td>
                    <td className="px-6 py-4 text-charcoal text-sm font-semibold">{payment.amount}</td>
                    <td className="px-6 py-4 text-charcoal-light text-sm">{payment.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-badge text-[10px] font-semibold uppercase tracking-wider ${config.bg} ${config.text}`}>
                        <config.icon size={10} />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {payment.status === 'paid' ? (
                        <button className="text-green text-xs font-medium hover:underline">Download</button>
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
