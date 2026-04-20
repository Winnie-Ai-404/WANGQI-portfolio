'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

type WorksArchiveShowcaseProps = {
  projects: Project[]
  initialSlug?: string
}

type ArchiveItem = {
  slug: string
  title: string
  subtitle: string
  year: string
  tags: string[]
  image: string
  imageAlt: string
}

function toArchiveItems(projects: Project[]): ArchiveItem[] {
  return [...projects]
    .sort((a, b) => {
      const yearDiff = Number(b.year) - Number(a.year)
      if (yearDiff !== 0) return yearDiff
      return a.title.localeCompare(b.title)
    })
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      year: project.year,
      tags: project.tags,
      image: project.hero.image,
      imageAlt: project.hero.imageAlt,
    }))
}

export function WorksArchiveShowcase({ projects, initialSlug }: WorksArchiveShowcaseProps) {
  const items = useMemo(() => toArchiveItems(projects), [projects])
  const [activeIndex, setActiveIndex] = useState(0)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start end', 'end start'],
  })
  const mediaY = useTransform(scrollYProgress, [0, 1], [12, -12])
  const copyY = useTransform(scrollYProgress, [0, 1], [8, -8])

  useEffect(
    () => () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    },
    [],
  )

  useEffect(() => {
    if (!items.length) return
    if (!initialSlug) {
      setActiveIndex(0)
      return
    }
    const matched = items.findIndex((item) => item.slug === initialSlug)
    setActiveIndex(matched >= 0 ? matched : 0)
  }, [items, initialSlug])

  const grouped = useMemo(() => {
    const yearMap = new Map<string, Array<{ item: ArchiveItem; index: number }>>()
    items.forEach((item, index) => {
      if (!yearMap.has(item.year)) yearMap.set(item.year, [])
      yearMap.get(item.year)?.push({ item, index })
    })
    return Array.from(yearMap.entries()).sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [items])

  const activeItem = items[activeIndex] ?? items[0]

  const scheduleActive = (index: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => setActiveIndex(index), 110)
  }

  if (!activeItem) return null

  return (
    <div ref={rootRef} className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <nav aria-label="Works archive">
          <ol className="space-y-6">
            {grouped.map(([year, yearItems]) => (
              <li key={year} className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/42">{year}</p>
                <ul className="space-y-1.5">
                  {yearItems.map(({ item, index }) => {
                    const isActive = index === activeIndex
                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/works/${item.slug}`}
                          onMouseEnter={() => scheduleActive(index)}
                          onFocus={() => setActiveIndex(index)}
                          className={cn(
                            'group inline-flex items-center gap-2 py-0.5 text-[1.06rem] tracking-[-0.01em] transition-colors duration-300',
                            isActive ? 'text-white' : 'text-white/54 hover:text-white/86',
                          )}
                        >
                          <span>{item.title}</span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              'block h-[5px] w-[5px] bg-white transition-opacity duration-250',
                              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
                            )}
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div className="space-y-5">
        <motion.div style={{ y: mediaY }} className="relative overflow-hidden rounded-[10px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.slug}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/works/${activeItem.slug}`} className="group block">
                <div className="relative aspect-[16/8.9] overflow-hidden">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                    sizes="(max-width: 1024px) 100vw, 72vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 100%)',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div style={{ y: copyY }} className="space-y-3">
          <h3 className="text-4xl font-semibold tracking-tight text-text-primary">{activeItem.title}</h3>
          <p className="max-w-[74ch] text-base leading-relaxed text-white/64">{activeItem.subtitle}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/48">
            {activeItem.year}/{activeItem.tags.slice(0, 3).join('/')}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
