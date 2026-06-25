import { spokenLanguages } from '../data/profile'
import type { GraphNode } from '../lib/types'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

interface Props {
  ids: string[]
  byId: Map<string, GraphNode>
}

export default function Education({ ids, byId }: Props) {
  return (
    <section id="education" className="scroll-mt-20 mt-24 sm:mt-32">
      <Reveal>
        <SectionHeading n="06" title="Education" />
        <div className="space-y-3">
          {ids.map((id) => {
            const n = byId.get(id)!
            return (
              <div key={id} className="flex items-baseline justify-between gap-4">
                <span className="font-display text-xl font-normal text-ink sm:text-2xl">
                  {n.label}
                </span>
                <span className="text-right font-mono text-[12px] text-muted">{n.meta}</span>
              </div>
            )
          })}
        </div>
        <p className="mt-5 font-mono text-[12px] text-muted">
          Languages — {spokenLanguages.join(' · ')}
        </p>
      </Reveal>
    </section>
  )
}
