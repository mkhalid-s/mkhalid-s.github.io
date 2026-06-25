import type { GraphNode } from '../lib/types'
import Reveal from './Reveal'
import { Collapse, DetailList, ExpandMarker, SectionHeading, Tag } from './ui'

interface Props {
  ids: string[]
  byId: Map<string, GraphNode>
  openId: string | null
  onToggle: (id: string) => void
}

// Left-rail timeline of roles. Each entry has period · role · location, scan
// tags, a short summary and (when expanded) detail bullets.
export default function Experience({ ids, byId, openId, onToggle }: Props) {
  return (
    <section id="experience" className="scroll-mt-20 mt-24 sm:mt-32">
      <Reveal>
        <SectionHeading n="02" title="Experience" />
      </Reveal>
      <ol className="relative ml-1 border-l border-ink/25">
        {ids.map((id, i) => {
          const n = byId.get(id)
          if (!n) return null
          const open = openId === id
          const parts = n.meta ? n.meta.split(' · ') : []
          const period = parts.length ? parts[parts.length - 1] : ''
          const roleLoc = parts.slice(0, -1).join(' · ')
          return (
            <li key={id} className="group/item relative pb-9 pl-6 last:pb-1">
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-[7px] h-2.5 w-2.5 rounded-full ring-4 ring-paper transition-all duration-300 group-hover/item:scale-125 group-hover/item:bg-accent ${
                  open ? 'bg-accent' : 'bg-ink/50'
                }`}
              />
              <Reveal y={10} delay={i * 0.05}>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {period}
                </div>
                <button
                  onClick={() => onToggle(id)}
                  aria-expanded={open}
                  className="group mt-1 flex w-full items-baseline justify-between gap-3 text-left"
                >
                  <span className="font-display text-xl font-normal text-ink transition duration-300 group-hover:translate-x-1 group-hover:text-accent sm:text-2xl">
                    {n.label}
                  </span>
                  <ExpandMarker open={open} />
                </button>
                {roleLoc && <div className="font-mono text-[12px] text-muted">{roleLoc}</div>}
                <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink/80">
                  {n.summary}
                </p>
                {n.tags && n.tags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {n.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
                <Collapse open={open && !!n.detail}>
                  {n.detail && <DetailList items={n.detail} />}
                </Collapse>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
