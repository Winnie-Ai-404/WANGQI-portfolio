'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import TrueFocus from '@/components/true-focus'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const displayItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/works' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const activeIndex = displayItems.findIndex((item) => {
    if (item.href === '/') return pathname === '/'
    return pathname === item.href || pathname.startsWith(`${item.href}/`)
  })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6">
      <div
        className={cn(
          'mx-auto flex w-full max-w-shell items-center justify-between gap-6 px-1 py-3 backdrop-blur-xl transition-all duration-300',
          isScrolled
            ? 'bg-[#141414]/72'
            : 'bg-transparent',
        )}
      >
        <Link href="/" className="group flex items-center gap-3 rounded-full px-1 py-1">
          <span className="h-2.5 w-2.5 bg-white transition-transform duration-500 group-hover:scale-125" />
          <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-text-primary">
            WANG QI.
          </span>
        </Link>

        <nav className="flex items-center" aria-label="Main">
          <TrueFocus
            sentence={displayItems.map((item) => item.label).join(' ')}
            manualMode={false}
            blurAmount={1.4}
            borderColor="#ffffff"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
            activeIndex={activeIndex >= 0 ? activeIndex : 0}
            className="gap-2 sm:gap-3"
            renderWord={(word, index, isActive) => {
              const item = displayItems[index]
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-2 py-2 text-[13px] uppercase tracking-[0.12em] transition-all duration-300',
                    isActive ? 'font-semibold text-white' : 'font-normal text-white/72 hover:text-white',
                  )}
                >
                  {word}
                </Link>
              )
            }}
          />
        </nav>
      </div>
    </header>
  )
}
