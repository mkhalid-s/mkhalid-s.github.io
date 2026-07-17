import { m } from 'framer-motion'

export type Segment = { t: 'text'; v: string } | { t: 'term'; v: string; id: string }

interface Props {
  segments: Segment[]
  activeId: string | null
  onToggle: (id: string) => void
  /** Render as this HTML tag (default: h1). Use 'p' when the page already has a separate h1. */
  as?: 'h1' | 'p' | 'div'
  className?: string
}

const anim = (i: number) => ({
  initial: { opacity: 0, filter: 'blur(6px)', y: 6 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
  transition: { duration: 0.5, delay: 0.05 + i * 0.03 },
})

const DEFAULT_CLASS =
  'max-w-2xl font-display text-[2.1rem] font-normal leading-[1.3] tracking-[-0.01em] text-ink sm:text-[3rem] sm:leading-[1.2] md:text-[3.6rem] lg:text-[4.25rem] lg:leading-[1.1] lg:tracking-[-0.02em]'

export default function Statement({
  segments,
  activeId,
  onToggle,
  as: Tag = 'h1',
  className,
}: Props) {
  // first term gets a one-time "teach" sweep so the interaction is discoverable
  const firstTermIdx = segments.findIndex((s) => s.t === 'term')
  return (
    <Tag className={className ?? DEFAULT_CLASS}>
      {segments.map((s, i) =>
        s.t === 'text' ? (
          <m.span key={i} {...anim(i)}>
            {s.v}
          </m.span>
        ) : (
          // role=button span (not <button>) so the term flows as inline text and
          // never orphans a trailing "." onto a new line; keyboard-accessible.
          <m.span
            key={i}
            role="button"
            tabIndex={0}
            className={`term scroll-mt-24 font-medium italic${i === firstTermIdx ? ' term--hint' : ''}`}
            data-active={activeId === s.id}
            aria-expanded={activeId === s.id}
            aria-controls={`fn-${s.id}`}
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
          </m.span>
        ),
      )}
    </Tag>
  )
}
