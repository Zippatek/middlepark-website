'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Outer spinning ring structure */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Faded track */}
        <div className="absolute inset-0 rounded-full border-4 border-[#3A3B3F]/10"></div>
        
        {/* Animated red segment */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#ED1B24] border-r-[#ED1B24]"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear"
          }}
        />

        {/* Center M */}
        <motion.div 
          className="text-[#3A3B3F] font-serif font-bold text-xl leading-none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          MP
        </motion.div>
      </div>

      <motion.p
        className="text-[#3A3B3F] text-sm tracking-[0.2em] uppercase font-semibold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        Loading
      </motion.p>
    </div>
  )
}
