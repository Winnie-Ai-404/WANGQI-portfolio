'use client'

import { useEffect, useRef } from 'react'

export default function AboutScrollCapsule() {
  const layerRef = useRef<HTMLDivElement>(null)
  const capsuleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    const capsule = capsuleRef.current
    if (!layer || !capsule) return

    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!media.matches) return

    let frameId = 0
    let visible = false
    let targetX = -9999
    let targetY = -9999
    let x = -9999
    let y = -9999

    const render = () => {
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      capsule.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frameId = window.requestAnimationFrame(render)
    }

    const isInside = (clientX: number, clientY: number) => {
      const rect = layer.getBoundingClientRect()
      return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isInside(event.clientX, event.clientY)) {
        if (visible) {
          visible = false
          capsule.style.opacity = '0'
        }
        return
      }

      const rect = layer.getBoundingClientRect()
      targetX = event.clientX - rect.left + 18
      targetY = event.clientY - rect.top + 16

      if (!visible) {
        visible = true
        capsule.style.opacity = '1'
      }
    }

    const handlePointerLeave = () => {
      visible = false
      capsule.style.opacity = '0'
    }

    frameId = window.requestAnimationFrame(render)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div ref={layerRef} className="about-scroll-capsule-layer" aria-hidden="true">
      <div ref={capsuleRef} className="about-scroll-capsule">
        <span className="about-scroll-arrow" />
      </div>
    </div>
  )
}
