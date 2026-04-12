import type { Metadata } from 'next'
import { ButtonLink } from '@/components/button-link'
import { HeroAtmosphere } from '@/components/hero-atmosphere'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { featuredProjects, explorationProjects } from '@/data/projects'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Portfolio home highlighting featured case studies and selected design explorations across service, product, and UI/UX.',
}

export default function HomePage() {
  return (
    <div className="shell space-y-20 pb-14">
      <SectionReveal className="relative overflow-hidden rounded-xlsoft border border-border bg-surface px-6 py-14 shadow-soft sm:px-10 md:px-14">
        <HeroAtmosphere accent="#B79E86" />
        <div className="relative z-10 space-y-8">
          <p className="max-w-fit rounded-full border border-border bg-bg px-4 py-1 text-xs uppercase tracking-[0.08em] text-text-secondary">
            Portfolio 2026
          </p>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-5xl font-medium tracking-tight text-text-primary sm:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="max-w-3xl text-2xl tracking-tight text-text-secondary">
              {siteConfig.role}
            </p>
          </div>
          <p className="max-w-reading text-lg leading-relaxed text-text-secondary">
            {siteConfig.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/works">View works</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="space-y-8">
        <SectionHeading
          marker="Featured Work"
          title="Interdisciplinary projects shaped as clear narratives."
          description="A curated selection spanning service design, product design, interface craft, and research-driven systems."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="space-y-8">
        <SectionHeading
          marker="Selected Explorations"
          title="Additional experiments and method-focused studies."
          description="Smaller investigations that support my broader product and service design practice."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {explorationProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="grid gap-6 lg:grid-cols-2">
        <section className="surface-panel space-y-6 p-8">
          <SectionHeading marker="About Snapshot" title="Research-informed, systems-aware, execution-focused." />
          <p className="max-w-reading text-base leading-relaxed text-text-secondary">
            {siteConfig.shortIntro} I translate ambiguity into practical design direction through
            evidence, facilitation, and high-fidelity interaction design.
          </p>
          <ButtonLink href="/about" variant="secondary">
            Read about my process
          </ButtonLink>
        </section>

        <section className="surface-panel space-y-6 p-8">
          <SectionHeading marker="Contact" title="Let’s build thoughtful products together." />
          <p className="text-base leading-relaxed text-text-secondary">
            Available for full-time roles, contract collaborations, and research-driven product work.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center rounded-soft border border-border px-5 text-sm text-text-secondary transition-all duration-500 hover:bg-bg hover:text-text-primary"
            >
              {siteConfig.email}
            </a>
          </div>
        </section>
      </SectionReveal>
    </div>
  )
}
