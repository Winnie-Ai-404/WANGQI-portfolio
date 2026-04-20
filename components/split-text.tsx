'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export function SplitText({
  text,
  className,
  delay = 0.06,
  stagger = 0.03,
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.h1
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView || shouldReduceMotion ? 'visible' : 'hidden'}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block whitespace-pre"
          custom={index}
          variants={{
            hidden: {
              opacity: 0,
              y: shouldReduceMotion ? 0 : '0.85em',
              filter: shouldReduceMotion ? 'blur(0px)' : 'blur(5px)',
            },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                delay: shouldReduceMotion ? 0 : delay + i * stagger,
                duration: shouldReduceMotion ? 0 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              },
            }),
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  )
}

