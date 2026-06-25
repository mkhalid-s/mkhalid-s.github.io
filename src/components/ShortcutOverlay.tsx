import { AnimatePresence, m } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

const ROWS: { keys: string[]; label: string }[] = [
  { keys: ['g', 'n'], label: 'Jump to Now' },
  { keys: ['g', 'e'], label: 'Jump to Experience' },
  { keys: ['g', 'p'], label: 'Jump to Projects' },
  { keys: ['g', 'a'], label: 'Jump to AI engineering' },
  { keys: ['g', 's'], label: 'Jump to Skills' },
  { keys: ['g', 'c'], label: 'Jump to Contact' },
  { keys: ['t'], label: 'Toggle theme' },
  { keys: ['?'], label: 'Show this help' },
  { keys: ['Esc'], label: 'Close overlays' },
]

export default function ShortcutOverlay({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/30 backdrop-blur-sm"
          onClick={onClose}
        >
          <m.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-[min(92vw,420px)] rounded-2xl border border-ink/10 bg-paper p-6 shadow-xl"
          >
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
                Keyboard
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="font-mono text-[12px] text-muted transition hover:text-ink"
              >
                Esc
              </button>
            </div>
            <ul className="space-y-2.5">
              {ROWS.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between gap-4 text-[13px] text-ink/85"
                >
                  <span>{r.label}</span>
                  <span className="flex gap-1">
                    {r.keys.map((k, i) => (
                      <kbd
                        key={i}
                        className="rounded-md border border-ink/15 bg-paper2 px-1.5 py-0.5 font-mono text-[11px] text-ink/80 shadow-[0_1px_0_rgb(var(--ink)/0.08)]"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
