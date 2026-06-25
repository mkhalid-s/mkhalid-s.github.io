import { AnimatePresence, m } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { profile } from '../data/profile'
import type { GraphNode } from '../lib/types'
import Footnote from './Footnote'
import Statement, { type Segment } from './Statement'

interface Props {
  statement: Segment[]
  termId: string | null
  term: GraphNode | null
  onToggleTerm: (id: string) => void
  onCloseTerm: () => void
}

export default function Hero({ statement, termId, term, onToggleTerm, onCloseTerm }: Props) {
  const localTime = useLocalTime(profile.timezone)

  return (
    <section className="flex min-h-[88vh] flex-col pt-[12vh] sm:pt-[16vh]">
      <m.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2"
      >
        {profile.status && (
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper2/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/75">
            <span
              aria-hidden="true"
              className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
            {profile.status}
          </span>
        )}
        <span className="font-mono text-[13px] uppercase tracking-[0.25em] text-muted">
          {profile.title} · {profile.location}
        </span>
        {localTime && (
          <span
            aria-label={`Local time in ${profile.location}`}
            className="font-mono text-[12px] tracking-[0.15em] text-muted/80"
            title={profile.timezone ?? undefined}
          >
            {localTime}
          </span>
        )}
      </m.div>

      <Statement segments={statement} activeId={termId} onToggle={onToggleTerm} />

      <AnimatePresence mode="wait">
        {term && (
          <m.div
            key={term.id}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 28 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <Footnote node={term} onClose={onCloseTerm} />
          </m.div>
        )}
      </AnimatePresence>

      <m.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => document.getElementById('now')?.scrollIntoView()}
        aria-label="Scroll to what I'm building now"
        className="mt-auto flex flex-col items-center gap-1 self-center pt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition hover:text-ink"
      >
        <span>now</span>
        <span className="cue-arrow text-sm">↓</span>
      </m.button>
    </section>
  )
}

// Live-updating local time at `profile.location`. Lazy init avoids the
// "setState in effect" cascade lint while still capturing first paint.
function useLocalTime(timezone?: string) {
  const fmt = useCallback(() => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone || 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).format(new Date())
    } catch {
      return ''
    }
  }, [timezone])

  const [now, setNow] = useState(() => fmt())

  useEffect(() => {
    const id = setInterval(() => setNow(fmt()), 30_000)
    return () => clearInterval(id)
  }, [fmt])
  return now
}
