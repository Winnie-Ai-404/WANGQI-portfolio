'use client'

import Image from '@/components/base-path-image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

type WorksTimelinePageProps = {
  projects: Project[]
}

type ProjectSource = 'Work' | 'Personal' | 'Academic'

type TimelineProject = {
  id: string
  slug: string
  title: string
  shortTitle: string
  year: string
  source: ProjectSource
  disciplines: string[]
  domain?: string
  summary: string
  heroMedia: {
    type: 'image'
    src: string
    alt: string
  }
  thumbMedia: {
    src: string
    alt: string
  }
}

const disciplineMap: Array<{ tags: string[]; label: string }> = [
  { tags: ['服务设计', 'Service'], label: 'Service' },
  { tags: ['产品设计', 'Product'], label: 'Product' },
  { tags: ['交互', 'Interaction', 'UIUX', 'UI/UX'], label: 'Interaction' },
  { tags: ['用户研究', '研究', 'Research'], label: 'Research' },
  { tags: ['系统', '架构', 'System'], label: 'System' },
  { tags: ['概念产品', 'Concept'], label: 'Concept' },
]

const domainMap: Array<{ tags: string[]; label: string }> = [
  { tags: ['医疗', '健康', '弱视', '康复', 'Healthcare'], label: 'Healthcare' },
  { tags: ['社区', '城市', 'Urban'], label: 'Urban' },
  { tags: ['教育', '儿童', 'Education'], label: 'Education' },
  { tags: ['宠物', 'Pet'], label: 'Smart Device' },
  { tags: ['营销', 'B端', '企业服务', 'AI'], label: 'AI' },
]

const titleAliasMap: Record<string, string> = {
  'city-life': 'City Life',
  'medical-experience': 'Amblyopia',
  'pet-care': 'Pet-care',
  aurora: 'Aurora',
  elemotion: 'EleMotion',
  'nutri-pick': 'NutriPick',
  'marketing-cloud': 'Marketing Cloud',
}

const timelineYearOverrides: Record<string, string> = {
  elemotion: '2025',
  'nutri-pick': '2025',
}

const timelineOrderBySlug: Record<string, number> = {
  'nutri-pick': 1,
  elemotion: 2,
}

function inferSource(project: Project): ProjectSource {
  if (project.team.includes('企业') || project.duration.includes('工作')) return 'Work'
  if (project.duration.includes('课程')) return 'Academic'
  return 'Personal'
}

function inferDisciplines(project: Project): string[] {
  const result = new Set<string>()
  for (const rule of disciplineMap) {
    if (rule.tags.some((tag) => project.tags.some((item) => item.includes(tag)))) {
      result.add(rule.label)
    }
  }
  if (result.size === 0) result.add('Design')
  return Array.from(result).slice(0, 2)
}

function inferDomain(project: Project): string | undefined {
  const hit = domainMap.find((rule) =>
    rule.tags.some((tag) => project.tags.some((item) => item.includes(tag)) || project.title.includes(tag)),
  )
  return hit?.label
}

function toShortTitle(project: Project): string {
  const alias = titleAliasMap[project.slug]
  if (alias) return alias
  if (project.title.length <= 18) return project.title
  return `${project.title.slice(0, 18)}…`
}

function toCaptionSummary(summary: string): string {
  const normalized = summary.replace(/\s+/g, ' ').trim()
  if (normalized.length <= 84) return normalized
  return `${normalized.slice(0, 84)}…`
}

function toTimelineProjects(projects: Project[]): TimelineProject[] {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const yearA = Number(timelineYearOverrides[a.project.slug] ?? a.project.year)
      const yearB = Number(timelineYearOverrides[b.project.slug] ?? b.project.year)
      if (yearA !== yearB) return yearB - yearA

      const orderA = timelineOrderBySlug[a.project.slug] ?? 999
      const orderB = timelineOrderBySlug[b.project.slug] ?? 999
      if (orderA !== orderB) return orderA - orderB

      return a.index - b.index
    })
    .map(({ project }) => ({
      id: project.slug,
      slug: project.slug,
      title: project.title,
      shortTitle: toShortTitle(project),
      year: timelineYearOverrides[project.slug] ?? project.year,
      source: inferSource(project),
      disciplines: inferDisciplines(project),
      domain: inferDomain(project),
      summary: toCaptionSummary(project.subtitle),
      heroMedia: {
        type: 'image',
        src: project.hero.image,
        alt: project.hero.imageAlt,
      },
      thumbMedia: {
        src: project.hero.image,
        alt: project.hero.imageAlt,
      },
    }))
}

