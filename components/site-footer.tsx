import Link from 'next/link'
import { siteConfig } from '@/data/site'

export function SiteFooter() {
  const hasSocialLinks = siteConfig.social.length > 0

  if (!hasSocialLinks) {
    return null
  }

  return (
    <footer className="px-4 pb-8 pt-16 sm:px-6">
      <div className="mx-auto flex w-full max-w-shell flex-wrap items-start justify-end gap-4 rounded-xlsoft border border-border bg-surface p-6 shadow-whisper sm:p-8">
        {siteConfig.social.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition-all duration-500 hover:bg-bg hover:text-text-primary"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
