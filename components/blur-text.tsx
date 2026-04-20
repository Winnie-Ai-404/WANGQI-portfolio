'use client'

import { Fragment, useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BlurTextProps = {
  text: string
  delay?: number
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  onAnimationComplete?: () => void
  className?: string
}

export default function BlurText({
  text,
  delay = 80,
  animateBy = 'letters',
  direction = 'top',
  onAnimationComplete,
  className,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const shouldReduceMotion = useReducedMotion()

  const units = useMemo(() => {
    if (animateBy === 'words') return text.split(/(\s+)/).filter((token) => token.length > 0)
    return Array.from(text)
  }, [animateBy, text])

  const offsetY = direction === 'top' ? '-0.65em' : '0.65em'

  return (
    <p ref={ref} className={cn(className)}>
      {units.map((token, index) => (
        <Fragment key={`${token}-${index}`}>
          <motion.span
            className="inline-block whitespace-pre"
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: offsetY, filter: 'blur(8px)' }
            }
            animate={
              isInView || shouldReduceMotion
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: offsetY, filter: 'blur(8px)' }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : (index * delay) / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={
              index === units.length - 1 && onAnimationComplete ? onAnimationComplete : undefined
            }
          >
            {token}
          </motion.span>
        </Fragment>
      ))}
    </p>
  )
}
