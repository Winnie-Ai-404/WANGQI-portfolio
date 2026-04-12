import { TagPill } from '@/components/tag-pill'

type SectionHeadingProps = {
  marker: string
  title: string
  description?: string
  accent?: string
}

export function SectionHeading({
  marker,
  title,
  description,
  accent,
}: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <TagPill label={marker} accent={accent} />
      <h2 className="max-w-4xl text-3xl font-medium tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-reading text-base leading-relaxed text-text-secondary">{description}</p>
      ) : null}
    </div>
  )
}