export function WorksTimelinePage({ projects }: WorksTimelinePageProps) {
  const items = useMemo(() => toTimelineProjects(projects), [projects])
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null)
  const [scrollParallaxY, setScrollParallaxY] = useState(0)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wheelLockRef = useRef(false)
  const parallaxResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const activeItem = items[activeIndex]

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      if (parallaxResetTimerRef.current) clearTimeout(parallaxResetTimerRef.current)
    }
  }, [])

  const selectIndex = (index: number) => {
    if (index < 0 || index >= items.length) return
    setActiveIndex(index)
  }

  const scheduleSelectByHover = (index: number) => {
    setHoveredNavIndex(index)
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => {
      selectIndex(index)
    }, 190)
  }

  const cancelScheduledHover = () => {
    setHoveredNavIndex(null)
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
  }

  const shiftActive = (delta: number) => {
    setActiveIndex((prev) => {
      const total = items.length
      if (total <= 0) return 0
      return (prev + delta + total) % total
    })
  }

  const handleDesktopWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || items.length <= 1) return
    if (wheelLockRef.current) return

    const deltaY = event.deltaY
    if (Math.abs(deltaY) < 12) return

    event.preventDefault()
    wheelLockRef.current = true
    setScrollParallaxY(deltaY > 0 ? -14 : 14)
    if (parallaxResetTimerRef.current) clearTimeout(parallaxResetTimerRef.current)
    parallaxResetTimerRef.current = setTimeout(() => setScrollParallaxY(0), 260)
    shiftActive(deltaY > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLockRef.current = false
    }, 560)
  }

  if (!activeItem) return null

  return (
    <div className="relative h-full px-0">
      <section
        className="relative h-[calc(100vh-10.6rem)]"
        onWheel={handleDesktopWheel}
      >
        <div className="hidden lg:grid lg:h-full lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8 lg:pl-0 lg:pr-2">
          <WorksTimelineNav
            items={items}
            activeIndex={activeIndex}
            onSelect={selectIndex}
            onHoverSelect={scheduleSelectByHover}
            onHoverLeave={cancelScheduledHover}
            hoveredIndex={hoveredNavIndex}
          />

          <div className="flex items-center">
            <WorksStageVisual
              item={activeItem}
              index={activeIndex}
              shouldReduceMotion={!!shouldReduceMotion}
              driftY={scrollParallaxY}
            />
          </div>
        </div>

        <div className="space-y-5 px-2 sm:px-3 lg:hidden">
          <div className="mobile-timeline-strip flex snap-x gap-2 overflow-x-auto pb-1">
            {items.map((item, index) => (
              <button
                key={`mobile-${item.id}`}
                type="button"
                onClick={() => selectIndex(index)}
                className={cn(
                  'shrink-0 snap-start rounded-full border px-3 py-2 text-xs transition-all duration-300',
                  activeIndex === index
                    ? 'border-accent/45 bg-white/5 text-text-primary'
                    : 'border-white/10 bg-transparent text-text-secondary',
                )}
              >
                <span className="mr-2">{item.year}</span>
                <span>{item.shortTitle}</span>
              </button>
            ))}
          </div>

          <div className="space-y-5">
            <WorksStageVisual
              item={activeItem}
              index={activeIndex}
              shouldReduceMotion={!!shouldReduceMotion}
              driftY={scrollParallaxY}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

type WorksTimelineNavProps = {
  items: TimelineProject[]
  activeIndex: number
  onSelect: (index: number) => void
  onHoverSelect: (index: number) => void
  onHoverLeave: () => void
  hoveredIndex: number | null
}

function WorksTimelineNav({
  items,
  activeIndex,
  onSelect,
  onHoverSelect,
  onHoverLeave,
  hoveredIndex,
}: WorksTimelineNavProps) {
  const groupedYear = (index: number) => (index === 0 ? true : items[index - 1].year !== items[index].year)

  return (
    <aside className="sticky top-[9.6rem] h-[510px] self-start pl-[2px]">
      <nav className="timeline-nav-scroll h-full overflow-y-auto pr-2" aria-label="Project timeline">
        <ol className="space-y-2 pl-0">
          {items.map((item, index) => {
            const isActive = index === activeIndex
            const showYear = groupedYear(index)
            return (
              <li key={item.id} className={cn(showYear ? 'pt-4' : '', index === 0 ? 'pt-0' : '')}>
                {showYear ? <p className="mb-2 text-[12px] tracking-[0.16em] text-white/58">{item.year}</p> : null}
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  onMouseEnter={() => onHoverSelect(index)}
                  onMouseLeave={onHoverLeave}
                  onFocus={() => onSelect(index)}
                  className={cn(
                    'group flex w-full items-center gap-3 py-1 text-left transition-all duration-250',
                    hoveredIndex === null
                      ? isActive
                        ? 'text-text-primary'
                        : 'text-white/58 hover:text-text-primary'
                      : index === hoveredIndex
                        ? 'text-text-primary'
                        : 'text-white/34',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className="relative h-10 w-[64px] overflow-hidden rounded-[4px] bg-black/35">
                    <Image
                      src={item.thumbMedia.src}
                      alt={item.thumbMedia.alt}
                      fill
                      className={cn(
                        'object-cover transition-transform duration-300',
                        isActive ? 'scale-[1.08]' : 'scale-100 group-hover:scale-[1.04]',
                      )}
                      style={{ filter: isActive ? 'brightness(1)' : 'brightness(0.48)' }}
                      sizes="64px"
                    />
                  </div>
                  <span className="inline-flex items-center gap-2.5">
                    <span
                      className={cn(
                        'block truncate tracking-[0.02em] transition-all duration-250',
                        isActive ? 'text-[16px] font-semibold leading-tight text-text-primary' : 'text-[14px] font-normal leading-tight',
                      )}
                    >
                      {item.shortTitle}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 bg-white transition-all duration-350 ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: `rotate(${isActive ? 180 : 0}deg) scale(${isActive ? 1 : 0.75})`,
                      }}
                    />
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    </aside>
  )
}

function WorksStageVisual({
  item,
  index,
  shouldReduceMotion,
  driftY,
}: {
  item: TimelineProject
  index: number
  shouldReduceMotion: boolean
  driftY: number
}) {
  const [hovered, setHovered] = useState(false)
  const [chipPosition, setChipPosition] = useState({ x: 0, y: 0 })

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left + 14
    const y = event.clientY - rect.top + 14
    setChipPosition({ x, y })
  }

  return (
    <div className="relative w-full space-y-4">
      <figure className="relative mx-auto w-full max-w-[1220px] rounded-[22px]">
        <Link
          href={`/works/${item.slug}`}
          className="group relative block overflow-hidden rounded-[14px]"
          onMouseEnter={(event) => {
            setHovered(true)
            onMouseMove(event)
          }}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={onMouseMove}
          aria-label={`View ${item.title} project`}
        >
          <div className="relative h-[510px] overflow-hidden rounded-[14px]">
            <Image
              src={item.thumbMedia.src}
              alt={item.thumbMedia.alt}
              fill
              priority={index < 2}
              className="object-cover transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(0, ${driftY}px, 0) scale(${hovered ? 1.08 : 1})` }}
              sizes="(max-width: 1023px) 100vw, 80vw"
            />
          </div>
          <span
            className="pointer-events-none absolute z-30 inline-flex h-9 items-center rounded-none border border-white/22 bg-white/[0.12] px-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white/95 backdrop-blur-md"
            style={{
              left: chipPosition.x,
              top: chipPosition.y,
              opacity: hovered ? 1 : 0,
              transform: `translate3d(0, 0, 0) scale(${hovered ? 1 : 0.92})`,
              transition: `opacity ${shouldReduceMotion ? 0 : 0.18}s ease, transform ${shouldReduceMotion ? 0 : 0.18}s ease`,
            }}
          >
            VIEW PROJECT ↗
          </span>
        </Link>
      </figure>
      <WorksStageCaption item={item} />
    </div>
  )
}

function WorksStageCaption({ item }: { item: TimelineProject }) {
  const captionTags = [item.source, ...item.disciplines, item.domain].filter(Boolean).slice(0, 3)

  return (
    <aside key={`caption-${item.id}`} className="mx-auto w-full max-w-[1220px] px-2 pb-4 sm:px-0">
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 className="text-[1.55rem] font-medium leading-tight tracking-tight text-text-primary">{item.title}</h2>
        <p className="text-sm leading-relaxed text-text-secondary">{item.summary}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {captionTags.map((label) => (
          <span key={label} className="text-[10px] uppercase tracking-[0.12em] text-white/58">
            {label}
          </span>
        ))}
      </div>
    </aside>
  )
}
