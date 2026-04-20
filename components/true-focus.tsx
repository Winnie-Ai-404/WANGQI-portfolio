'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type TrueFocusProps = {
  sentence: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
  activeIndex?: number
  className?: string
  renderWord?: (word: string, index: number, isActive: boolean) => React.ReactNode
}

type IndicatorRect = {
  left: number
  top: number
  width: number
  height: number
}

export default function TrueFocus({
  sentence,
  manualMode = false,
  blurAmount = 5,
  borderColor = '#ffffff',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  activeIndex: externalActiveIndex,
  className,
  renderWord,
}: TrueFocusProps) {
  const words = useMemo(() => sentence.trim().split(/\s+/).filter(Boolean), [sentence])
  const [internalActiveIndex, setInternalActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [indicatorRect, setIndicatorRect] = useState<IndicatorRect>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  const activeIndex =
    typeof externalActiveIndex === 'number'
      ? Math.max(0, Math.min(externalActiveIndex, Math.max(words.length - 1, 0)))
      : manualMode
        ? Math.max(0, Math.min(0, Math.max(words.length - 1, 0)))
        : internalActiveIndex

  useEffect(() => {
    if (manualMode || words.length <= 1) return
    const totalDelay = Math.max(400, (animationDuration + pauseBetweenAnimations) * 1000)
    const timer = window.setInterval(() => {
      setInternalActiveIndex((prev) => (prev + 1) % words.length)
    }, totalDelay)
    return () => window.clearInterval(timer)
  }, [animationDuration, manualMode, pauseBetweenAnimations, words.length])

  useEffect(() => {
    const root = rootRef.current
    const activeEl = wordRefs.current[activeIndex]
    if (!root || !activeEl) return

    const syncRect = () => {
      const rootRect = root.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()
      setIndicatorRect({
        left: activeRect.left - rootRect.left - 8,
        top: activeRect.top - rootRect.top - 5,
        width: activeRect.width + 16,
        height: activeRect.height + 10,
      })
    }

    syncRect()
    const observer = new ResizeObserver(syncRect)
    observer.observe(root)
    observer.observe(activeEl)
    window.addEventListener('resize', syncRect)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncRect)
    }
  }, [activeIndex, words])

  return (
    <div ref={rootRef} className={cn('relative flex items-center gap-2', className)}>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute"
        animate={indicatorRect}
        transition={{ duration: animationDuration, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="absolute left-0 top-0 h-[9px] w-[9px] border-l-2 border-t-2 rounded-none"
          style={{ borderColor }}
        />
        <span
          className="absolute right-0 top-0 h-[9px] w-[9px] border-r-2 border-t-2 rounded-none"
          style={{ borderColor }}
        />
        <span
          className="absolute bottom-0 left-0 h-[9px] w-[9px] border-b-2 border-l-2 rounded-none"
          style={{ borderColor }}
        />
        <span
          className="absolute bottom-0 right-0 h-[9px] w-[9px] border-b-2 border-r-2 rounded-none"
          style={{ borderColor }}
        />
      </motion.span>

      {words.map((word, index) => {
        const isActive = index === activeIndex
        return (
          <span
            key={`${word}-${index}`}
            ref={(node) => {
              wordRefs.current[index] = node
            }}
            className="inline-flex"
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.76,
              transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`,
            }}
          >
            {renderWord ? renderWord(word, index, isActive) : word}
          </span>
        )
      })}
    </div>
  )
}
