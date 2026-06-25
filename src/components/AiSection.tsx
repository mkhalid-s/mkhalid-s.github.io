import { aiPillars, aiProjects } from '../data/profile'
import type { GraphNode } from '../lib/types'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

interface Props {
  byId: Map<string, GraphNode>
}

// AI engineering: focus areas + a small list of POCs / shipped features.
export default function AiSection({ byId }: Props) {
  return (
    <section id="ai" className="scroll-mt-20 mt-24 sm:mt-32">
      <Reveal>
        <SectionHeading n="04" title="AI engineering" />
        <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-ink/80">
          Bringing a decade of production engineering discipline to LLM systems — prototyping,
          measuring and hardening them for real workloads, not demos.
        </p>
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          Focus areas
        </div>
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2">
        {aiPillars.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.04}>
            <div className="rounded-xl border border-ink/10 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40">
              <div className="font-display text-lg font-normal text-ink">{p.label}</div>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">{p.blurb}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {aiProjects.length > 0 && (
        <>
          <Reveal delay={aiPillars.length * 0.04}>
            <div className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              In production / lab
            </div>
          </Reveal>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {aiProjects.map((ap, i) => {
              const n = ap.nodeId ? byId.get(ap.nodeId) : undefined
              const title = n?.label ?? ap.title ?? ''
              const blurb = n?.summary ?? ap.blurb ?? ''
              const meta = n?.meta?.split(' · ').slice(-1)[0] ?? ap.outcome ?? ''
              const href = n?.links?.[0]?.href ?? ap.href
              return (
                <Reveal key={title + i} delay={i * 0.04}>
                  <div className="py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-2xl font-normal text-ink sm:text-3xl">
                        {title}
                      </span>
                      {meta && (
                        <span className="shrink-0 font-mono text-[12px] text-muted">{meta}</span>
                      )}
                    </div>
                    {blurb && (
                      <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink/80">
                        {blurb}
                      </p>
                    )}
                    {ap.stack && (
                      <p className="mt-2 font-mono text-[12px] text-muted">{ap.stack}</p>
                    )}
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block font-mono text-[13px] text-accent underline-offset-4 hover:underline"
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}
