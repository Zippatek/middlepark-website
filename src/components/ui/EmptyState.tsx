import React from 'react'
import Link from 'next/link'
import { Building2, CreditCard, FileText, Calendar, Search, type LucideIcon } from 'lucide-react'
import { Button } from './Button'
import type { EmptyStateProps } from '@/types'

const illustrations: Record<string, LucideIcon> = {
  units: Building2,
  payments: CreditCard,
  documents: FileText,
  'site-visits': Calendar,
  search: Search,
}

export function EmptyState({
  illustration,
  title,
  body,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  const Icon = illustrations[illustration] || Building2

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Illustration Placeholder */}
      <div className="w-[200px] h-[150px] bg-green-tint rounded-card flex items-center justify-center mb-8">
        <Icon size={48} className="text-green-muted" strokeWidth={1} />
      </div>

      {/* Title */}
      <h3 className="font-cormorant text-charcoal text-2xl font-bold mb-3">
        {title}
      </h3>

      {/* Body */}
      <p className="text-charcoal-light text-sm max-w-[360px] mb-6 leading-relaxed">
        {body}
      </p>

      {/* CTA */}
      <Button variant="primary" size="md" href={ctaHref}>
        {ctaLabel}
      </Button>
    </div>
  )
}
