import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MediaFrame } from '@/components/media-frame'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { getProjectBySlug, projects } from '@/data/projects'
import { siteConfig } from '@/data/site'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

function getOverviewMergedFacts(project: NonNullable<ReturnType<typeof getProjectBySlug>>) {
  const keyFacts = project.facts.filter((fact) => ['项目场景', '我的职责', '项目产出'].includes(fact.label))
  return [
    { label: 'Role', value: project.role },
    { label: 'Team', value: project.team },
    ...keyFacts,
  ]
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

  const nextProject = getProjectBySlug(project.nextProjectSlug) ?? projects[0]
  const topMetaLine = [project.year, ...project.tags].join('/')
  const overviewMergedFacts = getOverviewMergedFacts(project)

  return (
    <div className="shell space-y-14 pb-14">
      <SectionReveal className="mx-auto w-full max-w-[1520px] space-y-5">
        <MediaFrame
          media={{
            kind: project.hero.video ? 'video' : 'image',
            src: project.hero.video ?? project.hero.image,
            alt: project.hero.imageAlt,
          }}
          priority
          imageFit="cover"
          coverAspectClassName="aspect-[16/6.2] bg-[#1f1f1f]"
          coverObjectPosition="50% 40%"
          className="!rounded-xlsoft !border-0 !bg-transparent !shadow-none hover:!border-transparent hover:!shadow-none"
        />
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div className="space-y-3">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-4xl text-xl tracking-tight text-text-secondary">{project.subtitle}</p>
          </div>
          <p className="shrink-0 text-right text-sm tracking-[0.04em] text-text-secondary">{topMetaLine}</p>
        </div>
      </SectionReveal>

      {project.sections.map((section, index) => {
        const isWide = section.media && section.media.length > 0
        const isOverviewSection = section.title === '项目概览' || section.id === 'overview' || section.id === 'background'
        return (
          <SectionReveal
            key={section.id}
            className={isWide ? 'space-y-6' : 'reading space-y-6'}
          >
            <section className="surface-panel space-y-5 p-8 sm:p-10">
              <SectionHeading
                marker={`${String(index + 1).padStart(2, '0')}`}
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
              {isOverviewSection ? (
                <div className="grid gap-4 pt-2 md:grid-cols-2 xl:grid-cols-3">
                  {overviewMergedFacts.map((fact) => (
                    <div key={fact.label} className="rounded-soft border border-border bg-bg/55 p-4">
                      <p className="text-xs uppercase tracking-[0.08em] text-text-secondary">{fact.label}</p>
                      <p className="mt-2 text-base text-text-primary">{fact.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          </SectionReveal>
        )
      })}

      <SectionReveal className="mx-auto mt-5 w-full max-w-[1180px] border-t border-white/10 pt-8 sm:mt-6 sm:pt-9">
        <div className="flex items-center justify-center gap-3">
          <span className="block h-px w-12 bg-white/12 sm:w-16" aria-hidden="true" />
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/60 sm:text-[11px]">下一项目</p>
          <span className="block h-px w-12 bg-white/12 sm:w-16" aria-hidden="true" />
        </div>
        <div className="mt-5 space-y-4 text-center sm:mt-6 sm:space-y-5">
          <h3 className="text-[2.06rem] font-semibold leading-[1.04] tracking-[-0.012em] text-text-primary sm:text-[2.55rem]">
            {nextProject.title}
          </h3>
          <p className="mx-auto max-w-[760px] text-[0.98rem] leading-relaxed text-white/56">
            {nextProject.subtitle}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:mt-7">
          <Link
            href={`/works/${nextProject.slug}`}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/14 bg-white/[0.02] px-5 text-sm font-medium tracking-[0.03em] text-white/82 transition-all duration-300 hover:border-white/24 hover:bg-white/[0.04] hover:text-white"
          >
            查看下一个项目
          </Link>
          <Link href="/works" className="text-sm tracking-[0.04em] text-white/44 transition-colors duration-300 hover:text-white/72">
            查看全部项目
          </Link>
        </div>
      </SectionReveal>
    </div>
  )
}
