import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import Reveal from './components/Reveal'
import Statement, { type Segment } from './components/Statement'
import {
  aiPillars,
  aiProjects,
  certifications,
  impactStats,
  nodes,
  profile,
  skillGroups,
  spokenLanguages,
} from './data/profile'
import type { GraphNode } from './lib/types'

// The hero statement. Bold terms map to entries in profile.ts and expand below.
const statement: Segment[] = [
  {
    t: 'text',
    v: 'I’m Khalid Shaikh — a senior software engineer with 12+ years across BFSI & telecom. I build ',
  },
  { t: 'term', v: 'tools that do more with less', id: 'idea-less' },
  {
    t: 'text',
    v: '. Lately I’ve been building LLM applications — RAG, agents and evaluation. By day I ship on the ',
  },
  { t: 'term', v: 'Guidewire cloud platform', id: 'exp-guidewire' },
  { t: 'text', v: ' in ' },
  { t: 'term', v: 'Java', id: 'sk-java' },
  { t: 'text', v: ' & Gosu. I like fast systems, clean abstractions, and deleting code.' },
]

const projectIds = ['proj-framefuse', 'proj-erp']
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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

  // deep-linkable terms: open/close a footnote from the URL hash (and on back/forward)
  useEffect(() => {
    const sync = () => {
      const h = hashId()
      setTermId(termIds.has(h) ? h : null)
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

  // Escape closes the open footnote
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTermId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // when a footnote closes, return focus to the term that opened it
  const prevTerm = useRef<string | null>(null)
  useEffect(() => {
    if (prevTerm.current && !termId) {
      const el = document.querySelector(`[aria-controls="fn-${prevTerm.current}"]`)
      if (el instanceof HTMLElement) el.focus()
    }
    prevTerm.current = termId
  }, [termId])

  const term = termId ? (byId.get(termId) ?? null) : null

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-full overflow-x-hidden bg-paper">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
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

        <main
          id="top"
          tabIndex={-1}
          className="relative z-10 mx-auto max-w-3xl px-6 outline-none sm:px-8"
        >
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

          {/* impact strip */}
          <section id="work" className="mt-20 sm:mt-28">
            <Reveal>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {impactStats.map((s) => (
                  <div key={s.label} className="bg-paper px-4 py-5 text-center">
                    <div className="font-display text-3xl font-normal text-ink sm:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* AI engineering */}
          <section className="mt-24 sm:mt-32">
            <Reveal>
              <SectionHeading n="01" title="AI engineering" />
              <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-ink/80">
                Over the last year I’ve been building LLM applications and POCs — across retrieval,
                agents, orchestration and evaluation.
              </p>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {aiPillars.map((p, i) => (
                <Reveal key={p.label} delay={i * 0.04}>
                  <div className="rounded-xl border border-ink/10 p-4">
                    <div className="font-display text-lg font-normal text-ink">{p.label}</div>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted">{p.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div
              className={
                aiProjects.length ? 'mt-8 divide-y divide-ink/10 border-y border-ink/10' : ''
              }
            >
              {aiProjects.map((ap, i) => {
                const n = ap.nodeId ? byId.get(ap.nodeId) : undefined
                const title = n?.label ?? ap.title ?? ''
                const blurb = n?.summary ?? ap.blurb ?? ''
                const meta = n?.meta?.split(' · ').slice(-1)[0] ?? ap.outcome ?? ''
                const href = n?.links?.[0]?.href ?? ap.href
                return (
                  <Reveal key={title + i} delay={i * 0.04}>
                    <div className="py-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-2xl font-normal text-ink sm:text-3xl">
                          {title}
                        </span>
                        {meta && (
                          <span className="shrink-0 font-mono text-[12px] text-muted">{meta}</span>
                        )}
                      </div>
                      {blurb && (
                        <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink/80">
                          {blurb}
                        </p>
                      )}
                      {(ap.stack || n) && (
                        <p className="mt-2 font-mono text-[12px] text-muted">
                          {ap.stack ?? (n?.tags ?? []).slice(0, 6).join(' · ')}
                        </p>
                      )}
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block font-mono text-[13px] text-accent underline-offset-4 hover:underline"
                        >
                          View ↗
                        </a>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>

          {/* selected work */}
          <section className="mt-24 sm:mt-32">
            <Reveal>
              <SectionHeading n="02" title="Selected projects" />
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
              <SectionHeading n="03" title="Experience" />
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
              <SectionHeading n="04" title="Skills" />
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
              <SectionHeading n="05" title="Certifications" />
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
              <SectionHeading n="06" title="Education" />
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
              <SectionHeading n="07" title="Elsewhere" />
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
    </MotionConfig>
  )
}

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[12px] text-accent">{n}</span>
      <h2 className="font-mono text-[12px] uppercase tracking-[0.25em] text-muted">{title}</h2>
      <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
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
    <div
      id={`fn-${node.id}`}
      role="region"
      aria-label={`${node.label} — details`}
      className="relative rounded-2xl border border-ink/10 bg-paper2/60 p-5 backdrop-blur-sm sm:p-6"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 font-mono text-[12px] text-muted transition hover:text-ink"
        aria-label="Close details"
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
