import Link from 'next/link'
import { siteConfig } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 pt-16 sm:px-6">
      <div className="mx-auto grid w-full max-w-shell gap-6 rounded-xlsoft border border-border bg-surface p-6 shadow-whisper sm:grid-cols-2 sm:p-8">
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">Open for full-time and project-based roles.</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-block text-lg font-medium tracking-tight text-text-primary transition-colors duration-500 hover:text-text-secondary"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="flex flex-wrap items-start justify-start gap-4 sm:justify-end">
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
      </div>
    </footer>
  )
}
