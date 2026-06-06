import type { Cluster, Edge, GraphNode } from './types'

export interface Placed extends GraphNode {
  x: number
  y: number
  r: number
  // per-node drift phase so the field feels alive
  phase: number
  freq: number
  amp: number
}

// Deterministic hash → [0,1), so layout is stable across reloads.
function rand(seed: string): () => number {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

const WORLD = 1000 // half-extent of the world

/**
 * Lay nodes out like a 2-D embedding projection: each cluster owns a region
 * (its anchor direction), nodes scatter around the cluster centroid with a
 * weight-aware pull toward the middle so "bigger" nodes sit more central.
 */
export function layout(nodes: GraphNode[], clusters: Cluster[]): Placed[] {
  const byId = new Map(clusters.map((c) => [c.id, c]))
  // count per cluster to spread nodes on a ring within each region
  const idx: Record<string, number> = {}
  const counts: Record<string, number> = {}
  for (const n of nodes) counts[n.cluster] = (counts[n.cluster] ?? 0) + 1

  return nodes.map((n) => {
    const c = byId.get(n.cluster)!
    const i = idx[n.cluster] ?? 0
    idx[n.cluster] = i + 1
    const total = counts[n.cluster]
    const rnd = rand(n.id)

    const cx = c.anchor.x * WORLD * 0.62
    const cy = c.anchor.y * WORLD * 0.62

    // ring placement inside the cluster + jitter; heavier nodes pulled inward
    const ang = (i / total) * Math.PI * 2 + rnd() * 0.9
    const spread = 150 + total * 26
    const pull = 1.15 - n.weight * 0.42 // weight 1.6 -> ~0.46, weight 0.6 -> ~0.9
    const dist = spread * (0.35 + rnd() * 0.65) * pull
    const x = cx + Math.cos(ang) * dist + (rnd() - 0.5) * 70
    const y = cy + Math.sin(ang) * dist + (rnd() - 0.5) * 70

    return {
      ...n,
      x,
      y,
      r: 6 + n.weight * 9,
      phase: rnd() * Math.PI * 2,
      freq: 0.4 + rnd() * 0.6,
      amp: 3 + rnd() * 5,
    }
  })
}

/** Edges connect nodes that share tags; weight scales with overlap. */
export function buildEdges(nodes: GraphNode[]): Edge[] {
  const edges: Edge[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const shared = a.tags.filter((t) => b.tags.includes(t)).length
      if (shared === 0) continue
      const sameCluster = a.cluster === b.cluster
      // keep the graph readable: cross-cluster links need >=2 shared tags
      if (!sameCluster && shared < 2) continue
      const w = Math.min(1, shared / 3 + (sameCluster ? 0.15 : 0))
      edges.push({ a: a.id, b: b.id, w })
    }
  }
  return edges
}

export interface Match {
  id: string
  score: number
}

/**
 * Lightweight "semantic-ish" search: token overlap between the query and each
 * node's keyword bag, with fuzzy substring credit. Not a real embedding, but it
 * reads like one — type "cheaper ai" and headroom / cost-aware AI light up.
 */
export function search(query: string, nodes: GraphNode[]): Match[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const terms = q.split(/\s+/).filter(Boolean)
  const out: Match[] = []
  for (const n of nodes) {
    const hay = (n.label + ' ' + n.summary + ' ' + n.keywords + ' ' + n.tags.join(' ')).toLowerCase()
    let score = 0
    for (const t of terms) {
      if (hay.includes(' ' + t + ' ') || hay.startsWith(t + ' ')) score += 3
      else if (hay.includes(t)) score += 1.5
      // prefix credit for partial words
      else if (t.length >= 3 && hay.split(/\s+/).some((w) => w.startsWith(t))) score += 1
    }
    if (n.label.toLowerCase().includes(q)) score += 4
    if (score > 0) out.push({ id: n.id, score })
  }
  return out.sort((a, b) => b.score - a.score)
}
