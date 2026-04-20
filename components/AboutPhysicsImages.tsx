'use client'

import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

type AboutPhysicsImagesProps = {
  activeStepIndex: number
}

type ImageInput = {
  key: string
  src: string
  width: number
  height: number
}

type ImageDef = {
  key: string
  width: number
  height: number
  body: Matter.Body
  el: HTMLDivElement
}

const EDU_IMAGES: ImageInput[] = [
  { key: 'hku', src: '/images/edu/hku.png', width: 222, height: 68 },
  { key: 'hust', src: '/images/edu/hust.png', width: 222, height: 68 },
]

const ABILITY_IMAGES: ImageInput[] = [
  { key: '3dmax', src: '/images/ability/3dmax.png', width: 94, height: 94 },
  { key: 'ai', src: '/images/ability/ai.png', width: 90, height: 90 },
  { key: 'c4d', src: '/images/ability/c4d.png', width: 92, height: 92 },
  { key: 'codex', src: '/images/ability/codex.png', width: 90, height: 90 },
  { key: 'cursor', src: '/images/ability/cursor.png', width: 90, height: 90 },
  { key: 'figma', src: '/images/ability/figma.png', width: 90, height: 90 },
  { key: 'keyshoot', src: '/images/ability/keyshoot.png', width: 96, height: 96 },
  { key: 'ps', src: '/images/ability/ps.png', width: 90, height: 90 },
  { key: 'sketch', src: '/images/ability/sketch.png', width: 90, height: 90 },
]

export default function AboutPhysicsImages({ activeStepIndex }: AboutPhysicsImagesProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const spawnedRef = useRef({ edu: false, ability: false })
  const spawnGroupRef = useRef<(group: ImageInput[]) => void>(() => {})
  const [engineReady, setEngineReady] = useState(false)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setHasEnteredViewport(true)
        })
      },
      { threshold: 0.35 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const engine = Matter.Engine.create()
    const runner = Matter.Runner.create()
    const world = engine.world

    engine.gravity.y = 1
    engine.gravity.scale = 0.001

    const host = document.createElement('div')
    host.className = 'about-physics-host'
    root.appendChild(host)

    const defs: ImageDef[] = []
    const bodyByKey = new Map<string, Matter.Body>()
    let walls: Matter.Body[] = []
    let frameId = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const random = (min: number, max: number) => Math.random() * (max - min) + min

    const createItem = (item: ImageInput) => {
      const body = Matter.Bodies.rectangle(0, 0, item.width, item.height, {
        restitution: 0.42,
        friction: 0.46,
        frictionAir: 0.024,
        density: 0.0016,
        chamfer: { radius: 16 },
      })
      Matter.Body.setAngle(body, random(-0.3, 0.3))

      const el = document.createElement('div')
      el.className = 'about-physics-item'
      el.style.width = `${item.width}px`
      el.style.height = `${item.height}px`

      const img = document.createElement('img')
      img.src = item.src
      img.alt = item.key
      img.className = 'about-physics-item-image'
      img.draggable = false
      el.appendChild(img)
      host.appendChild(el)

      Matter.Composite.add(world, body)
      defs.push({ key: item.key, width: item.width, height: item.height, body, el })
      bodyByKey.set(item.key, body)

      const { width } = root.getBoundingClientRect()
      const x = random(Math.max(item.width * 0.55, 36), Math.max(width - item.width * 0.55, 96))
      const y = random(-260, -70)
      Matter.Body.setPosition(body, { x, y })
      Matter.Body.setVelocity(body, { x: random(-1.35, 1.35), y: random(0.2, 1.55) })
      Matter.Body.setAngularVelocity(body, random(-0.05, 0.05))
    }

    const spawnGroup = (group: ImageInput[]) => {
      group.forEach((item) => {
        if (bodyByKey.has(item.key)) return
        createItem(item)
      })
    }
    spawnGroupRef.current = spawnGroup
    setEngineReady(true)

    const rebuildStatics = () => {
      const { width, height } = root.getBoundingClientRect()
      const thickness = 120
      const floorY = height - 72

      if (walls.length) {
        Matter.Composite.remove(world, walls)
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

      walls = [leftWall, rightWall, bottomWall]
      Matter.Composite.add(world, walls)
    }

    const syncDom = () => {
      if (pointer.active) {
        const repelRadius = 230
        const repelRadiusSq = repelRadius * repelRadius
        defs.forEach((item) => {
          const dx = item.body.position.x - pointer.x
          const dy = item.body.position.y - pointer.y
          const distSq = dx * dx + dy * dy
          if (distSq < repelRadiusSq) {
            const dist = Math.max(1, Math.sqrt(distSq))
            const intensity = (1 - dist / repelRadius) * 0.045
            Matter.Sleeping.set(item.body, false)
            Matter.Body.applyForce(item.body, item.body.position, {
              x: (dx / dist) * intensity,
              y: (dy / dist) * intensity - 0.00035,
            })
          }
        })
      }

      defs.forEach((item) => {
        const { x, y } = item.body.position
        item.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${item.body.angle}rad)`
      })
      frameId = window.requestAnimationFrame(syncDom)
    }

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

      const burstRadius = 240
      const burstRadiusSq = burstRadius * burstRadius
      defs.forEach((item) => {
        const dx = item.body.position.x - pointer.x
        const dy = item.body.position.y - pointer.y
        const distSq = dx * dx + dy * dy
        if (distSq < burstRadiusSq) {
          const dist = Math.max(1, Math.sqrt(distSq))
          const burst = (1 - dist / burstRadius) * 0.105
          Matter.Sleeping.set(item.body, false)
          Matter.Body.applyForce(item.body, item.body.position, {
            x: (dx / dist) * burst,
            y: (dy / dist) * burst - 0.0012,
          })
        }
      })
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    rebuildStatics()
    Matter.Runner.run(runner, engine)
    frameId = window.requestAnimationFrame(syncDom)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerleave', handlePointerLeave)

    const resizeObserver = new ResizeObserver(() => {
      rebuildStatics()
    })
    resizeObserver.observe(root)

    return () => {
      spawnGroupRef.current = () => {}
      setEngineReady(false)
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerleave', handlePointerLeave)
      Matter.Runner.stop(runner)
      Matter.World.clear(world, false)
      Matter.Engine.clear(engine)
      root.removeChild(host)
    }
  }, [])

  useEffect(() => {
    if (!engineReady || !hasEnteredViewport) return

    if (activeStepIndex === 0 && !spawnedRef.current.edu) {
      spawnedRef.current.edu = true
      spawnGroupRef.current(EDU_IMAGES)
    }
    if (activeStepIndex === 2 && !spawnedRef.current.ability) {
      spawnedRef.current.ability = true
      spawnGroupRef.current(ABILITY_IMAGES)
    }
  }, [activeStepIndex, engineReady, hasEnteredViewport])

  return <div ref={rootRef} className="about-physics-layer" aria-hidden="true" />
}
