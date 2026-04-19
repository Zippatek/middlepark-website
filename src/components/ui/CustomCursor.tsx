'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  const cursorX = useSpring(0, { stiffness: 400, damping: 25 })
  const cursorY = useSpring(0, { stiffness: 400, damping: 25 })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement
      const isCardImage = target.closest('[data-cursor="view"]') !== null
      
      setIsHoveringImage(isCardImage)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-visible"
    >
      <motion.div
        className="absolute flex items-center justify-center shadow-xl bg-green rounded-full overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHoveringImage ? 100 : 16,
          height: isHoveringImage ? 100 : 16,
          opacity: 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, opacity: { duration: 0.15 } }}
      >
        {isHoveringImage && (
          <>
            <span className="text-white text-[15px] font-bold tracking-wide mr-[-2px]">
              VIEW
            </span>
            <ChevronRight size={17} className="text-white" strokeWidth={2.5} />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
