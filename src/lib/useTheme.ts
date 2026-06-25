import { useEffect, useRef, useState } from 'react'
import { THEME_FX, randomFx, type ThemeFx } from './themeFx'

export type Theme = 'light' | 'dark'

// Owns the theme state, the cross-tab + OS-follow logic, the View-Transitions
// theme switch (with origin-based reveal effects) and the ?fx= override.
export default function useTheme() {
  const explicitFx = useRef<ThemeFx | null>(null)
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light',
  )

  const applyTheme = (next: Theme) => {
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore */
    }
    setTheme(next)
  }

  const toggleTheme = (origin?: HTMLElement | null) => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (!doc.startViewTransition || reduce) {
      applyTheme(next)
      return
    }
    document.documentElement.dataset.fx = explicitFx.current ?? randomFx()
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

  // pin a specific effect only if ?fx=NAME (sticky) or a saved one exists; else random
  useEffect(() => {
    try {
      const all = THEME_FX as readonly string[]
      const param = new URLSearchParams(window.location.search).get('fx')
      if (param && all.includes(param)) {
        explicitFx.current = param as ThemeFx
        localStorage.setItem('fx', param)
      } else {
        const saved = localStorage.getItem('fx')
        if (saved && all.includes(saved)) explicitFx.current = saved as ThemeFx
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
      const next: Theme = e.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return { theme, toggleTheme }
}
