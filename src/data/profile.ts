import type { Cluster, GraphNode, Profile } from '../lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// NOTE FOR KHALID — fields decoded from the CV that are worth a quick check:
//   • Guidewire (current) + eGain: confident.
//   • The three roles 2014–2018: dates/domain/tech decoded from the CV's subset
//     fonts (a little lossy). COMPANY names + exact titles are placeholders —
//     search "CONFIRM" below and replace before we go live.
// Everything here is plain data; editing it reshapes the latent-space map.
// ─────────────────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: 'Khalid Shaikh',
  title: 'Senior Software Engineer',
  tagline: 'I build tools that do more with less.',
  location: 'India',
  blurb:
    'JVM/enterprise engineer turned LLM-tooling builder. Twelve years shipping ' +
    'production software — most recently on the Guidewire Cloud Platform — and ' +
    'lately obsessed with making AI cheaper, faster, and sharper through ' +
    'token-level efficiency.',
  email: 'mshaikh@guidewire.com',
  cvHref: 'Khalid_Shaikh_CV.pdf',
  social: [
    { label: 'GitHub', href: 'https://github.com/mkhalid-s' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mkhalid-s' },
  ],
}

export const clusters: Cluster[] = [
  {
    id: 'llm',
    label: 'LLM Tooling & AI',
    blurb: 'Token economics, MCP, agents — making models do more with less.',
    color: '#6ee7ff',
    anchor: { x: 0.95, y: -0.55 },
  },
  {
    id: 'jvm',
    label: 'JVM & Enterprise',
    blurb: 'Java, Spring, InsuranceSuite, cloud platforms at scale.',
    color: '#a78bfa',
    anchor: { x: -0.95, y: -0.5 },
  },
  {
    id: 'media',
    label: 'Media & Desktop',
    blurb: 'FFmpeg pipelines and privacy-first desktop apps.',
    color: '#34d399',
    anchor: { x: 0.7, y: 0.85 },
  },
  {
    id: 'web',
    label: 'Web & Full-stack',
    blurb: 'React, Angular, Spring Boot — end-to-end product work.',
    color: '#f472b6',
    anchor: { x: -0.75, y: 0.85 },
  },
  {
    id: 'foundations',
    label: 'Foundations & Craft',
    blurb: 'CS fundamentals, system design, the long game.',
    color: '#fbbf24',
    anchor: { x: 0.0, y: -1.05 },
  },
]

