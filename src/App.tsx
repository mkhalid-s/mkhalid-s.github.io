import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import Reveal from './components/Reveal'
import Statement, { type Segment } from './components/Statement'
import { certifications, nodes, profile, skillGroups, spokenLanguages } from './data/profile'
import type { GraphNode } from './lib/types'

// The hero statement. Bold terms map to entries in profile.ts and expand below.
const statement: Segment[] = [
  {
    t: 'text',
    v: 'I’m Khalid Shaikh — a senior software engineer with 12+ years across BFSI & telecom. I build ',
  },
  { t: 'term', v: 'tools that do more with less', id: 'idea-less' },
  { t: 'text', v: '. Lately that’s ' },
  { t: 'term', v: 'headroom', id: 'proj-headroom' },
  { t: 'text', v: ', cutting LLM costs 60–95%. By day I ship on the ' },
  { t: 'term', v: 'Guidewire cloud platform', id: 'exp-guidewire' },
  { t: 'text', v: ' in ' },
  { t: 'term', v: 'Java', id: 'sk-java' },
  { t: 'text', v: ' & Gosu. I like fast systems, clean abstractions, and deleting code.' },
]

const projectIds = ['proj-headroom', 'proj-framefuse', 'proj-erp', 'proj-react-tv']
const experienceIds = ['exp-guidewire', 'exp-capgemini', 'exp-jio', 'exp-egain', 'exp-3i']
const educationIds = ['edu-be', 'edu-hsc']

