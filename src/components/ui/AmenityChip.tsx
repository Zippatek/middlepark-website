import React from 'react'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

interface AmenityChipProps {
  icon: string
  label: string
  className?: string
}

export function AmenityChip({ icon, label, className }: AmenityChipProps) {
  // Dynamically resolve the Lucide icon by name
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>>)[icon] || Icons.CheckCircle

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'bg-[#FDF2F2] border border-[#F5C6C8] text-charcoal text-xs font-medium',
        className
      )}
    >
      <IconComponent
        size={14}
        strokeWidth={1.5}
        style={{ color: '#ED1B24' }}
      />
      {label}
    </span>
  )
}
