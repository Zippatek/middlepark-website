'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingHeroImageProps {
  images: string[]
  alt: string
  intervalMs?: number
  className?: string
  priority?: boolean
}

export function RotatingHeroImage({
  images,
  alt,
  intervalMs = 5000,
  className = '',
  priority = false,
}: RotatingHeroImageProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const tick = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
      setIndex((prev) => (prev + 1) % images.length)
    }

    const id = window.setInterval(tick, intervalMs)
    return () => window.clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={images[index]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        className="absolute inset-0"
      >
        <Image
          src={images[index]}
          alt={alt}
          fill
          className={className}
          priority={priority && index === 0}
        />
      </motion.div>
    </AnimatePresence>
  )
}
