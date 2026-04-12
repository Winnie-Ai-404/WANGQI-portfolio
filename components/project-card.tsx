import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/data/projects'
import { TagPill } from '@/components/tag-pill'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-xlsoft border border-border bg-surface shadow-whisper transition-all duration-500 ease-calm hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/works/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-xlsoft">
          <Image
            src={project.hero.image}
            alt={project.hero.imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-calm group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          />
        </div>

        <div className="space-y-5 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <TagPill label={project.year} accent={project.accent} />
            {project.tags.slice(0, 2).map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-medium tracking-tight text-text-primary">{project.title}</h3>
            <p className="text-base leading-relaxed text-text-secondary">{project.subtitle}</p>
          </div>

          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-500"
            style={{
              borderColor: `${project.accent}55`,
              backgroundColor: `${project.accent}12`,
            }}
          >
            View case study
          </span>
        </div>
      </Link>
    </article>
  )
}
