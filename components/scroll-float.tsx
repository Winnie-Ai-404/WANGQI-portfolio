'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { cn } from '@/lib/utils'

type ScrollFloatProps = {
  text: string
  className?: string
}

type ScrollFloatTokenProps = {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}

function ScrollFloatToken({ char, index, total, progress }: ScrollFloatTokenProps) {
  const start = Math.min((index / Math.max(total, 1)) * 0.72, 0.92)
  const end = Math.min(start + 0.24, 1)
  const y = useTransform(progress, [start, end], ['0.9em', '0em'])
  const opacity = useTransform(progress, [start, end], [0, 1])
  const blur = useTransform(progress, [start, end], [8, 0])

  return (
    <motion.span
      aria-hidden="true"
      className="inline-block whitespace-pre"
      style={{
        y,
        opacity,
        filter: useTransform(blur, (value) => `blur(${value}px)`),
      }}
    >
      {char}
    </motion.span>
  )
}

export function ScrollFloat({ text, className }: ScrollFloatProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const chars = Array.from(text)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 36%'],
  })

  return (
    <p ref={ref} className={cn(className)}>
      {shouldReduceMotion
        ? text
        : chars.map((char, index) => (
            <ScrollFloatToken
              key={`${char}-${index}`}
              char={char}
              index={index}
              total={chars.length}
              progress={scrollYProgress}
            />
          ))}
    </p>
  )
}
