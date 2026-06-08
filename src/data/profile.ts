import type { GraphNode, Profile } from '../lib/types'

// Content decoded from the 2026 CV — all entries verified.
// Editing this file reshapes the whole site.

export const profile: Profile = {
  name: 'Khalid Shaikh',
  title: 'Senior Software Engineer',
  location: 'Bengaluru, India',
  blurb:
    'Senior software engineer with 12+ years across BFSI & telecom. I specialise in ' +
    'the Guidewire InsuranceSuite on AWS and the Guidewire Cloud Platform, and over the ' +
    'last year I’ve been building LLM applications — RAG, agents and evaluation. ' +
    'I like leading teams, clean abstractions, and deleting code.',
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
    cluster: 'jvm',
    weight: 1.6,
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
    tags: ['java', 'gosu', 'insurancesuite', 'aws', 'ci-cd', 'ai', 'cloud'],
    links: [{ label: 'Guidewire', href: 'https://www.guidewire.com' }],
    keywords:
      'guidewire cloud platform gcp insurance policycenter claimcenter billingcenter australia london workers compensation integration gateway teamcity ci cd java gosu insurancesuite ai llm leadership senior',
  },
  {
    id: 'exp-capgemini',
    label: 'Capgemini India',
    kind: 'experience',
    cluster: 'web',
    weight: 1.2,
    meta: 'Senior Consultant · Navi Mumbai · Aug 2018 – Oct 2021',
    summary:
      'Led full-stack development of a technical knowledge-base platform for agricultural & construction equipment (PTC Arbortext).',
    detail: [
      'Delivered features with Java, Angular 6/8/11, Spring Boot, Oracle 12c; integrated AWS and Azure cloud services.',
      'Analysed and resolved dealer-facing customisation requests across multiple product lines.',
    ],
    tags: ['java', 'angular', 'spring-boot', 'aws', 'azure', 'full-stack'],
    links: [{ label: 'Capgemini', href: 'https://www.capgemini.com' }],
    keywords:
      'capgemini senior consultant full stack knowledge base ptc arbortext agricultural construction equipment java angular spring boot oracle aws azure dealer customisation',
  },
  {
    id: 'exp-jio',
    label: 'Reliance Jio',
    kind: 'experience',
    cluster: 'web',
    weight: 1.0,
    meta: 'Deputy Manager · Navi Mumbai · Feb 2017 – Aug 2018',
    summary:
      'Integration & deployment of digital eServices for a major telecommunications platform.',
    detail: [
      'Built a chat mobile application in Java and Spring Boot; integrated TIBCO and SAP middleware systems.',
    ],
    tags: ['java', 'spring-boot', 'tibco', 'sap', 'telecom', 'mobile'],
    links: [{ label: 'Jio', href: 'https://www.jio.com' }],
    keywords:
      'reliance jio deputy manager telecommunications digital eservices chat mobile application java spring boot tibco sap middleware integration deployment',
  },
  {
    id: 'exp-egain',
    label: 'eGain Communications',
    kind: 'experience',
    cluster: 'web',
    weight: 0.9,
    meta: 'Technical Engineer · Pune · Jun 2016 – Feb 2017',
    summary: 'Customised multichannel chat & email customer-engagement software.',
    detail: [
      'Reviewed and mitigated security vulnerabilities across CBR and Self-Service products.',
    ],
    tags: ['java', 'web', 'security', 'customer-engagement'],
    links: [{ label: 'eGain', href: 'https://www.egain.com' }],
    keywords:
      'egain communications technical engineer multichannel chat email customer engagement security vulnerabilities cbr self service pune',
  },
  {
    id: 'exp-3i',
    label: '3i Infotech',
    kind: 'experience',
    cluster: 'jvm',
    weight: 0.85,
    meta: 'Associate Software Developer · Navi Mumbai · Mar 2014 – Jun 2016',
    summary: 'Treasury-management system features for banking clients.',
    detail: [
      'Developed treasury-management system features for banking clients.',
      'Stack: Java, SAP PowerBuilder 10/11, Oracle 10g/11c, PL/SQL.',
    ],
    tags: ['java', 'banking', 'oracle', 'pl-sql', 'finance'],
    links: [{ label: '3i Infotech', href: 'https://www.3i-infotech.com' }],
    keywords:
      '3i infotech associate software developer treasury management banking finance java sap powerbuilder oracle pl sql bfsi',
  },

  // ── Projects ───────────────────────────────────────────────────────────────
  {
    id: 'proj-framefuse',
    label: 'framefusevid',
    kind: 'project',
    cluster: 'media',
    weight: 1.2,
    meta: 'Open source · 2026',
    summary:
      'Privacy-first desktop app to combine Zoom recordings into professional videos — PIP, side-by-side & sequential layouts.',
    detail: [
      'Desktop app powered by FFmpeg to merge cloud recordings into polished videos.',
      'Picture-in-picture, side-by-side and sequential layouts — all processed locally for privacy.',
    ],
    tags: ['ffmpeg', 'desktop', 'video', 'privacy'],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/framefusevid' }],
    keywords:
      'framefusevid privacy desktop app zoom cloud recordings video ffmpeg picture in picture side by side sequential layouts local media',
  },
  {
    id: 'proj-erp',
    label: 'Electronics Business ERP',
    kind: 'project',
    cluster: 'web',
    weight: 0.9,
    meta: 'Personal · In progress',
    summary:
      'Building an offline-first, GST-compliant ERP for electronics-equipment businesses in India.',
    detail: [
      'Full scope: CRM, quotations & sales orders, GST e-invoicing (IRN, e-way bill, GSTR-1/3B), payments, inventory with serial tracking, vendor & purchase orders, and work-order / AMC management.',
      'Architected as a Progressive Web App — offline-first, installable, low-bandwidth, with background sync.',
      'Includes full requirements analysis, architecture, technology-stack comparison and a phased MVP roadmap.',
    ],
    tags: ['erp', 'pwa', 'gst', 'offline-first', 'india'],
    keywords:
      'electronics business erp enterprise resource planning india gst e-invoice irn e-way bill gstr crm inventory invoicing amc work order pwa offline first progressive web app',
  },

  // ── Education ──────────────────────────────────────────────────────────────
  {
    id: 'edu-be',
    label: 'B.E. Computer Science',
    kind: 'education',
    cluster: 'foundations',
    weight: 0.9,
    meta: 'University of Mumbai · 2009 – 2013 · Distinction',
    summary:
      'Bachelor of Engineering, Computer Science & Engineering — graduated with Distinction.',
    tags: ['education'],
    keywords: 'bachelor engineering computer science university mumbai distinction',
  },
  {
    id: 'edu-hsc',
    label: 'HSC — Science',
    kind: 'education',
    cluster: 'foundations',
    weight: 0.6,
    meta: 'MH Saboo Siddik Technical Jr. College · 2007 – 2009',
    summary: 'Higher Secondary Certificate, Science (Computer Science).',
    tags: ['education'],
    keywords: 'hsc higher secondary science computer saboo siddik mumbai',
  },

  // ── Idea ───────────────────────────────────────────────────────────────────
  {
    id: 'idea-less',
    label: 'Do more with less',
    kind: 'idea',
    cluster: 'llm',
    weight: 1.0,
    summary:
      'The thread tying it all together: strip the noise, keep the signal. Whether it’s tokens, code or scope — subtract until only what matters remains.',
    tags: ['llm', 'tokens', 'philosophy'],
    keywords:
      'do more with less efficiency minimalism signal noise compression tokens philosophy simplicity',
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
