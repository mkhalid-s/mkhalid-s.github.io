import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
  aiProjects,
  careerIntro,
  experience,
  nodes,
  openSourceContributions,
  practice,
  profile,
} from './data/profile'
import type { ExperienceRole, GraphNode, Link } from './lib/types'

const projectIds = ['proj-apx', 'proj-framefuse', 'proj-auth-scrape', 'proj-sir-saathi']
const longestTenure = Math.max(...experience.map((role) => role.durationYears))

const navigation = [
  { href: '#work', label: 'Work' },
  { href: '#experiments', label: 'Experiments' },
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

function StackChips({ items }: { items: string[] }) {
  if (items.length === 0) return null
  return (
    <ul className="stack-chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function GatewayMark() {
  return (
    <svg className="gateway-mark" viewBox="0 0 360 140" role="img" aria-hidden="true">
      <text x="18" y="28" className="gateway-label">
        Claude Code
      </text>
      <text x="148" y="28" className="gateway-label">
        APX
      </text>
      <text x="268" y="22" className="gateway-label">
        Headroom
      </text>
      <text x="268" y="58" className="gateway-label">
        pxpipe
      </text>
      <text x="268" y="94" className="gateway-label">
        Squeezr
      </text>
      <text x="268" y="130" className="gateway-label">
        direct
      </text>
      <rect x="12" y="38" width="88" height="44" rx="4" />
      <rect x="136" y="30" width="88" height="80" rx="4" />
      <rect x="256" y="8" width="92" height="20" rx="3" />
      <rect x="256" y="44" width="92" height="20" rx="3" />
      <rect x="256" y="80" width="92" height="20" rx="3" />
      <rect x="256" y="116" width="92" height="20" rx="3" />
      <path d="M100 60 H136" />
      <path d="M224 50 H256" />
      <path d="M224 70 H248 V54 H256" />
      <path d="M224 70 H248 V90 H256" />
      <path d="M224 90 H248 V126 H256" />
    </svg>
  )
}

function ProjectCard({ node, featured = false }: { node: GraphNode; featured?: boolean }) {
  return (
    <article className={featured ? 'project-card project-card--featured' : 'project-card'}>
      <div className="project-card__meta">
        <p className="eyebrow !text-accent">{node.meta}</p>
      </div>
      {featured && <GatewayMark />}
      <h3 className="project-card__title">{node.label}</h3>
      <p className="project-card__summary">{node.summary}</p>
      {node.detail && (
        <ul className="project-card__details">
          {node.detail.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {node.stack && <StackChips items={node.stack} />}
      {node.links && (
        <div className="project-card__links">
          {node.links.map((link) => (
            <ExternalLink key={link.href} link={link} />
          ))}
        </div>
      )}
    </article>
  )
}

function ExperienceItem({ role }: { role: ExperienceRole }) {
  const width = `${Math.max((role.durationYears / longestTenure) * 100, 12)}%`
  return (
    <li className="experience-item">
      <article>
        <div className="experience-item__top">
          <h3 className="experience-item__employer">
            {role.href ? (
              <a href={role.href} target="_blank" rel="noreferrer">
                {role.employer}
              </a>
            ) : (
              role.employer
            )}
          </h3>
          <p className="experience-item__duration">{role.duration}</p>
        </div>
        <p className="experience-item__role">{role.role}</p>
        <div className="tenure-meter" aria-hidden="true">
          <span style={{ width }} />
        </div>
        <p className="experience-item__summary">{role.summary}</p>
        <StackChips items={role.stack} />
        {role.highlights.length > 0 && (
          <ul className="experience-item__highlights">
            {role.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
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
    themeColor.content = theme === 'dark' ? '#12100e' : '#f4efe6'
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
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="site-header__inner">
          <a href="#top" className="brand" aria-label="Khalid Shaikh — home">
            KS<span className="text-accent">.</span>
            <span className="brand__meta">ledger</span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                className={
                  'nav-link' + (activeSection === item.href.slice(1) ? ' nav-link--active' : '')
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
            className="mobile-menu"
          >
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
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="hero-shell">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">
                {profile.name} · {profile.title}
              </p>
              <h1 className="hero-title">
                Insurance platforms.
                <br />
                Local-first tools.
              </h1>
              <p className="hero-copy">
                I ship Guidewire Cloud and InsuranceSuite systems, then build the local developer
                tools I wish production teams already had.
              </p>
              <a
                href="#work"
                onClick={(event) => scrollToSection(event, '#work')}
                className="hero-link"
              >
                See work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <aside className="dossier" aria-label="Engineering focus">
              <p className="dossier__label">Focus</p>
              <dl className="dossier__list">
                <div>
                  <dt>Tenure</dt>
                  <dd>{careerIntro}</dd>
                </div>
                <div>
                  <dt>Now</dt>
                  <dd>Guidewire Cloud Platform and AI-powered InsuranceSuite features.</dd>
                </div>
                {practice.map((area) => (
                  <div key={area.label}>
                    <dt>{area.label}</dt>
                    <dd>{area.note}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section id="work" className="section-shell scroll-mt-20">
          <div className="section-heading">
            <p className="eyebrow">01 / Work</p>
            <h2>Open-source systems with production habits.</h2>
          </div>
          <div className="work-grid">
            {projectIds.map((id, index) => {
              const node = byId.get(id)
              return node && <ProjectCard key={id} node={node} featured={index === 0} />
            })}
          </div>
          {openSourceContributions.length > 0 && (
            <div className="upstream">
              <p className="eyebrow">Upstream</p>
              {openSourceContributions.map((item) => (
                <article key={item.project} className="upstream__item">
                  <div>
                    <h3>{item.project}</h3>
                    <p className="upstream__outcome">{item.outcome}</p>
                  </div>
                  <div>
                    <p>{item.blurb}</p>
                    <div className="upstream__links">
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

        <section id="experiments" className="section-shell section-shell--tint scroll-mt-20">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">02 / Experiments</p>
              <h2>Applied AI treated as software.</h2>
            </div>
            <div className="experiment-grid">
              {aiProjects.map((project) => (
                <article key={project.title} className="experiment-card">
                  <h3>{project.title}</h3>
                  <p className="experiment-card__outcome">{project.outcome}</p>
                  <p>{project.blurb}</p>
                  <StackChips items={project.stack} />
                  <ExternalLink link={{ label: 'View project', href: project.href }} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell scroll-mt-20">
          <div className="section-heading">
            <p className="eyebrow">03 / Experience</p>
            <h2>Roles, tenure, and the stacks that shipped.</h2>
            <p className="section-heading__note">{careerIntro}</p>
          </div>
          <ol className="experience-list">
            {experience.map((role) => (
              <ExperienceItem key={role.id} role={role} />
            ))}
          </ol>
        </section>
      </main>
      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div className="site-footer__links">
          {profile.social.map((link) => (
            <ExternalLink key={link.href} link={link} />
          ))}
        </div>
      </footer>
    </div>
  )
}
