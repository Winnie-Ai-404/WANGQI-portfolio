type SocialLink = {
  label: string
  href: string
}

type SiteConfig = {
  name: string
  role: string
  tagline: string
  shortIntro: string
  email: string
  location: string
  social: SocialLink[]
  resumeHref: string
}

export const siteConfig: SiteConfig = {
  name: 'Wang Qi',
  role: 'Service, Product, and UI/UX Designer',
  tagline:
    'Designing research-driven interactive systems that connect strategy, behavior, and crafted digital experiences.',
  shortIntro:
    'I work across service design, product strategy, and interface systems to shape complex experiences into clear, human-centered outcomes.',
  email: 'iswang7i@qq.com',
  location: 'Shanghai / Remote',
  social: [],
  resumeHref: '#',
}

export const navItems = [
  { label: 'Projects', href: '/works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
