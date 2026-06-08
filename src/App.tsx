import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
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
    v: 'I’m Khalid Shaikh — a senior software engineer, 12+ years across BFSI & telecom, now building LLM applications: RAG, agents and evaluation. I build ',
  },
  { t: 'term', v: 'tools that do more with less', id: 'idea-less' },
  { t: 'text', v: '. I ship on the ' },
  { t: 'term', v: 'Guidewire cloud platform', id: 'exp-guidewire' },
  {
    t: 'text',
    v: ' in Java & Gosu, and I like fast systems, clean abstractions, and deleting code.',
  },
]

const projectIds = ['proj-framefuse', 'proj-erp']
const experienceIds = ['exp-guidewire', 'exp-capgemini', 'exp-jio', 'exp-egain', 'exp-3i']
const educationIds = ['edu-be', 'edu-hsc']

// term ids that can appear in the URL hash for deep-linking
const termIds = new Set(statement.flatMap((s) => (s.t === 'term' ? [s.id] : [])))
const hashId = () => decodeURIComponent((location.hash || '').replace(/^#/, ''))

// header scroll-spy nav
const navSections = [
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'ai', label: 'ai' },
  { id: 'contact', label: 'contact' },
]
// all sections, so the nav only lights up when its section is truly current
// (otherwise 'ai' would stay lit through skills/certs/education)
const sectionIds = [
  'experience',
  'projects',
  'ai',
  'skills',
  'certifications',
  'education',
  'contact',
]

// returns the id of the last section whose top has scrolled past the header line
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 100) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids])
  return active
}

