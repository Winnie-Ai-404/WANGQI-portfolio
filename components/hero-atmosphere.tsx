'use client'

import { motion, useReducedMotion } from 'framer-motion'

type HeroAtmosphereProps = {
  accent: string
}

export function HeroAtmosphere({ accent }: HeroAtmosphereProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[14%] h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}24` }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 18, 0], y: [0, -12, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[10%] h-56 w-56 rounded-full bg-[#e9e5dd]/85 blur-3xl"
        animate={shouldReduceMotion ? undefined : { x: [0, -16, 0], y: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
