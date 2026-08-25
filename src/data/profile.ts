import type {
  AiProject,
  ExperienceRole,
  GraphNode,
  OpenSourceContribution,
  PracticeArea,
  Profile,
} from '../lib/types'

// Public site content. No cities, month-year dates, email, or résumé files.
// Experience tenures are approximate durations, not calendar dates.

export const profile: Profile = {
  name: 'Khalid Shaikh',
  title: 'Software Engineer',
  social: [
    { label: 'GitHub', href: 'https://github.com/mkhalid-s' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mkhalidshaikh' },
  ],
}

export const careerIntro = '12+ years across insurance, consulting, telecom, and banking.'

export const practice: PracticeArea[] = [
  {
    label: 'Insurance platforms',
    note: 'PolicyCenter, ClaimCenter, BillingCenter, and Guidewire Cloud delivery.',
  },
  {
    label: 'Cloud migration',
    note: 'Classic AWS infrastructure to the Guidewire Cloud Platform (GCP).',
  },
  {
    label: 'Local-first tools',
    note: 'APX, FrameFuseVid, and a privacy-first personal assistant control plane.',
  },
  {
    label: 'Applied AI',
    note: 'LLM features treated as software: agents, RAG, evaluation, and MCP.',
  },
]

export const experience: ExperienceRole[] = [
  {
    id: 'exp-guidewire',
    employer: 'Guidewire Software',
    role: 'Senior Software Engineer',
    duration: '~5 years',
    durationYears: 5,
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
    projects: [
      {
        title: 'Guidewire Cloud Platform migration',
        summary: 'End-to-end customer migrations from Classic AWS infrastructure to GCP.',
        details: [
          'Planned and executed zero-downtime cutovers for production insurers.',
          'Built migration playbooks, validation gates, and rollback procedures.',
        ],
      },
      {
        title: 'InsuranceSuite market delivery',
        summary: 'PolicyCenter, ClaimCenter, and BillingCenter for specialised insurance markets.',
        details: [
          'Australian Workers’ Compensation product configuration and feature delivery.',
          'London insurance market rules, rating integrations, and billing workflows.',
        ],
      },
      {
        title: 'AI-powered workflow features',
        summary: 'LLM-backed capabilities inside the Guidewire ecosystem.',
        details: [
          'Claims and policy workflow assistants embedded in InsuranceSuite.',
          'Production-minded evaluation, guardrails, and Gosu/Java service integration.',
        ],
      },
      {
        title: 'Platform engineering',
        summary: 'CI/CD, integration gateway, and release quality for cloud delivery.',
        details: [
          'TeamCity pipeline builds and deployment automation.',
          'Integration Gateway configuration for London Market message processing.',
          'Cross-release defect triage and resolution across InsuranceSuite.',
        ],
      },
    ],
    href: 'https://www.guidewire.com',
    shortLabel: 'Guidewire',
  },
  {
    id: 'exp-capgemini',
    employer: 'Capgemini India',
    role: 'Senior Consultant',
    duration: '~3 years',
    durationYears: 3,
    summary:
      'Led full-stack development of a technical knowledge-base platform for agricultural & construction equipment (PTC Arbortext).',
    stack: ['Java', 'Angular 6/8/11', 'Spring Boot', 'Oracle 12c', 'AWS', 'Azure'],
    projects: [
      {
        title: 'PTC Arbortext knowledge-base platform',
        summary: 'Technical documentation platform for agricultural and construction equipment.',
        details: [
          'Full-stack features across Java, Angular, and Spring Boot with Oracle 12c.',
          'Content authoring, search, and dealer-facing publication workflows.',
        ],
      },
      {
        title: 'Cloud-integrated dealer customisations',
        summary: 'Dealer-facing customisation and support across multiple equipment lines.',
        details: [
          'Triaged and delivered customisation requests from dealer networks.',
          'Integrated AWS and Azure services for content delivery and authentication.',
        ],
      },
    ],
    href: 'https://www.capgemini.com',
    shortLabel: 'Capgemini',
  },
  {
    id: 'exp-jio',
    employer: 'Reliance Jio',
    role: 'Deputy Manager',
    duration: '~1.5 years',
    durationYears: 1.5,
    summary:
      'Integration & deployment of digital eServices for a major telecommunications platform.',
    stack: ['Java', 'Spring Boot', 'TIBCO', 'SAP'],
    projects: [
      {
        title: 'Digital eServices platform',
        summary: 'Integration and deployment of telecom digital services.',
        details: [
          'Chat mobile application built in Java and Spring Boot.',
          'TIBCO and SAP middleware orchestration for customer-facing eServices.',
        ],
      },
    ],
    href: 'https://www.jio.com',
    shortLabel: 'Jio',
  },
  {
    id: 'exp-egain',
    employer: 'eGain Communications',
    role: 'Technical Engineer',
    duration: '<1 year',
    durationYears: 0.7,
    summary: 'Customised multichannel chat & email customer-engagement software.',
    stack: [],
    projects: [
      {
        title: 'Multichannel customer engagement',
        summary: 'Customisation of chat and email engagement products.',
        details: ['Workflow and UI customisations for enterprise customer-engagement deployments.'],
      },
      {
        title: 'Security remediation',
        summary: 'Vulnerability review across core product surfaces.',
        details: ['Assessed and mitigated security issues in CBR and Self-Service modules.'],
      },
    ],
    href: 'https://www.egain.com',
    shortLabel: 'eGain',
  },
  {
    id: 'exp-3i',
    employer: '3i Infotech',
    role: 'Associate Software Developer',
    duration: '~2 years',
    durationYears: 2,
    summary: 'Treasury-management system features for banking clients.',
    stack: ['Java', 'SAP PowerBuilder 10/11', 'Oracle 10g/11c', 'PL/SQL'],
    projects: [
      {
        title: 'Treasury management system',
        summary: 'Banking treasury operations for institutional clients.',
        details: [
          'Feature delivery in Java and SAP PowerBuilder for cash and liquidity workflows.',
          'Oracle PL/SQL procedures, reports, and data migrations on 10g/11c.',
        ],
      },
    ],
    href: 'https://www.3i-infotech.com',
    shortLabel: '3i',
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
    stack: ['macOS', 'local gateway', 'Headroom', 'Claude Code'],
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
    stack: ['Electron', 'React', 'FFmpeg'],
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
    stack: ['Playwright', 'Markdown', 'SSO'],
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
    stack: ['Astro', 'Preact', 'FastAPI', 'PostgreSQL'],
  },
]

export const aiProjects: AiProject[] = [
  {
    title: 'OSS Bug Hunter',
    blurb:
      'Experimental multi-language agentic bug-hunting engine where LLMs propose reproducers and fixes while deterministic harnesses validate every gate.',
    stack: ['Python', 'FastAPI', 'React', 'MCP', 'Docker / Podman', 'SSE'],
    outcome: '5 languages · 18 MCP tools · 322 tests',
    href: 'https://github.com/mkhalid-s/oss-bug-hunter',
  },
  {
    title: 'QueryfyAI',
    blurb:
      'Natural-language analytics assistant that retrieves schema context, generates and validates SQL, executes read-only queries, and returns explanations and charts.',
    stack: ['FastAPI', 'Vue', 'ReAct agents', 'ChromaDB / Qdrant', 'OpenTelemetry'],
    outcome: '19 databases · 15+ LLM providers · 53 test files',
    href: 'https://github.com/mkhalid-s/queryfy-ai',
  },
  {
    title: 'Personal Assistant OS',
    blurb:
      'Local-first assistant control plane with provenance-aware retrieval, durable plans, approval-gated external actions, execution receipts, and privacy filters.',
    stack: ['Python', 'SQLite', 'hybrid retrieval', 'agent backends', 'local-first'],
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
  {
    project: 'pxpipe',
    title: 'Proxy correctness, security posture, and CI hardening',
    blurb:
      'Contributed to the context-to-image Anthropic proxy: preserve Claude Code OAuth identity during compression, publish a vulnerability disclosure policy and threat model with CI audit gates, and pin trusted supply-chain inputs in release workflows.',
    outcome: '3 merged PRs · OAuth compression fix · security & CI hardening',
    links: [
      {
        label: 'OAuth identity fix · PR #99',
        href: 'https://github.com/teamchong/pxpipe/pull/99',
      },
      {
        label: 'Security model · PR #164',
        href: 'https://github.com/teamchong/pxpipe/pull/164',
      },
      {
        label: 'CI supply chain · PR #169',
        href: 'https://github.com/teamchong/pxpipe/pull/169',
      },
    ],
  },
]
