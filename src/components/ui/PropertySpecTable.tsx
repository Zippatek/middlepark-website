'use client'

import React from 'react'
import {
  Hash, Tag, Coins, BedDouble, Bath, Maximize2,
  MapPin, Building2, CalendarDays, type LucideIcon,
} from 'lucide-react'

export interface SpecItem {
  label: string
  value: string | number
  isBold?: boolean
  icon?: LucideIcon
}

interface PropertySpecTableProps {
  specs: SpecItem[]
}

const labelIconMap: Record<string, LucideIcon> = {
  'development id': Hash,
  'status': Tag,
  'base price': Coins,
  'price': Coins,
  'bedrooms': BedDouble,
  'bathrooms': Bath,
  'floor area': Maximize2,
  'size': Maximize2,
  'neighborhood': MapPin,
  'location': MapPin,
  'total units': Building2,
  'units': Building2,
  'projected completion': CalendarDays,
  'completion': CalendarDays,
}

function iconFor(label: string): LucideIcon {
  return labelIconMap[label.toLowerCase()] ?? Tag
}

export default function PropertySpecTable({ specs }: PropertySpecTableProps) {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
      {specs.map((spec, index) => {
        const Icon = spec.icon ?? iconFor(spec.label)
        return (
          <div
            key={index}
            className="group relative flex items-start gap-4 rounded-[16px] border border-cream-border bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-[12px] bg-green/10 text-green flex items-center justify-center group-hover:bg-green group-hover:text-white transition-colors">
              <Icon size={20} strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.14em] text-charcoal-light font-semibold mb-1.5">
                {spec.label}
              </p>
              <p
                className={`text-charcoal leading-tight break-words ${
                  spec.isBold
                    ? 'text-[18px] font-bold font-cormorant'
                    : 'text-[15px] font-semibold'
                }`}
              >
                {spec.value}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
