'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

const variantStyles: Record<string, string> = {
  primary:
    'bg-green !text-white hover:bg-green-dark shadow-sm hover:shadow-md active:bg-green-dark',
  secondary:
    'bg-transparent text-charcoal border-[1.5px] border-charcoal hover:bg-green-tint active:bg-green-muted',
  ghost:
    'bg-green-tint text-charcoal hover:bg-green-muted active:bg-green-muted',
  danger:
    'bg-transparent text-red-accent border-[1.5px] border-red-accent hover:bg-red-light active:bg-red-light',
  'white-on-dark':
    'bg-white text-green hover:bg-white/90 active:bg-white/80',
  'ghost-white':
    'bg-transparent text-white border-[1.5px] border-white/70 hover:bg-white/10 active:bg-white/20',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-nav',
  lg: 'px-8 py-3.5 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className,
  fullWidth = false,
  href,
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-full',
    'transition-all duration-300 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2',
    'uppercase tracking-nav',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          children
        )}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseStyles}
    >
      {loading ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        children
      )}
    </button>
  )
}
