export type MediaKind = 'image' | 'video' | 'diagram'

export type ProjectMedia = {
  kind: MediaKind
  src: string
  alt: string
  caption?: string
}

export type ProjectSection = {
  id: string
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
      video: '/videos/Grandparents%20.mp4',
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
        title: '项目概览',
        text:
          '该项目围绕老龄化背景下的隔代照护与社区融入问题展开，通过用户研究、体验梳理与系统设计，结合服务方案、数字产品与线下触点，帮助老年人、儿童与家庭建立更自然的社区连接，提升代际之间的参与感与陪伴感。',
        media: [
          {
            kind: 'image',
            src: '/images/city-life/cover.png',
            alt: '融入城市生活计划项目概览封面',
            caption: '项目概览',
          },
        ],
      },
      {
        id: 'research',
        title: '背景与研究洞察',
        text:
          '项目从老龄化趋势、隔代照护现状与老年人城市融入问题出发，梳理目标群体在家庭结构、生活节奏与社区参与中的主要矛盾。研究显示，祖辈在承担照护责任的同时，也面临社区融入不足、互动机会有限与生活重心失衡等问题，这些都为后续服务设计提供了明确的切入点。',
        media: [
          {
            kind: 'image',
            src: '/images/city-life/research.png',
            alt: '融入城市生活计划背景与研究洞察图',
            caption: '背景与研究洞察',
          },
        ],
      },
      {
        id: 'insights',
        title: '用户研究与核心画像',
        text:
          '通过访谈、观察、用户画像与利益相关者分析，项目进一步聚焦祖辈在照护过程中的真实需求与情绪状态。研究发现，他们往往承担较高时间成本和照护压力，同时也面临社交圈缩小、缺乏归属感和适应新环境困难等问题，因此需要更友好、更持续的支持方式。',
        media: [
          {
            kind: 'image',
            src: '/images/city-life/persona.png',
            alt: '融入城市生活计划用户研究与核心画像图',
            caption: '用户研究与核心画像',
          },
        ],
      },
      {
        id: 'strategy',
        title: '体验路径与机会点',
        text:
          '项目进一步梳理祖辈在一天中的照护流程、行为节点与情绪变化，从接送、陪伴、用餐到晚间休息，识别出在日常活动、家庭协同与社区参与中的关键痛点与机会点。这一过程帮助我更清晰地定位哪些场景最值得被设计介入，以及哪些触点能够真正提升体验质量。',
        media: [
          {
            kind: 'diagram',
            src: '/images/city-life/experience-map.png',
            alt: '融入城市生活计划体验路径与机会点图',
            caption: '体验路径与机会点',
          },
        ],
      },
      {
        id: 'process',
        title: '系统方案与服务策略',
        text:
          '基于前期研究与体验分析，项目构建了一套连接家庭、社区、商户与互动触点的服务系统。整体策略是以数字产品为入口，以社区参与为核心，通过线上信息支持与线下活动机制相结合，帮助祖辈、儿童与家庭在更完整的服务链路中建立持续互动与社区归属感。',
        media: [
          {
            kind: 'diagram',
            src: '/images/city-life/system-map.png',
            alt: '融入城市生活计划系统方案与服务策略图',
            caption: '系统方案与服务策略',
          },
        ],
      },
      {
        id: 'outcome',
        title: '界面设计与数字产品',
        text:
          '在数字端，项目围绕社区参与、活动浏览、任务反馈与互动记录等功能展开界面设计，形成较完整的信息架构与交互流程。界面设计不仅服务于功能呈现，也承担着引导参与、增强反馈与建立使用节奏的作用，使数字产品成为连接服务系统与用户日常体验的重要媒介。',
        media: [
          {
            kind: 'image',
            src: '/images/city-life/ui.png',
            alt: '融入城市生活计划界面设计与数字产品图',
            caption: '界面设计与数字产品',
          },
        ],
      },
      {
        id: 'reflection',
        title: '交互触点设计',
        text:
          '除了数字产品，项目还尝试通过互动地毯这一线下触点，将代际互动延伸到更具参与感和趣味性的实体体验中。该设计希望通过游戏化反馈、动作参与与奖励机制，增强祖辈与儿童的共同互动，让服务不只停留在线上，而是转化为可感知、可参与、可持续的社区体验。',
        media: [
          {
            kind: 'image',
            src: '/images/city-life/interactive-carpet.png',
            alt: '融入城市生活计划交互触点设计图',
            caption: '交互触点设计',
          },
        ],
      },
    ],
    nextProjectSlug: 'medical-experience',
  },
  {
    slug: 'medical-experience',
    title: '弱视儿童医疗体验系统',
    subtitle: '面向儿童、家长与医生多方协同的医疗服务体验优化项目。',
    accent: '#E7A14A',
    year: '2024',
    role: '服务设计 / 产品设计 / UIUX 设计',
    duration: '约 8 周',
    team: '个人项目',
    featured: true,
    tags: ['服务设计', '医疗体验', '儿童场景', '用户研究', 'UIUX'],
    hero: {
      statement:
        '围绕弱视儿童就诊过程中的焦虑、沟通与配合问题，通过研究、服务梳理与互动触点设计，探索更友好、更具参与感的儿童医疗体验方案。',
      image: '/images/medical/cover.png',
      imageAlt: '弱视儿童医疗体验系统项目封面图',
      video: '/videos/eyes.mp4',
    },
    facts: [
      { label: '项目类型', value: '服务设计 / 产品设计 / UIUX 设计' },
      { label: '项目场景', value: '儿童医疗 / 弱视诊疗 / 医患协同' },
      { label: '我的职责', value: '用户研究、服务梳理、界面设计、互动触点设计' },
      { label: '项目产出', value: '旅程图、利益相关者图、系统方案、界面与触觉玩具设计' },
    ],
    sections: [
      {
        id: 'background',
        title: '项目概览',
        text:
          '该项目聚焦弱视儿童在就诊与治疗过程中的焦虑、配合度不足以及家长陪诊压力等问题，通过研究、服务梳理与互动触点设计，结合服务方案、数字界面与线下体验，改善儿童、家长与医院三方在医疗过程中的整体体验，让儿童医疗成为一个更易理解、更可参与、也更具支持感的过程。',
        media: [
          {
            kind: 'image',
            src: '/images/medical/cover.png',
            alt: '弱视儿童医疗体验系统项目概览图',
            caption: '项目概览',
          },
        ],
      },
      {
        id: 'research',
        title: '背景与现场观察',
        text:
          '项目首先从弱视治疗的医学背景、儿童发病特征与门诊现场流程出发，梳理影响医疗体验的关键因素。研究发现，弱视若未在合适年龄及时干预，可能对儿童视力发展与生活质量造成长期影响；而在实际门诊环境中，候诊枯燥、流程陌生、环境缺乏儿童友好性，也进一步放大了儿童的紧张与抗拒情绪。',
        media: [
          {
            kind: 'image',
            src: '/images/medical/observation.png',
            alt: '弱视儿童医疗背景与现场观察图',
            caption: '背景与现场观察',
          },
        ],
      },
      {
        id: 'insights',
        title: '用户研究与体验路径',
        text:
          '通过访谈、画像、利益相关者梳理与双旅程图分析，项目进一步识别了儿童与家长在就诊前、中、后的主要体验差异。儿童往往更在意等待过程是否无聊、检查是否令人不安，而家长则更关注信息是否清楚、孩子能否配合、以及自己是否能在有限时间内有效协助治疗。项目因此将“降低儿童抵触、减轻家长压力、提升医院体验”作为核心设计方向。',
        media: [
          {
            kind: 'diagram',
            src: '/images/medical/journey-map.png',
            alt: '弱视儿童医疗用户研究与体验路径图',
            caption: '用户研究与体验路径',
          },
        ],
      },
      {
        id: 'strategy',
        title: '设计概念与系统方案',
        text:
          '基于前期研究，项目提出将医院、家长、儿童、数字应用与互动玩具结合起来的整体体验方案。通过联合共创活动、科学知识转译、插画化表达与儿童娱乐空间设计，方案尝试把医学知识、情绪安抚与亲子互动整合到同一系统中，让儿童在更自然的环境里理解治疗、参与治疗并建立安全感。',
        media: [
          {
            kind: 'image',
            src: '/images/medical/co-design.png',
            alt: '弱视儿童医疗设计概念与系统方案图',
            caption: '设计概念与系统方案',
          },
        ],
      },
      {
        id: 'process',
        title: '界面设计与互动触点',
        text:
          '在具体设计上，项目结合移动端界面与触觉玩具两类核心触点展开。一方面，数字界面承担预约提醒、眼科知识推送、检查信息查看与方案共创等功能；另一方面，触觉玩具和棋盘式互动装置则通过触摸、游戏和视觉引导，帮助儿童在等待与治疗过程中分散紧张感，并增强与家长之间的积极互动。',
        media: [
          {
            kind: 'image',
            src: '/images/medical/tactile-toy.png',
            alt: '弱视儿童医疗界面设计与互动触点图',
            caption: '界面设计与互动触点',
          },
        ],
      },
      {
        id: 'outcome',
        title: '服务落地与后续发展',
        text:
          '项目最终将儿童端、家长端、医院端和后台支持流程整合为一套服务蓝图，明确了从预约、候诊、检查到后续反馈与空间共建的完整链路。该方案不仅关注单次医疗体验的改善，也尝试建立持续优化的机制，例如医院政策支持、周期性共创活动和儿童娱乐空间维护，使这一体验系统具备更长期的发展可能。',
        media: [
          {
            kind: 'diagram',
            src: '/images/medical/blueprint.png',
            alt: '弱视儿童医疗服务落地与后续发展图',
            caption: '服务落地与后续发展',
          },
        ],
      },
    ],
    nextProjectSlug: 'pet-care',
  },
  {
    slug: 'pet-care',
    title: 'Pet-care',
    subtitle: '面向宠物主的智能护理产品与配套服务体验设计项目。',
    accent: '#B79E86',
    year: '2024',
    role: '产品设计 / 服务设计 / UIUX 设计',
    duration: '约 8 周',
    team: '团队项目',
    featured: true,
    tags: ['产品设计', '宠物护理', '智能硬件', '服务设计', 'UIUX'],
    hero: {
      statement:
        '围绕宠物护理过程中的信息不对称、资源分散与日常照护不便问题，通过研究、产品构思与数字服务设计，探索更科学、更便捷的宠物护理体验方案。',
      image: '/images/pet-care/cover.png',
      imageAlt: 'Pet-care 项目封面图',
      video: '/videos/dog.mp4',
    },
    facts: [
      { label: '项目类型', value: '产品设计 / 服务设计 / UIUX 设计' },
      { label: '项目场景', value: '宠物护理 / 智能硬件 / 数字服务' },
      { label: '我的职责', value: '用户研究、产品构思、交互设计、界面设计' },
      { label: '项目产出', value: '用户旅程、产品草图、结构探索、App 界面与服务蓝图' },
    ],
    sections: [
      {
        id: 'background',
        title: '项目概览',
        text:
          '该项目围绕宠物护理过程中信息不对称、医院资源分散与日常照护不便等问题展开，通过研究、产品构思与数字服务设计，结合智能硬件、数字应用与服务系统，帮助宠物主在孕期监测、异常识别、就医衔接与后续护理中获得更及时、更清晰的支持，探索更主动、更连续的宠物护理体验。',
        media: [
          {
            kind: 'image',
            src: '/images/pet-care/cover.png',
            alt: 'Pet-care 项目概览图',
            caption: '项目概览',
          },
        ],
      },
      {
        id: 'research',
        title: '背景与研究洞察',
        text:
          '项目从宠物数量增长、宠物医疗市场现状与宠物主护理行为出发，梳理影响使用体验的关键问题。研究发现，宠物主对专业知识的获取渠道较分散，不同医院资源差异明显，许多人在真正遇到异常情况之前缺少有效判断和记录方式，这使得及时发现问题与后续处理都存在较高门槛。',
        media: [
          {
            kind: 'image',
            src: '/images/pet-care/research-board.png',
            alt: 'Pet-care 背景与研究洞察图',
            caption: '背景与研究洞察',
          },
        ],
      },
      {
        id: 'insights',
        title: '用户研究与核心画像',
        text:
          '通过观察、问卷、访谈与用户画像梳理，项目进一步明确了宠物主在护理过程中的真实需求与顾虑。研究显示，用户最关心的是如何在家中快速完成初步检查、如何判断是否需要就医、以及如何在不同医院和平台之间保存与共享宠物健康信息。因此，降低专业门槛、提升操作清晰度和建立连续记录机制成为项目的重要方向。',
        media: [
          {
            kind: 'image',
            src: '/images/pet-care/persona.png',
            alt: 'Pet-care 用户研究与核心画像图',
            caption: '用户研究与核心画像',
          },
        ],
      },
      {
        id: 'strategy',
        title: '体验路径与系统方案',
        text:
          '项目进一步梳理了用户从预约、到院、检查、沟通到后续护理的完整路径，并基于此构建了一个连接宠物主、医院资源、设备与应用的服务系统。通过把异常检测、记录管理、医院沟通和后续照护放进同一流程中，项目尝试将原本分散的医疗服务整合为更顺畅、可持续的使用体验。',
        media: [
          {
            kind: 'diagram',
            src: '/images/pet-care/journey-map.png',
            alt: 'Pet-care 体验路径与系统方案图',
            caption: '体验路径与系统方案',
          },
        ],
      },
      {
        id: 'process',
        title: '产品构思与结构探索',
        text:
          '在具体设计阶段，项目围绕设备形态、内部结构与使用方式进行了多轮探索。设计既要考虑宠物主上手是否直观，也要考虑设备在家庭场景中的安全感、稳定性与可接受度。通过草图推演、概念结构和外观研究，项目逐步形成了兼顾医疗属性与家庭使用体验的产品方向。',
        media: [
          {
            kind: 'image',
            src: '/images/pet-care/sketch.png',
            alt: 'Pet-care 产品构思与结构探索图',
            caption: '产品构思与结构探索',
          },
        ],
      },
      {
        id: 'outcome',
        title: '界面设计与服务落地',
        text:
          '最终方案将设备、应用与服务流程整合为一套完整体验，包括检查指引、数据同步、医生反馈、宠物档案与后续护理支持等内容。界面设计承担了结果展示、信息记录与沟通衔接的作用，而服务蓝图则进一步明确了平台、医院与后台支持之间的协作关系，使项目不仅停留在概念层面，也具备更清晰的落地逻辑。',
        media: [
          {
            kind: 'diagram',
            src: '/images/pet-care/blueprint.png',
            alt: 'Pet-care 界面设计与服务落地图',
            caption: '界面设计与服务落地',
          },
        ],
      },
    ],
    nextProjectSlug: 'aurora',
  },
  {
    slug: 'aurora',
    title: 'Aurora',
    subtitle: '围绕情绪疗愈与日常陪伴体验的概念产品设计项目。',
    accent: '#355B46',
    year: '2024',
    role: '产品设计 / UIUX 设计',
    duration: '约 4 周',
    team: '团队项目',
    featured: false,
    exploration: true,
    tags: ['概念产品', '情绪疗愈', '产品设计', '视觉表达', '交互体验'],
    hero: {
      statement:
        '围绕都市人群在高压生活中的情绪波动与日常自我调节需求，探索一个兼具陪伴感、仪式感与视觉治愈气质的产品概念。',
      image: '/images/aurora/cover.png',
      imageAlt: 'Aurora 项目封面图',
      video: '/videos/aurora.mp4',
    },
    facts: [
      { label: '项目类型', value: '概念产品 / UIUX 设计' },
      { label: '项目场景', value: '情绪疗愈 / 日常陪伴 / 居家场景' },
      { label: '我的职责', value: '产品概念发展、视觉表达、交互构思' },
      { label: '项目产出', value: '概念设定、产品渲染、使用情境与视觉叙事' },
    ],
    sections: [
      {
        id: 'background',
        title: '项目概览',
        text:
          'Aurora 是一个围绕情绪疗愈与日常陪伴体验展开的概念产品设计项目，聚焦都市人群在高压生活中的情绪波动与日常自我调节需求，通过产品设计、交互体验与数字界面的结合，探索一种兼具陪伴感、仪式感与视觉治愈气质的日常陪伴型产品。',
        media: [
          {
            kind: 'image',
            src: '/images/aurora/cover.png',
            alt: 'Aurora 项目概览图',
            caption: '项目概览',
          },
        ],
      },
      {
        id: 'research',
        title: '背景与用户洞察',
        text:
          '项目从植物消费趋势、年轻用户的生活方式与居家审美偏好出发，梳理了当代用户在植物陪伴与空间营造中的真实需求。研究发现，越来越多年轻人希望通过植物改善居住氛围、缓解压力并获得情感寄托，但同时也面临养护成本高、维护流程繁琐和资源浪费等问题。这些矛盾成为项目切入的重要背景。',
        media: [
          {
            kind: 'image',
            src: '/images/aurora/background.png',
            alt: 'Aurora 背景与用户洞察图',
            caption: '背景与用户洞察',
          },
        ],
      },
      {
        id: 'insights',
        title: '用户分析与设计概念',
        text:
          '通过访谈、共情地图和用户特征梳理，项目聚焦了年轻用户在植物陪伴场景中的核心期待：既希望获得美感与疗愈体验，又不愿被复杂的维护过程打断日常生活。基于此，项目提出将硬件、软件与数字内容结合的设计概念，使产品不仅服务于植物展示，也成为连接空间氛围、用户偏好与个性化选择的媒介。',
        media: [
          {
            kind: 'diagram',
            src: '/images/aurora/user analysis.png',
            alt: 'Aurora 用户分析与设计概念图',
            caption: '用户分析与设计概念',
          },
        ],
      },
      {
        id: 'strategy',
        title: '产品探索与形态发展',
        text:
          '在设计推进过程中，项目围绕产品外观、内部结构、成像方式与使用场景进行了多轮探索。通过草图、结构分析与技术路径研究，产品逐步从概念意向发展为更具体的形态方案。整体设计强调柔和、雕塑感与未来感，希望让产品在功能之外，也能作为空间中的情绪载体和视觉焦点存在。',
        media: [
          {
            kind: 'image',
            src: '/images/aurora/render.png',
            alt: 'Aurora 产品探索与形态发展图',
            caption: '产品探索与形态发展',
          },
        ],
      },
      {
        id: 'process',
        title: '界面设计与最终体验',
        text:
          '在数字端，项目进一步延展出与产品相配套的界面系统，包括信息架构、低保真原型、高保真界面与用户测试反馈。界面设计承担了场景选择、植物浏览、个性化调整与氛围生成等功能，使 Aurora 不只是一个静态产品概念，而是一套围绕用户审美、植物内容与空间体验展开的完整交互系统。',
        media: [
          {
            kind: 'image',
            src: '/images/aurora/UI.png',
            alt: 'Aurora 界面设计与最终体验图',
            caption: '界面设计与最终体验',
          },
        ],
      },
    ],
    nextProjectSlug: 'city-life',
  },
  {
    slug: 'marketing-cloud',
    title: '营销云数字化营销平台',
    subtitle: '面向企业营销与客户管理场景的 B 端数字化平台设计项目。',
    accent: '#198CFF',
    year: '2023',
    role: 'UIUX 设计 / 产品设计',
    duration: '工作项目',
    team: '团队项目',
    featured: false,
    exploration: true,
    tags: ['B端产品', '数字化营销', '企业服务', 'UIUX', '产品架构'],
    hero: {
      statement:
        '围绕企业数字化营销与客户管理需求，基于行业现状、用户痛点与业务流程，完成从产品架构、交互框架到多端界面设计的系统化设计方案。',
      image: '/images/marketing-cloud/cover.png',
      imageAlt: '营销云数字化营销平台项目封面图',
      video: '/videos/work.mp4',
    },
    facts: [
      { label: '项目类型', value: 'B端产品 / 数字化营销平台' },
      { label: '项目场景', value: '企业营销 / 客户管理 / 数据运营' },
      { label: '我的职责', value: '产品架构梳理、交互设计、视觉规范与多端界面设计' },
      { label: '项目产出', value: '功能结构、用户痛点分析、交互框架、组件规范与高保真界面' },
    ],
    sections: [
      {
        id: 'overview',
        title: '项目概览',
        text: '该项目面向企业数字化营销与客户管理场景展开，基于行业现状、用户痛点与业务流程，完成从产品架构、交互框架到桌面端与移动端界面设计的系统化方案，覆盖企业营销与客户管理中的核心业务流程。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/cover.png',
            alt: '营销云项目概览图',
            caption: '项目概览',
          },
        ],
      },
      {
        id: 'features',
        title: '产品功能',
        text: '围绕业务中台、数据管理与服务协同等场景，梳理平台的主要功能模块与使用范围。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/product-features.png',
            alt: '营销云产品功能图',
            caption: '产品功能',
          },
        ],
      },
      {
        id: 'industry-context',
        title: '行业现状',
        text: '从行业发展与市场环境出发，梳理当前数字化营销平台面临的共性问题与业务机会。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/industry-context.png',
            alt: '营销云行业现状分析图',
            caption: '行业现状',
          },
        ],
      },
      {
        id: 'pain-points',
        title: '用户痛点',
        text: '聚焦不同角色在平台使用中的核心问题，明确平台在协作、信息获取与流程管理上的关键需求。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/pain-points.png',
            alt: '营销云用户痛点图',
            caption: '用户痛点',
          },
        ],
      },
      {
        id: 'architecture',
        title: '产品架构',
        text: '搭建平台的整体信息结构，梳理用户端、产品能力与业务支撑之间的关系，为后续设计提供基础。',
        media: [
          {
            kind: 'diagram',
            src: '/images/marketing-cloud/architecture.png',
            alt: '营销云产品架构图',
            caption: '产品架构',
          },
        ],
      },
      {
        id: 'interaction-framework',
        title: '交互框架',
        text: '围绕核心任务链路搭建交互框架，明确页面层级、功能模块与主要操作逻辑。',
        media: [
          {
            kind: 'diagram',
            src: '/images/marketing-cloud/interaction-framework.png',
            alt: '营销云交互框架图',
            caption: '交互框架',
          },
        ],
      },
      {
        id: 'typography-colors',
        title: '字体与色彩',
        text: '建立统一的视觉基础规范，提升平台在多端界面中的识别度与一致性。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/typography-colors.png',
            alt: '营销云字体与色彩规范图',
            caption: '字体与色彩',
          },
        ],
      },
      {
        id: 'ui-modules',
        title: '页面与模块设计',
        text: '围绕核心业务模块展开页面设计，强化信息层级和关键功能的可读性。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/ui-modules.png',
            alt: '营销云页面与模块设计图',
            caption: '页面与模块设计',
          },
        ],
      },
      {
        id: 'composition',
        title: '构成设计',
        text: '进一步拆解页面构成关系，辅助界面元素组织与视觉布局优化。',
        media: [
          {
            kind: 'diagram',
            src: '/images/marketing-cloud/composition-diagram.png',
            alt: '营销云构成设计图',
            caption: '构成设计',
          },
        ],
      },
      {
        id: 'low-fidelity',
        title: '低保真方案',
        text: '通过低保真原型验证页面结构与核心功能流程，为后续高保真细化提供依据。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/low-fidelity.png',
            alt: '营销云低保真方案图',
            caption: '低保真方案',
          },
        ],
      },
      {
        id: 'high-fidelity',
        title: '高保真展示',
        text: '最终方案覆盖桌面端与移动端的高保真界面展示，集中呈现核心功能、数据可视化与业务操作场景，强化平台的完整体验与视觉一致性。',
        media: [
          {
            kind: 'image',
            src: '/images/marketing-cloud/high-fidelity01.png',
            alt: '营销云高保真界面展示 01',
            caption: '高保真展示 01',
          },
          {
            kind: 'image',
            src: '/images/marketing-cloud/high-fidelity02.png',
            alt: '营销云高保真界面展示 02',
            caption: '高保真展示 02',
          },
        ],
      },
    ],
    nextProjectSlug: 'aurora',
  },
  {
    slug: 'elemotion',
    title: 'EleMotion',
    subtitle: '基于 sEMG / FMG 实时反馈的青少年脊柱侧弯康复交互系统。',
    accent: '#F59A23',
    year: '2025',
    role: '服务设计 / 产品设计 / UIUX 设计',
    duration: '课程项目',
    team: '个人项目',
    featured: false,
    exploration: true,
    tags: ['医疗健康', '康复训练', '交互系统', '儿童场景', 'UIUX'],
    hero: {
      statement:
        '围绕青少年脊柱侧弯居家康复中“依从性低、反馈不足、家长与医生协同弱”的问题，探索一个结合 sEMG / FMG 传感、实时反馈与游戏化训练的康复系统。',
      image: '/images/elemotion/EleMotion1.0.png',
      imageAlt: 'EleMotion 项目封面图',
      video: '/videos/elemotion.mp4',
    },
    facts: [
      { label: '项目类型', value: '服务设计 / 产品设计 / UIUX 设计' },
      { label: '项目场景', value: '青少年脊柱侧弯 / 居家康复 / 医患协同' },
      { label: '我的职责', value: '系统设计、交互设计、界面设计与体验梳理' },
      { label: '项目产出', value: '评估逻辑、系统架构、用户旅程、多端界面与商业化路径' },
    ],
    sections: [
      {
        id: 'overview',
        title: '项目概览',
        text: 'EleMotion 是一个面向青少年脊柱侧弯居家康复场景的交互系统，针对依从性不足、反馈不及时以及家长与医生协同较弱的问题，结合 sEMG传感、实时反馈与游戏化训练，帮助儿童、家长与医生建立更连续、更可执行的康复体验。',
        media: [
          {
            kind: 'image',
            src: '/images/elemotion/cover.png',
            alt: 'EleMotion 项目概览图',
            caption: '项目概览',
          },
        ],
      },
      {
        id: 'background-goals',
        title: '背景与设计目标',
        text: '项目从脊柱侧弯的患病现状、现有康复缺口与儿童训练痛点出发，提出以儿童友好、数据驱动和多方协作为核心的居家康复目标。',
        media: [
          {
            kind: 'image',
            src: '/images/elemotion/2.2.png',
            alt: 'EleMotion 背景与设计目标图',
            caption: '背景与设计目标',
          },
        ],
      },
      {
        id: 'evaluation-architecture',
        title: '评估逻辑与系统架构',
        text: '为支撑训练反馈与动作判断，项目建立了动作评估逻辑，并进一步梳理儿童端、家长端、医生端与传感模块之间的系统关系。',
        media: [
          {
            kind: 'diagram',
            src: '/images/elemotion/2.3.png',
            alt: 'EleMotion 评估逻辑与系统架构图',
            caption: '评估逻辑与系统架构',
          },
        ],
      },
      {
        id: 'user-training',
        title: '用户端训练体验',
        text: '在儿童端，项目通过实时反馈、游戏化训练、数据展示和奖励机制，将原本重复的康复动作转化为更易理解、更具参与感的互动过程。',
        media: [
          {
            kind: 'image',
            src: '/images/elemotion/2.4.png',
            alt: 'EleMotion 用户端训练体验图',
            caption: '用户端训练体验',
          },
        ],
      },
      {
        id: 'doctor-support',
        title: '医生端与支持功能',
        text: '在医生与管理端，系统支持远程沟通、教育内容、病历信息查看、计划调整与历史数据管理，帮助医生和家长更高效地协同康复过程。',
        media: [
          {
            kind: 'diagram',
            src: '/images/elemotion/2.5.png',
            alt: 'EleMotion 医生端与支持功能图',
            caption: '医生端与支持功能',
          },
        ],
      },
      {
        id: 'business-future',
        title: '商业化与未来发展',
        text: '项目进一步延展到商业化路径与未来迭代方向，围绕数据驱动、康复转化与合作生态，探索系统的长期应用价值与可持续发展可能。',
        media: [
          {
            kind: 'image',
            src: '/images/elemotion/2.6.png',
            alt: 'EleMotion 商业化与未来发展图',
            caption: '商业化与未来发展',
          },
        ],
      },
    ],
    nextProjectSlug: 'nutri-pick',
  },
  {
    slug: 'nutri-pick',
    title: 'NutriPick',
    subtitle: '基于营养需求与现有食材生成个性化菜谱的健康饮食应用项目。',
    accent: '#D7F04A',
    year: '2025',
    role: '产品设计 / UIUX 设计 / 应用开发',
    duration: '课程项目',
    team: '团队项目',
    featured: false,
    exploration: true,
    tags: ['健康饮食', '个性化推荐', '移动应用', 'AI识别', 'UIUX'],
    hero: {
      statement:
        '围绕健身与健康饮食场景下“做饭耗时、营养搭配复杂、食材管理不便”的问题，探索一个结合食材识别、营养推荐与菜谱生成的个性化健康饮食应用。',
      image: '/images/nutri-pick/NutriPick1.0.png',
      imageAlt: 'NutriPick 项目封面图',
      video: '/videos/nutripick2.mp4',
    },
    facts: [
      { label: '项目类型', value: '产品设计 / UIUX 设计 / 应用开发' },
      { label: '项目场景', value: '健康饮食 / 健身人群 / 个性化菜谱推荐' },
      { label: '我的职责', value: '用户研究、产品设计、界面设计、技术流程与应用开发' },
      { label: '项目产出', value: '功能定义、界面设计、识别算法、数据库、商业模式与迭代方向' },
    ],
    sections: [
      {
        id: 'overview',
        title: '项目概览',
        text: 'NutriPick 是一个围绕健身与健康饮食场景展开的移动应用项目，聚焦做饭耗时、营养搭配复杂与食材管理不便等问题，结合食材识别、营养推荐与菜谱生成，帮助用户基于营养需求和现有食材更高效地完成饮食管理。',
        media: [
          {
            kind: 'image',
            src: '/images/nutri-pick/cover.png',
            alt: 'NutriPick 项目概览图',
            caption: '项目概览',
          },
        ],
      },
      {
        id: 'background-insights',
        title: '背景与研究洞察',
        text: '项目从社交平台健康话题、健身场景观察、问卷结果与竞品分析出发，发现用户最关心的是做饭效率、菜谱获取便捷性以及更符合个人需求的饮食方案。',
        media: [
          {
            kind: 'image',
            src: '/images/nutri-pick/1.2.png',
            alt: 'NutriPick 背景与研究洞察图',
            caption: '背景与研究洞察',
          },
        ],
      },
      {
        id: 'design-goals',
        title: '设计目标',
        text: '项目希望通过个性化推荐、食材管理、一键购买和热量记录等功能，让健康饮食更方便、更连续，也更容易执行。',
        media: [
          {
            kind: 'image',
            src: '/images/nutri-pick/1.3.png',
            alt: 'NutriPick 设计目标图',
            caption: '设计目标',
          },
        ],
      },
      {
        id: 'core-features',
        title: '核心功能设计',
        text: '围绕推荐菜谱、现有食材匹配、订单购买与食材录入等核心场景，项目构建了主要功能流程，让用户能够更快速地从“想吃什么”过渡到“如何真正做出来”。',
        media: [
          {
            kind: 'image',
            src: '/images/nutri-pick/1.4.png',
            alt: 'NutriPick 核心功能设计图',
            caption: '核心功能设计',
          },
        ],
      },
      {
        id: 'technical-overview',
        title: '技术方案概览',
        text: '为支撑产品落地，项目进一步梳理了识别、数据库、推荐算法、界面与应用开发之间的技术关系，形成较完整的系统实现路径。',
        media: [
          {
            kind: 'diagram',
            src: '/images/nutri-pick/1.5.png',
            alt: 'NutriPick 技术方案概览图',
            caption: '技术方案概览',
          },
        ],
      },
      {
        id: 'recognition-processing',
        title: '食材识别与数据处理',
        text: '项目结合图像识别与数字识别能力，对食材与重量信息进行采集和处理，为后续推荐、记录和热量计算提供输入基础。',
        media: [
          {
            kind: 'diagram',
            src: '/images/nutri-pick/1.6.png',
            alt: 'NutriPick 食材识别与数据处理图',
            caption: '食材识别与数据处理',
          },
        ],
      },
      {
        id: 'database-support',
        title: '数据库与信息支撑',
        text: '通过食谱表、营养信息、食材分类与过期时间等数据的整理，项目建立了支撑推荐与计算逻辑的数据库基础。',
        media: [
          {
            kind: 'diagram',
            src: '/images/nutri-pick/1.7.png',
            alt: 'NutriPick 数据库与信息支撑图',
            caption: '数据库与信息支撑',
          },
        ],
      },
      {
        id: 'ui-design',
        title: '界面设计',
        text: '在移动端界面中，项目围绕推荐生成、食材管理、健康记录与个人目标等功能展开设计，强化操作清晰度与使用节奏。',
        media: [
          {
            kind: 'image',
            src: '/images/nutri-pick/1.8.png',
            alt: 'NutriPick 界面设计图',
            caption: '界面设计',
          },
        ],
      },
      {
        id: 'app-development',
        title: '应用开发',
        text: '项目不仅停留在界面层面，也进一步推进到代码实现、部署与测试流程，使产品具备更明确的落地可能。',
        media: [
          {
            kind: 'image',
            src: '/images/nutri-pick/1.9.png',
            alt: 'NutriPick 应用开发图',
            caption: '应用开发',
          },
        ],
      },
      {
        id: 'business-growth',
        title: '商业模式与增长机制',
        text: '在功能之外，项目也探索了订阅、广告、一次性购买与社区积分等组合方式，尝试在用户体验与产品收益之间建立平衡。',
        media: [
          {
            kind: 'diagram',
            src: '/images/nutri-pick/1.10.png',
            alt: 'NutriPick 商业模式与增长机制图',
            caption: '商业模式与增长机制',
          },
        ],
      },
      {
        id: 'iteration-plan',
        title: '后续迭代方向',
        text: '后续版本将进一步增强收藏偏好、成就激励、专家内容与社区互动，提升用户黏性与长期使用价值。',
        media: [
          {
            kind: 'image',
            src: '/images/nutri-pick/1.11.png',
            alt: 'NutriPick 后续迭代方向图',
            caption: '后续迭代方向',
          },
        ],
      },
    ],
    nextProjectSlug: 'marketing-cloud',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const explorationProjects = projects.filter((project) => project.exploration)

export const projectTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
