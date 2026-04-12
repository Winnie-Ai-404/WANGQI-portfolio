import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-soft border px-5 text-sm font-medium transition-all duration-500 ease-calm',
        variant === 'primary'
          ? 'border-transparent bg-[#171717] text-white hover:-translate-y-0.5 hover:bg-black'
          : 'border-border bg-surface text-text-primary hover:-translate-y-0.5 hover:bg-bg',
        className,
      )}
    >
      {children}
    </Link>
  )
}
