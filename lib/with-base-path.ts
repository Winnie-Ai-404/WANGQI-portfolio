const runtimeBasePath = process.env.NEXT_PUBLIC_GH_PAGES_BASE_PATH ?? ''

export function withBasePath(src: string): string {
  if (!runtimeBasePath) return src
  if (!src.startsWith('/')) return src
  if (src.startsWith('//')) return src
  if (src === runtimeBasePath || src.startsWith(`${runtimeBasePath}/`)) return src
  return `${runtimeBasePath}${src}`
}
