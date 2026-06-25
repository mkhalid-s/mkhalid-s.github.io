import type { GraphNode, Profile } from '../lib/types'

// Content decoded from the 2026 CV — all entries verified.
// Editing this file reshapes the whole site.

export const profile: Profile = {
  name: 'Khalid Shaikh',
  title: 'Senior Software Engineer',
  headline:
    'Guidewire platform engineer turning enterprise complexity into useful, reliable tools.',
  location: 'Bengaluru, India',
  blurb:
    'I bring 12+ years across BFSI and telecom, with a deep Guidewire InsuranceSuite ' +
    'foundation, cloud migration experience, and a growing practice in LLM systems. ' +
    'My work sits where delivery pressure, architecture, and product usefulness meet.',
  availability:
    'Best fit: Guidewire modernization, enterprise AI enablement, senior IC / technical lead roles.',
  contactPitch: 'Have a platform, insurance, or AI workflow that needs calmer execution?',
  email: 'mshaikh@guidewire.com',
  cvHref: 'Khalid_Shaikh_CV.pdf',
  social: [
    { label: 'GitHub', href: 'https://github.com/mkhalid-s' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mkhalidshaikh' },
  ],
}

export const nodes: GraphNode[] = [
  // ── Experience ─────────────────────────────────────────────────────────────
  {
    id: 'exp-guidewire',
    label: 'Guidewire Software',
    kind: 'experience',
    meta: 'Senior Software Engineer · Bengaluru · Oct 2021 – Present',
    summary:
      'Modernising cloud delivery for global insurers while exploring practical AI features inside InsuranceSuite workflows.',
    detail: [
      'Lead and mentor interns, new joiners, SD1/SD2 engineers and the wider delivery team on Guidewire patterns, review practices and development workflows.',
      'Drove end-to-end customer migrations from Classic AWS infrastructure to the Guidewire Cloud Platform with zero-downtime transitions.',
      'Designed and delivered PolicyCenter, ClaimCenter and BillingCenter features for Australian Workers’ Compensation and London insurance markets.',
      'Built AI-powered claims and policy workflow features using LLMs inside the Guidewire ecosystem.',
      'Built TeamCity CI/CD pipelines, configured Integration Gateway for London Market message processing, and resolved critical cross-release defects.',
      'Stack: Java, Gosu, PCF, InsuranceSuite, SOAP/REST, Stash, Docker, Bash, DataDog.',
    ],
    links: [{ label: 'Guidewire', href: 'https://www.guidewire.com' }],
  },
  {
    id: 'exp-capgemini',
    label: 'Capgemini India',
    kind: 'experience',
    meta: 'Senior Consultant · Navi Mumbai · Aug 2018 – Oct 2021',
    summary:
      'Led full-stack delivery for a technical knowledge-base platform used across agricultural and construction equipment programs.',
    detail: [
      'Delivered Java, Angular, Spring Boot and Oracle features while integrating AWS and Azure services into enterprise workflows.',
      'Analysed and resolved dealer-facing customisation requests across multiple product lines with clear stakeholder communication.',
    ],
    links: [{ label: 'Capgemini', href: 'https://www.capgemini.com' }],
  },
  {
    id: 'exp-jio',
    label: 'Reliance Jio',
    kind: 'experience',
    meta: 'Deputy Manager · Navi Mumbai · Feb 2017 – Aug 2018',
    summary: 'Integrated and deployed digital eServices for a major telecommunications platform.',
    detail: [
      'Built a chat mobile application in Java and Spring Boot; integrated TIBCO and SAP middleware systems.',
    ],
    links: [{ label: 'Jio', href: 'https://www.jio.com' }],
  },
  {
    id: 'exp-egain',
    label: 'eGain Communications',
    kind: 'experience',
    meta: 'Technical Engineer · Pune · Jun 2016 – Feb 2017',
    summary: 'Customised multichannel chat & email customer-engagement software.',
    detail: [
      'Reviewed and mitigated security vulnerabilities across CBR and Self-Service products.',
    ],
    links: [{ label: 'eGain', href: 'https://www.egain.com' }],
  },
  {
    id: 'exp-3i',
    label: '3i Infotech',
    kind: 'experience',
    meta: 'Associate Software Developer · Navi Mumbai · Mar 2014 – Jun 2016',
    summary: 'Treasury-management system features for banking clients.',
    detail: [
      'Developed treasury-management system features for banking clients.',
      'Stack: Java, SAP PowerBuilder 10/11, Oracle 10g/11c, PL/SQL.',
    ],
    links: [{ label: '3i Infotech', href: 'https://www.3i-infotech.com' }],
  },

  // ── Projects ───────────────────────────────────────────────────────────────
  {
    id: 'proj-framefuse',
    label: 'framefusevid',
    kind: 'project',
    meta: 'Open source · 2026',
    summary:
      'Privacy-first desktop app that turns raw Zoom recordings into polished videos with local FFmpeg processing.',
    detail: [
      'Desktop app powered by FFmpeg to merge cloud recordings into polished videos.',
      'Picture-in-picture, side-by-side and sequential layouts — all processed locally for privacy.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/framefusevid' }],
  },
  {
    id: 'proj-erp',
    label: 'Electronics Business ERP',
    kind: 'project',
    meta: 'Personal · In progress',
    summary:
      'Offline-first, GST-compliant ERP concept for electronics-equipment businesses in India.',
    detail: [
      'Full scope: CRM, quotations & sales orders, GST e-invoicing (IRN, e-way bill, GSTR-1/3B), payments, inventory with serial tracking, vendor & purchase orders, and work-order / AMC management.',
      'Architected as a Progressive Web App — offline-first, installable, low-bandwidth, with background sync.',
      'Includes full requirements analysis, architecture, technology-stack comparison and a phased MVP roadmap.',
    ],
  },

  // ── Education ──────────────────────────────────────────────────────────────
  {
    id: 'edu-be',
    label: 'B.E. Computer Science',
    kind: 'education',
    meta: 'University of Mumbai · 2009 – 2013 · Distinction',
    summary:
      'Bachelor of Engineering, Computer Science & Engineering — graduated with Distinction.',
  },
  {
    id: 'edu-hsc',
    label: 'HSC — Science',
    kind: 'education',
    meta: 'MH Saboo Siddik Technical Jr. College · 2007 – 2009',
    summary: 'Higher Secondary Certificate, Science (Computer Science).',
  },

  // ── Idea ───────────────────────────────────────────────────────────────────
  {
    id: 'idea-less',
    label: 'Do more with less',
    kind: 'idea',
    summary:
      'The thread tying it all together: strip the noise, keep the signal. Whether it’s tokens, code or scope — subtract until only what matters remains.',
  },
  {
    id: 'idea-leadership',
    label: 'Clear technical execution',
    kind: 'idea',
    summary:
      'Leadership, to me, is making the next correct step obvious: crisp trade-offs, useful reviews, healthy defaults, and a team that can move without waiting for permission.',
  },
]

