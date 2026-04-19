import React from 'react'
import { Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MiddleParkSealProps } from '@/types'

export function MiddleParkSeal({ className, size = 'md' }: MiddleParkSealProps) {
  const sizeConfig = {
    sm: { icon: 12, text: '10px', padding: '4px 10px' },
    md: { icon: 14, text: '11px', padding: '6px 14px' },
  }

  const config = sizeConfig[size]

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.65)',
        borderRadius: '20px',
        padding: config.padding,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      }}
      className={cn('flex items-center gap-1.5', className)}
    >
      <Award
        size={config.icon}
        style={{ color: '#286B38' }}
        strokeWidth={2}
      />
      <span
        style={{
          fontSize: config.text,
          fontWeight: 600,
          color: '#3A3A3C',
        }}
      >
        MiddlePark Certified
      </span>
    </div>
  )
}
