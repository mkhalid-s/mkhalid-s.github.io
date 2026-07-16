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
  openSourceContributions,
  profile,
  skillGroups,
  spokenLanguages,
} from './data/profile'
import type { GraphNode } from './lib/types'

// The hero statement. Interactive terms map to entries in profile.ts.
const statement: Segment[] = [
  { t: 'text', v: 'I build dependable systems across ' },
  { t: 'term', v: 'insurance platforms', id: 'exp-guidewire' },
  { t: 'text', v: ' and ' },
  { t: 'term', v: 'applied AI', id: 'idea-ai' },
  { t: 'text', v: ' — designed to ' },
  { t: 'term', v: 'do more with less', id: 'idea-less' },
  { t: 'text', v: '.' },
]

const projectIds = ['proj-apx', 'proj-framefuse', 'proj-auth-scrape', 'proj-sir-saathi']
const experienceIds = ['exp-guidewire', 'exp-capgemini', 'exp-jio', 'exp-egain', 'exp-3i']
const educationIds = ['edu-be', 'edu-hsc']
const githubLink = profile.social.find((link) => link.label.toLowerCase() === 'github')
const linkedinLink = profile.social.find((link) => link.label.toLowerCase() === 'linkedin')

// term ids that can appear in the URL hash for deep-linking
const termIds = new Set(statement.flatMap((s) => (s.t === 'term' ? [s.id] : [])))
const hashId = () => decodeURIComponent((location.hash || '').replace(/^#/, ''))

// theme-switch transition effects, selectable via ?fx=NAME (persists to localStorage)
// theme-switch transition effects. With no ?fx= override, a random one is used
// on each toggle (so different visitors/interactions see different effects).
const THEME_FX = [
  'crossfade', // calm full-page dissolve
  'circle', // hard circular reveal from the toggle
  'feather', // soft-edged circular reveal from the toggle
  'iris', // new theme zooms up from centre
  'diagonal', // angled wipe across the screen
  'up', // wipe bottom → top
  'down', // wipe top → bottom
  'right', // wipe left → right
  'split', // opens from the centre line outward
  'blinds', // venetian-blind bars sweep open
] as const
const randomFx = () => THEME_FX[(Math.random() * THEME_FX.length) | 0]

// header scroll-spy nav
const navSections = [
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'ai', label: 'ai' },
  { id: 'contact', label: 'contact' },
]
// all sections, so the nav only lights up when its section is truly current
// (otherwise 'ai' would stay lit through skills/certs/education)
const sectionIds = ['experience', 'projects', 'ai', 'skills', 'education', 'contact']

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
  // lead with the most recently shipped open-source project as evidence
  const [openProj, setOpenProj] = useState<string | null>('proj-apx')
  const [menuOpen, setMenuOpen] = useState(false)
  const explicitFx = useRef<string | null>(null) // set when ?fx= / saved fx pins one
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
  const toggleTheme = (origin?: HTMLElement) => {
    const next = theme === 'light' ? 'dark' : 'light'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (!doc.startViewTransition || reduce) {
      applyTheme(next)
      return
    }
    // pick the effect for this interaction (pinned one, or random)
    document.documentElement.dataset.fx = explicitFx.current ?? randomFx()
    // reveal effects radiate from the toggle button
    if (origin) {
      const r = origin.getBoundingClientRect()
      const x = r.left + r.width / 2
      const y = r.top + r.height / 2
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      const root = document.documentElement
      root.style.setProperty('--vt-x', `${x}px`)
      root.style.setProperty('--vt-y', `${y}px`)
      root.style.setProperty('--vt-r', `${radius}px`)
    }
    doc.startViewTransition(() => applyTheme(next))
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

  // React mounts after the browser's initial anchor pass, so restore section deep links.
  useEffect(() => {
    const scrollToSection = () => {
      const h = hashId()
      if (!h || termIds.has(h)) return
      requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView())
    }
    scrollToSection()
    window.addEventListener('hashchange', scrollToSection)
    return () => window.removeEventListener('hashchange', scrollToSection)
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

  // pin a specific effect only if ?fx=NAME (sticky) or a saved one exists; else random
  useEffect(() => {
    try {
      const all = THEME_FX as readonly string[]
      const param = new URLSearchParams(window.location.search).get('fx')
      if (param && all.includes(param)) {
        explicitFx.current = param
        localStorage.setItem('fx', param)
      } else {
        const saved = localStorage.getItem('fx')
        if (saved && all.includes(saved)) explicitFx.current = saved
      }
    } catch {
      /* ignore */
    }
    if (explicitFx.current) document.documentElement.dataset.fx = explicitFx.current
  }, [])

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
              <a
                href="#top"
                aria-label="Khalid Shaikh, home"
                className="font-mono text-sm font-medium tracking-tight"
              >
                khalid<span className="text-accent">.</span>
              </a>
              <nav
                aria-label="Primary navigation"
                className="flex items-center gap-3 font-mono text-[13px] text-ink/65 sm:gap-5"
              >
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
                {githubLink && (
                  <a
                    href={githubLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden transition hover:text-ink sm:inline"
                  >
                    github ↗
                  </a>
                )}
                <button
                  type="button"
                  onClick={(e) => toggleTheme(e.currentTarget)}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="theme-toggle grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-[13px] transition hover:border-ink/40"
                >
                  <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                </button>
                <button
                  type="button"
                  ref={menuBtnRef}
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav"
                  aria-label="Sections menu"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-[13px] transition hover:border-ink/40 md:hidden"
                >
                  <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
                </button>
              </nav>
            </div>
            {/* mobile section nav (wrapper stays mounted so aria-controls resolves) */}
            <div id="mobile-nav" className="md:hidden">
              <Collapse open={menuOpen}>
                <nav
                  aria-label="Section navigation"
                  className="mx-auto max-w-3xl border-t border-ink/10 px-6 py-2"
                >
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
            <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 sm:py-24">
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-7 font-mono text-[13px] uppercase tracking-[0.25em] text-muted"
              >
                {profile.name} · {profile.title} · {profile.location}
              </m.p>

              <Statement
                segments={statement}
                activeId={termId}
                onToggle={(id) => setTermId((cur) => (cur === id ? null : id))}
              />

              <m.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-7 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg"
              >
                {profile.blurb}
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[12px]"
              >
                <a
                  href="#projects"
                  className="rounded-full bg-ink px-5 py-2.5 text-paper transition hover:bg-accent"
                >
                  View selected work <span aria-hidden="true">↓</span>
                </a>
                <a
                  href={profile.cvHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-ink/20 px-5 py-2.5 transition hover:border-accent hover:text-accent"
                >
                  Résumé <span aria-hidden="true">↗</span>
                </a>
                {linkedinLink && (
                  <a
                    href={linkedinLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-2.5 text-muted transition hover:text-ink"
                  >
                    Say hello <span aria-hidden="true">↗</span>
                  </a>
                )}
              </m.div>

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
            </section>

            {/* impact strip */}
            <section id="work" aria-labelledby="impact-heading" className="scroll-mt-20 mt-12">
              <h2 id="impact-heading" className="sr-only">
                Career highlights
              </h2>
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

              {openSourceContributions.length > 0 && (
                <section
                  id="open-source"
                  aria-labelledby="open-source-heading"
                  className="scroll-mt-24 mt-10"
                >
                  <Reveal>
                    <h3
                      id="open-source-heading"
                      className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
                    >
                      Upstream open source
                    </h3>
                  </Reveal>
                  <div className="divide-y divide-ink/15 border-y border-ink/15">
                    {openSourceContributions.map((contribution, i) => (
                      <Reveal key={contribution.project + contribution.title} delay={i * 0.04}>
                        <article className="py-6">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <h4 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                              {contribution.project}
                            </h4>
                            <span className="font-mono text-[12px] text-muted sm:shrink-0">
                              {contribution.outcome}
                            </span>
                          </div>
                          <p className="mt-1 font-mono text-[12px] text-muted">
                            {contribution.title}
                          </p>
                          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink/80">
                            {contribution.blurb}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                            {contribution.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="font-mono text-[13px] text-accent underline-offset-4 hover:underline"
                              >
                                {link.label} <span aria-hidden="true">↗</span>
                              </a>
                            ))}
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}
            </section>

            {/* applied AI */}
            <section id="ai" className="scroll-mt-20 mt-24 sm:mt-32">
              <Reveal>
                <SectionHeading n="03" title="Applied AI" />
                <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-ink/80">
                  I approach LLM features as software systems: grounded retrieval, constrained
                  tools, repeatable evaluation, and explicit quality, latency and cost trade-offs.
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

              {aiProjects.length > 0 && (
                <section
                  id="ai-case-studies"
                  aria-labelledby="ai-case-studies-heading"
                  className="scroll-mt-24 mt-10"
                >
                  <Reveal>
                    <h3
                      id="ai-case-studies-heading"
                      className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
                    >
                      Public case studies
                    </h3>
                  </Reveal>
                  <div className="divide-y divide-ink/15 border-y border-ink/15">
                    {aiProjects.map((ap, i) => {
                      const n = ap.nodeId ? byId.get(ap.nodeId) : undefined
                      const title = n?.label ?? ap.title ?? ''
                      const blurb = n?.summary ?? ap.blurb ?? ''
                      const meta = n?.meta?.split(' · ').slice(-1)[0] ?? ap.outcome ?? ''
                      const href = n?.links?.[0]?.href ?? ap.href
                      return (
                        <Reveal key={title + i} delay={i * 0.04}>
                          <article className="py-6">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                              <h4 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                                {title}
                              </h4>
                              {meta && (
                                <span className="font-mono text-[12px] text-muted sm:shrink-0">
                                  {meta}
                                </span>
                              )}
                            </div>
                            {blurb && (
                              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink/80">
                                {blurb}
                              </p>
                            )}
                            {ap.stack && (
                              <p className="mt-2 font-mono text-[12px] text-muted">{ap.stack}</p>
                            )}
                            {href && (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-block font-mono text-[13px] text-accent underline-offset-4 hover:underline"
                              >
                                View project <span aria-hidden="true">↗</span>
                              </a>
                            )}
                          </article>
                        </Reveal>
                      )
                    })}
                  </div>
                </section>
              )}
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
                  Have a platform problem, an open-source idea, or a role where this mix would help?{' '}
                  {linkedinLink && (
                    <a
                      href={linkedinLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-accent underline decoration-2 underline-offset-4 transition hover:opacity-70"
                    >
                      Let’s connect.
                    </a>
                  )}
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
                </div>
              </Reveal>
            </section>

            <footer className="border-t border-ink/10 py-6 font-mono text-[11px] text-muted">
              © {new Date().getFullYear()} Khalid Shaikh · built to be small, useful and human.
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
function Collapse({ open, children, id }: { open: boolean; children: ReactNode; id?: string }) {
  return (
    <div id={id}>
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
    </div>
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
              type="button"
              onClick={() => hasMore && onToggle(id)}
              aria-expanded={hasMore ? open : undefined}
              aria-controls={hasMore ? `project-details-${id}` : undefined}
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
            <Collapse id={`project-details-${id}`} open={open && hasMore}>
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
                type="button"
                onClick={() => onToggle(id)}
                aria-expanded={open}
                aria-controls={`experience-details-${id}`}
                className="group mt-1 flex w-full items-baseline justify-between gap-3 text-left"
              >
                <span className="font-display text-xl font-normal text-ink transition duration-300 group-hover:translate-x-1 group-hover:text-accent sm:text-2xl">
                  {n.label}
                </span>
                <ExpandMarker open={open} />
              </button>
              {roleLoc && <div className="font-mono text-[12px] text-muted">{roleLoc}</div>}
              <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink/80">{n.summary}</p>
              <Collapse id={`experience-details-${id}`} open={open && !!n.detail}>
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
        type="button"
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
