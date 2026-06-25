export type NodeKind = 'project' | 'experience' | 'skill' | 'education' | 'idea'

export interface Link {
  label: string
  href: string
}

// A run of the hero sentence: plain text, or an interactive "term" whose id maps
// to a GraphNode (expanded as a footnote and deep-linkable via the URL hash).
export type Segment = { t: 'text'; v: string } | { t: 'term'; v: string; id: string }

// Header nav entry (in-page hash anchor + scroll-spy label).
export interface NavSection {
  id: string
  label: string
}

// One numbered page section. `nav` controls whether it appears in the header nav.
export interface Section {
  id: string
  n: string
  title: string
  nav: boolean
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
  location: string
  /** short, live-status pill text shown in the hero (e.g. "Building LLM features at Guidewire") */
  status?: string
  /** supporting hero paragraph — the positioning line under the statement */
  blurb: string
  email?: string
  social: Link[]
  cvHref: string
}
