import Link from 'next/link'
import Image from '@/components/base-path-image'
import { Project } from '@/data/projects'
import BorderGlow from '@/components/BorderGlow'
import { TagPill } from '@/components/tag-pill'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <BorderGlow
      className="transition-all duration-400 ease-calm hover:-translate-y-1 hover:shadow-soft"
      edgeSensitivity={30}
      glowColor="0 0 100"
      backgroundColor="#060010"
      borderRadius={28}
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated={false}
      colors={['#ffffff', '#ffffff', '#ffffff']}
    >
      <article className="group overflow-hidden rounded-xlsoft bg-surface">
        <Link href={`/works/${project.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-xlsoft">
            <Image
              src={project.hero.image}
              alt={project.hero.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-calm group-hover:scale-[1.045]"
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
              <h3 className="text-2xl font-medium tracking-tight text-text-primary">
                {project.title}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary">{project.subtitle}</p>
            </div>

            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 group-hover:translate-x-0.5"
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
    </BorderGlow>
  )
}
