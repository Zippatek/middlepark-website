import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'green' | 'charcoal' | 'red' | 'warning' | 'outline' | 'sale' | 'rent' | 'sold'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  green: 'bg-green text-white',
  charcoal: 'bg-charcoal text-white',
  red: 'bg-red text-white',
  warning: 'bg-[#D97706] text-white',
  outline: 'bg-transparent border border-cream-border text-charcoal',
  // Property card status mappings
  sale: 'bg-green text-white',
  rent: 'bg-charcoal text-white',
  sold: 'bg-charcoal-light text-white opacity-80',
}

export function Badge({ children, variant = 'green', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-4 py-1.5 rounded-[8px] text-[13px] font-bold uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
