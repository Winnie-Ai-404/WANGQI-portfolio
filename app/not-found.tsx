import { ButtonLink } from '@/components/button-link'

export default function NotFound() {
  return (
    <div className="shell py-20">
      <section className="surface-panel space-y-5 p-10">
        <p className="text-sm uppercase tracking-[0.08em] text-text-secondary">404</p>
        <h1 className="text-4xl font-medium tracking-tight text-text-primary">Page not found</h1>
        <p className="max-w-reading text-text-secondary">
          The page you requested does not exist or has been moved.
        </p>
        <ButtonLink href="/">Return home</ButtonLink>
      </section>
    </div>
  )
}
