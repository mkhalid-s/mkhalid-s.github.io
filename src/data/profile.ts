import type {
  AiProject,
  ExperienceRole,
  GraphNode,
  OpenSourceContribution,
  Profile,
} from '../lib/types'

// Public site content. This is not a CV mirror: no cities, month-year dates,
// email, or résumé PDF. Experience tenures are approximate durations derived
// from the 2026 CV (Mar 2014 – present).

export const profile: Profile = {
  name: 'Khalid Shaikh',
  title: 'Software Engineer',
  social: [
    { label: 'GitHub', href: 'https://github.com/mkhalid-s' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mkhalidshaikh' },
  ],
}

export const careerIntro = '12+ years across insurance, consulting, telecom, and banking.'

export const experience: ExperienceRole[] = [
  {
    id: 'exp-guidewire',
    employer: 'Guidewire Software',
    role: 'Senior Software Engineer',
    duration: '~5 years',
    summary:
      'Building and modernising the Guidewire Cloud Platform for global insurers, and pioneering AI-powered features within InsuranceSuite.',
    stack: [
      'Java',
      'Gosu',
      'PCF',
      'InsuranceSuite',
      'SOAP/REST',
      'Stash',
      'Docker',
      'Bash',
      'DataDog',
    ],
    highlights: [
      'Drove end-to-end migration of customers from Classic AWS infrastructure to the Guidewire Cloud Platform (GCP) with zero-downtime transitions.',
      'Designed & developed PolicyCenter, ClaimCenter and BillingCenter features for the Australian Workers’ Compensation and London insurance markets.',
    ],
    href: 'https://www.guidewire.com',
  },
  {
    id: 'exp-capgemini',
    employer: 'Capgemini India',
    role: 'Senior Consultant',
    duration: '~3 years',
    summary:
      'Led full-stack development of a technical knowledge-base platform for agricultural & construction equipment (PTC Arbortext).',
    stack: ['Java', 'Angular 6/8/11', 'Spring Boot', 'Oracle 12c', 'AWS', 'Azure'],
    highlights: [
      'Analysed and resolved dealer-facing customisation requests across multiple product lines.',
    ],
    href: 'https://www.capgemini.com',
  },
  {
    id: 'exp-jio',
    employer: 'Reliance Jio',
    role: 'Deputy Manager',
    duration: '~1.5 years',
    summary:
      'Integration & deployment of digital eServices for a major telecommunications platform.',
    stack: ['Java', 'Spring Boot', 'TIBCO', 'SAP'],
    highlights: [
      'Built a chat mobile application in Java and Spring Boot; integrated TIBCO and SAP middleware systems.',
    ],
    href: 'https://www.jio.com',
  },
  {
    id: 'exp-egain',
    employer: 'eGain Communications',
    role: 'Technical Engineer',
    duration: '<1 year',
    summary: 'Customised multichannel chat & email customer-engagement software.',
    stack: [],
    highlights: [
      'Reviewed and mitigated security vulnerabilities across CBR and Self-Service products.',
    ],
    href: 'https://www.egain.com',
  },
  {
    id: 'exp-3i',
    employer: '3i Infotech',
    role: 'Associate Software Developer',
    duration: '~2 years',
    summary: 'Treasury-management system features for banking clients.',
    stack: ['Java', 'SAP PowerBuilder 10/11', 'Oracle 10g/11c', 'PL/SQL'],
    highlights: [],
    href: 'https://www.3i-infotech.com',
  },
]

export const nodes: GraphNode[] = [
  {
    id: 'proj-apx',
    label: 'APX',
    kind: 'project',
    meta: 'Open source',
    summary:
      'Local macOS gateway for switching, chaining and measuring AI context proxies without reconfiguring Claude Code.',
    detail: [
      'Routes a stable local endpoint through Headroom, pxpipe, Squeezr or direct mode, with live chain switching and health checks.',
      'Unified local dashboard tracks request volume, p95 latency, token and cache usage, estimated cost and tool calls.',
      'Ships SHA-verified releases, atomic version switching and rollback, launchd supervision, and privacy-safe metadata-only capture by default.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/ai-proxy-stack' }],
  },
  {
    id: 'proj-framefuse',
    label: 'FrameFuseVid',
    kind: 'project',
    meta: 'Open source',
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
    meta: 'Open source',
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
    meta: 'Civic-tech prototype',
    summary:
      'Privacy-first PWA that helps people understand India’s Special Intensive Revision process and find a safe next action.',
    detail: [
      'Combines an Astro and Preact PWA, FastAPI service, PostgreSQL schema and local-only electoral-roll ingestion pipeline.',
      'Public indexed search fails closed; raw rolls stay local, EPIC identifiers are hashed, and responses are scoped and redacted.',
      'Includes 18 test modules, sensitive-data checks, source-provenance validation and a passing CI workflow.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/mkhalid-s/sir-saathi' }],
  },
]

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
