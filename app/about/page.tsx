import type { Metadata } from 'next'
import Image from '@/components/base-path-image'
import { AboutNarrativeStage } from '@/components/about-narrative-stage'
import BlurText from '@/components/blur-text'
import { TextType } from '@/components/text-type'
import { TiltedCard } from '@/components/tilted-card'

export const metadata: Metadata = {
  title: 'About',
  description: '以研究为基础，用系统思维与产品视角推动设计落地。',
}

export default function AboutPage() {
  return (
    <div className="about-page space-y-10 pb-0">
      <section className="relative -mx-4 min-h-[74vh] overflow-hidden border-b border-border/50 px-4 pb-14 pt-10 sm:-mx-6 sm:px-6">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <p className="absolute left-[2%] top-[7%] select-none text-[clamp(4rem,15vw,15rem)] font-black uppercase leading-[0.9] tracking-[0.08em] text-white/[0.08]">
            ABOUT
          </p>
          <p className="absolute right-[3%] top-[34%] select-none text-[clamp(4rem,14vw,14rem)] font-black uppercase leading-[0.9] tracking-[0.08em] text-white/[0.08]">
            ME
          </p>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-shell gap-8 lg:grid-cols-12 lg:items-center">
          <div className="space-y-12 lg:col-span-6">
            <p className="inline-flex w-fit px-0 py-0 text-sm uppercase tracking-[0.2em] text-text-secondary">
              WHO I AM
            </p>
            <BlurText
              text="以研究定义问题，以产品思维推理组织方案，以设计推动落地"
              delay={55}
              animateBy="letters"
              direction="top"
              className="max-w-[17ch] text-[2.24rem] font-semibold leading-[1] tracking-[0.02em] text-text-primary sm:text-[2.68rem] lg:text-[3.36rem]"
            />
            <TextType
              texts={[
                '我习惯从研究出发理解问题，用系统思维梳理复杂信息，并以产品视角推动设计落地。相比只关注界面本身，我更在意方案是否真正回应用户需求、适配使用场景，并在技术与业务约束下具备可实现性。熟悉 AI 工具在调研、分析与方案推进中的应用，也具备一定开发理解与协作能力，能够更准确地把握实现边界，提升设计落地的效率与质量。',
              ]}
              className="max-w-[64ch] text-[0.95rem] font-normal leading-relaxed text-text-secondary [text-align:justify] sm:text-base"
              typingSpeed={3}
              pauseDuration={1500}
              deletingSpeed={3}
              showCursor
              cursorCharacter="█"
              variableSpeedEnabled={false}
              cursorBlinkDuration={0.55}
              startDelay={120}
              maxTypingDuration={4800}
              hideCursorOnComplete
              reserveFinalSpace
            />
          </div>

          <figure className="justify-self-center lg:col-span-6 lg:justify-self-end">
            <TiltedCard className="w-[min(100%,26rem)] rounded-[0.55rem] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
              <Image
                src="/images/cv/image.png"
                alt="Wang Qi portrait"
                width={960}
                height={1200}
                className="h-auto w-full rounded-[0.55rem] object-cover"
                sizes="(min-width: 1024px) 32vw, 70vw"
                priority
              />
            </TiltedCard>
          </figure>
        </div>
      </section>

      <AboutNarrativeStage />
    </div>
  )
}
