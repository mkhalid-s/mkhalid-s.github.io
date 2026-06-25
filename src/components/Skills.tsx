import { certifications, skillGroups } from '../data/profile'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

// Skills grid: focus areas (AI/LLM, Guidewire) get a star; certs get their own
// row to read like a list, not a tag pile.
export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 mt-24 sm:mt-32">
      <Reveal>
        <SectionHeading n="05" title="Skills" />
      </Reveal>
      <div className="space-y-5">
        {skillGroups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.04}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
              <div className="flex items-baseline gap-1.5 font-mono text-[12px] uppercase tracking-[0.15em] text-muted sm:pt-1">
                <span>{g.label}</span>
                {g.focus && (
                  <span aria-label="focus area" title="Focus area" className="text-accent">
                    ★
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className={`rounded-md px-2.5 py-1 text-[13px] transition ${
                      g.focus
                        ? 'bg-accent/10 text-ink/85 hover:bg-accent/20'
                        : 'bg-ink/[0.05] text-ink/75 hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={skillGroups.length * 0.04}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
            <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted sm:pt-1">
              Certified
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-ink/[0.05] px-2.5 py-1 text-[13px] text-ink/75"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
