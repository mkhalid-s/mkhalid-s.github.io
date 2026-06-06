import type { GraphNode, Link, Profile } from '../lib/types'

// Content verified against the 2026 CV and public project repositories.
// Editing this file reshapes the whole site.

export const profile: Profile = {
  name: 'Khalid Shaikh',
  title: 'Senior Software Engineer',
  location: 'Bengaluru, India',
  blurb:
    'I’m a senior software engineer with 12+ years across BFSI and telecom. I lead ' +
    'Guidewire cloud delivery in Java and Gosu, and bring production engineering ' +
    'discipline to RAG, agent, and evaluation workflows. I also build local-first, ' +
    'open-source developer tools.',
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
    id: 'proj-apx',
    label: 'APX',
    kind: 'project',
    meta: 'Open source · v0.4.0',
    summary:
      'Local macOS gateway for switching, chaining and measuring AI context proxies without reconfiguring Claude Code.',
    detail: [
      'Routes a stable local endpoint through Headroom, pxpipe, Squeezr or direct mode, with live chain switching and health checks.',
      'Unified local dashboard tracks request volume, p95 latency, token and cache usage, estimated cost and tool calls.',
      'Ships SHA-verified releases, atomic version switching and rollback, launchd supervision, and privacy-safe metadata-only capture by default.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/mkhalid-s/ai-proxy-stack' },
      {
        label: 'v0.4.0 release',
        href: 'https://github.com/mkhalid-s/ai-proxy-stack/releases/tag/v0.4.0',
      },
    ],
  },
  {
    id: 'proj-framefuse',
    label: 'FrameFuseVid',
    kind: 'project',
    meta: 'Open source · 2026',
    summary:
      'Privacy-first desktop app to combine Zoom recordings into professional videos — PIP, side-by-side & sequential layouts.',
    detail: [
      'Cross-platform Electron and React app powered by FFmpeg, with native builds for macOS, Windows and Linux.',
      'Auto-detects Zoom recording files and supports picture-in-picture, side-by-side, sequential and audio-merge layouts.',
      'Processes every file locally with zero telemetry; supports live previews and VTT/SRT caption burning.',
    ],
    links: [
      { label: 'Live site', href: 'https://mkhalid-s.github.io/framefusevid/' },
      { label: 'GitHub', href: 'https://github.com/mkhalid-s/framefusevid' },
    ],
  },
  {
    id: 'proj-auth-scrape',
    label: 'auth-scrape',
    kind: 'project',
    meta: 'Open source · 2026',
    summary:
      'Browser-session crawler that turns authorized SSO-protected documentation into LLM-ready Markdown.',
    detail: [
      'Reuses authenticated browser cookies through Playwright for documentation portals, Confluence, Notion, SharePoint and private wikis.',
      'Supports constrained crawl profiles, focused keyword scoring, resumable state, secret redaction and explicit authorization gates.',
      'Backed by roughly 80 unit tests across seven modules, with no browser required for the fast test suite.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/auth-scrape' }],
  },
  {
    id: 'proj-sir-saathi',
    label: 'SIR Saathi',
    kind: 'project',
    meta: 'Civic-tech prototype · 2026',
    summary:
      'Privacy-first PWA that helps people understand India’s Special Intensive Revision process and find a safe next action.',
    detail: [
      'Combines an Astro and Preact PWA, FastAPI service, PostgreSQL schema and local-only electoral-roll ingestion pipeline.',
      'Public indexed search fails closed; raw rolls stay local, EPIC identifiers are hashed, and responses are scoped and redacted.',
      'Includes 18 test modules, sensitive-data checks, source-provenance validation and a passing CI workflow.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/sir-saathi' }],
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
    id: 'idea-ai',
    label: 'Applied AI',
    kind: 'idea',
    meta: 'RAG · Agents · Evaluation',
    summary:
      'LLM features treated as software systems: grounded retrieval, constrained tools, repeatable evaluation, and explicit quality, latency and cost trade-offs.',
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
    items: ['RAG', 'Agents', 'Evaluation', 'MCP', 'LangChain', 'LangGraph', 'Qdrant', 'ChromaDB'],
  },
  {
    label: 'Languages',
    items: ['Java', 'Gosu', 'Python', 'TypeScript', 'JavaScript', 'SQL / PL-SQL'],
  },
  {
    label: 'Backend & web',
    items: ['Spring Boot', 'FastAPI', 'React', 'Vue', 'Angular', 'Electron', 'Astro / Preact'],
  },
  {
    label: 'Guidewire',
    items: ['PolicyCenter', 'ClaimCenter', 'BillingCenter', 'PCF', 'GPM', 'Integration Framework'],
  },
  {
    label: 'Cloud & delivery',
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'TeamCity', 'Jenkins', 'GitHub Actions'],
  },
  {
    label: 'Data & observability',
    items: ['PostgreSQL', 'Oracle', 'Redis', 'SQLite', 'OpenTelemetry', 'Prometheus', 'DataDog'],
  },
  { label: 'Integration', items: ['REST', 'SOAP', 'IBM MQ', 'TIBCO', 'Integration Gateway'] },
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
  { value: '12+', label: 'years in production engineering' },
  { value: '5', label: 'engineers led & mentored' },
  { value: 'Zero', label: 'downtime during cloud migrations' },
]