// term ids that can appear in the URL hash for deep-linking
const termIds = new Set(statement.flatMap((s) => (s.t === 'term' ? [s.id] : [])))
const hashId = () => decodeURIComponent((location.hash || '').replace(/^#/, ''))

export default function App() {
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [])
  const [termId, setTermId] = useState<string | null>(null)
  const [openWork, setOpenWork] = useState<string | null>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light',
  )
  const toggleTheme = () =>
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* ignore */
      }
      return next
    })

  // soft accent glow that follows the cursor — subtle life on the light page
  useEffect(() => {
    let raf = 0
    let tx = -999
    let ty = -999
    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          if (glowRef.current)
            glowRef.current.style.transform = `translate(${tx - 300}px, ${ty - 300}px)`
        })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // deep-linkable terms: open a footnote from the URL hash (and on back/forward)
  useEffect(() => {
    const sync = () => {
      const h = hashId()
      if (termIds.has(h)) setTermId(h)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  // keep the URL in sync with the open term (replaceState = no history spam)
  useEffect(() => {
    if (termId) {
      history.replaceState(null, '', '#' + termId)
    } else if (termIds.has(hashId())) {
      history.replaceState(null, '', location.pathname + location.search)
    }
  }, [termId])

  const term = termId ? (byId.get(termId) ?? null) : null

  return (
    <div className="grain relative min-h-full overflow-x-hidden bg-paper">
      {/* cursor glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full opacity-60 blur-3xl sm:block"
      />

      {/* top bar */}
      <header className="relative z-10 mx-auto flex max-w-3xl items-center justify-between px-6 py-6 sm:px-8">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          khalid<span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-5 font-mono text-[13px] text-muted">
          <a href="#work" className="transition hover:text-ink">
            work
          </a>
          <a
            href={profile.cvHref}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
          >
            cv ↗
          </a>
          <a
            href={profile.social[0].href}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
          >
            github ↗
          </a>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-7 w-7 place-items-center rounded-full border border-ink/15 text-[13px] transition hover:border-ink/40"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </nav>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8">
        {/* hero */}
        <section className="flex min-h-[88vh] flex-col pt-[12vh] sm:pt-[16vh]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-7 font-mono text-[13px] uppercase tracking-[0.25em] text-muted"
          >
            {profile.title} · {profile.location}
          </motion.p>

          <Statement
            segments={statement}
            activeId={termId}
            onToggle={(id) => setTermId((cur) => (cur === id ? null : id))}
          />

          {/* footnote detail */}
          <AnimatePresence mode="wait">
            {term && (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 28 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                className="overflow-hidden"
              >
                <Footnote node={term} onClose={() => setTermId(null)} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 font-mono text-[12px] text-muted"
          >
            ↑ tap the underlined words
          </motion.p>

          {/* scroll cue — sits at the bottom of the hero, flows with content */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            onClick={() => document.getElementById('work')?.scrollIntoView()}
            aria-label="Scroll to selected work"
            className="mt-auto flex flex-col items-center gap-1 self-center pt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition hover:text-ink"
          >
            <span>work</span>
            <span className="cue-arrow text-sm">↓</span>
          </motion.button>
        </section>

        {/* selected work */}
        <section id="work" className="mt-28 sm:mt-36">
          <Reveal>
            <h2 className="mb-2 font-mono text-[12px] uppercase tracking-[0.25em] text-muted">
              Selected projects
            </h2>
          </Reveal>
          <CollapsibleList
            ids={projectIds}
            byId={byId}
            openId={openWork}
            onToggle={(id) => setOpenWork((cur) => (cur === id ? null : id))}
          />
        </section>

        {/* experience */}
        <section className="mt-24 sm:mt-32">
          <Reveal>
            <h2 className="mb-2 font-mono text-[12px] uppercase tracking-[0.25em] text-muted">
              Experience
            </h2>
          </Reveal>
          <CollapsibleList
            ids={experienceIds}
            byId={byId}
            openId={openWork}
            onToggle={(id) => setOpenWork((cur) => (cur === id ? null : id))}
          />
        </section>

        {/* skills */}
        <section className="mt-24 sm:mt-32">
          <Reveal>
            <h2 className="mb-5 font-mono text-[12px] uppercase tracking-[0.25em] text-muted">
              Skills
            </h2>
          </Reveal>
          <div className="space-y-5">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.04}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
                  <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted sm:pt-1">
                    {g.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-ink/12 px-3 py-1 text-[13px] text-ink/85"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* certifications */}
        <section className="mt-24 sm:mt-32">
          <Reveal>
            <h2 className="mb-4 font-mono text-[12px] uppercase tracking-[0.25em] text-muted">
              Certifications
            </h2>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] text-ink/85">
                  <span className="mt-0.5 text-accent">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* education */}
        <section className="mt-24 sm:mt-32">
          <Reveal>
            <h2 className="mb-4 font-mono text-[12px] uppercase tracking-[0.25em] text-muted">
              Education
            </h2>
            <div className="space-y-3">
              {educationIds.map((id) => {
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

        {/* contact */}
        <section className="mt-28 pb-24 sm:mt-36">
          <Reveal>
            <h2 className="mb-4 font-mono text-[12px] uppercase tracking-[0.25em] text-muted">
              Elsewhere
            </h2>
            <p className="max-w-xl font-display text-2xl font-normal leading-snug text-ink sm:text-3xl">
              Building something that needs to do more with less?{' '}
              <a href={`mailto:${profile.email}`} className="term font-medium" data-active="true">
                Let’s talk.
              </a>
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[14px] text-muted">
              <a
                href={profile.cvHref}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-ink"
              >
                Résumé (PDF) ↗
              </a>
              {profile.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-ink"
                >
                  {s.label} ↗
                </a>
              ))}
              <a href={`mailto:${profile.email}`} className="transition hover:text-ink">
                Email ↗
              </a>
            </div>
          </Reveal>
        </section>

        <footer className="border-t border-ink/10 py-6 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} Khalid Shaikh · built to be small.
        </footer>
      </main>
    </div>
  )
}

function CollapsibleList({
  ids,
  byId,
  openId,
  onToggle,
}: {
  ids: string[]
  byId: Map<string, GraphNode>
  openId: string | null
  onToggle: (id: string) => void
}) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {ids.map((id, i) => {
        const n = byId.get(id)
        if (!n) return null
        const open = openId === id
        return (
          <Reveal key={id} delay={i * 0.04}>
            <button
              onClick={() => onToggle(id)}
              aria-expanded={open}
              className="group flex w-full items-baseline justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-2xl font-normal text-ink transition group-hover:text-accent sm:text-3xl">
                {n.label}
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-[12px] text-muted">
                  {n.meta?.split(' · ').slice(-1)[0] ?? n.kind}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-base text-muted transition-transform duration-300 group-hover:text-accent"
                  style={{ transform: open ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </span>
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-2">
                    {n.meta && <p className="mb-2 font-mono text-[12px] text-muted">{n.meta}</p>}
                    <p className="max-w-xl text-[15px] leading-relaxed text-ink/80">{n.summary}</p>
                    {n.detail && (
                      <ul className="mt-3 space-y-1.5">
                        {n.detail.map((d, j) => (
                          <li key={j} className="flex gap-2 text-[14px] leading-relaxed text-muted">
                            <span className="text-accent">—</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {n.links && (
                      <div className="mt-4 flex gap-4">
                        {n.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[13px] text-accent underline-offset-4 hover:underline"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        )
      })}
    </div>
  )
}

function Footnote({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  return (
    <div className="relative rounded-2xl border border-ink/10 bg-paper2/60 p-5 backdrop-blur-sm sm:p-6">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 font-mono text-[12px] text-muted transition hover:text-ink"
        aria-label="close"
      >
        ✕
      </button>
      {node.meta && <p className="mb-1 font-mono text-[12px] text-muted">{node.meta}</p>}
      <p className="max-w-xl text-[15px] leading-relaxed text-ink/85 sm:text-base">
        {node.summary}
      </p>
      {node.links && (
        <div className="mt-4 flex gap-4">
          {node.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[13px] text-accent underline-offset-4 hover:underline"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
