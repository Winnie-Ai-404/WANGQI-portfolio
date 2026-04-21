'use client'

import Image from '@/components/base-path-image'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import type { Project } from '@/data/projects'

type HomeProjectShowcaseProps = {
  projects: Project[]
}

type ShowcaseEntry = {
  slug: string
  title: string
  summary: string
  mediaSrc: string
  mediaAlt: string
  metadata: string
}

const summaryMap: Record<string, string> = {
  elemotion: '面向青少年脊柱侧弯居家康复场景的交互式康复系统设计。',
  'nutri-pick': '围绕健康饮食与个性化推荐的营养管理应用设计。',
  'city-life': '面向老龄化与隔代照护场景的社区服务体验设计项目。',
}

const metadataMap: Record<string, string> = {
  elemotion: '医疗健康 / 康复训练 / 2025',
  'nutri-pick': '健康饮食 / 个性化推荐 / 2025',
  'city-life': '服务设计 / 社区场景 / 2024',
}

function toShowcaseEntries(projects: Project[]): ShowcaseEntry[] {
  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: summaryMap[project.slug] ?? project.subtitle,
    mediaSrc: project.hero.image,
    mediaAlt: project.hero.imageAlt,
    metadata: metadataMap[project.slug] ?? project.tags.slice(0, 3).join(' / '),
  }))
}

function ShowcaseImageLayer({
  item,
  index,
  imageFloat,
}: {
  item: ShowcaseEntry
  index: number
  imageFloat: MotionValue<number>
}) {
  const distance = useTransform(imageFloat, (value) => value - index)
  const opacity = useTransform(distance, [-1.4, -0.5, 0, 0.5, 1.4], [0, 0.08, 1, 0.08, 0])
  const scale = useTransform(distance, [-1.1, -0.3, 0, 0.3, 1.1], [0.92, 0.97, 1, 0.97, 0.92])
  const y = useTransform(distance, [-1.2, -0.2, 0, 0.2, 1.2], [72, 16, 0, -16, -72])

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ opacity, scale, y }}
    >
      <div className="relative h-[58vh] w-[min(84vw,1080px)] overflow-hidden rounded-[22px] sm:h-[60vh]">
        <Image
          src={item.mediaSrc}
          alt={item.mediaAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 92vw, 84vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.16)_100%)]" />
      </div>
    </motion.div>
  )
}

function ShowcaseTitleLayer({
  item,
  index,
  titleFloat,
}: {
  item: ShowcaseEntry
  index: number
  titleFloat: MotionValue<number>
}) {
  const distance = useTransform(titleFloat, (value) => value - index)
  const opacity = useTransform(distance, [-1.2, -0.35, 0, 0.35, 1.2], [0, 0.18, 1, 0.18, 0])
  const y = useTransform(distance, [-1.2, -0.2, 0, 0.2, 1.2], [198, 42, 0, -42, -198])
  const blur = useTransform(distance, [-1.2, -0.2, 0, 0.2, 1.2], [6, 2, 0, 2, 6])
  const xOffsetMap = [0, 6, 0]
  const baseX = `${xOffsetMap[index % xOffsetMap.length]}vw`

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-[9%] z-20 flex"
      style={{ opacity, y, filter: useTransform(blur, (value) => `blur(${value}px)`) }}
    >
      <motion.h3
        className="max-w-[min(92vw,1200px)] px-6 text-[clamp(2.5rem,7.8vw,7.2rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-white"
        style={{
          x: baseX,
          fontSize:
            item.slug === 'city-life'
              ? 'calc(clamp(2.5rem, 7.8vw, 7.2rem) - 2px)'
              : undefined,
        }}
      >
        {item.title}
      </motion.h3>
    </motion.div>
  )
}

export function HomeProjectShowcase({ projects }: HomeProjectShowcaseProps) {
  const items = useMemo(() => toShowcaseEntries(projects).slice(0, 3), [projects])
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const imageProgress = useSpring(scrollYProgress, {
    stiffness: 118,
    damping: 29,
    mass: 0.56,
  })
  const titleProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 1.08,
  })
  const maxIndex = Math.max(items.length - 1, 0)
  const imageFloat = useTransform(imageProgress, [0, 1], [0, maxIndex])
  const titleFloat = useTransform(titleProgress, [0, 1], [0, maxIndex])
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(imageFloat, 'change', (value) => {
    const next = Math.round(value)
    const clamped = Math.min(maxIndex, Math.max(0, next))
    setActiveIndex((prev) => (prev === clamped ? prev : clamped))
  })

  if (items.length === 0) return null

  const active = items[activeIndex]

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-[5.6rem] h-[calc(100vh-6.3rem)] overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute inset-0">
            {items.map((item, index) => (
              <ShowcaseImageLayer key={item.slug} item={item} index={index} imageFloat={imageFloat} />
            ))}
          </div>

          <div className="absolute inset-0">
            {items.map((item, index) => (
              <ShowcaseTitleLayer key={`${item.slug}-title`} item={item} index={index} titleFloat={titleFloat} />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-6 sm:pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex w-[min(84vw,1080px)] flex-col gap-3"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{active.metadata}</p>
                <p className="max-w-[58ch] text-sm leading-relaxed text-white/70 sm:text-[15px]">{active.summary}</p>
                <Link
                  href={`/works/${active.slug}`}
                  className="inline-flex w-fit text-sm tracking-[0.05em] text-white/76 transition-colors duration-300 hover:text-white"
                >
                  查看项目
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
