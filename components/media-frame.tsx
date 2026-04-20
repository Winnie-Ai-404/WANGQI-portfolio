'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ProjectMedia } from '@/data/projects'
import { withBasePath } from '@/lib/with-base-path'
import { cn } from '@/lib/utils'

type MediaFrameProps = {
  media: ProjectMedia
  priority?: boolean
  className?: string
  imageFit?: 'contain' | 'cover'
  coverAspectClassName?: string
  coverObjectPosition?: string
}

export function MediaFrame({
  media,
  priority = false,
  className,
  imageFit = 'contain',
  coverAspectClassName = 'aspect-[16/10] bg-[#1f1f1f]',
  coverObjectPosition = '50% 50%',
}: MediaFrameProps) {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const isImage = media.kind === 'image' || media.kind === 'diagram'
  const isContainImage = isImage && imageFit === 'contain'

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

  useEffect(() => {
    if (media.kind !== 'video' || !videoRef.current) return
    const video = videoRef.current
    let didSeek = false

    const handleLoadedData = () => {
      if (didSeek) return
      didSeek = true
      try {
        video.currentTime = 0.04
      } catch {
        // Keep at default time if seek is not available yet.
      }
    }

    const handleSeeked = () => {
      video.pause()
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('seeked', handleSeeked)
    video.load()

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [media.kind, media.src])

  return (
    <>
      <figure
        className={cn(
          'group overflow-hidden rounded-xlsoft border border-border bg-surface shadow-whisper transition-all duration-300 hover:border-white/12 hover:shadow-soft',
          className,
        )}
      >
        <div className={cn('relative overflow-hidden', isContainImage ? '' : coverAspectClassName)}>
          {media.kind === 'video' ? (
            <video
              ref={videoRef}
              key={media.src}
              className="h-full w-full object-cover"
              style={{ objectPosition: coverObjectPosition }}
              controls
              preload="metadata"
              playsInline
              src={withBasePath(media.src)}
            />
          ) : (
            <>
              {isContainImage ? (
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={1600}
                  height={1000}
                  priority={priority}
                  className="block h-auto w-full rounded-[18px]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                />
              ) : (
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  priority={priority}
                  className="object-cover transition-transform duration-700 ease-calm group-hover:scale-[1.02]"
                  style={{ objectPosition: coverObjectPosition }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                />
              )}
            </>
          )}

          {isImage ? (
            <button
              type="button"
              className="absolute right-3 top-3 grid h-5 w-5 place-items-center opacity-0 transition-all duration-300 group-hover:opacity-100 focus-visible:opacity-100"
              onClick={() => setOpen(true)}
              aria-label="Enlarge image"
            >
              <Image src="/images/logo/enlarge.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
            </button>
          ) : null}
        </div>
      </figure>

      <AnimatePresence>
        {open && isImage ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/72 p-4 backdrop-blur-sm"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-auto max-w-[94vw] overflow-hidden rounded-xlsoft border border-white/16 bg-[#171717]"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={media.src}
                alt={media.alt}
                width={1600}
                height={1000}
                className="block max-h-[86vh] w-auto max-w-[94vw] rounded-[18px]"
                sizes="94vw"
              />
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-white/14 bg-[#1f1f1f] px-3 py-1 text-xs text-text-secondary transition-colors duration-300 hover:border-accent/40 hover:text-text-primary"
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
