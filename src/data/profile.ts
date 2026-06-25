import type { GraphNode, NavSection, Profile, Section, Segment } from '../lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth. Everything the page renders — identity, the hero
// sentence, section order, nav and content — lives in this file. Editing it
// reshapes the whole site; App.tsx only decides how each piece is laid out.
// Content decoded from the 2026 CV — all entries verified.
// ─────────────────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: 'Khalid Shaikh',
  title: 'Senior Software Engineer',
  location: 'Bengaluru, India',
  status: 'Building LLM features at Guidewire',
  blurb:
    'Twelve years shipping production systems across insurance, banking and telecom — ' +
    'now focused on making LLMs dependable enough to put real work behind: retrieval ' +
    'you can trust, agents that stay on the rails, and evals that prove it.',
  email: 'mshaikh@guidewire.com',
  cvHref: 'Khalid_Shaikh_CV.pdf',
  social: [
    { label: 'GitHub', href: 'https://github.com/mkhalid-s' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mkhalidshaikh' },
  ],
}

// The hero statement. Bold "term" runs map to entries in `nodes` below and
// expand into a footnote when tapped (also deep-linkable via the URL hash).
export const heroStatement: Segment[] = [
  {
    t: 'text',
    v: 'I’m Khalid Shaikh — a senior software engineer, 12+ years across BFSI & telecom, now building LLM applications: RAG, agents and evaluation. I build ',
  },
  { t: 'term', v: 'tools that do more with less', id: 'idea-less' },
  { t: 'text', v: '. I ship on the ' },
  { t: 'term', v: 'Guidewire cloud platform', id: 'exp-guidewire' },
  {
    t: 'text',
    v: ' in Java & Gosu, and I like fast systems, clean abstractions, and deleting code.',
  },
]

// Which entries appear where, and in what order.
export const experienceIds = ['exp-guidewire', 'exp-capgemini', 'exp-jio', 'exp-egain', 'exp-3i']
export const projectIds = ['proj-framefuse', 'proj-erp']
export const educationIds = ['edu-be', 'edu-hsc']

// Page sections in render order. `n`/`title` drive the heading; `nav: true`
// surfaces the section in the header navigation + scroll-spy.
export const sections: Section[] = [
  { id: 'experience', n: '01', title: 'Experience', nav: true },
  { id: 'projects', n: '02', title: 'Projects', nav: true },
  { id: 'ai', n: '03', title: 'AI engineering', nav: true },
  { id: 'skills', n: '04', title: 'Skills', nav: true },
  { id: 'education', n: '05', title: 'Education', nav: false },
  { id: 'contact', n: '06', title: 'Contact', nav: true },
]

export const navSections: NavSection[] = sections
  .filter((s) => s.nav)
  .map(({ id, title }) => ({ id, label: title.toLowerCase() }))

export const nodes: GraphNode[] = [
  // ── Experience ─────────────────────────────────────────────────────────────
  {
    id: 'exp-guidewire',
    label: 'Guidewire Software',
    kind: 'experience',
    meta: 'Senior Software Engineer · Bengaluru · Oct 2021 – Present',
    summary:
      'Building and modernising the Guidewire Cloud Platform for global insurers, and pioneering AI-powered features within InsuranceSuite.',
    detail: [
      'Lead and mentor several engineers and the wider team — interns, new joiners and SD1/SD2 engineers — on Guidewire best practices and development workflows.',
      'Drove end-to-end migration of customers from Classic AWS infrastructure to the Guidewire Cloud Platform (GCP) with zero-downtime transitions.',
      'Designed & developed PolicyCenter, ClaimCenter and BillingCenter features for the Australian Workers’ Compensation and London insurance markets.',
      'Built AI-powered features for claims & policy workflows using LLMs, inside the Guidewire ecosystem.',
      'Built TeamCity CI/CD pipelines; configured Integration Gateway for London Market message processing; resolved critical cross-release defects.',
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
      'Led full-stack development of a technical knowledge-base platform for agricultural & construction equipment (PTC Arbortext).',
    detail: [
      'Delivered features with Java, Angular 6/8/11, Spring Boot, Oracle 12c; integrated AWS and Azure cloud services.',
      'Analysed and resolved dealer-facing customisation requests across multiple product lines.',
    ],
    links: [{ label: 'Capgemini', href: 'https://www.capgemini.com' }],
  },
  {
    id: 'exp-jio',
    label: 'Reliance Jio',
    kind: 'experience',
    meta: 'Deputy Manager · Navi Mumbai · Feb 2017 – Aug 2018',
    summary:
      'Integration & deployment of digital eServices for a major telecommunications platform.',
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
      'Privacy-first desktop app to combine Zoom recordings into professional videos — PIP, side-by-side & sequential layouts.',
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
      'Building an offline-first, GST-compliant ERP for electronics-equipment businesses in India.',
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
]

// ── Skills, certifications & languages (rendered as their own sections) ───────
export interface SkillGroup {
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI / LLM',
    items: ['LangChain', 'LangGraph', 'RAG', 'Agents', 'Qdrant', 'ChromaDB', 'Prompt engineering'],
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
}
export const impactStats: Stat[] = [
  { value: '12+', label: 'years engineering' },
  { value: '5', label: 'engineers led & mentored' },
  { value: '4', label: 'cloud certifications' },
]

export interface AiPillar {
  label: string
  blurb: string
}
export const aiPillars: AiPillar[] = [
  {
    label: 'RAG & vector search',
    blurb: 'Retrieval pipelines & embeddings over Qdrant / ChromaDB.',
  },
  {
    label: 'Agents & tools',
    blurb: 'Agents that call tools and chain steps to complete real tasks.',
  },
  { label: 'Orchestration', blurb: 'Multi-step LLM workflows with LangChain & LangGraph.' },
  { label: 'Evals & cost', blurb: 'Measuring output quality; cutting token and latency cost.' },
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
  // Add your real POCs here, e.g.:
  // { title: 'Claims Copilot', blurb: 'RAG assistant over policy docs', stack: 'LangGraph · Qdrant · Claude', outcome: 'POC → pilot', href: '' },
]
