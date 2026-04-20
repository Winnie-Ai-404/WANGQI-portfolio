import type { Metadata } from 'next'
import Link from 'next/link'
import { HomeProjectShowcase } from '@/components/home-project-showcase'
import { HomeHero } from '@/components/home-hero'
import { SectionReveal } from '@/components/section-reveal'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Portfolio home highlighting featured case studies and selected design explorations across service, product, and UI/UX.',
}

export default function HomePage() {
  const featuredOrder = ['elemotion', 'nutri-pick', 'city-life'] as const
  const featuredProjects = featuredOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))


  return (
    <div className="space-y-20 pb-14">
      <HomeHero />

      <div className="shell space-y-20">
        <SectionReveal className="space-y-10">
          <div className="space-y-3 border-t border-white/10 pt-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/42">Selected Projects</p>
            <p className="max-w-[64ch] text-base leading-relaxed text-white/62">
              精选项目展示，聚焦问题、场景与体验落地。完整项目请进入作品页查看。
            </p>
          </div>
          <HomeProjectShowcase projects={featuredProjects} />
          <div className="flex justify-center pt-2">
            <Link href="/works" className="text-sm tracking-[0.05em] text-white/46 transition-colors duration-300 hover:text-white/78">
              查看全部项目
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-2">
          <section className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/42">About</p>
            <h3 className="text-2xl font-medium tracking-tight text-text-primary">
              以研究定义问题，以系统思维组织方案，以设计推动落地。
            </h3>
            <p className="max-w-reading text-base leading-relaxed text-white/60">
              我关注用户研究、服务设计、产品设计与 UI/UX 的交叉实践，擅长把复杂信息转化为清晰的结构、路径与可执行的体验方案。相比单一界面表达，我更在意方案是否真正回应需求、适配场景，并具备落地价值。
            </p>
            <Link href="/about" className="inline-flex text-sm tracking-[0.04em] text-white/58 transition-colors duration-300 hover:text-white/84">
              了解更多
            </Link>
          </section>

          <section className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/42">Contact</p>
            <h3 className="text-2xl font-medium tracking-tight text-text-primary">欢迎联系我，一起做更有思考的产品。</h3>
            <p className="text-base leading-relaxed text-white/60">
              目前开放全职机会、合作项目与研究驱动型设计工作，方向包括产品设计、UI/UX 与服务设计。期待与关注体验质量、系统逻辑与真实问题的人展开交流。
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/contact" className="inline-flex text-sm tracking-[0.04em] text-white/58 transition-colors duration-300 hover:text-white/84">
                联系我
              </Link>
              <a
                href="mailto:iswang7i@qq.com"
                className="inline-flex text-sm tracking-[0.04em] text-white/45 transition-colors duration-300 hover:text-white/72"
              >
                iswang7i@qq.com
              </a>
            </div>
          </section>
        </SectionReveal>
      </div>
    </div>
  )
}