// ── Skills, certifications & languages (rendered as their own sections) ───────
export interface SkillGroup {
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI systems',
    items: [
      'LangChain',
      'LangGraph',
      'RAG',
      'Agents',
      'Qdrant',
      'ChromaDB',
      'Prompt engineering',
      'Evaluation',
    ],
  },
  {
    label: 'Languages',
    items: ['Java', 'Gosu', 'Python', 'TypeScript', 'JavaScript', 'SQL / PL-SQL'],
  },
  { label: 'Frameworks', items: ['Spring Boot', 'J2EE', 'React', 'Next.js', 'Angular 6/8/11'] },
  {
    label: 'Guidewire',
    items: ['PolicyCenter', 'ClaimCenter', 'BillingCenter', 'PCF', 'GPM', 'Integration Framework'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Docker', 'TeamCity', 'Jenkins', 'GitHub Actions', 'DataDog'],
  },
  {
    label: 'Data & Integration',
    items: ['PostgreSQL', 'Oracle 12c', 'Berkeley DB', 'IBM-MQ', 'REST', 'SOAP', 'TIBCO'],
  },
]

export const certifications: string[] = [
  'AWS Solutions Architect – Associate',
  'AWS Developer – Associate',
  'AWS Cloud Practitioner',
  'Microsoft Azure Fundamentals (AZ-900)',
]

export const spokenLanguages: string[] = ['English — Professional', 'Hindi', 'Marathi']

// ── Impact stats (skim strip) & AI capability pillars ────────────────────────
export interface Stat {
  value: string
  label: string
  detail: string
}
export const impactStats: Stat[] = [
  { value: '12+', label: 'years engineering', detail: 'BFSI, telecom and enterprise platforms' },
  {
    value: '5+',
    label: 'engineers mentored',
    detail: 'Interns, new joiners and SD1 / SD2 engineers',
  },
  { value: '0', label: 'downtime migrations', detail: 'Classic AWS to Guidewire Cloud Platform' },
  {
    value: '4',
    label: 'cloud certifications',
    detail: 'AWS and Azure fundamentals across delivery',
  },
]

export interface AiPillar {
  label: string
  blurb: string
}
export const aiPillars: AiPillar[] = [
  {
    label: 'RAG & vector search',
    blurb: 'Retrieval pipelines, chunking strategies and embeddings over Qdrant / ChromaDB.',
  },
  {
    label: 'Agents & tools',
    blurb: 'Tool-calling workflows that chain useful steps instead of only producing text.',
  },
  {
    label: 'Orchestration',
    blurb: 'Multi-step LLM workflows with LangChain, LangGraph and clear state.',
  },
  { label: 'Evals & cost', blurb: 'Quality checks, token discipline and latency-aware design.' },
]

export interface FocusArea {
  label: string
  detail: string
}

export const focusAreas: FocusArea[] = [
  {
    label: 'Guidewire cloud delivery',
    detail: 'InsuranceSuite features, integration flows, migrations, CI/CD and production defects.',
  },
  {
    label: 'Enterprise AI workflows',
    detail: 'RAG, agents, evaluation and AI-assisted claims / policy experiences.',
  },
  {
    label: 'Technical leadership',
    detail:
      'Mentoring engineers, simplifying scope, reviewing architecture and raising delivery quality.',
  },
]

export interface Principle {
  label: string
  detail: string
}

export const operatingPrinciples: Principle[] = [
  {
    label: 'Keep the domain visible',
    detail: 'Model the insurance or business process clearly before adding framework complexity.',
  },
  {
    label: 'Measure before scaling',
    detail: 'Use evals, logs and feedback loops so AI features can be trusted outside demos.',
  },
  {
    label: 'Prefer calm systems',
    detail: 'Small APIs, boring automation, readable code and fewer moving parts where possible.',
  },
]

// AI projects/POCs shown in the AI Engineering section.
// `nodeId` references an entry in `nodes` (e.g. the shipped flagship);
// inline entries are standalone POCs — add yours here.
export interface AiProject {
  nodeId?: string
  title?: string
  blurb?: string
  stack?: string
  outcome?: string
  href?: string
}
export const aiProjects: AiProject[] = [
  {
    title: 'Insurance workflow AI features',
    blurb:
      'LLM-assisted claims and policy workflows designed inside the Guidewire ecosystem with production constraints in mind.',
    stack: 'LLMs · Guidewire · Java / Gosu · Evaluation',
    outcome: 'Applied AI',
  },
]
