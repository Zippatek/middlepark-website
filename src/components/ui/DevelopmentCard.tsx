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
  'for-sale': { bg: 'bg-[#D1F7C4]', text: 'text-[#1A3D18]', label: 'FOR SALE' },
  'off-plan': { bg: 'bg-[#F2EDD0]', text: 'text-[#5C5013]', label: 'OFF-PLAN' }, // approximate off-plan to yellowish
  'completed': { bg: 'bg-[#D1F7C4]', text: 'text-[#1A3D18]', label: 'COMPLETED' },
  'sold-out': { bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]', label: 'SOLD OUT' },
}

export function DevelopmentCard({ development, compact = false }: DevelopmentCardProps) {
  const status = statusConfig[development.status]
  const imageHeight = compact ? 'h-[240px]' : 'h-[280px] lg:h-[320px]'

  // If rent, label could be 'FOR RENT', we will use 'FOR RENT' when applicable or fallback to status
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

          {/* Tag Wrapper using Exact Provided CSS (adapted to inline style) */}
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
              backgroundColor: '#F8F7F3', // Cream background to blend with page
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
            
            {/* Corner inverse effects (simulated with tiny divs if needed, but skipping as they are complex to inline perfectly without SVG, Framer often handles them via SVGs or box-shadows. The simple radius above usually suffices for the cutout look.) */}
            <div className="absolute top-0 left-[-10px] w-[10px] h-[10px] pointer-events-none" style={{ boxShadow: '5px -5px 0 5px #F8F7F3', borderTopRightRadius: '10px' }} />
            <div className="absolute bottom-[-10px] right-0 w-[10px] h-[10px] pointer-events-none" style={{ boxShadow: '5px -5px 0 5px #F8F7F3', borderTopRightRadius: '10px' }} />
          </div>

        </div>

        {/* Content Section (No padding, flush with image, sitting on canvas) */}
        <div className="flex flex-col pt-4">
          
          {/* Location Layer */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <MapPin size={15} className="text-[#001a40] shrink-0" strokeWidth={1.5} />
            <span className="text-[#001a40] text-[11px] font-semibold tracking-wide uppercase line-clamp-1">
              {development.neighborhood}, {development.city}
            </span>
          </div>

          {/* Specs & Price Layer */}
          <div className="flex items-center justify-between mb-4">
            
            <div className="flex items-center text-[#001a40]">
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
              
              {development.sizeRange && (
                <div className="flex items-center gap-1.5">
                  <Maximize2 size={15} strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">{development.sizeRange} SQM</span>
                </div>
              )}
            </div>

            {/* Price */}
            <p className="text-[#001a40] text-[17px] font-bold tracking-tight">
              {formatNaira(development.priceFrom)}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[#001a40]/10 mb-3" />

          {/* Title Layer */}
          <h3 className="font-sans text-[#001a40] text-[14px] leading-relaxed font-medium line-clamp-2">
            {development.bedrooms[0] ? `${development.bedrooms[0]}-Bedroom` : ''} {development.name} — {development.neighborhood}
          </h3>
          
        </div>
      </Link>
    </div>
  )
}
