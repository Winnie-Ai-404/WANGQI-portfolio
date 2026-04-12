type TagPillProps = {
  label: string
  accent?: string
}

export function TagPill({ label, accent }: TagPillProps) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide text-text-secondary"
      style={{
        borderColor: accent ? `${accent}44` : undefined,
        backgroundColor: accent ? `${accent}12` : undefined,
        color: accent ? '#171717' : undefined,
      }}
    >
      {label}
    </span>
  )
}
