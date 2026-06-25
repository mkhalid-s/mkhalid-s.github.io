import { currentToolkit, lastUpdated, nowFocus } from '../data/profile'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

// "Now" — what I'm currently focused on. Sits between hero and experience as a
// fresh-eyes anchor; intentionally small and dated so it stays honest.
export default function Now() {
  const updatedLabel = formatUpdated(lastUpdated)
  return (
    <section id="now" className="scroll-mt-20 mt-24 sm:mt-32">
      <Reveal>
        <SectionHeading n="01" title="Now" />
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink/80">
            What I’m focused on this season — small, current, dated.
          </p>
          {updatedLabel && (
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              Updated {updatedLabel}
            </span>
          )}
        </div>
      </Reveal>

      <ul className="grid gap-3 sm:grid-cols-2">
        {nowFocus.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.04}>
            <li className="flex h-full gap-3 rounded-xl border border-ink/10 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40">
              <span aria-hidden="true" className="mt-1 text-accent">
                ●
              </span>
              <div>
                <div className="font-display text-lg font-normal text-ink">{item.label}</div>
                <p className="mt-0.5 text-[14px] leading-relaxed text-muted">{item.detail}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>

      {currentToolkit.length > 0 && (
        <Reveal delay={nowFocus.length * 0.04}>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              Toolkit
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-ink/15" />
            <ul className="flex flex-wrap gap-1.5">
              {currentToolkit.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-ink/[0.05] px-2 py-0.5 font-mono text-[11.5px] text-ink/75"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  )
}

// Render a YYYY-MM string as e.g. "Jun 2026"; falls back to the raw string.
function formatUpdated(iso: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(iso)
  if (!m) return iso
  const [, y, mm] = m
  const d = new Date(Number(y), Number(mm) - 1, 1)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}
