import { motion } from 'framer-motion'

export type Segment = { t: 'text'; v: string } | { t: 'term'; v: string; id: string }

interface Props {
  segments: Segment[]
  activeId: string | null
  onToggle: (id: string) => void
}

const anim = (i: number) => ({
  initial: { opacity: 0, filter: 'blur(6px)', y: 6 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
  transition: { duration: 0.5, delay: 0.05 + i * 0.03 },
})

export default function Statement({ segments, activeId, onToggle }: Props) {
  return (
    <h1 className="font-display text-[2rem] font-normal leading-[1.28] tracking-[-0.01em] text-ink sm:text-[2.9rem] sm:leading-[1.24] md:text-[3.4rem]">
      {segments.map((s, i) =>
        s.t === 'text' ? (
          <motion.span key={i} {...anim(i)}>
            {s.v}
          </motion.span>
        ) : (
          // role=button span (not <button>) so the term flows as inline text and
          // never orphans a trailing "." onto a new line; keyboard-accessible.
          <motion.span
            key={i}
            role="button"
            tabIndex={0}
            className="term font-medium italic"
            data-active={activeId === s.id}
            aria-expanded={activeId === s.id}
            onClick={() => onToggle(s.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onToggle(s.id)
              }
            }}
            {...anim(i)}
          >
            {s.v}
          </motion.span>
        ),
      )}
    </h1>
  )
}
