import { lastUpdated, profile } from '../data/profile'

const QUICK_LINKS = [
  { id: 'now', label: 'Now' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

interface Props {
  onShowShortcuts?: () => void
}

export default function SiteFooter({ onShowShortcuts }: Props) {
  const updated = formatUpdated(lastUpdated)
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink/10 py-8 font-mono text-[11px] text-muted">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {QUICK_LINKS.map((q) => (
            <a
              key={q.id}
              href={`#${q.id}`}
              className="uppercase tracking-[0.15em] transition hover:text-ink"
            >
              {q.label}
            </a>
          ))}
        </div>
        {onShowShortcuts && (
          <button
            onClick={onShowShortcuts}
            className="hidden items-center gap-1.5 text-[10.5px] uppercase tracking-[0.15em] transition hover:text-ink md:inline-flex"
          >
            shortcuts
            <kbd className="rounded-md border border-ink/15 bg-paper2 px-1.5 py-0.5 text-[10px] text-ink/70">
              ?
            </kbd>
          </button>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-[10.5px]">
        <span>
          © {year} {profile.name} · built to be small.
        </span>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted/85">
          <span>Updated {updated}</span>
          <span aria-hidden="true">·</span>
          <span>Fraunces · Inter · JetBrains Mono</span>
          <span aria-hidden="true">·</span>
          <a
            href="https://github.com/mkhalid-s/mkhalid-s.github.io"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
          >
            Source ↗
          </a>
        </span>
      </div>
    </footer>
  )
}

function formatUpdated(iso: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(iso)
  if (!m) return iso
  const [, y, mm] = m
  const d = new Date(Number(y), Number(mm) - 1, 1)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}
