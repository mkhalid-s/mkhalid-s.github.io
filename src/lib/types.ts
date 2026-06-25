export type NodeKind = 'project' | 'experience' | 'skill' | 'education' | 'idea'

export interface Link {
  label: string
  href: string
}

// A content entry (experience / project / education / idea). Rendered by the
// timeline, the collapsible lists, and the hero footnotes.
export interface GraphNode {
  id: string
  label: string
  kind: NodeKind
  /** period / role line, e.g. "Senior Software Engineer · Bengaluru · …" */
  meta?: string
  summary: string
  /** detail bullets shown when the entry is expanded */
  detail?: string[]
  links?: Link[]
}

export interface Profile {
  name: string
  title: string
  headline: string
  location: string
  blurb: string
  availability: string
  contactPitch: string
  email?: string
  social: Link[]
  cvHref: string
}
