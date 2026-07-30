import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
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
import type { GraphNode, Link } from './lib/types'

const projectIds = ['proj-apx', 'proj-framefuse', 'proj-auth-scrape', 'proj-sir-saathi']
const experienceIds = ['exp-guidewire', 'exp-capgemini', 'exp-jio', 'exp-egain', 'exp-3i']
const educationIds = ['edu-be', 'edu-hsc']

const navigation = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#contact', label: 'Contact' },
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
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
        {title}
      </h2>
      {children && <div className="mt-4 max-w-xl text-base leading-7 text-muted">{children}</div>}
    </div>
  )
}

function ProjectCard({ node, featured = false }: { node: GraphNode; featured?: boolean }) {
  const stack = node.detail?.find((item) => item.startsWith('Stack:'))?.replace('Stack: ', '')
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow !text-accent">{node.meta}</p>
        <span aria-hidden="true" className="project-index">
          0
          {featured
            ? '1'
            : node.label === 'FrameFuseVid'
              ? '2'
              : node.label === 'auth-scrape'
                ? '3'
                : '4'}
        </span>
      </div>
      {featured && (
        <img
          src="/images/apx-routing-art.webp"
          alt="Abstract routing diagram representing the APX local AI proxy gateway"
          className="project-art"
          width={1200}
          height={800}
          loading="lazy"
        />
      )}
      <h3 className="mt-8 font-display text-3xl font-medium leading-none tracking-[-0.03em] text-ink sm:text-4xl">
        {node.label}
      </h3>
      <p className="mt-4 max-w-lg text-[15px] leading-7 text-ink/75">{node.summary}</p>
      {stack && <p className="mt-5 font-mono text-xs leading-5 text-muted">{stack}</p>}
      {node.links && (
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 font-mono text-xs font-medium">
          {node.links.map((link) => (
            <ExternalLink key={link.href} link={link} />
          ))}
        </div>
      )}
    </article>
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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
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
            <a
              href={profile.cvHref}
              target="_blank"
              rel="noreferrer"
              className="button button--quiet hidden sm:inline-flex"
            >
              Résumé <span aria-hidden="true">↗</span>
            </a>
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
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
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
              <a
                href={profile.cvHref}
                onClick={closeMenu}
                target="_blank"
                rel="noreferrer"
                className="mobile-nav-link"
              >
                Résumé ↗
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="hero-shell">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-20 sm:px-8 md:grid-cols-[1.35fr_.65fr] md:items-end md:pb-24 md:pt-28">
            <div>
              <p className="eyebrow">Khalid Shaikh · Senior software engineer · Bengaluru, India</p>
              <h1 className="mt-5 max-w-4xl font-display text-[3.6rem] font-medium leading-[0.93] tracking-[-0.055em] text-ink sm:text-7xl lg:text-[6.5rem]">
                Dependable systems.
                <br />
                Thoughtful AI.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/75 sm:text-xl">
                I build insurance platforms, cloud migrations and local-first developer tools with
                twelve years of production engineering behind them.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#work"
                  onClick={(event) => scrollToSection(event, '#work')}
                  className="button button--primary"
                >
                  View selected work <span aria-hidden="true">↓</span>
                </a>
                <a
                  href={profile.cvHref}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--secondary"
                >
                  Download résumé <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <aside className="border-l border-ink/15 pl-5 md:pb-1 md:pl-7">
              <p className="eyebrow">Currently</p>
              <p className="mt-3 font-display text-2xl leading-tight tracking-[-0.025em] text-ink">
                Leading Guidewire Cloud delivery and exploring practical AI systems.
              </p>
              <a
                href="#contact"
                onClick={(event) => scrollToSection(event, '#contact')}
                className="mt-7 inline-flex font-mono text-xs font-medium text-accent underline decoration-accent/40 underline-offset-4"
              >
                Start a conversation <span aria-hidden="true">↘</span>
              </a>
            </aside>
          </div>
          <div className="border-y border-ink/10">
            <div className="mx-auto grid max-w-6xl divide-y divide-ink/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
              {impactStats.map((stat) => (
                <div key={stat.label} className="py-6 sm:px-7 sm:first:pl-0">
                  <p className="font-display text-4xl font-medium leading-none tracking-[-0.04em] text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section-shell scroll-mt-20">
          <SectionIntro eyebrow="Selected work" title="Built for the real world.">
            Open-source tools and practical products where reliability, privacy and clarity are
            features—not afterthoughts.
          </SectionIntro>
          <div className="grid gap-4 lg:grid-cols-2">
            {projectIds.map((id, index) => {
              const node = byId.get(id)
              return node && <ProjectCard key={id} node={node} featured={index === 0} />
            })}
          </div>
          {openSourceContributions.length > 0 && (
            <div className="mt-10 border-t border-ink/10 pt-8">
              <p className="eyebrow">Upstream contribution</p>
              {openSourceContributions.map((item) => (
                <article key={item.project} className="mt-4 grid gap-4 md:grid-cols-[.8fr_1.2fr]">
                  <div>
                    <h3 className="font-display text-3xl tracking-[-0.03em]">{item.project}</h3>
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
        </section>

        <section id="experience" className="section-shell section-shell--tint scroll-mt-20">
          <div className="section-inner px-5 sm:px-8">
            <SectionIntro eyebrow="Experience" title="Calm delivery under real constraints.">
              From insurance platforms to telecom integrations, I turn complex systems into
              dependable releases.
            </SectionIntro>
            <ol className="experience-list">
              {experienceIds.map((id) => {
                const node = byId.get(id)
                if (!node) return null
                const parts = node.meta?.split(' · ') ?? []
                const period = parts.pop()
                return (
                  <li key={id} className="experience-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                      <h3 className="font-display text-3xl font-medium tracking-[-0.03em]">
                        {node.label}
                      </h3>
                      <p className="font-mono text-xs text-muted">{period}</p>
                    </div>
                    <p className="mt-1 font-mono text-xs text-accent">{parts.join(' · ')}</p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink/75">
                      {node.summary}
                    </p>
                    <div className="mt-4 grid max-w-3xl gap-2 sm:grid-cols-2">
                      {node.detail?.slice(0, 2).map((detail) => (
                        <p
                          key={detail}
                          className="border-l border-accent/35 pl-3 text-sm leading-6 text-muted"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                    {node.links && (
                      <div className="mt-4 font-mono text-xs">
                        {node.links.map((link) => (
                          <ExternalLink key={link.href} link={link} />
                        ))}
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section id="expertise" className="section-shell scroll-mt-20">
          <SectionIntro eyebrow="Applied AI" title="Software discipline for AI systems.">
            Grounded retrieval, constrained tools and measurable outcomes—applied without the
            theatre.
          </SectionIntro>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {aiPillars.map((pillar) => (
              <article key={pillar.label} className="bg-paper p-6 sm:p-7">
                <p className="font-display text-2xl tracking-[-0.025em]">{pillar.label}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{pillar.blurb}</p>
              </article>
            ))}
          </div>
          <div className="mt-16">
            <p className="eyebrow">Experiments & shipped work</p>
            <div className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {aiProjects.map((project) => (
                <article key={project.title} className="grid gap-4 py-7 md:grid-cols-[.8fr_1.2fr]">
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.025em]">{project.title}</h3>
                    <p className="mt-2 font-mono text-xs text-accent">{project.outcome}</p>
                  </div>
                  <div>
                    <p className="text-sm leading-6 text-muted">{project.blurb}</p>
                    <p className="mt-3 font-mono text-[11px] leading-5 text-muted">
                      {project.stack}
                    </p>
                    {project.href && (
                      <ExternalLink
                        className="mt-4 font-mono text-xs"
                        link={{ label: 'View project', href: project.href }}
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-shell--tint">
          <div className="section-inner grid gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em]">
                A broad foundation, used with care.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-muted">
                Tools are useful when they make delivery clearer, safer and easier to evolve.
              </p>
            </div>
            <div className="space-y-5">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 border-t border-ink/10 pt-4 sm:grid-cols-[10rem_1fr]"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {group.label}
                  </p>
                  <p className="text-sm leading-6 text-ink/75">{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[1.2fr_.8fr] md:items-end">
            <div>
              <p className="eyebrow">Let’s work together</p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[.98] tracking-[-0.05em] sm:text-6xl">
                A difficult platform problem deserves a thoughtful solution.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                For platform engineering, applied AI, or an open-source collaboration, let’s
                connect.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/mkhalidshaikh"
                  target="_blank"
                  rel="noreferrer"
                  className="button button--primary"
                >
                  Connect on LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={profile.cvHref}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--secondary"
                >
                  Download résumé <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <aside className="border-l border-ink/15 pl-6">
              <p className="eyebrow">Elsewhere</p>
              <div className="mt-4 flex flex-col items-start gap-3 font-mono text-sm">
                {profile.social.map((link) => (
                  <ExternalLink key={link.href} link={link} />
                ))}
              </div>
              <div className="mt-10 border-t border-ink/10 pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  Credentials
                </p>
                <p className="mt-3 text-sm leading-6 text-ink/75">{certifications.join(' · ')}</p>
                <p className="mt-3 text-sm text-muted">Languages: {spokenLanguages.join(' · ')}</p>
                {educationIds.map((id) => {
                  const node = byId.get(id)
                  return (
                    node && (
                      <p key={id} className="mt-2 text-sm text-muted">
                        {node.label} · {node.meta}
                      </p>
                    )
                  )
                })}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 py-6 font-mono text-[11px] text-muted sm:px-8">
          <span>© {new Date().getFullYear()} Khalid Shaikh</span>
          <span>Built with clarity, not clutter.</span>
        </div>
      </footer>
    </div>
  )
}
