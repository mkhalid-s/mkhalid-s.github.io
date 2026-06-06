import type { Cluster } from '../lib/types'

interface Props {
  clusters: Cluster[]
  onFocus: (id: string) => void
}

export default function Legend({ clusters, onFocus }: Props) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
        Regions
      </div>
      <div className="flex flex-col gap-1.5">
        {clusters.map((c) => (
          <button
            key={c.id}
            onClick={() => onFocus(c.id)}
            className="group flex items-center gap-2 text-left text-xs text-slate-300 transition hover:text-white"
          >
            <span
              className="h-2.5 w-2.5 rounded-full transition group-hover:scale-125"
              style={{ background: c.color, boxShadow: `0 0 10px ${c.color}` }}
            />
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
