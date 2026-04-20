'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type TiltedCardProps = {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
  showGlare?: boolean
}

export function TiltedCard({
  children,
  className,
  maxTilt = 10,
  perspective = 1200,
  showGlare = true,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [transform, setTransform] = useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
  )
  const [glareStyle, setGlareStyle] = useState({
    x: 50,
    y: 50,
    opacity: 0,
  })

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    const rotateY = (px - 0.5) * maxTilt * 2
    const rotateX = (0.5 - py) * maxTilt * 2

    setTransform(
      `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.01)`,
    )
    setGlareStyle({
      x: px * 100,
      y: py * 100,
      opacity: 0.28,
    })
  }

  const reset = () => {
    setHovered(false)
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`)
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative transform-gpu transition-transform duration-300 ease-out',
        className,
      )}
      style={{ transform }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <div className="relative overflow-hidden rounded-[inherit]">
        {children}
        {showGlare ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: hovered ? glareStyle.opacity : 0,
              background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.35), rgba(255,255,255,0.04) 32%, transparent 62%)`,
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
