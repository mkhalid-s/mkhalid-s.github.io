import { m } from 'framer-motion'
import { type ReactNode, useEffect, useRef, useState } from 'react'

// Reveal-on-scroll using a plain IntersectionObserver so we only need
// framer-motion's `animations` feature (domAnimation) — no viewport bundle.
export default function Reveal({
  children,
  delay = 0,
  y = 12,
  duration = 0.55,
}: {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration, delay, ease: [0.22, 0.8, 0.2, 1] }}
    >
      {children}
    </m.div>
  )
}
