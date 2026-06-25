import { useEffect } from 'react'

const KEY_MAP: Record<string, string> = {
  n: 'now',
  e: 'experience',
  p: 'projects',
  a: 'ai',
  s: 'skills',
  c: 'contact',
}

interface Options {
  /** open the shortcut help overlay (?) */
  onShowHelp: () => void
  /** toggle the theme (t) */
  onToggleTheme: () => void
}

// Vim-style "g + key" jumps + single-key actions.
//   g n / g e / g p / g a / g s / g c — jump to a section
//   t                                  — toggle theme
//   ? or shift+/                       — show keyboard hints
//   Escape                             — handled elsewhere (closes overlays)
export default function useKeyboardShortcuts({ onShowHelp, onToggleTheme }: Options) {
  useEffect(() => {
    let armed = false
    let armedAt = 0

    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      if (target.isContentEditable) return true
      const tag = target.tagName
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTypingTarget(e.target)) return

      const k = e.key

      if (k === '?' || (e.shiftKey && k === '/')) {
        e.preventDefault()
        onShowHelp()
        return
      }

      if (armed && Date.now() - armedAt < 1500) {
        const id = KEY_MAP[k.toLowerCase()]
        if (id) {
          e.preventDefault()
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        armed = false
        return
      }

      if (k === 'g') {
        armed = true
        armedAt = Date.now()
        return
      }

      if (k.toLowerCase() === 't') {
        e.preventDefault()
        onToggleTheme()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onShowHelp, onToggleTheme])
}
