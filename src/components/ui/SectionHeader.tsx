import React from 'react'
import { cn } from '@/lib/utils'
import type { SectionHeaderProps } from '@/types'

export function SectionHeader({
  overline,
  heading,
  subCopy,
  align = 'left',
  onDark = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left')}>
      <p
        className={cn(
          'overline text-xs uppercase tracking-widest font-semibold mb-3',
          onDark ? 'text-white/70' : 'text-green'
        )}
      >
        {overline}
      </p>
      <h2
        className={cn(
          'font-cormorant text-4xl font-bold leading-tight',
          onDark ? 'text-white' : 'text-charcoal'
        )}
      >
        {heading}
      </h2>
      {subCopy && (
        <p
          className={cn(
            'text-base mt-4 leading-relaxed',
            onDark ? 'text-white/75' : 'text-charcoal-light',
            align === 'center' ? 'max-w-xl mx-auto' : 'max-w-xl'
          )}
        >
          {subCopy}
        </p>
      )}
    </div>
  )
}
