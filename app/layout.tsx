import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageTransition } from '@/components/page-transition'
import { siteConfig } from '@/data/site'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Portfolio`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'A premium portfolio spanning service design, product design, UI/UX, and research-driven interactive systems.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <div className="min-h-screen bg-bg">
          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-50 rounded-soft border border-border bg-surface px-4 py-2 text-sm text-text-primary focus:not-sr-only"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <PageTransition>
            <main id="main-content" className="px-4 pb-6 pt-10 sm:px-6 sm:pt-12">
              {children}
            </main>
          </PageTransition>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
