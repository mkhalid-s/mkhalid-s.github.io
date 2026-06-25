import { useEffect, useState } from 'react'

// Slim scroll-progress bar pinned to the top of the header.
// One rAF-throttled scroll listener; only renders >0.5% so it doesn't
// distract at the very top.
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setPct(max > 0 ? Math.min(1, h.scrollTop / max) : 0)
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
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-0.5">
      <div
        className="h-full origin-left bg-accent/70 transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${pct})`, opacity: pct < 0.005 ? 0 : 1 }}
      />
    </div>
  )
}
