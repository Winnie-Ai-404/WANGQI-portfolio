import { ButtonLink } from '@/components/button-link'

export function HomeHero() {
  return (
    <section className="relative -mx-4 min-h-[calc(100vh-4.75rem)] overflow-hidden bg-black px-4 sm:-mx-6 sm:px-6">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-[calc(100vh-4.75rem)] flex-col justify-center py-10 sm:py-12">
        <div className="space-y-8">
          <div
            role="heading"
            aria-level={1}
            className="text-[clamp(2.1rem,9.3vw,9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-white"
          >
            <span className="block whitespace-nowrap">Interdisciplinary</span>
            <span className="block whitespace-nowrap">Product</span>
            <span className="block whitespace-nowrap">Designer</span>
          </div>
        </div>
        <div className="mt-12 flex items-center">
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/works" className="!rounded-none">
              View Projects
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" className="!rounded-none">
              Contact
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
