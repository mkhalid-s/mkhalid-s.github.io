import type { GraphNode } from '../lib/types'
import Reveal from './Reveal'
import { Collapse, DetailList, ExpandMarker, SectionHeading, Tag } from './ui'

interface Props {
  ids: string[]
  byId: Map<string, GraphNode>
  openId: string | null
  onToggle: (id: string) => void
}

// Selected projects, listed as expandable rows. Each row shows status pill +
// stack chips so the surface tells the story even when collapsed.
export default function Projects({ ids, byId, openId, onToggle }: Props) {
  return (
    <section id="projects" className="scroll-mt-20 mt-24 sm:mt-32">
      <Reveal>
        <SectionHeading n="03" title="Projects" />
      </Reveal>
      <div className="divide-y divide-ink/15 border-y border-ink/15">
        {ids.map((id, i) => {
          const n = byId.get(id)
          if (!n) return null
          const open = openId === id
          const hasMore = !!(n.detail?.length || n.links?.length)
          return (
            <Reveal key={id} delay={i * 0.04}>
              <button
                onClick={() => hasMore && onToggle(id)}
                aria-expanded={hasMore ? open : undefined}
                className="group flex w-full items-baseline justify-between gap-4 py-5 text-left"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-2xl font-normal text-ink transition duration-300 group-hover:translate-x-1 group-hover:text-accent sm:text-3xl">
                    {n.label}
                  </span>
                  {n.status && <StatusPill label={n.status} />}
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[12px] text-muted">
                    {n.meta?.split(' · ').slice(-1)[0] ?? n.kind}
                  </span>
                  {hasMore && <ExpandMarker open={open} />}
                </span>
              </button>
              <p className="-mt-2 max-w-xl pb-3 text-[15px] leading-relaxed text-ink/80">
                {n.summary}
              </p>
              {n.tags && n.tags.length > 0 && (
                <ul className="-mt-1 flex flex-wrap gap-1.5 pb-5">
                  {n.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              )}
              <Collapse open={open && hasMore}>
                <div className="border-l border-accent/30 pb-6 pl-4">
                  {n.detail && <DetailList items={n.detail} />}
                  {n.links && (
                    <div className="mt-4 flex gap-4">
                      {n.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[13px] text-accent underline-offset-4 hover:underline"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </Collapse>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function StatusPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-accent">
      {label}
    </span>
  )
}
