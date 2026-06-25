import { AnimatePresence, m } from 'framer-motion'
import type { ReactNode } from 'react'

// Numbered, ruled-line section heading reused across the page.
export function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span
        aria-hidden="true"
        className="font-display text-3xl leading-none text-accent/30 sm:text-4xl"
      >
        {n}
      </span>
      <h2 className="font-mono text-[12px] uppercase tracking-[0.25em] text-muted">{title}</h2>
      <span aria-hidden="true" className="h-px flex-1 self-center bg-ink/15" />
    </div>
  )
}

// Rotating + → × marker used by every collapsible row.
export function ExpandMarker({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="font-mono text-base text-muted transition-transform duration-300 group-hover:text-accent"
      style={{ transform: open ? 'rotate(45deg)' : 'none' }}
    >
      +
    </span>
  )
}

// Height/opacity collapse wrapper — shared by experience, projects, mobile nav.
export function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  )
}

// Em-dash bullet list used inside expanded rows.
export function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((d, j) => (
        <li key={j} className="flex gap-2 text-[14px] leading-relaxed text-muted">
          <span className="text-accent">—</span>
          <span>{d}</span>
        </li>
      ))}
    </ul>
  )
}

// Inline tag pill used for experience tags and project stacks.
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-ink/12 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
      {children}
    </span>
  )
}
