'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems, siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-6 rounded-xlsoft border border-border/90 bg-bg/75 px-4 py-3 shadow-whisper backdrop-blur-xl sm:px-6">
        <Link href="/" className="group flex items-center gap-3 rounded-full px-1 py-1">
          <span className="h-2.5 w-2.5 rounded-full bg-text-primary transition-transform duration-500 group-hover:scale-125" />
          <span className="text-sm font-medium tracking-tight text-text-primary">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full border px-3 py-2 text-sm transition-all duration-500 ease-calm',
                  isActive
                    ? 'border-border bg-surface text-text-primary'
                    : 'border-transparent text-text-secondary hover:border-border hover:bg-surface/80 hover:text-text-primary',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
