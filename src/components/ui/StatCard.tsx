import React from 'react'
import { cn } from '@/lib/utils'
import type { StatCardProps } from '@/types'

export function StatCard({
  icon: Icon,
  iconBgColor,
  iconColor,
  value,
  label,
  subLabel,
}: StatCardProps) {
  return (
    <div className="mp-card p-5 flex items-start gap-4">
      {/* Icon Container */}
      <div
        className="shrink-0 w-12 h-12 rounded-container flex items-center justify-center"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={22} strokeWidth={1.5} className={cn(iconColor)} />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="text-2xl font-bold text-charcoal font-cormorant leading-none">
          {value}
        </p>
        <p className="text-sm text-charcoal-light mt-1 leading-tight">
          {label}
        </p>
        {subLabel && (
          <p className="text-xs text-charcoal-light/70 mt-0.5">{subLabel}</p>
        )}
      </div>
    </div>
  )
}
