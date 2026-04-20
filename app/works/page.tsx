import type { Metadata } from 'next'
import { WorksTimelinePage } from '@/components/works-timeline-page'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Works',
  description:
    'Timeline-driven full-screen works archive with immersive project stages and structured case study navigation.',
}

export default function WorksPage() {
  return (
    <div className="works-immersive-page -mx-4 sm:-mx-6">
      <WorksTimelinePage projects={projects} />
    </div>
  )
}
