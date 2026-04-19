'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Award,
  CheckCircle2,
  Circle,
  Building2,
  Layers,
  Home,
  Paintbrush,
  Key,
  Shield,
  FileCheck,
} from 'lucide-react'

const unitData = {
  name: '4-Bedroom Terrace Duplex — Unit 12B',
  development: 'Dakibiyu Estate Phase 2',
  id: 'MP-ABJ-0012-12B',
  location: 'Plot 2045, Dakibiyu District, Abuja',
  bedrooms: 4,
  bathrooms: 4,
  size: '280 SQM',
  floor: 'Ground + First',
  parking: '2 Covered Spaces',
  image: '/images/dev-dakibiyu-1.jpg',
}

const specs = [
  { label: 'Bedrooms', value: '4 rooms (all en-suite)', icon: Bed },
  { label: 'Bathrooms', value: '4 + guest toilet', icon: Bath },
  { label: 'Floor Area', value: '280 SQM', icon: Maximize2 },
  { label: 'Floor Plan', value: 'Ground + First', icon: Building2 },
  { label: 'Parking', value: '2 covered spaces', icon: Home },
  { label: 'Title', value: 'AGIS Verified', icon: Shield },
]

const constructionStages = [
  { label: 'Allocation Confirmed', icon: FileCheck, date: 'Jan 2025', progress: 100, completed: true },
  { label: 'Foundation Complete', icon: Layers, date: 'Apr 2025', progress: 100, completed: true },
  { label: 'Block Work & Roofing', icon: Home, date: 'Oct 2025', progress: 100, completed: true },
  { label: 'Finishing Works', icon: Paintbrush, date: 'Apr 2026', progress: 45, completed: false, active: true },
  { label: 'Handover', icon: Key, date: 'Jul 2026', progress: 0, completed: false },
]

export default function MyUnitPage() {
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
            <Image
              src={unitData.image}
              alt={unitData.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Seal */}
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
              {unitData.id}
            </p>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-2">
              {unitData.name}
            </h2>
            <p className="text-charcoal-light text-sm mb-1">{unitData.development}</p>
            <div className="flex items-center gap-1.5 text-charcoal-light text-xs mb-6">
              <MapPin size={12} />
              {unitData.location}
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F4F1] border border-[#C8D9CC] text-charcoal text-xs font-medium">
                <Bed size={14} strokeWidth={1.5} style={{ color: '#286B38' }} />
                {unitData.bedrooms} Bedrooms
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F4F1] border border-[#C8D9CC] text-charcoal text-xs font-medium">
                <Bath size={14} strokeWidth={1.5} style={{ color: '#286B38' }} />
                {unitData.bathrooms} Bathrooms
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F4F1] border border-[#C8D9CC] text-charcoal text-xs font-medium">
                <Maximize2 size={14} strokeWidth={1.5} style={{ color: '#286B38' }} />
                {unitData.size}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ═══ SPECS TABLE ═══ */}
        <motion.div
          className="lg:col-span-1 bg-white rounded-card p-6 border border-cream-divider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="font-cormorant text-charcoal text-lg font-bold mb-5">
            Unit Specifications
          </h3>
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
          <h3 className="font-cormorant text-charcoal text-lg font-bold mb-6">
            Construction Progress
          </h3>

          <div className="space-y-6">
            {constructionStages.map((stage, i) => (
              <div key={stage.label}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-container flex items-center justify-center shrink-0 ${
                    stage.completed ? 'bg-green-tint' : stage.active ? 'bg-green-tint' : 'bg-cream'
                  }`}>
                    <stage.icon
                      size={16}
                      className={stage.completed ? 'text-green' : stage.active ? 'text-green' : 'text-charcoal-light'}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        stage.completed || stage.active ? 'text-charcoal' : 'text-charcoal-light'
                      }`}>
                        {stage.label}
                      </p>
                      <p className="text-charcoal-light text-xs">{stage.date}</p>
                    </div>
                  </div>
                  {stage.completed && (
                    <CheckCircle2 size={16} className="text-green shrink-0" strokeWidth={2} />
                  )}
                </div>
                {/* Progress bar for active stage */}
                {stage.active && (
                  <div className="ml-12">
                    <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.progress}%` }}
                        transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="text-charcoal-light text-[11px] mt-1">{stage.progress}% complete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══ SITE PLAN PLACEHOLDER ═══ */}
      <motion.div
        className="bg-white rounded-card p-6 border border-cream-divider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="font-cormorant text-charcoal text-lg font-bold mb-4">
          Estate Site Plan
        </h3>
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
