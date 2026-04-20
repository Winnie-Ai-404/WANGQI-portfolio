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
        'inline-flex min-h-11 items-center justify-center rounded-soft border px-5 text-sm font-medium tracking-[0.02em] transition-all duration-300 ease-calm active:scale-[0.98]',
        variant === 'primary'
          ? 'border-white/30 bg-white text-black hover:-translate-y-0.5 hover:border-white hover:bg-[#ededed]'
          : 'border-white/22 bg-transparent text-white/88 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.06]',
        className,
      )}
    >
      {children}
    </Link>
  )
}
