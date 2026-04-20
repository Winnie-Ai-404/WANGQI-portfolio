import type { Metadata } from 'next'
import BlurText from '@/components/blur-text'
import Lanyard from '@/components/Lanyard'
import ContactPhysicsCapsules from '@/components/ContactPhysicsCapsules'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Interactive contact badge with WeChat QR code.',
}

export default function ContactPage() {
  const marqueeToken =
    'Open to design opportunities, collaborations, and creative conversations. ♥ '
  const marqueeLine = Array.from({ length: 3 }, () => marqueeToken).join('')

  return (
    <div className="contact-lanyard-page relative -mx-4 h-[calc(100vh-4.75rem)] overflow-hidden sm:-mx-6">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(42rem 42rem at 18% 18%, rgba(255,255,255,0.07), transparent 72%), radial-gradient(34rem 34rem at 82% 82%, rgba(143,156,255,0.09), transparent 76%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="contact-hero-composition select-none font-black uppercase leading-none text-white/20"
          style={{
            fontFamily:
              '"Futura","Avenir Next","Helvetica Neue","Inter Tight","Space Grotesk","Satoshi",sans-serif',
            fontSize: 'clamp(4rem, 16vw, 14rem)',
            letterSpacing: '0.08em',
            transform: 'translateY(1%)',
          }}
        >
          <span className="contact-wave">👋</span>
          <BlurText
            text="SAY"
            delay={120}
            animateBy="letters"
            direction="top"
            className="contact-blurword contact-blurword-say"
          />
          <BlurText
            text="HELLO"
            delay={90}
            animateBy="letters"
            direction="top"
            className="contact-blurword contact-blurword-hello"
          />
        </div>
      </div>
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6">
        <div className="-mt-14 w-full max-w-[1100px] sm:-mt-16">
          <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} fov={18} />
        </div>
      </div>
      <ContactPhysicsCapsules />
      <div className="contact-marquee-anchor pointer-events-none absolute bottom-10 left-0 z-20 w-full overflow-hidden sm:bottom-12">
        <div className="contact-marquee-track">
          <p className="contact-marquee-item">{marqueeLine}</p>
          <p className="contact-marquee-item" aria-hidden="true">
            {marqueeLine}
          </p>
        </div>
      </div>
    </div>
  )
}
