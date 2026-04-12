import type { Metadata } from 'next'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { WorksBrowser } from '@/components/works-browser'
import { projectTags, projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Works',
  description: 'Case studies and explorations across service systems, product design, and research-driven interaction.',
}

export default function WorksPage() {
  return (
    <div className="shell space-y-14 pb-14">
      <SectionReveal className="surface-panel space-y-6 p-8 sm:p-10">
        <SectionHeading
          marker="Works"
          title="Case studies and explorations"
          description="A calm, project-led index of design work across service systems, digital products, and research-driven interaction."
        />
      </SectionReveal>

      <SectionReveal>
        <WorksBrowser projects={projects} tags={projectTags} />
      </SectionReveal>
    </div>
  )
}
