import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
  aiProjects,
  careerIntro,
  experience,
  nodes,
  openSourceContributions,
  profile,
} from './data/profile'
import type { ExperienceRole, GraphNode, Link } from './lib/types'

const projectIds = ['proj-apx', 'proj-framefuse', 'proj-auth-scrape', 'proj-sir-saathi']

const navigation = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
]

function ExternalLink({ link, className = '' }: { link: Link; className?: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1 underline decoration-accent/45 underline-offset-4 transition hover:decoration-accent hover:text-accent ${className}`}
    >
      {link.label} <span aria-hidden="true">↗</span>
    </a>
  )
}

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[2.15rem] font-medium leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
        {title}
      </h2>
      {children && <div className="mt-4 max-w-xl text-base leading-7 text-muted">{children}</div>}
    </div>
  )
}

function ProjectCard({ node }: { node: GraphNode }) {
  return (
    <article className="project-card">
      {node.meta && <p className="eyebrow !text-accent">{node.meta}</p>}
      <h3 className="mt-5 font-display text-[1.85rem] font-medium leading-none tracking-[-0.03em] text-ink sm:text-3xl">
        {node.label}
      </h3>
      <p className="mt-4 max-w-lg text-[15px] leading-7 text-ink/75">{node.summary}</p>
      {node.links && (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 font-mono text-xs font-medium">
          {node.links.map((link) => (
            <ExternalLink key={link.href} link={link} />
          ))}
        </div>
      )}
    </article>
  )
}

function ExperienceItem({ role }: { role: ExperienceRole }) {
  return (
    <li className="experience-item">
      <article>
        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
          <h3 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-[1.85rem]">
            {role.href ? (
              <a href={role.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                {role.employer}
              </a>
            ) : (
              role.employer
            )}
          </h3>
          <p className="font-mono text-xs text-muted">{role.duration}</p>
        </div>
        <p className="mt-1 font-mono text-xs text-accent">{role.role}</p>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink/75">{role.summary}</p>
        {role.stack.length > 0 && (
          <p className="mt-4 font-mono text-xs leading-5 text-muted">{role.stack.join(' · ')}</p>
        )}
        {role.highlights.length > 0 && (
          <ul className="mt-4 max-w-2xl space-y-2">
            {role.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l border-accent/35 pl-3 text-sm leading-6 text-muted"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  )
}

export default function App() {
  const byId = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [])
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    let themeColor = document.querySelector<HTMLMetaElement>('#theme-color')
    if (!themeColor) {
      themeColor = document.createElement('meta')
      themeColor.id = 'theme-color'
      themeColor.name = 'theme-color'
      document.head.append(themeColor)
    }
    themeColor.content = theme === 'dark' ? '#17181b' : '#f7f6f2'
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Theme preference is a convenience, not a requirement.
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  const closeMenu = () => setMenuOpen(false)
  const scrollToHash = (hash: string, behavior: ScrollBehavior = 'smooth') => {
    const section = document.getElementById(hash.replace(/^#/, ''))
    section?.scrollIntoView({ behavior, block: 'start' })
  }
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!document.getElementById(href.slice(1))) return
    event.preventDefault()
    scrollToHash(href)
    history.pushState(null, '', href)
    setActiveSection(href.slice(1))
    closeMenu()
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    requestAnimationFrame(() =>
      mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus(),
    )
  }, [menuOpen])

  useEffect(() => {
    const restoreHashPosition = () => {
      if (location.hash) scrollToHash(location.hash, 'auto')
    }
    restoreHashPosition()
    window.addEventListener('popstate', restoreHashPosition)
    window.addEventListener('hashchange', restoreHashPosition)
    return () => {
      window.removeEventListener('popstate', restoreHashPosition)
      window.removeEventListener('hashchange', restoreHashPosition)
    }
  }, [])

  useEffect(() => {
    const updateActiveSection = () => {
      const current = navigation.reduce((active, item) => {
        const element = document.querySelector(item.href)
        return element && element.getBoundingClientRect().top <= 140 ? item.href.slice(1) : active
      }, '')
      setActiveSection(current)
    }
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  return (
    <div className="min-h-full bg-paper text-ink">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#top"
            className="font-mono text-sm font-semibold tracking-tight"
            aria-label="Khalid Shaikh — home"
          >
            KS<span className="text-accent">.</span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                className={
                  'nav-link' +
                  (activeSection === item.href.slice(1)
                    ? ' text-ink underline decoration-accent decoration-2 underline-offset-[6px]'
                    : '')
                }
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="icon-button"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <span aria-hidden="true">{theme === 'light' ? '◐' : '☀'}</span>
            </button>
            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setMenuOpen((open) => !open)}
              className="icon-button md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true">{menuOpen ? '×' : '≡'}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-menu"
            ref={mobileMenuRef}
            aria-label="Mobile navigation"
            className="border-t border-ink/10 px-5 py-4 md:hidden"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  className="mobile-nav-link"
                  onClick={(event) => scrollToSection(event, item.href)}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="hero-shell">
          <div className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:px-8 md:pb-20 md:pt-24">
            <p className="eyebrow">
              {profile.name} · {profile.title}
            </p>
            <h1 className="hero-title mt-5 max-w-3xl font-display font-medium text-ink">
              I build platforms and developer tools.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">
              Insurance platforms, cloud migrations, and local-first open-source tools.
            </p>
            <a
              href="#work"
              onClick={(event) => scrollToSection(event, '#work')}
              className="mt-8 inline-flex font-mono text-xs font-medium text-accent underline decoration-accent/40 underline-offset-4"
            >
              See work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section id="work" className="section-shell scroll-mt-20">
          <SectionIntro eyebrow="Work" title="Open-source tools and side projects.">
            Selected repositories and upstream contributions.
          </SectionIntro>
          <div className="grid gap-4 lg:grid-cols-2">
            {projectIds.map((id) => {
              const node = byId.get(id)
              return node && <ProjectCard key={id} node={node} />
            })}
          </div>
          {openSourceContributions.length > 0 && (
            <div className="mt-12 border-t border-ink/10 pt-8">
              <p className="eyebrow">Upstream contribution</p>
              {openSourceContributions.map((item) => (
                <article key={item.project} className="mt-5 grid gap-4 md:grid-cols-[.8fr_1.2fr]">
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.03em]">{item.project}</h3>
                    <p className="mt-1 font-mono text-xs text-accent">{item.outcome}</p>
                  </div>
                  <div>
                    <p className="text-[15px] leading-7 text-muted">{item.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
                      {item.links.map((link) => (
                        <ExternalLink key={link.href} link={link} />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="mt-12 border-t border-ink/10 pt-8">
            <p className="eyebrow">Experiments</p>
            <div className="mt-2 divide-y divide-ink/10">
              {aiProjects.map((project) => (
                <article key={project.title} className="grid gap-3 py-6 md:grid-cols-[.8fr_1.2fr]">
                  <div>
                    <h3 className="font-display text-xl tracking-[-0.025em]">{project.title}</h3>
                    <p className="mt-2 font-mono text-xs text-accent">{project.outcome}</p>
                  </div>
                  <div>
                    <p className="text-sm leading-6 text-muted">{project.blurb}</p>
                    <p className="mt-3 font-mono text-[11px] leading-5 text-muted">
                      {project.stack}
                    </p>
                    <ExternalLink
                      className="mt-4 font-mono text-xs"
                      link={{ label: 'View project', href: project.href }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell section-shell--tint scroll-mt-20">
          <div className="section-inner px-5 sm:px-8">
            <SectionIntro eyebrow="Experience" title="Roles and stacks.">
              {careerIntro}
            </SectionIntro>
            <ol className="experience-list">
              {experience.map((role) => (
                <ExperienceItem key={role.id} role={role} />
              ))}
            </ol>
          </div>
        </section>
      </main>
      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[11px] text-muted sm:px-8">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {profile.social.map((link) => (
              <ExternalLink key={link.href} link={link} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
