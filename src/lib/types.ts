export type NodeKind = 'project'

export interface Link {
  label: string
  href: string
}

export interface GraphNode {
  id: string
  label: string
  kind: NodeKind
  meta?: string
  summary: string
  detail?: string[]
  links?: Link[]
}

export interface ExperienceRole {
  id: string
  employer: string
  role: string
  /** Approximate tenure derived from employment dates; exact months are not published. */
  duration: string
  summary: string
  stack: string[]
  highlights: string[]
  href?: string
}

export interface Profile {
  name: string
  title: string
  social: Link[]
}

export interface AiProject {
  title: string
  blurb: string
  stack: string
  outcome: string
  href: string
}

export interface OpenSourceContribution {
  project: string
  title: string
  blurb: string
  outcome: string
  links: Link[]
}
