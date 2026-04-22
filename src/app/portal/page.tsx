'use client'
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  Home,
  CreditCard,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  Download,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { getPortalOverview } from '@/lib/api'
import type { PortalOverview } from '@/lib/api'

// ─── ANIMATION ──────────────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

function formatNaira(amount: number) {
  if (amount == null) return '₦0';
  return `₦${amount.toLocaleString('en-NG')}`;
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function PortalOverview() {
  const { data: session } = useSession()
  const [data, setData] = useState<PortalOverview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = (session as any)?.accessToken
    if (!token) return
    getPortalOverview(token)
      .then((res) => { if (res.success && res.data) setData(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [session])

  // ─── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-portal mx-auto space-y-6 animate-pulse">
        <div className="h-32 bg-cream rounded-card" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-cream rounded-card" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-cream rounded-card" />
          <div className="space-y-6">
            <div className="h-36 bg-cream rounded-card" />
            <div className="h-40 bg-cream rounded-card" />
          </div>
        </div>
      </div>
    )
  }

  // ─── Stat cards derived from API data ────────────────────────────────────
  const stats = data?.stats
  const statCards = stats ? [
    {
      label: 'Property Value',
      value: formatNaira(stats.propertyValue ?? 0),
      icon: Home,
      change: 'Unit purchase price',
      color: 'text-green',
      bg: 'bg-green-tint',
    },
    {
      label: 'Total Paid',
      value: formatNaira(stats.totalPaid ?? 0),
      icon: CreditCard,
      change: `${(stats.percentPaid ?? 0).toFixed(1)}% of total`,
      color: 'text-green',
      bg: 'bg-green-tint',
    },
    {
      label: 'Balance Remaining',
      value: formatNaira(stats.balanceRemaining ?? 0),
      icon: TrendingUp,
      change: `${stats.instalmentCount ?? 0} instalments left`,
      color: 'text-[#D97706]',
      bg: 'bg-[#FEF3C7]',
    },
    {
      label: 'Construction Progress',
      value: `${stats.constructionProgress ?? 0}%`,
      icon: CheckCircle2,
      change: data?.unit?.unitType || 'Your unit',
      color: 'text-green',
      bg: 'bg-green-tint',
    },
  ] : []

  const firstName = data?.user.firstName || session?.user?.name?.split(' ')[0] || 'there'
  const progress = data?.stats.constructionProgress || 0
  const projectedHandover = data?.unit?.projectedHandover
    ? new Date(data.unit.projectedHandover).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })
    : '—'

  return (
    <div className="max-w-portal mx-auto space-y-6">
      {/* ═══ WELCOME BANNER ═══ */}
      <motion.div
        className="relative overflow-hidden rounded-card p-6 lg:p-8"
        style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3A3A3C 100%)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-green/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[120px] h-[120px] rounded-full bg-green/5 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1.5">
              {getGreeting()}
            </p>
            <h2 className="font-cormorant text-white text-2xl lg:text-3xl font-bold mb-1">
              Welcome back, {firstName}
            </h2>
            <p className="text-white/65 text-sm">
              {data?.unit
                ? `Your unit at ${data.unit.developmentName} is ${progress}% complete.`
                : 'Your portal is ready. Contact us to get started.'}
            </p>
          </div>
          <Link
            href="/portal/my-unit"
            className="inline-flex items-center gap-2 bg-white text-charcoal px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-white/90 transition-all duration-200 shrink-0 self-start lg:self-auto"
          >
            VIEW MY UNIT <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>

      {/* ═══ STAT CARDS ═══ */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {statCards.map((stat) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-card p-5 border border-cream-divider"
            variants={staggerItem}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-container ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-charcoal-light text-xs mb-1">{stat.label}</p>
            <p className="font-cormorant text-charcoal text-2xl font-bold">{stat.value}</p>
            <p className="text-charcoal-light text-[11px] mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ═══ MAIN GRID — Timeline + Next Payment + Recent Docs ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Construction Timeline */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-card p-6 border border-cream-divider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-cormorant text-charcoal text-lg font-bold">Construction Progress</h3>
            <Link href="/portal/my-unit" className="text-green text-xs font-medium hover:underline">
              View details →
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal text-sm font-medium">{progress}% Complete</span>
              <span className="text-charcoal-light text-xs">Est. {projectedHandover}</span>
            </div>
            <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-0">
            {(data?.timeline || []).map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {step.completed ? (
                    <CheckCircle2 size={18} className="text-green shrink-0" strokeWidth={2} />
                  ) : step.active ? (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-green flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green" />
                    </div>
                  ) : (
                    <Circle size={18} className="text-charcoal-light/40 shrink-0" strokeWidth={1.5} />
                  )}
                  {i < (data?.timeline.length || 0) - 1 && (
                    <div className={`w-[2px] h-8 ${step.completed ? 'bg-green' : 'bg-cream-border'}`} />
                  )}
                </div>
                <div className="pb-6">
                  <p className={`text-sm font-medium ${step.completed || step.active ? 'text-charcoal' : 'text-charcoal-light'}`}>
                    {step.label}
                  </p>
                  <p className="text-charcoal-light text-xs">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Next Payment */}
          <motion.div
            className="bg-white rounded-card p-6 border border-cream-divider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cormorant text-charcoal text-lg font-bold">Next Payment</h3>
              <Clock size={16} className="text-charcoal-light" />
            </div>
            {data?.nextPayment ? (
              <div className="text-center py-4">
                <p className="text-charcoal-light text-xs mb-1">Amount Due</p>
                <p className="font-cormorant text-charcoal text-3xl font-bold">
                  {formatNaira(data.nextPayment.amount)}
                </p>
                <p className="text-charcoal-light text-xs mt-2">
                  Due: {new Date(data.nextPayment.dueDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                {data.nextPayment.daysUntilDue <= 30 && (
                  <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-badge bg-[#FEF3C7] text-[#D97706] text-[10px] font-semibold uppercase">
                    Due in {data.nextPayment.daysUntilDue} days
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-charcoal-light text-sm py-4">No upcoming payments</p>
            )}
            <Link
              href="/portal/payments"
              className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 rounded-sm bg-green text-white text-sm font-medium hover:bg-green-dark transition-colors"
            >
              VIEW PAYMENT SCHEDULE <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Recent Documents */}
          <motion.div
            className="bg-white rounded-card p-6 border border-cream-divider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cormorant text-charcoal text-lg font-bold">Recent Documents</h3>
              <Link href="/portal/documents" className="text-green text-xs font-medium hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {(data?.recentDocuments || []).map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 rounded-container bg-cream hover:bg-cream-dark transition-colors cursor-pointer group"
                >
                  <FileText size={16} className="text-green shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-charcoal text-xs font-medium truncate">{doc.name}</p>
                    <p className="text-charcoal-light text-[10px]">{doc.date}</p>
                  </div>
                  <Download size={14} className="text-charcoal-light opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              {(!data?.recentDocuments || data.recentDocuments.length === 0) && (
                <p className="text-charcoal-light text-xs text-center py-4">No documents yet</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
