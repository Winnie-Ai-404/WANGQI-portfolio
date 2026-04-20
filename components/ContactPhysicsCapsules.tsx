'use client'

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

type CapsuleDef = {
  label: string
  width: number
  height: number
  body: Matter.Body
  el: HTMLDivElement
}

export default function ContactPhysicsCapsules() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const engine = Matter.Engine.create()
    const runner = Matter.Runner.create()
    const world = engine.world

    engine.gravity.y = 1
    engine.gravity.scale = 0.001

    const capsulesHost = document.createElement('div')
    capsulesHost.className = 'contact-capsules-host'
    root.appendChild(capsulesHost)

    const capsuleInputs = [
      { label: 'iswang7@qq.com', width: 248, height: 58, xRatio: 0.34 },
      { label: 'tel: 15827429087', width: 236, height: 58, xRatio: 0.66 },
    ]

    const capsuleDefs: CapsuleDef[] = capsuleInputs.map((item, index) => {
      const body = Matter.Bodies.rectangle(0, 0, item.width, item.height, {
        restitution: 0.42,
        friction: 0.46,
        frictionAir: 0.025,
        density: 0.0015,
        chamfer: { radius: item.height / 2 },
      })

      // slight initial tilt keeps the motion natural
      Matter.Body.setAngle(body, index === 0 ? -0.22 : 0.21)

      const el = document.createElement('div')
      el.className = 'contact-physics-pill'
      el.textContent = item.label
      capsulesHost.appendChild(el)

      Matter.Composite.add(world, body)

      return {
        label: item.label,
        width: item.width,
        height: item.height,
        body,
        el,
      }
    })

    let walls: Matter.Body[] = []
    let lanyardObstacle: Matter.Body | null = null
    let frameId = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const getFloorY = () => {
      const rootRect = root.getBoundingClientRect()
      const marqueeAnchor = document.querySelector('.contact-marquee-anchor')
      if (!marqueeAnchor) return rootRect.height - 38
      const marqueeRect = marqueeAnchor.getBoundingClientRect()
      // use marquee text line as physical floor
      return Math.max(120, marqueeRect.top - rootRect.top - 36)
    }

    const rebuildStatics = () => {
      const { width, height } = root.getBoundingClientRect()
      const floorY = getFloorY()
      const thickness = 120

      if (walls.length) {
        Matter.Composite.remove(world, walls)
      }
      if (lanyardObstacle) {
        Matter.Composite.remove(world, lanyardObstacle)
      }

      const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, {
        isStatic: true,
      })
      const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, {
        isStatic: true,
      })
      const bottomWall = Matter.Bodies.rectangle(width / 2, floorY + thickness / 2, width * 2, thickness, {
        isStatic: true,
      })

      // central obstacle approximating the lanyard card zone
      lanyardObstacle = Matter.Bodies.rectangle(width / 2, height * 0.56, 238, 318, {
        isStatic: true,
      })

      walls = [leftWall, rightWall, bottomWall]
      Matter.Composite.add(world, [...walls, lanyardObstacle])

      capsuleDefs.forEach((capsule, index) => {
        const x = width * capsuleInputs[index].xRatio
        const y = Math.max(96, height * (0.14 + index * 0.04))
        Matter.Body.setPosition(capsule.body, { x, y })
      })
    }

    const syncDom = () => {
      if (pointer.active) {
        const repelRadius = 230
        const repelRadiusSq = repelRadius * repelRadius
        capsuleDefs.forEach((capsule) => {
          const dx = capsule.body.position.x - pointer.x
          const dy = capsule.body.position.y - pointer.y
          const distSq = dx * dx + dy * dy
          if (distSq < repelRadiusSq) {
            const dist = Math.max(1, Math.sqrt(distSq))
            const intensity = (1 - dist / repelRadius) * 0.045
            Matter.Sleeping.set(capsule.body, false)
            Matter.Body.applyForce(capsule.body, capsule.body.position, {
              x: (dx / dist) * intensity,
              y: (dy / dist) * intensity - 0.00035,
            })
          }
        })
      }

      capsuleDefs.forEach((capsule) => {
        const { x, y } = capsule.body.position
        const angle = capsule.body.angle
        capsule.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`
      })
      frameId = window.requestAnimationFrame(syncDom)
    }

    rebuildStatics()
    Matter.Runner.run(runner, engine)
    frameId = window.requestAnimationFrame(syncDom)

    const getLocalPointer = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const isInsideRoot = (x: number, y: number) => {
      const rect = root.getBoundingClientRect()
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isInsideRoot(event.clientX, event.clientY)) {
        pointer.active = false
        return
      }
      const local = getLocalPointer(event)
      pointer.x = local.x
      pointer.y = local.y
      pointer.active = true
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!isInsideRoot(event.clientX, event.clientY)) return
      const local = getLocalPointer(event)
      pointer.x = local.x
      pointer.y = local.y
      pointer.active = true

      // short impulse burst on click to "knock" capsules away
      const burstRadius = 240
      const burstRadiusSq = burstRadius * burstRadius
      capsuleDefs.forEach((capsule) => {
        const dx = capsule.body.position.x - pointer.x
        const dy = capsule.body.position.y - pointer.y
        const distSq = dx * dx + dy * dy
        if (distSq < burstRadiusSq) {
          const dist = Math.max(1, Math.sqrt(distSq))
          const burst = (1 - dist / burstRadius) * 0.105
          Matter.Sleeping.set(capsule.body, false)
          Matter.Body.applyForce(capsule.body, capsule.body.position, {
            x: (dx / dist) * burst,
            y: (dy / dist) * burst - 0.0012,
          })
        }
      })
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerleave', handlePointerLeave)

    const resizeObserver = new ResizeObserver(() => {
      rebuildStatics()
    })
    resizeObserver.observe(root)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerleave', handlePointerLeave)
      Matter.Runner.stop(runner)
      Matter.World.clear(world, false)
      Matter.Engine.clear(engine)
      root.removeChild(capsulesHost)
    }
  }, [])

  return <div ref={rootRef} className="contact-physics-layer" aria-hidden="true" />
}
