'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Home,
  CreditCard,
  FileText,
  CalendarDays,
  ArrowRight,
  TrendingUp,
  Clock,
  Download,
  CheckCircle2,
  Circle,
} from 'lucide-react'

// ─── ANIMATION ──────────────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const statCards = [
  {
    label: 'Property Value',
    value: '₦95,000,000',
    icon: Home,
    change: '+12% from purchase',
    color: 'text-green',
    bg: 'bg-green-tint',
  },
  {
    label: 'Total Paid',
    value: '₦62,500,000',
    icon: CreditCard,
    change: '65.8% of total',
    color: 'text-green',
    bg: 'bg-green-tint',
  },
  {
    label: 'Balance Remaining',
    value: '₦32,500,000',
    icon: TrendingUp,
    change: '4 instalments left',
    color: 'text-[#D97706]',
    bg: 'bg-[#FEF3C7]',
  },
  {
    label: 'Construction Progress',
    value: '72%',
    icon: CheckCircle2,
    change: 'Roofing stage',
    color: 'text-green',
    bg: 'bg-green-tint',
  },
]

const timelineSteps = [
  { label: 'Allocation Confirmed', date: 'Jan 2025', completed: true },
  { label: 'Foundation Complete', date: 'Apr 2025', completed: true },
  { label: 'Block Work Complete', date: 'Aug 2025', completed: true },
  { label: 'Roofing Complete', date: 'Dec 2025', completed: false, active: true },
  { label: 'Finishing Works', date: 'Apr 2026', completed: false },
  { label: 'Handover', date: 'Jul 2026', completed: false },
]

const recentDocs = [
  { name: 'Offer Letter — Unit 12B', date: 'Mar 15, 2025', type: 'PDF' },
  { name: 'Payment Receipt — March', date: 'Mar 10, 2025', type: 'PDF' },
  { name: 'Construction Update — Q1', date: 'Mar 01, 2025', type: 'PDF' },
]

export default function PortalOverview() {
  return (
    <div className="max-w-portal mx-auto space-y-6">
      {/* ═══ WELCOME BANNER ═══ */}
      <motion.div
        className="relative overflow-hidden rounded-card p-6 lg:p-8"
        style={{
          background: 'linear-gradient(135deg, #3A3B3F 0%, #5A5B5F 100%)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-green/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[120px] h-[120px] rounded-full bg-green/5 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1.5">
              Good afternoon
            </p>
            <h2 className="font-cormorant text-white text-2xl lg:text-3xl font-bold mb-1">
              Welcome back, Aisha
            </h2>
            <p className="text-white/65 text-sm">
              Your unit at Dakibiyu Estate Phase 2 is 72% complete.
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
              <span className="text-charcoal text-sm font-medium">72% Complete</span>
              <span className="text-charcoal-light text-xs">Est. Jul 2026</span>
            </div>
            <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-0">
            {timelineSteps.map((step, i) => (
              <div key={step.label} className="flex gap-3">
                {/* Line + Dot */}
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
                  {i < timelineSteps.length - 1 && (
                    <div className={`w-[2px] h-8 ${step.completed ? 'bg-green' : 'bg-cream-border'}`} />
                  )}
                </div>
                {/* Content */}
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
            <div className="text-center py-4">
              <p className="text-charcoal-light text-xs mb-1">Amount Due</p>
              <p className="font-cormorant text-charcoal text-3xl font-bold">₦8,125,000</p>
              <p className="text-charcoal-light text-xs mt-2">Due: April 15, 2026</p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-badge bg-[#FEF3C7] text-[#D97706] text-[10px] font-semibold uppercase">
                Due in 14 days
              </div>
            </div>
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
              {recentDocs.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center gap-3 p-3 rounded-container bg-cream hover:bg-cream-dark transition-colors cursor-pointer group"
                >
                  <FileText size={16} className="text-green shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="text-charcoal text-xs font-medium truncate">{doc.name}</p>
                    <p className="text-charcoal-light text-[10px]">{doc.date}</p>
                  </div>
                  <Download
                    size={14}
                    className="text-charcoal-light opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
