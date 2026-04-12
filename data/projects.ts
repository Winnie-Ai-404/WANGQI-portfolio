export type MediaKind = 'image' | 'video' | 'diagram'

export type ProjectMedia = {
  kind: MediaKind
  src: string
  alt: string
  caption?: string
}

export type ProjectSection = {
  id:
    | 'background'
    | 'research'
    | 'insights'
    | 'strategy'
    | 'process'
    | 'outcome'
    | 'reflection'
  title: string
  text: string
  bullets?: string[]
  media?: ProjectMedia[]
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  accent: string
  year: string
  role: string
  duration: string
  team: string
  featured: boolean
  exploration?: boolean
  tags: string[]
  hero: {
    statement: string
    image: string
    imageAlt: string
    video?: string
  }
  facts: Array<{ label: string; value: string }>
  sections: ProjectSection[]
  nextProjectSlug: string
}

export const projects: Project[] = [
  {
    slug: 'city-life',
    title: '融入城市生活计划',
    subtitle: '面向老龄化与代际陪伴需求的社区服务体验设计项目。',
    accent: '#7C84E8',
    year: '2024',
    role: '服务设计 / 产品设计 / UIUX 设计',
    duration: '约 8 周',
    team: '个人项目',
    featured: true,
    tags: ['服务设计', '社区场景', '代际融合', '用户研究', 'UIUX'],
    hero: {
      statement:
        '围绕老龄化社会与隔代照护场景，通过用户研究、体验梳理与系统设计，探索帮助老年人、儿童与家庭更好连接社区生活的服务方案。',
      image: '/images/city-life/cover.png',
      imageAlt: '融入城市生活计划项目封面图',
    },
    facts: [
      { label: '项目类型', value: '服务设计 / 产品设计 / UIUX 设计' },
      { label: '项目场景', value: '社区生活 / 代际融合 / 家庭陪伴' },
      { label: '我的职责', value: '用户研究、体验梳理、系统设计、界面设计' },
      { label: '项目产出', value: 'Persona、体验地图、系统图、App 界面与互动触点方案' },
    ],
    sections: [
      {
        id: 'background',
        title: '项目背景',
        text:
          '在老龄化趋势持续加深的背景下，越来越多家庭进入隔代照护状态。祖辈在承担陪伴与照护责任的同时，也面临社区融入不足、活动形式单一、与儿童互动方式有限等问题。项目希望从社区生活场景出发，探索促进代际互动与社区参与的服务体验方案。',
      },
      {
        id: 'research',
        title: '研究与发现',
        text:
          '项目通过访谈、观察、利益相关者分析与用户画像梳理，了解祖辈、儿童及家庭在社区生活中的真实状态。研究发现，祖辈在日常陪伴过程中往往承担较高时间成本，但其社区参与感、信息获取效率与互动方式支持仍然不足。',
        bullets: [
          '祖辈在照护过程中承担较长时间的陪伴任务',
          '现有社区活动与服务触点较分散，缺乏连续体验',
          '儿童与祖辈之间需要更轻松自然的互动媒介',
          '家庭共享、社区连接与线下参与之间存在断层',
        ],
      },
      {
        id: 'insights',
        title: '关键洞察',
        text:
          '问题并不只是缺少活动，而是缺少一个能够连接家庭、社区与线下服务资源的连续体验系统。若能围绕祖辈与儿童的共同参与场景设计低门槛、可持续的互动触点，就有机会提升社区融入感与陪伴质量。',
        bullets: [
          '社区融入需要连续性的服务支持，而非单次活动',
          '祖辈与儿童的共同参与比单独服务更容易建立黏性',
          '互动触点应兼顾趣味性、可达性与操作简易度',
        ],
      },
      {
        id: 'strategy',
        title: '设计策略',
        text:
          '基于研究结果，项目提出以社区为核心节点，连接家庭、商户与线下互动场景的服务系统。通过数字化入口与实体互动触点结合，构建从发现活动、参与活动到反馈分享的完整体验路径。',
      },
      {
        id: 'process',
        title: '设计过程',
        text:
          '在方案推进中，我梳理了用户旅程与系统结构，并围绕社区参与、家庭共享、线下互动和反馈激励等环节搭建服务逻辑。随后进一步输出低保真与高保真界面，并结合互动地毯等实体触点，形成线上线下结合的整体方案。',
        bullets: [
          '梳理体验地图与机会点',
          '构建系统图与服务流程',
          '设计数字产品界面与内容结构',
          '结合互动装置完善体验闭环',
        ],
      },
      {
        id: 'outcome',
        title: '最终方案',
        text:
          '最终方案包括社区服务系统框架、App 界面、高保真页面展示以及互动地毯等线下触点。方案尝试通过游戏化与任务式参与机制，增强祖辈与儿童的共同参与意愿，同时提升家庭与社区之间的连接效率。',
      },
      {
        id: 'reflection',
        title: '项目反思',
        text:
          '这个项目让我进一步理解了服务设计中系统性连接的重要性。相比单一功能设计，更关键的是如何让不同角色在同一体验链路中自然衔接。后续若继续迭代，我希望进一步验证方案在真实社区中的可行性，并优化不同年龄层的使用门槛。',
      },
    ],
    nextProjectSlug: 'medical-experience',
  },
  {
    slug: 'medical-experience',
    title: 'Medical Experience Continuum',
    subtitle: 'Designing a patient-facing care journey from triage to follow-up.',
    accent: '#E7A14A',
    year: '2024',
    role: 'Product Designer',
    duration: '12 weeks',
    team: 'Clinical leads, PM, engineering',
    featured: true,
    tags: ['Healthcare', 'Product Design', 'Research', 'Journey'],
    hero: {
      statement:
        'Turning fragmented medical touchpoints into a calmer, transparent patient journey with clearer decisions.',
      image:
        'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Warm clinical hallway and service desk',
    },
    facts: [
      { label: 'Impact', value: 'Appointment no-show reduced by 17%' },
      { label: 'Users', value: 'Primary care + chronic condition pathways' },
      { label: 'Deliverables', value: 'Care timeline, interface system, content patterns' },
    ],
    sections: [
      {
        id: 'background',
        title: 'Background / Context',
        text:
          'Patients were receiving fragmented information across channels, leading to anxiety and missed preparation before visits.',
      },
      {
        id: 'research',
        title: 'Research',
        text:
          'We synthesized interview transcripts, service logs, and support calls into one evidence model to understand where confidence dropped.',
      },
      {
        id: 'insights',
        title: 'Insights',
        text:
          'Uncertainty peaked before and after the appointment. Users needed simple checklists and clear progress states more than additional instructions.',
      },
      {
        id: 'strategy',
        title: 'Strategy / Concept',
        text:
          'We introduced a care continuum pattern: what to do now, what happens next, and where to get support if plans change.',
      },
      {
        id: 'process',
        title: 'Design Process',
        text:
          'Rapid prototype tests with patients and coordinators validated the information hierarchy and interaction pacing.',
        media: [
          {
            kind: 'diagram',
            src: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=80',
            alt: 'Healthcare journey map on a whiteboard',
            caption: 'Experience map connecting online and offline touchpoints.',
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Final Outcome',
        text:
          'A patient-facing experience layer with calmer guidance and improved follow-up completion in pilot clinics.',
      },
      {
        id: 'reflection',
        title: 'Reflection',
        text:
          'In healthcare, precision and tone are both product decisions. Small language and hierarchy changes can lower emotional burden significantly.',
      },
    ],
    nextProjectSlug: 'pet-care',
  },
  {
    slug: 'pet-care',
    title: 'Pet-care Consensus Planner',
    subtitle: 'Balancing human intent and pet comfort through scenario-driven planning.',
    accent: '#B79E86',
    year: '2026',
    role: 'End-to-end Product Designer',
    duration: '10 weeks',
    team: 'Design, PM, data strategy',
    featured: true,
    tags: ['Product Design', 'UI/UX', 'Behavior', 'Travel'],
    hero: {
      statement:
        'A planning experience that makes trade-offs explicit and helps families choose lower-stress travel routes for both people and pets.',
      image:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Dog looking out of a travel car window',
    },
    facts: [
      { label: 'Impact', value: 'Planning completion improved by 31%' },
      { label: 'Approach', value: 'Conflict-first recommendation model' },
      { label: 'Output', value: 'Stepwise planner + adjustable proposal engine' },
    ],
    sections: [
      {
        id: 'background',
        title: 'Background / Context',
        text:
          'Travel planning with pets often breaks late because policies, pace, and location access are not evaluated early enough.',
      },
      {
        id: 'research',
        title: 'Research',
        text:
          'A mixed-method study of travel planning records and interviews showed recurring hidden conflicts between owner priorities and pet constraints.',
      },
      {
        id: 'insights',
        title: 'Insights',
        text:
          'Users accepted compromises when those compromises were explicit. The biggest failure mode was uncertainty, not lack of options.',
      },
      {
        id: 'strategy',
        title: 'Strategy / Concept',
        text:
          'We made conflict visibility the core narrative: identify friction, explain trade-offs, then assemble recommendations.',
      },
      {
        id: 'process',
        title: 'Design Process',
        text:
          'The UI was prototyped as a progressive disclosure flow with soft checkpoints and adjustable controls for pace, budget, and comfort bias.',
        media: [
          {
            kind: 'image',
            src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=80',
            alt: 'Pet travel moodboard and interface screens',
            caption: 'Planning flow with conflict cards and adaptive recommendation states.',
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Final Outcome',
        text:
          'A calmer planning tool that converts uncertainty into a shared decision rhythm and supports a clear route to booking.',
      },
      {
        id: 'reflection',
        title: 'Reflection',
        text:
          'Designing for consensus means designing for emotion as well as logic. Framing decisions clearly can prevent late-stage failure.',
      },
    ],
    nextProjectSlug: 'aurora',
  },
  {
    slug: 'aurora',
    title: 'Aurora Research Console',
    subtitle: 'A research-driven interface system for interactive sense-making.',
    accent: '#355B46',
    year: '2023',
    role: 'Interaction Designer',
    duration: '16 weeks',
    team: 'Design research, data science, frontend',
    featured: true,
    tags: ['Research Systems', 'UI', 'Data Experience', 'Interaction'],
    hero: {
      statement:
        'Designing an interface where researchers can inspect patterns, annotate evidence, and build shared understanding without cognitive overload.',
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Dark desk setup with analysis screens',
    },
    facts: [
      { label: 'Impact', value: 'Cross-team insight handoff time reduced by 29%' },
      { label: 'Core Feature', value: 'Evidence layering + annotation threads' },
      { label: 'System', value: 'Reusable analysis modules + visual language' },
    ],
    sections: [
      {
        id: 'background',
        title: 'Background / Context',
        text:
          'Research outputs were scattered across dashboards and slides, making decisions slow and difficult to verify.',
      },
      {
        id: 'research',
        title: 'Research',
        text:
          'Field observations showed that teams needed narrative flow and traceable evidence more than raw information density.',
      },
      {
        id: 'insights',
        title: 'Insights',
        text:
          'When evidence and interpretation were separated, trust dropped. Co-locating rationale with signals improved alignment.',
      },
      {
        id: 'strategy',
        title: 'Strategy / Concept',
        text:
          'A layered interface model: overview first, evidence next, action framing last. This structure reduced context switching.',
      },
      {
        id: 'process',
        title: 'Design Process',
        text:
          'Prototype rounds focused on readability under high data density and on reducing interaction fatigue during long analysis sessions.',
      },
      {
        id: 'outcome',
        title: 'Final Outcome',
        text:
          'The delivered system became the default interface for weekly cross-functional reviews and decision documentation.',
      },
      {
        id: 'reflection',
        title: 'Reflection',
        text:
          'Research-driven products succeed when they support shared cognition, not just individual analysis speed.',
      },
    ],
    nextProjectSlug: 'city-life',
  },
  {
    slug: 'signal-library',
    title: 'Signal Library',
    subtitle: 'A compact interaction pattern library for internal prototyping.',
    accent: '#7C84E8',
    year: '2024',
    role: 'UI System Designer',
    duration: '6 weeks',
    team: 'Design ops',
    featured: false,
    exploration: true,
    tags: ['UI Systems', 'Exploration'],
    hero: {
      statement: 'A small but robust library to align interaction quality across teams.',
      image:
        'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Design system tokens on screens',
    },
    facts: [{ label: 'Status', value: 'Internal exploration' }],
    sections: [
      {
        id: 'background',
        title: 'Background / Context',
        text: 'Exploration project to improve consistency in concept prototypes.',
      },
      {
        id: 'research',
        title: 'Research',
        text: 'Reviewed interaction debt across recent prototype rounds.',
      },
      {
        id: 'insights',
        title: 'Insights',
        text: 'Most quality drift came from spacing, type hierarchy, and interaction state mismatch.',
      },
      {
        id: 'strategy',
        title: 'Strategy / Concept',
        text: 'Create a concise pattern set with strict usage examples.',
      },
      {
        id: 'process',
        title: 'Design Process',
        text: 'Iterative component balancing and token governance.',
      },
      {
        id: 'outcome',
        title: 'Final Outcome',
        text: 'A shared starter kit that improved speed and visual consistency.',
      },
      {
        id: 'reflection',
        title: 'Reflection',
        text: 'Constraint can be a design accelerant when teams share language.',
      },
    ],
    nextProjectSlug: 'journey-lab',
  },
  {
    slug: 'journey-lab',
    title: 'Journey Lab',
    subtitle: 'Method experiments for mapping high-ambiguity service journeys.',
    accent: '#E7A14A',
    year: '2023',
    role: 'Service Design Researcher',
    duration: '5 weeks',
    team: 'Methods group',
    featured: false,
    exploration: true,
    tags: ['Service Design', 'Research', 'Exploration'],
    hero: {
      statement: 'Method-focused investigation into faster alignment for complex ecosystems.',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Workshop table with sticky notes and notebooks',
    },
    facts: [{ label: 'Status', value: 'Practice exploration' }],
    sections: [
      {
        id: 'background',
        title: 'Background / Context',
        text: 'Testing fast facilitation tools for early-stage service design programs.',
      },
      {
        id: 'research',
        title: 'Research',
        text: 'Compared synthesis quality across three workshop structures.',
      },
      {
        id: 'insights',
        title: 'Insights',
        text: 'Teams aligned faster when evidence quality thresholds were explicit.',
      },
      {
        id: 'strategy',
        title: 'Strategy / Concept',
        text: 'Designed lightweight canvases that force scope and confidence clarity.',
      },
      {
        id: 'process',
        title: 'Design Process',
        text: 'Ran facilitation pilots with mixed-function stakeholders.',
      },
      {
        id: 'outcome',
        title: 'Final Outcome',
        text: 'Toolkit adopted by internal teams for discovery sprint kickoffs.',
      },
      {
        id: 'reflection',
        title: 'Reflection',
        text: 'Method design is product design when it shapes decision quality.',
      },
    ],
    nextProjectSlug: 'city-life',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const explorationProjects = projects.filter((project) => project.exploration)

export const projectTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
