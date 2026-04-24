'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BedDouble, Bath, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatNaira } from '@/lib/utils'
import type { DevelopmentCardProps } from '@/types'
import type { DevelopmentStatus } from '@/types'

const statusConfig: Record<DevelopmentStatus, { bg: string; text: string; label: string }> = {
  'for-sale': { bg: 'bg-[#286B38]', text: 'text-white', label: 'FOR SALE' },
  'off-plan': { bg: 'bg-[#3A3A3C]', text: 'text-white', label: 'OFF-PLAN' },
  'completed': { bg: 'bg-[#1C1C1E]', text: 'text-white', label: 'COMPLETED' },
  'sold-out': { bg: 'bg-[#ED1B24]', text: 'text-white', label: 'SOLD OUT' },
}

export function DevelopmentCard({ development, compact = false }: DevelopmentCardProps) {
  const status = statusConfig[development.status]
  const imageHeight = compact ? 'h-[240px]' : 'h-[280px] lg:h-[320px]'

  const tagLabel = status.label

  return (
    <div className="group flex flex-col gap-4 w-full bg-transparent">
      <Link href={`/developments/${development.slug}`} className="block">
        
        {/* Image Section */}
        <div className="relative w-full rounded-[16px] overflow-hidden">
          
          <div 
            className={cn('relative w-full cursor-none transition-transform duration-[800ms] group-hover:scale-[1.03]', imageHeight)}
            data-cursor="view"
          >
            <Image
              src={development.images[0] || '/images/dev-dakibiyu-1.jpg'}
              alt={development.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Tag Wrapper */}
          <div
            className="absolute top-0 right-0"
            style={{
              boxSizing: 'border-box',
              width: 'min-content',
              height: 'min-content',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 0px 10px 10px',
              backgroundColor: '#FAFAFA',
              overflow: 'visible',
              zIndex: 10,
              alignContent: 'center',
              flexWrap: 'nowrap',
              gap: '10px',
              borderRadius: '0px 0px 0px 17px',
            }}
          >
            <div className={cn("px-2.5 py-1 rounded-[6px] text-[11px] font-bold tracking-widest", status.bg, status.text)}>
              {tagLabel}
            </div>
            
            {/* Corner inverse effects */}
            <div className="absolute top-0 left-[-10px] w-[10px] h-[10px] pointer-events-none" style={{ boxShadow: '5px -5px 0 5px #FAFAFA', borderTopRightRadius: '10px' }} />
            <div className="absolute bottom-[-10px] right-0 w-[10px] h-[10px] pointer-events-none" style={{ boxShadow: '5px -5px 0 5px #FAFAFA', borderTopRightRadius: '10px' }} />
          </div>

        </div>

        {/* Content Section */}
        <div className="flex flex-col pt-4">
          
          {/* Location Layer */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <MapPin size={15} className="text-charcoal-dark shrink-0" strokeWidth={1.5} />
            <span className="text-charcoal-dark text-[11px] font-semibold tracking-wide uppercase line-clamp-1">
              {development.neighborhood}, {development.city}
            </span>
          </div>

          {/* Specs & Price Layer */}
          <div className="flex items-center justify-between mb-4">
            
            <div className="flex items-center text-charcoal-dark">
              {development.bedrooms.length > 0 && (
                <>
                  <div className="flex items-center gap-1.5">
                    <BedDouble size={16} strokeWidth={1.5} />
                    <span className="text-[13px] font-medium">{development.bedrooms[0]}</span>
                  </div>
                  <span className="mx-2 text-[10px]">•</span>
                </>
              )}
              
              {development.bathrooms.length > 0 && (
                <>
                  <div className="flex items-center gap-1.5">
                    <Bath size={16} strokeWidth={1.5} />
                    <span className="text-[13px] font-medium">{development.bathrooms[0]}</span>
                  </div>
                  <span className="mx-2 text-[10px]">•</span>
                </>
              )}
              
              {development.sizeRange && (() => {
                const raw = development.sizeRange.trim()
                // If the sizeRange is purely numeric (e.g. "200–320" or "280"),
                // append "SQM". Otherwise trust the value as-is ("Three-level
                // residence", "3,380.31 SQM land", "Basement + 3 Floors", ...).
                const isNumeric = /^[\d.,\s–-]+$/.test(raw)
                const display = isNumeric ? `${raw} SQM` : raw
                return (
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Maximize2 size={15} strokeWidth={1.5} className="shrink-0" />
                    <span className="text-[13px] font-medium truncate max-w-[140px]" title={display}>
                      {display}
                    </span>
                  </div>
                )
              })()}
            </div>

            {/* Price */}
            <p className="text-charcoal-dark text-[17px] font-bold tracking-tight">
              {formatNaira(development.priceFrom)}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-cream-border mb-3" />

          {/* Title Layer */}
          {(() => {
            const name = development.name.trim()
            // Only prefix the bedroom count when the name doesn't already
            // start with it — otherwise we end up with "5-Bedroom Luxury
            // 5-Bedroom Semi-Detached..." duplicates.
            const prefix =
              development.bedrooms[0] && !/^\d+-?\s?bedroom/i.test(name)
                ? `${development.bedrooms[0]}-Bedroom `
                : ''
            // Trim long names so the card header stays two lines max.
            const title = `${prefix}${name}`
            const shortTitle = title.length > 72 ? `${title.slice(0, 69).trimEnd()}…` : title
            return (
              <h3
                className="font-sans text-charcoal-dark text-[14px] leading-relaxed font-medium line-clamp-2"
                title={title}
              >
                {shortTitle} — {development.neighborhood}
              </h3>
            )
          })()}
          
        </div>
      </Link>
    </div>
  )
}
