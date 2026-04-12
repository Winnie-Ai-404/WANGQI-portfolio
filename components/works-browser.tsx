'use client'

import { useMemo, useState } from 'react'
import { Project } from '@/data/projects'
import { ProjectCard } from '@/components/project-card'
import { cn } from '@/lib/utils'

type WorksBrowserProps = {
  projects: Project[]
  tags: string[]
}

export function WorksBrowser({ projects, tags }: WorksBrowserProps) {
  const [activeTag, setActiveTag] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return projects
    return projects.filter((project) => project.tags.includes(activeTag))
  }, [activeTag, projects])

  const featured = filteredProjects.filter((project) => project.featured)
  const explorations = filteredProjects.filter((project) => project.exploration)
  const isAll = activeTag === 'All'

  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <p className="text-sm uppercase tracking-[0.08em] text-text-secondary">Filter</p>
        <div className="flex flex-wrap gap-2">
          {['All', ...tags].map((tag) => {
            const isActive = tag === activeTag
            return (
              <button
                key={tag}
                type="button"
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-all duration-500 ease-calm',
                  isActive
                    ? 'border-border bg-surface text-text-primary'
                    : 'border-border/60 bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary',
                )}
                aria-pressed={isActive}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            )
          })}
        </div>
        <p className="text-sm text-text-secondary">
          {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'} matched.
        </p>
      </section>

      {filteredProjects.length === 0 ? (
        <section className="surface-panel space-y-3 p-8">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary">No matches found</h2>
          <p className="text-text-secondary">
            Try another tag to browse additional case studies and explorations.
          </p>
        </section>
      ) : isAll ? (
        <>
          <section className="space-y-6">
            <h2 className="text-3xl font-medium tracking-tight text-text-primary">Featured projects</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-medium tracking-tight text-text-primary">
              Selected explorations
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {explorations.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="space-y-6">
          <h2 className="text-3xl font-medium tracking-tight text-text-primary">
            Matching projects: {activeTag}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
