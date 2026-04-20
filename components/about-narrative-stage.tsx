'use client'

import { useEffect, useRef, useState } from 'react'
import AboutPhysicsImages from '@/components/AboutPhysicsImages'
import AboutScrollCapsule from '@/components/about-scroll-capsule'
import BlurText from '@/components/blur-text'

type NarrativeStep = {
  backgroundWord: string
  title: string
  text?: string
  items?: string[]
}

const narrativeSteps: NarrativeStep[] = [
  {
    backgroundWord: 'BACKGROUND',
    title: '教育背景与实践基础',
    text: '本科毕业于华中科技大学产品设计专业，研究生毕业于香港大学 Innovative Design and Technology（创新设计与科技）专业。从产品设计到创新设计与科技的跨学科训练，让我逐步建立起从研究理解问题、以系统方式组织信息，并推动方案走向落地的设计路径。',
  },
  {
    backgroundWord: 'FOCUS',
    title: '关注方向',
    text: '我主要关注服务系统与体验流程、产品策略与信息架构、用户研究与洞察转化，以及 UI/UX 与复杂交互体验设计。相比单点界面的优化，我更关注如何在用户需求、业务目标与技术约束之间建立清晰联系，形成更完整、更可执行的方案。',
  },
  {
    backgroundWord: 'CAPABILITIES',
    title: '能力概览',
    text: '我具备从前期研究、结构梳理到界面表达与方案验证的一体化设计能力，包括用户研究、体验地图与服务蓝图、信息架构、原型设计、界面设计、设计系统搭建与可用性测试。在项目推进中，也能够在跨角色协作中推动方案表达、迭代优化与最终落地。',
  },
]

export function AboutNarrativeStage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const markerRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number((entry.target as HTMLElement).dataset.stepIndex)
          if (!Number.isNaN(idx)) setActiveIndex(idx)
        })
      },
      {
        threshold: 0.55,
        rootMargin: '-8% 0px -20% 0px',
      },
    )

    markerRefs.current.forEach((marker) => {
      if (marker) observer.observe(marker)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative -mx-4 sm:-mx-6">
      <div className="sticky top-20 z-10 h-[calc(100vh-7rem)] overflow-hidden border-y border-border/60 bg-bg/88 backdrop-blur-sm">
        <AboutPhysicsImages activeStepIndex={activeIndex} />
        <AboutScrollCapsule />
        <div className="relative mx-auto flex h-full w-full max-w-shell items-center px-4 sm:px-6">
          {narrativeSteps.map((step, index) => {
            const isActive = index === activeIndex
            return (
              <article
                key={step.backgroundWord}
                className={`absolute inset-0 mx-auto flex w-full max-w-shell items-center px-4 transition-all duration-500 ease-out sm:px-6 ${
                  isActive
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0 pointer-events-none'
                }`}
              >
                <p className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(3.2rem,13vw,12rem)] font-black uppercase leading-none tracking-[0.06em] text-white/[0.07]">
                  {step.backgroundWord}
                </p>

                <div className="relative z-10 max-w-[760px] space-y-6">
                  <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                    {step.title}
                  </h2>

                  {step.text ? (
                    <BlurText
                      text={step.text}
                      delay={22}
                      animateBy="letters"
                      direction="top"
                      className="max-w-[72ch] text-lg leading-relaxed text-text-secondary"
                    />
                  ) : null}

                  {step.items ? (
                    <ul className="grid gap-3 text-lg text-text-secondary">
                      {step.items.map((item) => (
                        <li
                          key={item}
                          className="w-fit border-b border-white/15 pb-1 tracking-[0.01em]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="relative z-0">
        {narrativeSteps.map((step, index) => (
          <div
            key={step.backgroundWord}
            ref={(node) => {
              markerRefs.current[index] = node
            }}
            data-step-index={index}
            className="h-[74vh]"
          />
        ))}
      </div>
    </section>
  )
}
