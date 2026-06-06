import { AnimatePresence, motion } from 'framer-motion'
import type { Cluster, GraphNode } from '../lib/types'

interface Props {
  node: GraphNode | null
  cluster: Cluster | null
  related: GraphNode[]
  onClose: () => void
  onSelect: (id: string) => void
}

const kindLabel: Record<GraphNode['kind'], string> = {
  project: 'Project',
  experience: 'Experience',
  skill: 'Skill',
  education: 'Education',
  idea: 'Idea',
}

export default function DetailPanel({ node, cluster, related, onClose, onSelect }: Props) {
  return (
    <AnimatePresence>
      {node && cluster && (
        <motion.aside
          key={node.id}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          className="glass scroll-thin pointer-events-auto absolute right-3 top-3 z-30 max-h-[calc(100%-1.5rem)] w-[min(92vw,26rem)] overflow-y-auto rounded-2xl p-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: cluster.color, boxShadow: `0 0 10px ${cluster.color}` }}
                />
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: cluster.color }}>
                  {kindLabel[node.kind]} · {cluster.label}
                </span>
              </div>
              <h2 className="text-xl font-semibold leading-tight text-white">{node.label}</h2>
              {node.meta && <p className="mt-0.5 font-mono text-xs text-slate-400">{node.meta}</p>}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              esc
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-200">{node.summary}</p>

          {node.detail && (
            <ul className="mt-3 space-y-2">
              {node.detail.map((d, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                  <span className="mt-1 text-cyan-300/60">▹</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {node.tags.map((t) => (
              <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                {t}
              </span>
            ))}
          </div>

          {node.links && node.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {node.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-200 transition hover:bg-cyan-400/20"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                Nearest neighbours
              </div>
              <div className="flex flex-wrap gap-1.5">
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onSelect(r.id)}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300 transition hover:border-white/30 hover:text-white"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
