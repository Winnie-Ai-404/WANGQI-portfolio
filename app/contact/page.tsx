import type { Metadata } from 'next'
import Link from 'next/link'
import { ButtonLink } from '@/components/button-link'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for full-time roles, design collaborations, or research-oriented product initiatives.',
}

export default function ContactPage() {
  return (
    <div className="shell space-y-12 pb-14">
      <SectionReveal className="surface-panel space-y-6 p-8 sm:p-10">
        <SectionHeading
          marker="Contact"
          title="Open to thoughtful design opportunities."
          description="For full-time roles, contract collaborations, or research-oriented product initiatives."
        />
      </SectionReveal>

      <SectionReveal className="grid gap-6 lg:grid-cols-2">
        <section className="surface-panel space-y-4 p-8">
          <p className="text-sm uppercase tracking-[0.08em] text-text-secondary">Email</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-2xl font-medium tracking-tight text-text-primary transition-colors duration-500 hover:text-text-secondary"
          >
            {siteConfig.email}
          </a>
        </section>

        <section className="surface-panel space-y-4 p-8">
          <p className="text-sm uppercase tracking-[0.08em] text-text-secondary">Resume / CV</p>
          <ButtonLink href={siteConfig.resumeHref} variant="secondary">
            Download CV
          </ButtonLink>
        </section>
      </SectionReveal>

      <SectionReveal className="surface-panel space-y-6 p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.08em] text-text-secondary">Social</p>
        <div className="flex flex-wrap gap-3">
          {siteConfig.social.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="inline-flex min-h-11 items-center rounded-soft border border-border px-5 text-sm text-text-secondary transition-all duration-500 hover:bg-bg hover:text-text-primary"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </SectionReveal>
    </div>
  )
}
