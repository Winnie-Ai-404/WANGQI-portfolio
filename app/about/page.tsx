import type { Metadata } from 'next'
import { ButtonLink } from '@/components/button-link'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, design focus, and methods across service design, product strategy, and interface systems.',
}

export default function AboutPage() {
  return (
    <div className="shell space-y-14 pb-14">
      <SectionReveal className="surface-panel space-y-6 p-8 sm:p-10">
        <SectionHeading
          marker="About"
          title="Designing service clarity and product depth through research."
          description="My practice sits at the intersection of service design, product strategy, and interface systems."
        />
      </SectionReveal>

      <SectionReveal className="grid gap-6 lg:grid-cols-12">
        <section className="surface-panel space-y-5 p-8 lg:col-span-7">
          <h2 className="text-2xl font-medium tracking-tight">Background & education</h2>
          <p className="leading-relaxed text-text-secondary">
            I work with organizations that need coherent experiences across strategy, operations,
            and digital touchpoints. My background combines service design methods with product
            execution and interaction craft.
          </p>
          <p className="leading-relaxed text-text-secondary">
            Education includes design research, interaction design, and systems thinking, with
            ongoing practice in facilitation and cross-functional delivery.
          </p>
        </section>

        <section className="surface-panel space-y-5 p-8 lg:col-span-5">
          <h2 className="text-2xl font-medium tracking-tight">Design focus</h2>
          <ul className="space-y-3 text-text-secondary">
            <li>Service ecosystems and journey architecture</li>
            <li>Product strategy and information hierarchy</li>
            <li>Research synthesis and evidence-led decisions</li>
            <li>Interface systems for complex workflows</li>
          </ul>
        </section>
      </SectionReveal>

      <SectionReveal className="grid gap-6 lg:grid-cols-2">
        <section className="surface-panel space-y-5 p-8">
          <h2 className="text-2xl font-medium tracking-tight">Skills overview</h2>
          <p className="text-text-secondary">
            Service blueprinting, opportunity framing, prototyping, usability testing, visual
            systems, design documentation, stakeholder facilitation, and narrative communication.
          </p>
        </section>

        <section className="surface-panel space-y-5 p-8">
          <h2 className="text-2xl font-medium tracking-tight">Resume</h2>
          <p className="text-text-secondary">
            Full work history and project details are available as a downloadable CV.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.resumeHref}>Download resume</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal className="surface-panel space-y-5 p-8 sm:p-10">
        <h2 className="text-2xl font-medium tracking-tight">Personal statement</h2>
        <p className="max-w-reading leading-relaxed text-text-secondary">
          I value quiet interfaces, rigorous thinking, and practical collaboration. The strongest
          work happens when research, strategy, and design execution are treated as one continuous
          practice rather than separate phases.
        </p>
      </SectionReveal>
    </div>
  )
}
