import { useEffect, useState } from 'react'

// Returns the id of the last section whose top has scrolled past the header line.
// Plain rAF-throttled scroll listener — IO doesn't fit since we want the
// "current" section, not just visibility.
export default function useActiveSection(ids: string[]) {
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