export default function App() {
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [])
  const [termId, setTermId] = useState<string | null>(null)
  // current role opens by default so its strongest bullets are visible without a tap
  const [openExp, setOpenExp] = useState<string | null>('exp-guidewire')
  const [openProj, setOpenProj] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light',
  )
  const applyTheme = (next: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore */
    }
    setTheme(next)
  }
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // smooth full-page crossfade where supported (Chromium); graceful snap otherwise
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (doc.startViewTransition && !reduce) doc.startViewTransition(() => applyTheme(next))
    else applyTheme(next)
  }

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

  // Escape closes the open footnote / mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTermId(null)
        setMenuOpen(false)
      }
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

  // when the mobile menu closes, return focus to its toggle button
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const prevMenu = useRef(false)
  useEffect(() => {
    if (prevMenu.current && !menuOpen) menuBtnRef.current?.focus()
    prevMenu.current = menuOpen
  }, [menuOpen])

  // follow OS theme changes live, unless the user has chosen a theme manually
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem('theme')) return
      } catch {
        /* ignore */
      }
      const next = e.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const term = termId ? (byId.get(termId) ?? null) : null
  const activeSection = useActiveSection(sectionIds)

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="grain relative min-h-full overflow-x-clip bg-paper">
          <a
            href="#top"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          {/* top bar (sticky) */}
          <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 sm:px-8">
              <a href="#top" className="font-mono text-sm font-medium tracking-tight">
                khalid<span className="text-accent">.</span>
              </a>
              <nav className="flex items-center gap-5 font-mono text-[13px] text-ink/65">
                <div className="hidden items-center gap-5 md:flex">
                  {navSections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      aria-current={activeSection === s.id ? 'location' : undefined}
                      className={`underline-offset-[6px] transition hover:text-ink ${
                        activeSection === s.id
                          ? 'text-ink underline decoration-accent decoration-2'
                          : ''
                      }`}
                    >
                      {s.label}
                    </a>
                  ))}
                  <span aria-hidden="true" className="h-3 w-px bg-ink/15" />
                </div>
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
                <button
                  ref={menuBtnRef}
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav"
                  aria-label="Sections menu"
                  className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-[13px] transition hover:border-ink/40 md:hidden"
                >
                  {menuOpen ? '✕' : '☰'}
                </button>
              </nav>
            </div>
            {/* mobile section nav (wrapper stays mounted so aria-controls resolves) */}
            <div id="mobile-nav" className="md:hidden">
              <Collapse open={menuOpen}>
                <nav className="mx-auto max-w-3xl border-t border-ink/10 px-6 py-2">
                  {navSections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={activeSection === s.id ? 'location' : undefined}
                      className={`block py-2.5 font-mono text-[13px] transition ${
                        activeSection === s.id ? 'text-accent' : 'text-ink/70 hover:text-ink'
                      }`}
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </Collapse>
            </div>
          </header>

          <main
            id="top"
            tabIndex={-1}
            className="relative z-10 mx-auto max-w-3xl px-6 outline-none sm:px-8"
          >
            {/* hero */}
            <section className="flex min-h-[88vh] flex-col pt-[12vh] sm:pt-[16vh]">
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-7 font-mono text-[13px] uppercase tracking-[0.25em] text-muted"
              >
                {profile.title} · {profile.location}
              </m.p>

              <Statement
                segments={statement}
                activeId={termId}
                onToggle={(id) => setTermId((cur) => (cur === id ? null : id))}
              />

              {/* footnote detail */}
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
                    <Footnote node={term} onClose={() => setTermId(null)} />
                  </m.div>
                )}
              </AnimatePresence>

              {/* scroll cue — sits at the bottom of the hero, flows with content */}
              <m.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                onClick={() => document.getElementById('work')?.scrollIntoView()}
                aria-label="Scroll to selected work"
                className="mt-auto flex flex-col items-center gap-1 self-center pt-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition hover:text-ink"
              >
                <span>work</span>
                <span className="cue-arrow text-sm">↓</span>
              </m.button>
            </section>

            {/* impact strip */}
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

            {/* experience */}
            <section id="experience" className="scroll-mt-20 mt-24 sm:mt-32">
              <Reveal>
                <SectionHeading n="01" title="Experience" />
              </Reveal>
              <Timeline
                ids={experienceIds}
                byId={byId}
                openId={openExp}
                onToggle={(id) => setOpenExp((cur) => (cur === id ? null : id))}
              />
            </section>

            {/* selected work */}
            <section id="projects" className="scroll-mt-20 mt-24 sm:mt-32">
              <Reveal>
                <SectionHeading n="02" title="Projects" />
              </Reveal>
              <CollapsibleList
                ids={projectIds}
                byId={byId}
                openId={openProj}
                onToggle={(id) => setOpenProj((cur) => (cur === id ? null : id))}
              />
            </section>

            {/* AI engineering */}
            <section id="ai" className="scroll-mt-20 mt-24 sm:mt-32">
              <Reveal>
                <SectionHeading n="03" title="AI engineering" />
                <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-ink/80">
                  Bringing a decade of production engineering discipline to LLM systems —
                  prototyping, measuring and hardening them for real workloads, not demos.
                </p>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  Focus areas
                </div>
              </Reveal>

              <div className="grid gap-3 sm:grid-cols-2">
                {aiPillars.map((p, i) => (
                  <Reveal key={p.label} delay={i * 0.04}>
                    <div className="rounded-xl border border-ink/10 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40">
                      <div className="font-display text-lg font-normal text-ink">{p.label}</div>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted">{p.blurb}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div
                className={
                  aiProjects.length ? 'mt-8 divide-y divide-ink/15 border-y border-ink/15' : ''
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
                            <span className="shrink-0 font-mono text-[12px] text-muted">
                              {meta}
                            </span>
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

            {/* skills */}
            <section id="skills" className="scroll-mt-20 mt-24 sm:mt-32">
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
                            className="rounded-md bg-ink/[0.05] px-2.5 py-1 text-[13px] text-ink/75 transition hover:bg-accent/10 hover:text-accent"
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={skillGroups.length * 0.04}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
                    <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted sm:pt-1">
                      Certified
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {certifications.map((c) => (
                        <span
                          key={c}
                          className="rounded-md bg-ink/[0.05] px-2.5 py-1 text-[13px] text-ink/75"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* education */}
            <section id="education" className="scroll-mt-20 mt-24 sm:mt-32">
              <Reveal>
                <SectionHeading n="05" title="Education" />
                <div className="space-y-3">
                  {educationIds.map((id) => {
                    const n = byId.get(id)!
                    return (
                      <div key={id} className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-xl font-normal text-ink sm:text-2xl">
                          {n.label}
                        </span>
                        <span className="text-right font-mono text-[12px] text-muted">
                          {n.meta}
                        </span>
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
            <section id="contact" className="scroll-mt-20 mt-28 pb-24 sm:mt-36">
              <Reveal>
                <SectionHeading n="06" title="Contact" />
                <p className="max-w-xl font-display text-2xl font-normal leading-snug text-ink sm:text-3xl">
                  Building something that needs to do more with less?{' '}
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-medium text-accent underline decoration-2 underline-offset-4 transition hover:opacity-70"
                  >
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
    </LazyMotion>
  )
}

function SectionHeading({ n, title }: { n: string; title: string }) {
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

// rotating + → × marker used by both collapsible lists
function ExpandMarker({ open }: { open: boolean }) {
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

// height/opacity collapse wrapper
function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
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

function DetailList({ items }: { items: string[] }) {
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
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      {ids.map((id, i) => {
        const n = byId.get(id)
        if (!n) return null
        const open = openId === id
        const hasMore = !!(n.detail?.length || n.links?.length)
        return (
          <Reveal key={id} delay={i * 0.04}>
            <button
              onClick={() => hasMore && onToggle(id)}
              aria-expanded={hasMore ? open : undefined}
              className="group flex w-full items-baseline justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-2xl font-normal text-ink transition duration-300 group-hover:translate-x-1 group-hover:text-accent sm:text-3xl">
                {n.label}
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-[12px] text-muted">
                  {n.meta?.split(' · ').slice(-1)[0] ?? n.kind}
                </span>
                {hasMore && <ExpandMarker open={open} />}
              </span>
            </button>
            <p className="-mt-2 max-w-xl pb-5 text-[15px] leading-relaxed text-ink/80">
              {n.summary}
            </p>
            <Collapse open={open && hasMore}>
              <div className="border-l border-accent/30 pb-6 pl-4">
                {n.detail && <DetailList items={n.detail} />}
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
            </Collapse>
          </Reveal>
        )
      })}
    </div>
  )
}

function Timeline({
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
    <ol className="relative ml-1 border-l border-ink/25">
      {ids.map((id, i) => {
        const n = byId.get(id)
        if (!n) return null
        const open = openId === id
        const parts = n.meta ? n.meta.split(' · ') : []
        const period = parts.length ? parts[parts.length - 1] : ''
        const roleLoc = parts.slice(0, -1).join(' · ')
        return (
          <li key={id} className="group/item relative pb-9 pl-6 last:pb-1">
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-[7px] h-2.5 w-2.5 rounded-full ring-4 ring-paper transition-all duration-300 group-hover/item:scale-125 group-hover/item:bg-accent ${
                open ? 'bg-accent' : 'bg-ink/50'
              }`}
            />
            <Reveal y={10} delay={i * 0.05}>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {period}
              </div>
              <button
                onClick={() => onToggle(id)}
                aria-expanded={open}
                className="group mt-1 flex w-full items-baseline justify-between gap-3 text-left"
              >
                <span className="font-display text-xl font-normal text-ink transition duration-300 group-hover:translate-x-1 group-hover:text-accent sm:text-2xl">
                  {n.label}
                </span>
                <ExpandMarker open={open} />
              </button>
              {roleLoc && <div className="font-mono text-[12px] text-muted">{roleLoc}</div>}
              <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink/80">{n.summary}</p>
              <Collapse open={open && !!n.detail}>
                {n.detail && <DetailList items={n.detail} />}
              </Collapse>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}

function Footnote({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  return (
    <div
      id={`fn-${node.id}`}
      role="region"
      aria-label={`${node.label} — details`}
      className="relative rounded-xl border border-ink/10 bg-paper2/60 p-5 backdrop-blur-sm sm:p-6"
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
