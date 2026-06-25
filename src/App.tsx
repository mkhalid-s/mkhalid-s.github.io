import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import AiSection from './components/AiSection'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Header from './components/Header'
import Hero from './components/Hero'
import Now from './components/Now'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import ShortcutOverlay from './components/ShortcutOverlay'
import SiteFooter from './components/SiteFooter'
import Skills from './components/Skills'
import Stats from './components/Stats'
import { type Segment } from './components/Statement'
import { nodes } from './data/profile'
import useActiveSection from './lib/useActiveSection'
import useKeyboardShortcuts from './lib/useKeyboardShortcuts'
import useTheme from './lib/useTheme'

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
  { id: 'now', label: 'now' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'ai', label: 'ai' },
  { id: 'contact', label: 'contact' },
]
// all sections, so the nav only lights up when its section is truly current
const sectionIds = ['now', 'experience', 'projects', 'ai', 'skills', 'education', 'contact']

export default function App() {
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [])
  const [termId, setTermId] = useState<string | null>(null)
  // current role opens by default so its strongest bullets are visible without a tap
  const [openExp, setOpenExp] = useState<string | null>('exp-guidewire')
  const [openProj, setOpenProj] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useKeyboardShortcuts({
    onShowHelp: () => setHelpOpen(true),
    onToggleTheme: () => toggleTheme(),
  })

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
        setHelpOpen(false)
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

          <ScrollProgress />

          <Header
            navSections={navSections}
            activeSection={activeSection}
            theme={theme}
            onToggleTheme={(el) => toggleTheme(el)}
            menuOpen={menuOpen}
            onSetMenuOpen={setMenuOpen}
          />

          <main
            id="top"
            tabIndex={-1}
            className="relative z-10 mx-auto max-w-3xl px-6 outline-none sm:px-8"
          >
            <Hero
              statement={statement}
              termId={termId}
              term={term}
              onToggleTerm={(id) => setTermId((cur) => (cur === id ? null : id))}
              onCloseTerm={() => setTermId(null)}
            />

            <Stats />

            <Now />

            <Experience
              ids={experienceIds}
              byId={byId}
              openId={openExp}
              onToggle={(id) => setOpenExp((cur) => (cur === id ? null : id))}
            />

            <Projects
              ids={projectIds}
              byId={byId}
              openId={openProj}
              onToggle={(id) => setOpenProj((cur) => (cur === id ? null : id))}
            />

            <AiSection byId={byId} />

            <Skills />

            <Education ids={educationIds} byId={byId} />

            <Contact />

            <SiteFooter onShowShortcuts={() => setHelpOpen(true)} />
          </main>

          <ShortcutOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
