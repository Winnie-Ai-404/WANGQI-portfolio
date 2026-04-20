'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type TextTypeProps = {
  text?: string[] | string
  texts?: string[]
  className?: string
  typingSpeed?: number
  pauseDuration?: number
  deletingSpeed?: number
  variableSpeedEnabled?: boolean
  variableSpeedMin?: number
  variableSpeedMax?: number
  showCursor?: boolean
  cursorCharacter?: string
  cursorBlinkDuration?: number
  startDelay?: number
  maxTypingDuration?: number
  hideCursorOnComplete?: boolean
  reserveFinalSpace?: boolean
}

export function TextType({
  text,
  texts,
  className,
  typingSpeed = 18,
  pauseDuration = 1200,
  deletingSpeed = 24,
  variableSpeedEnabled = false,
  variableSpeedMin = 12,
  variableSpeedMax = 26,
  showCursor = false,
  cursorCharacter = '█',
  cursorBlinkDuration = 0.7,
  startDelay = 120,
  maxTypingDuration,
  hideCursorOnComplete = false,
  reserveFinalSpace = false,
}: TextTypeProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const shouldReduceMotion = useReducedMotion()
  const sourceTexts = useMemo(() => {
    if (texts?.length) return texts
    if (Array.isArray(text) && text.length) return text
    if (typeof text === 'string' && text.length) return [text]
    return ['']
  }, [text, texts])
  const [activeTextIndex, setActiveTextIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(
    shouldReduceMotion ? sourceTexts[0].length : 0,
  )
  const [isDeleting, setIsDeleting] = useState(false)

  const activeText = sourceTexts[activeTextIndex] ?? ''
  const visibleText = useMemo(
    () => activeText.slice(0, visibleCount),
    [activeText, visibleCount],
  )
  const isTypingDone = !isDeleting && visibleCount >= activeText.length
  const shouldRenderCursor =
    showCursor && (!hideCursorOnComplete || sourceTexts.length > 1 || !isTypingDone)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduceMotion) {
      setActiveTextIndex(0)
      setVisibleCount(sourceTexts[0].length)
      return
    }

    let timeoutId: number | null = null
    const hasMultipleTexts = sourceTexts.length > 1
    const baseTypingDelay = variableSpeedEnabled
      ? Math.floor(
          Math.random() * (Math.max(variableSpeedMax - variableSpeedMin, 1) + 1) + variableSpeedMin,
        )
      : typingSpeed
    const targetTypingDelay =
      typeof maxTypingDuration === 'number' && activeText.length > 0
        ? Math.max(1, Math.floor(maxTypingDuration / activeText.length))
        : baseTypingDelay

    const deletingDelay = variableSpeedEnabled
      ? Math.floor(
          Math.random() * (Math.max(variableSpeedMax - variableSpeedMin, 1) + 1) + variableSpeedMin,
        )
      : deletingSpeed

    const run = () => {
      if (!isDeleting) {
        if (visibleCount < activeText.length) {
          const delayForStep =
            visibleCount === 0 ? startDelay + targetTypingDelay : targetTypingDelay
          timeoutId = window.setTimeout(() => {
            setVisibleCount((prev) => prev + 1)
          }, delayForStep)
          return
        }

        if (!hasMultipleTexts) return

        timeoutId = window.setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
        return
      }

      if (visibleCount > 0) {
        timeoutId = window.setTimeout(() => {
          setVisibleCount((prev) => Math.max(0, prev - 1))
        }, deletingDelay)
        return
      }

      setIsDeleting(false)
      setActiveTextIndex((prev) => (prev + 1) % sourceTexts.length)
    }

    run()
    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [
    activeText.length,
    deletingSpeed,
    isDeleting,
    isInView,
    pauseDuration,
    shouldReduceMotion,
    sourceTexts,
    startDelay,
    maxTypingDuration,
    typingSpeed,
    variableSpeedEnabled,
    variableSpeedMax,
    variableSpeedMin,
    visibleCount,
  ])

  return (
    <p ref={ref} className={cn(className, reserveFinalSpace && 'relative')}>
      {reserveFinalSpace ? (
        <span aria-hidden="true" className="invisible block whitespace-pre-wrap">
          {activeText}
        </span>
      ) : null}
      <span className={reserveFinalSpace ? 'absolute left-0 top-0 block' : undefined}>
        {visibleText}
        {shouldRenderCursor ? (
          <span
            aria-hidden="true"
            className="inline-block align-baseline"
            style={{
              marginLeft: '0.08em',
              animation: `text-type-cursor-blink ${cursorBlinkDuration}s steps(1, end) infinite`,
            }}
          >
            {cursorCharacter}
          </span>
        ) : null}
      </span>
    </p>
  )
}
