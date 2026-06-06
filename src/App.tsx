import { AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import LatentCanvas, { type FlyTarget } from './components/LatentCanvas'
import DetailPanel from './components/DetailPanel'
import Intro from './components/Intro'
import Legend from './components/Legend'
import ResumeMode from './components/ResumeMode'
import SearchBar from './components/SearchBar'
import { clusters, nodes, profile } from './data/profile'
import { buildEdges, layout, search } from './lib/layout'

type Mode = 'intro' | 'map' | 'resume'

export default function App() {
  const placed = useMemo(() => layout(nodes, clusters), [])
  const edges = useMemo(() => buildEdges(nodes), [])
  const nodeById = useMemo(() => new Map(placed.map((n) => [n.id, n])), [placed])
  const adjacency = useMemo(() => {
    const m = new Map<string, { id: string; w: number }[]>()
    for (const e of edges) {
      ;(m.get(e.a) ?? m.set(e.a, []).get(e.a)!).push({ id: e.b, w: e.w })
      ;(m.get(e.b) ?? m.set(e.b, []).get(e.b)!).push({ id: e.a, w: e.w })
    }
    return m
  }, [edges])

  const [mode, setMode] = useState<Mode>('intro')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [, setHoverId] = useState<string | null>(null)
  const [highlight, setHighlight] = useState<Set<string>>(new Set())
  const [matchCount, setMatchCount] = useState<number | null>(null)
  const [flyTo, setFlyTo] = useState<FlyTarget | null>(null)
  const nonce = useRef(0)

  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const fly = (x: number, y: number, zoom?: number) => {
    nonce.current += 1
    setFlyTo({ x, y, zoom, nonce: nonce.current })
  }

  const selectNode = (id: string | null) => {
    setSelectedId(id)
    if (id) {
      const n = nodeById.get(id)
      if (n) fly(n.x, n.y, Math.max(1.3, 1.3))
    }
  }

  const focusCluster = (clusterId: string) => {
    const c = clusters.find((cl) => cl.id === clusterId)
    if (c) fly(c.anchor.x * 1000 * 0.62, c.anchor.y * 1000 * 0.62, 0.95)
  }

  const onSearch = (q: string) => {
    if (!q.trim()) {
      setHighlight(new Set())
      setMatchCount(null)
      return
    }
    const results = search(q, nodes)
    setMatchCount(results.length)
    const top = results.slice(0, 8)
    setHighlight(new Set(top.map((r) => r.id)))
    if (top.length) {
      // fly to the centroid of the strongest matches
      const strong = top.slice(0, Math.min(4, top.length))
      let sx = 0
      let sy = 0
      for (const m of strong) {
        const n = nodeById.get(m.id)!
        sx += n.x
        sy += n.y
      }
      fly(sx / strong.length, sy / strong.length, top.length === 1 ? 1.4 : 0.85)
    }
  }

  // Esc closes the detail panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedId) setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId])

  const selected = selectedId ? nodes.find((n) => n.id === selectedId) ?? null : null
  const selectedCluster = selected ? clusters.find((c) => c.id === selected.cluster) ?? null : null
  const related = useMemo(() => {
    if (!selectedId) return []
    const list = (adjacency.get(selectedId) ?? []).slice().sort((a, b) => b.w - a.w).slice(0, 5)
    return list.map((l) => nodes.find((n) => n.id === l.id)!).filter(Boolean)
  }, [selectedId, adjacency])

  const openFromResume = (id: string) => {
    setMode('map')
    setSelectedId(id)
    const n = nodeById.get(id)
    if (n) setTimeout(() => fly(n.x, n.y, 1.3), 60)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <LatentCanvas
        placed={placed}
        edges={edges}
        clusters={clusters}
        selectedId={selectedId}
        highlight={highlight}
        searchActive={highlight.size > 0}
        flyTo={flyTo}
        reduceMotion={reduceMotion}
        onSelect={selectNode}
        onHover={setHoverId}
      />

      {/* top brand */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 select-none">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">latent space</div>
        <button
          onClick={() => fly(0, 0, 0.62)}
          className="pointer-events-auto text-left text-lg font-semibold text-white transition hover:text-cyan-200"
        >
          {profile.name}
        </button>
        <div className="text-xs text-slate-400">{profile.title}</div>
      </div>

      {/* top-right controls */}
      <div className="absolute right-3 top-4 z-30 flex items-center gap-2">
        {!selected && (
          <>
            <a
              href={profile.cvHref}
              target="_blank"
              rel="noreferrer"
              className="glass hidden rounded-xl px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/5 sm:block"
            >
              CV ↗
            </a>
            <button
              onClick={() => setMode('resume')}
              className="glass rounded-xl px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-white/5"
            >
              Resume mode
            </button>
          </>
        )}
      </div>

      {/* search */}
      {mode === 'map' && (
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
          <SearchBar matchCount={matchCount} onChange={onSearch} />
        </div>
      )}

      {/* legend */}
      {mode === 'map' && (
        <div className="absolute bottom-4 left-4 z-20 hidden sm:block">
          <Legend clusters={clusters} onFocus={focusCluster} />
        </div>
      )}

      {/* controls hint */}
      {mode === 'map' && !selected && (
        <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden font-mono text-[11px] text-slate-600 lg:block">
          drag · scroll · click · press “/” to search
        </div>
      )}

      <DetailPanel
        node={selected}
        cluster={selectedCluster}
        related={related}
        onClose={() => setSelectedId(null)}
        onSelect={(id) => selectNode(id)}
      />

      <AnimatePresence>
        {mode === 'intro' && (
          <Intro
            key="intro"
            onExplore={() => setMode('map')}
            onResume={() => setMode('resume')}
          />
        )}
        {mode === 'resume' && (
          <ResumeMode key="resume" onClose={() => setMode('map')} onOpenNode={openFromResume} />
        )}
      </AnimatePresence>
    </div>
  )
}
