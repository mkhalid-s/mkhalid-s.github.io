import { impactStats } from '../data/profile'
import Reveal from './Reveal'

// Skim strip — three high-signal numbers right under the hero.
export default function Stats() {
  return (
    <section id="work" className="scroll-mt-20 mt-20 sm:mt-28">
      <Reveal>
        <div className="flex flex-col divide-y divide-ink/15 border-y border-ink/15 sm:flex-row sm:divide-x sm:divide-y-0">
          {impactStats.map((s) => (
            <div key={s.label} className="flex-1 py-6 sm:px-7 sm:first:pl-0">
              <div className="font-display text-4xl font-normal leading-none text-ink sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
