'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ProjectMedia } from '@/data/projects'
import { cn } from '@/lib/utils'

type MediaFrameProps = {
  media: ProjectMedia
  priority?: boolean
  className?: string
}

export function MediaFrame({ media, priority = false, className }: MediaFrameProps) {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isImage = media.kind === 'image' || media.kind === 'diagram'

  useEffect(() => {
    if (!open) return

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [open])

  return (
    <>
      <figure
        className={cn(
          'group overflow-hidden rounded-xlsoft border border-border bg-surface p-2 shadow-whisper',
          className,
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#efece5]">
          {media.kind === 'video' ? (
            <video
              className="h-full w-full object-cover"
              controls
              preload="metadata"
              playsInline
              muted
            >
              <source src={media.src} />
            </video>
          ) : (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 ease-calm group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
            />
          )}

          {isImage ? (
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full border border-border bg-surface/92 px-3 py-1 text-xs text-text-secondary opacity-0 transition-all duration-500 group-hover:opacity-100 focus-visible:opacity-100"
              onClick={() => setOpen(true)}
            >
              Enlarge
            </button>
          ) : null}
        </div>
        {media.caption ? (
          <figcaption className="px-2 pb-1 pt-3 text-sm text-text-secondary">{media.caption}</figcaption>
        ) : null}
      </figure>

      <AnimatePresence>
        {open && isImage ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-6xl overflow-hidden rounded-xlsoft border border-white/25 bg-white p-2"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#f5f4f1]">
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