export interface AiPillar {
  label: string
  blurb: string
}
export const aiPillars: AiPillar[] = [
  {
    label: 'Retrieval & grounding',
    blurb: 'RAG pipelines and vector search over Qdrant and ChromaDB.',
  },
  {
    label: 'Agent workflows',
    blurb: 'Tool-using agents and multi-step workflows with LangChain and LangGraph.',
  },
  {
    label: 'Evaluation',
    blurb: 'Output quality measured alongside latency, token use and cost.',
  },
  {
    label: 'Production fit',
    blurb: 'Clear boundaries, observable failure modes and pragmatic fallbacks.',
  },
]

// AI projects/POCs shown in the Applied AI section.
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
    title: 'OSS Bug Hunter',
    blurb:
      'Experimental multi-language agentic bug-hunting engine where LLMs propose reproducers and fixes while deterministic harnesses validate every gate.',
    stack: 'Python · FastAPI · React · MCP · Docker / Podman · SSE',
    outcome: '5 languages · 18 MCP tools · 322 tests',
    href: 'https://github.com/mkhalid-s/oss-bug-hunter',
  },
  {
    title: 'QueryfyAI',
    blurb:
      'Natural-language analytics assistant that retrieves schema context, generates and validates SQL, executes read-only queries, and returns explanations and charts.',
    stack: 'FastAPI · Vue · ReAct agents · ChromaDB / Qdrant · OpenTelemetry',
    outcome: '19 databases · 15+ LLM providers · 53 test files',
    href: 'https://github.com/mkhalid-s/queryfy-ai',
  },
  {
    title: 'Personal Assistant OS',
    blurb:
      'Local-first assistant control plane with provenance-aware retrieval, durable plans, approval-gated external actions, execution receipts, and privacy filters.',
    stack: 'Python · SQLite · hybrid retrieval · agent backends · local-first',
    outcome: '25 test modules · passing CI',
    href: 'https://github.com/mkhalid-s/personal-assistant-os',
  },
]

export interface OpenSourceContribution {
  project: string
  title: string
  blurb: string
  outcome: string
  links: Link[]
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    project: 'Headroom',
    title: 'Upstream authentication and enterprise installation support',
    blurb:
      'Contributed a client-credentials OAuth2 proxy extension with fail-closed behavior, token caching and single-flight refresh, plus corporate TLS-inspection installation guidance.',
    outcome: '2 merged PRs · 37 tests · 98% extension coverage',
    links: [
      {
        label: 'OAuth2 extension · PR #784',
        href: 'https://github.com/headroomlabs-ai/headroom/pull/784',
      },
      {
        label: 'TLS guidance · PR #775',
        href: 'https://github.com/headroomlabs-ai/headroom/pull/775',
      },
    ],
  },
]
