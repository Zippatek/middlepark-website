'use client'
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Award,
  CheckCircle2,
  Building2,
  Layers,
  Home,
  Paintbrush,
  Key,
  Shield,
  FileCheck,
  CreditCard,
  TrendingUp,
  CalendarDays,
  Link2,
} from 'lucide-react'
import Link from 'next/link'
import { getMyUnit } from '@/lib/api'
import type { PortalUnit } from '@/lib/api'

const STAGE_ICONS: Record<string, any> = {
  'Unit Allocated': FileCheck,
  'Foundation Laid': Layers,
  'Block Work Complete': Home,
  'Roofing in Progress': Home,
  'Finishing & MEP': Paintbrush,
  'Handover': Key,
}

function getStageIcon(label: string) {
  return STAGE_ICONS[label] || Shield
}

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`
}

function formatDate(d: string | Date | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function MyUnitPage() {
  const { data: session } = useSession()
  const [unit, setUnit] = useState<PortalUnit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = (session as any)?.accessToken
    if (!token) return
    getMyUnit(token)
      .then((res) => { if (res.success && res.data) setUnit(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [session])

  if (loading) {
    return (
      <div className="max-w-portal mx-auto space-y-6 animate-pulse">
        <div className="h-72 bg-cream rounded-card" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-cream rounded-card" />
          <div className="lg:col-span-2 h-64 bg-cream rounded-card" />
        </div>
        <div className="h-40 bg-cream rounded-card" />
      </div>
    )
  }

  if (!unit) {
    return (
      <div className="max-w-portal mx-auto">
        <div className="bg-white rounded-card p-12 border border-cream-divider text-center">
          <Building2 size={40} className="text-green-muted mx-auto mb-3" strokeWidth={1} />
          <p className="font-cormorant text-charcoal text-xl font-bold mb-2">No Unit Assigned</p>
          <p className="text-charcoal-light text-sm max-w-xs mx-auto mb-6">
            You don't have a unit allocation yet. Contact our team to get started.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-green-dark transition-colors"
          >
            Contact Sales Team
          </Link>
        </div>
      </div>
    )
  }

  const specs = [
    { label: 'Unit Type', value: unit.unitType, icon: Building2 },
    { label: 'Unit Number', value: `Unit ${unit.unitNumber}${unit.block ? `, Block ${unit.block}` : ''}`, icon: Home },
    { label: 'Floor Area', value: unit.floorArea || '—', icon: Maximize2 },
    { label: 'Bedrooms', value: `${unit.bedrooms} (all en-suite)`, icon: Bed },
    { label: 'Bathrooms', value: `${unit.bathrooms}`, icon: Bath },
    { label: 'Quality', value: 'MiddlePark Certified', icon: Award },
  ]

  const financials = [
    { label: 'Total Price', value: formatNaira(unit.totalPrice), icon: CreditCard, color: 'text-green', bg: 'bg-green-tint' },
    { label: 'Amount Paid', value: formatNaira(unit.amountPaid), icon: TrendingUp, color: 'text-green', bg: 'bg-green-tint' },
    { label: 'Balance', value: formatNaira(unit.totalPrice - unit.amountPaid), icon: CalendarDays, color: 'text-[#D97706]', bg: 'bg-[#FEF3C7]' },
  ]

  return (
    <div className="max-w-portal mx-auto space-y-6">

      {/* ═══ UNIT IMAGE CARD ═══ */}
      <motion.div
        className="bg-white rounded-card overflow-hidden border border-cream-divider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[260px] lg:h-[320px]">
            {unit.unitImage ? (
              <Image
                src={unit.unitImage}
                alt={unit.unitType}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-green-tint flex items-center justify-center">
                <Building2 size={48} className="text-green-muted" strokeWidth={1} />
              </div>
            )}
            {/* MiddlePark Seal */}
            <div
              className="absolute bottom-3 left-3 flex items-center gap-1.5"
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.65)',
                borderRadius: '20px',
                padding: '6px 14px',
                boxShadow: '0 2px 12px rgba(40, 107, 56, 0.16)',
              }}
            >
              <Award size={14} style={{ color: '#286B38' }} strokeWidth={2} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#3A3A3C' }}>
                MiddlePark Certified
              </span>
            </div>
          </div>

          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <p className="text-green text-xs font-semibold uppercase tracking-widest mb-2">
              {unit.developmentName}
            </p>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-2">
              {unit.unitType} — Unit {unit.unitNumber}
            </h2>
            <p className="text-charcoal-light text-sm mb-1">
              Allocated: {formatDate(unit.allocationDate)}
            </p>
            {unit.projectedHandover && (
              <p className="text-charcoal-light text-xs mb-4">
                Projected Handover: {formatDate(unit.projectedHandover)}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F4F1] border border-[#C8D9CC] text-charcoal text-xs font-medium">
                <Bed size={14} strokeWidth={1.5} style={{ color: '#286B38' }} />
                {unit.bedrooms} Bedrooms
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F4F1] border border-[#C8D9CC] text-charcoal text-xs font-medium">
                <Bath size={14} strokeWidth={1.5} style={{ color: '#286B38' }} />
                {unit.bathrooms} Bathrooms
              </span>
              {unit.floorArea && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F4F1] border border-[#C8D9CC] text-charcoal text-xs font-medium">
                  <Maximize2 size={14} strokeWidth={1.5} style={{ color: '#286B38' }} />
                  {unit.floorArea}
                </span>
              )}
            </div>

            {/* Link to development */}
            {unit.developmentSlug && (
              <Link
                href={`/developments/${unit.developmentSlug}`}
                className="inline-flex items-center gap-1.5 mt-5 text-green text-xs font-medium hover:underline"
              >
                <Link2 size={12} /> View Development Page
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* ═══ FINANCIALS ═══ */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        {financials.map((f) => (
          <div key={f.label} className="bg-white rounded-card p-5 border border-cream-divider">
            <div className={`w-10 h-10 rounded-container ${f.bg} flex items-center justify-center mb-3`}>
              <f.icon size={18} className={f.color} strokeWidth={1.5} />
            </div>
            <p className="text-charcoal-light text-xs mb-1">{f.label}</p>
            <p className="font-cormorant text-charcoal text-2xl font-bold">{f.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ═══ SPECS TABLE ═══ */}
        <motion.div
          className="lg:col-span-1 bg-white rounded-card p-6 border border-cream-divider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="font-cormorant text-charcoal text-lg font-bold mb-5">Unit Specifications</h3>
          <div className="space-y-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-container bg-green-tint flex items-center justify-center shrink-0">
                  <spec.icon size={16} className="text-green" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-charcoal-light text-[11px]">{spec.label}</p>
                  <p className="text-charcoal text-sm font-medium">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ CONSTRUCTION PROGRESS ═══ */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-card p-6 border border-cream-divider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cormorant text-charcoal text-lg font-bold">Construction Progress</h3>
            <span className="text-green text-sm font-bold">{unit.constructionProgress}%</span>
          </div>

          {/* Overall progress bar */}
          <div className="mb-6">
            <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${unit.constructionProgress}%` }}
                transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-charcoal-light text-xs">Current: {unit.currentStage}</span>
              <span className="text-charcoal-light text-xs">
                Est. {unit.projectedHandover ? new Date(unit.projectedHandover).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }) : 'TBC'}
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {(unit.stages || []).map((stage, i) => {
              const StageIcon = getStageIcon(stage.label)
              return (
                <div key={stage.label}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-container flex items-center justify-center shrink-0 ${
                      stage.completed ? 'bg-green-tint' : (stage as any).active ? 'bg-green-tint' : 'bg-cream'
                    }`}>
                      <StageIcon
                        size={16}
                        className={stage.completed || (stage as any).active ? 'text-green' : 'text-charcoal-light'}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${stage.completed || (stage as any).active ? 'text-charcoal' : 'text-charcoal-light'}`}>
                          {stage.label}
                        </p>
                        <p className="text-charcoal-light text-xs">{stage.date}</p>
                      </div>
                    </div>
                    {stage.completed && (
                      <CheckCircle2 size={16} className="text-green shrink-0" strokeWidth={2} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* ═══ SITE PLAN ═══ */}
      <motion.div
        className="bg-white rounded-card p-6 border border-cream-divider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="font-cormorant text-charcoal text-lg font-bold mb-4">Estate Site Plan</h3>
        <div className="h-[300px] rounded-container bg-green-tint flex items-center justify-center border border-green-muted">
          <div className="text-center">
            <Building2 size={40} className="text-green-muted mx-auto mb-2" />
            <p className="text-charcoal text-sm font-medium">Interactive Site Plan</p>
            <p className="text-charcoal-light text-xs mt-1">Coming soon — your unit highlighted in green</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
