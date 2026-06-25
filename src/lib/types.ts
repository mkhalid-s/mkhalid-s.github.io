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
  /** short scan-tags (domain / stack); rendered as small chips */
  tags?: string[]
  /** status pill shown next to the title (e.g. "Live", "In progress") */
  status?: string
}

export interface Profile {
  name: string
  title: string
  location: string
  /** time zone the local-time chip uses; falls back to IST if unset */
  timezone?: string
  blurb: string
  /** short status badge shown above the hero (kept honest; opt-out with '') */
  status?: string
  email?: string
  social: Link[]
  cvHref: string
}
