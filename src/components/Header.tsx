import { useEffect, useRef } from 'react'
import { profile } from '../data/profile'
import type { Theme } from '../lib/useTheme'
import { Collapse } from './ui'

interface NavItem {
  id: string
  label: string
}

interface Props {
  navSections: NavItem[]
  activeSection: string
  theme: Theme
  onToggleTheme: (origin: HTMLElement) => void
  menuOpen: boolean
  onSetMenuOpen: (next: boolean | ((prev: boolean) => boolean)) => void
}

export default function Header({
  navSections,
  activeSection,
  theme,
  onToggleTheme,
  menuOpen,
  onSetMenuOpen,
}: Props) {
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const prevMenu = useRef(false)
  useEffect(() => {
    if (prevMenu.current && !menuOpen) menuBtnRef.current?.focus()
    prevMenu.current = menuOpen
  }, [menuOpen])

  return (
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
                  activeSection === s.id ? 'text-ink underline decoration-accent decoration-2' : ''
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
            onClick={(e) => onToggleTheme(e.currentTarget)}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="theme-toggle grid h-7 w-7 place-items-center rounded-full border border-ink/15 text-[13px] transition hover:border-ink/40"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            ref={menuBtnRef}
            onClick={() => onSetMenuOpen((o) => !o)}
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
                onClick={() => onSetMenuOpen(false)}
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
  )
}
