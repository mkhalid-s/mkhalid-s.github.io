export type NodeKind = 'project' | 'experience' | 'skill' | 'education' | 'idea'

export type ClusterId = 'llm' | 'jvm' | 'media' | 'web' | 'foundations'

export interface Cluster {
  id: ClusterId
  label: string
  blurb: string
  color: string // hex
  /** Unit-ish direction the cluster sits in, in world space (centered at 0,0). */
  anchor: { x: number; y: number }
}

export interface Link {
  label: string
  href: string
}

export interface GraphNode {
  id: string
  label: string
  kind: NodeKind
  cluster: ClusterId
  /** 0.5 - 1.6, drives node radius + label priority. */
  weight: number
  summary: string
  /** Longer markdown-ish detail lines shown in the panel. */
  detail?: string[]
  meta?: string // e.g. period or role line
  tags: string[]
  links?: Link[]
  /** Free-text bag of words used for the semantic-ish search. */
  keywords: string
}

export interface Edge {
  a: string
  b: string
  /** 0..1 strength, drives line opacity. */
  w: number
}

export interface Profile {
  name: string
  title: string
  tagline: string
  location: string
  blurb: string
  email?: string
  social: Link[]
  cvHref: string
}