export const nodes: GraphNode[] = [
  // ── Experience ────────────────────────────────────────────────────────────
  {
    id: 'exp-guidewire',
    label: 'Guidewire Software',
    kind: 'experience',
    cluster: 'jvm',
    weight: 1.6,
    meta: 'Senior Software Engineer · Oct 2021 – Present',
    summary:
      'Building and modernising the Guidewire Cloud Platform for global insurers.',
    detail: [
      'Drove end-to-end migration of customers from classic infrastructure to the Guidewire Cloud Platform.',
      'Designed and developed PolicyCenter, ClaimCenter & BillingCenter features for the Australian insurance market.',
      'Engineered AI-powered features within the InsuranceSuite ecosystem to enhance claims & policy workflows.',
      'Built and maintained CI/CD pipelines for automated testing & deployment on the cloud platform.',
      'Configured the Integration Gateway for seamless market message processing; resolved critical cross-release defects.',
      'Mentored interns, new joiners and fellow engineers on best practices and development workflows.',
    ],
    tags: ['java', 'aws', 'insurancesuite', 'cloud', 'ci-cd', 'integration', 'ai', 'docker'],
    links: [{ label: 'Guidewire', href: 'https://www.guidewire.com' }],
    keywords:
      'guidewire cloud platform insurance policycenter claimcenter billingcenter australia integration gateway java aws insurancesuite ci cd pipeline docker mentoring senior engineer ai claims policy',
  },
  {
    id: 'exp-egain',
    label: 'eGain',
    kind: 'experience',
    cluster: 'web',
    weight: 1.2,
    meta: 'Software Engineer · Aug 2018 – Oct 2021',
    summary: 'Full-stack development of a technical knowledge-base platform.',
    detail: [
      'Led full-stack development of a technical knowledge-base platform for an equipment manufacturer.',
      'Delivered features with Angular, Spring Boot, AWS and Genesys PureCloud services.',
      'Analysed and resolved deep customisation requests across multiple product lines.',
    ],
    tags: ['angular', 'spring-boot', 'aws', 'purecloud', 'full-stack', 'java'],
    links: [{ label: 'eGain', href: 'https://www.egain.com' }],
    keywords:
      'egain knowledge base platform angular spring boot aws genesys purecloud full stack customisation product lines knowledge management',
  },
  {
    id: 'exp-telecom',
    label: 'Digital e-Services', // CONFIRM company name
    kind: 'experience',
    cluster: 'web',
    weight: 1.0,
    meta: 'Software Engineer · Feb 2017 – Aug 2018', // CONFIRM title/company
    summary: 'Digital e-service solutions for a major telecom platform.',
    detail: [
      'Led integration & deployment of digital e-service solutions for a major telecommunications platform.',
      'Built a chat mobile application with Spring Boot integrated across AWS and middleware systems.',
    ],
    tags: ['spring-boot', 'aws', 'mobile', 'integration', 'telecom'],
    keywords:
      'telecom digital e-services chat mobile application spring boot aws middleware integration deployment',
  },
  {
    id: 'exp-engagement',
    label: 'Chat & Email Engagement', // CONFIRM company name
    kind: 'experience',
    cluster: 'web',
    weight: 0.9,
    meta: 'Software Engineer · Jun 2016 – Feb 2017', // CONFIRM title/company
    summary: 'Multichannel chat & email customer-engagement software.',
    detail: [
      'Customised multichannel chat & email customer-engagement software.',
      'Reviewed and mitigated security vulnerabilities across web and self-service products.',
    ],
    tags: ['java', 'web', 'security', 'customer-engagement'],
    keywords:
      'multichannel chat email engagement software security vulnerabilities self service web products customer',
  },
  {
    id: 'exp-banking',
    label: 'Treasury Systems', // CONFIRM company name
    kind: 'experience',
    cluster: 'jvm',
    weight: 0.9,
    meta: 'Software Engineer · Mar 2014 – Jun 2016', // CONFIRM title/company
    summary: 'Treasury-management system features for banking clients.',
    detail: [
      'Developed treasury-management system features for banking clients.',
      'Worked across the JVM stack delivering financial-domain functionality.',
    ],
    tags: ['java', 'banking', 'finance', 'jvm'],
    keywords:
      'treasury management banking finance financial system features jvm java clients',
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  {
    id: 'proj-headroom',
    label: 'headroom',
    kind: 'project',
    cluster: 'llm',
    weight: 1.5,
    meta: 'Open source · 2026',
    summary:
      'Compress tool outputs, logs, files & RAG chunks before they hit the LLM. 60–95% fewer tokens, same answers.',
    detail: [
      'Library, proxy and MCP server for token-level compression of context fed to LLMs.',
      'Cuts 60–95% of tokens while preserving answer quality — cheaper, faster, longer context.',
      'Polyglot: Python core with Rust + TypeScript components.',
    ],
    tags: ['llm', 'tokens', 'mcp', 'python', 'rust', 'typescript', 'ai', 'compression'],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/headroom' }],
    keywords:
      'headroom compress tokens token killer llm rag chunks logs proxy mcp server python rust typescript context window cost optimization compression',
  },
  {
    id: 'proj-framefuse',
    label: 'framefusevid',
    kind: 'project',
    cluster: 'media',
    weight: 1.2,
    meta: 'Open source · 2026',
    summary:
      'Privacy-first desktop app to combine Zoom recordings into professional videos. PIP, side-by-side & sequential layouts.',
    detail: [
      'Desktop app powered by FFmpeg to merge cloud recordings into polished videos.',
      'Picture-in-picture, side-by-side and sequential layouts — all processed locally for privacy.',
    ],
    tags: ['ffmpeg', 'desktop', 'video', 'privacy', 'media'],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/framefusevid' }],
    keywords:
      'framefusevid privacy desktop app zoom cloud recordings video ffmpeg pip picture in picture side by side sequential layouts local media',
  },
  {
    id: 'proj-react-tv',
    label: 'TV Series Search',
    kind: 'project',
    cluster: 'web',
    weight: 0.7,
    meta: 'Open source · 2026',
    summary: 'A sample React app for searching TV series.',
    tags: ['react', 'typescript', 'web', 'api'],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/react-app' }],
    keywords: 'react app tv series search sample web frontend api',
  },
  {
    id: 'proj-erp',
    label: 'Business ERP',
    kind: 'project',
    cluster: 'web',
    weight: 0.8,
    meta: 'Personal · 2025',
    summary: 'ERP systems for small businesses, including an electronics-trade variant.',
    tags: ['full-stack', 'erp', 'postgresql', 'web'],
    keywords: 'business erp electronics enterprise resource planning small business full stack postgresql inventory',
  },
  {
    id: 'proj-springboot-pg',
    label: 'Spring Boot + PostgreSQL',
    kind: 'project',
    cluster: 'jvm',
    weight: 0.6,
    meta: 'Sample · 2025',
    summary: 'Reference Spring Boot service backed by PostgreSQL.',
    tags: ['spring-boot', 'postgresql', 'java'],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/springboot-postgresql-demo' }],
    keywords: 'spring boot postgresql demo java rest reference service jpa',
  },

  // ── Skills ────────────────────────────────────────────────────────────────
  { id: 'sk-java', label: 'Java', kind: 'skill', cluster: 'jvm', weight: 1.3, summary: 'Primary language for a decade — enterprise scale.', tags: ['java', 'jvm'], keywords: 'java jvm enterprise backend' },
  { id: 'sk-spring', label: 'Spring Boot', kind: 'skill', cluster: 'jvm', weight: 1.1, summary: 'Services, REST, reactive, integration.', tags: ['spring-boot', 'java'], keywords: 'spring boot reactive rest microservices java' },
  { id: 'sk-aws', label: 'AWS', kind: 'skill', cluster: 'jvm', weight: 1.0, summary: 'Cloud infra, serverless, deployment.', tags: ['aws', 'cloud'], keywords: 'aws cloud lambda serverless infrastructure deployment' },
  { id: 'sk-react', label: 'React / TS', kind: 'skill', cluster: 'web', weight: 1.0, summary: 'Modern typed front-ends (this site included).', tags: ['react', 'typescript', 'web'], keywords: 'react typescript frontend ui spa vite' },
  { id: 'sk-angular', label: 'Angular', kind: 'skill', cluster: 'web', weight: 0.8, summary: 'Enterprise SPAs at eGain.', tags: ['angular', 'web'], keywords: 'angular spa frontend typescript' },
  { id: 'sk-llm', label: 'LLM / MCP', kind: 'skill', cluster: 'llm', weight: 1.2, summary: 'Agents, tool use, MCP servers, token optimization.', tags: ['llm', 'mcp', 'ai', 'tokens'], keywords: 'llm mcp agents tool use token optimization context window prompt anthropic claude' },
  { id: 'sk-python', label: 'Python', kind: 'skill', cluster: 'llm', weight: 1.0, summary: 'AI/ML tooling, scripting, services.', tags: ['python', 'ai'], keywords: 'python ai ml scripting data tooling' },
  { id: 'sk-rust', label: 'Rust', kind: 'skill', cluster: 'llm', weight: 0.8, summary: 'Performance-critical components.', tags: ['rust', 'performance'], keywords: 'rust performance systems memory safety' },
  { id: 'sk-docker', label: 'Docker / CI-CD', kind: 'skill', cluster: 'jvm', weight: 0.9, summary: 'Containers and delivery pipelines.', tags: ['docker', 'ci-cd', 'cloud'], keywords: 'docker containers ci cd pipelines delivery automation' },
  { id: 'sk-postgres', label: 'PostgreSQL', kind: 'skill', cluster: 'jvm', weight: 0.8, summary: 'Relational modelling and queries.', tags: ['postgresql', 'sql'], keywords: 'postgresql sql database relational queries' },
  { id: 'sk-ffmpeg', label: 'FFmpeg', kind: 'skill', cluster: 'media', weight: 0.8, summary: 'Video/audio pipelines.', tags: ['ffmpeg', 'media', 'video'], keywords: 'ffmpeg video audio media pipeline encoding' },
  { id: 'sk-sysdesign', label: 'System Design', kind: 'skill', cluster: 'foundations', weight: 0.9, summary: 'Designing for scale and clarity.', tags: ['system-design', 'architecture'], keywords: 'system design architecture scalability distributed dsa algorithms' },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: 'edu-be',
    label: 'B.E., Univ. of Mumbai',
    kind: 'education',
    cluster: 'foundations',
    weight: 0.9,
    meta: '2009 – 2013 · Graduated with Distinction',
    summary: 'Bachelor of Engineering — graduated with Distinction.',
    tags: ['education', 'engineering'],
    keywords: 'bachelor engineering university mumbai distinction computer degree',
  },
  {
    id: 'edu-diploma',
    label: 'Diploma, CS',
    kind: 'education',
    cluster: 'foundations',
    weight: 0.6,
    meta: 'Saboo Siddik · 2007 – 2009',
    summary: 'Diploma in Computer Science.',
    tags: ['education'],
    keywords: 'diploma computer science saboo siddik technical college mumbai',
  },

  // ── Ideas (the "how I think" layer) ──────────────────────────────────────
  {
    id: 'idea-less',
    label: 'Do more with less',
    kind: 'idea',
    cluster: 'llm',
    weight: 1.0,
    summary:
      'The thread tying it all together: strip the noise, keep the signal. Whether it is tokens, code, or scope — subtract until only what matters remains.',
    tags: ['llm', 'tokens', 'philosophy', 'compression'],
    keywords: 'do more with less efficiency minimalism signal noise compression tokens philosophy subtract simplicity',
  },
  {
    id: 'idea-cost-aware-ai',
    label: 'Cost-aware AI',
    kind: 'idea',
    cluster: 'llm',
    weight: 0.9,
    summary:
      'AI products live or die on unit economics. I think about tokens the way ops teams think about cloud spend.',
    tags: ['llm', 'tokens', 'ai', 'economics'],
    keywords: 'cost aware ai token economics unit economics cloud spend efficiency budget llm pricing',
  },
]
