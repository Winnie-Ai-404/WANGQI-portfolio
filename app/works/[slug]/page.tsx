import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/button-link'
import { MediaFrame } from '@/components/media-frame'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { TagPill } from '@/components/tag-pill'
import { getProjectBySlug, projects } from '@/data/projects'
import { siteConfig } from '@/data/site'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project not found' }
  }

  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.subtitle,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const nextProject = getProjectBySlug(project.nextProjectSlug)

  return (
    <div className="shell space-y-14 pb-14">
      <SectionReveal
        className="surface-panel overflow-hidden p-6 sm:p-8"
      >
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-2">
            <TagPill label={project.year} accent={project.accent} />
            {project.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-medium tracking-tight text-text-primary md:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-4xl text-xl tracking-tight text-text-secondary">{project.subtitle}</p>
            <p className="max-w-reading text-base leading-relaxed text-text-secondary">
              {project.hero.statement}
            </p>
          </div>
          <MediaFrame
            media={{
              kind: project.hero.video ? 'video' : 'image',
              src: project.hero.video ?? project.hero.image,
              alt: project.hero.imageAlt,
              caption: project.hero.video ? 'Hero demo video' : 'Project hero visual',
            }}
            priority
          />
        </div>
      </SectionReveal>

      <SectionReveal className="surface-panel space-y-6 p-8 sm:p-10">
        <SectionHeading marker="Project Facts" title="At a glance" accent={project.accent} />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-soft border border-border bg-bg/55 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-text-secondary">Role</p>
            <p className="mt-2 text-base text-text-primary">{project.role}</p>
          </div>
          <div className="rounded-soft border border-border bg-bg/55 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-text-secondary">Duration</p>
            <p className="mt-2 text-base text-text-primary">{project.duration}</p>
          </div>
          <div className="rounded-soft border border-border bg-bg/55 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-text-secondary">Team</p>
            <p className="mt-2 text-base text-text-primary">{project.team}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {project.facts.map((fact) => (
            <div key={fact.label} className="rounded-soft border border-border bg-surface p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-text-secondary">{fact.label}</p>
              <p className="mt-2 text-base text-text-primary">{fact.value}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      {project.sections.map((section, index) => {
        const isWide = section.media && section.media.length > 0
        return (
          <SectionReveal
            key={section.id}
            className={isWide ? 'space-y-6' : 'reading space-y-6'}
          >
            <section className="surface-panel space-y-5 p-8 sm:p-10">
              <SectionHeading
                marker={`${String(index + 3).padStart(2, '0')}`}
                title={section.title}
                accent={project.accent}
              />
              <p className="max-w-reading text-base leading-relaxed text-text-secondary">{section.text}</p>
              {section.bullets?.length ? (
                <ul className="max-w-reading space-y-3 pl-5 text-text-secondary">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.media?.length ? (
                <div className="space-y-4 pt-2">
                  {section.media.map((item) => (
                    <MediaFrame
                      key={`${section.id}-${item.src}`}
                      media={item}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          </SectionReveal>
        )
      })}

      <SectionReveal className="surface-panel space-y-6 p-8 sm:p-10">
        <SectionHeading
          marker="Next Project"
          title={nextProject ? nextProject.title : 'Back to works'}
          description={
            nextProject
              ? nextProject.subtitle
              : 'Explore the full portfolio to view additional project narratives.'
          }
          accent={project.accent}
        />
        <div className="flex flex-wrap gap-3">
          {nextProject ? (
            <ButtonLink href={`/works/${nextProject.slug}`}>View next project</ButtonLink>
          ) : (
            <ButtonLink href="/works">Back to works</ButtonLink>
          )}
          <ButtonLink href="/works" variant="secondary">
            All projects
          </ButtonLink>
        </div>
      </SectionReveal>

      <SectionReveal className="reading">
        <Link
          href="/works"
          className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition-colors duration-500 hover:text-text-primary"
        >
          ← Back to works
        </Link>
      </SectionReveal>
    </div>
  )
}
