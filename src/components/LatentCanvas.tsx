import { useEffect, useRef } from 'react'
import type { Cluster, Edge } from '../lib/types'
import type { Placed } from '../lib/layout'

export interface FlyTarget {
  x: number
  y: number
  zoom?: number
  nonce: number
}

interface Props {
  placed: Placed[]
  edges: Edge[]
  clusters: Cluster[]
  selectedId: string | null
  highlight: Set<string>
  searchActive: boolean
  flyTo: FlyTarget | null
  reduceMotion: boolean
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

interface Cam {
  x: number
  y: number
  zoom: number
  tx: number
  ty: number
  tz: number
}

const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

export default function LatentCanvas(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Mutable refs so the animation loop sees fresh values without re-subscribing.
  const P = useRef(props)
  P.current = props

  const cam = useRef<Cam>({ x: 0, y: 0, zoom: 0.62, tx: 0, ty: 0, tz: 0.62 })
  const live = useRef(new Map<string, { x: number; y: number; r: number }>())
  const neighbors = useRef(new Map<string, Set<string>>())
  const hoverId = useRef<string | null>(null)
  const lastFly = useRef(0)

  // Precompute adjacency for hover-neighbor highlighting.
  useEffect(() => {
    const m = new Map<string, Set<string>>()
    for (const e of props.edges) {
      if (!m.has(e.a)) m.set(e.a, new Set())
      if (!m.has(e.b)) m.set(e.b, new Set())
      m.get(e.a)!.add(e.b)
      m.get(e.b)!.add(e.a)
    }
    neighbors.current = m
  }, [props.edges])

  // Fly camera to a target when nonce changes.
  useEffect(() => {
    const f = props.flyTo
    if (!f || f.nonce === lastFly.current) return
    lastFly.current = f.nonce
    cam.current.tx = f.x
    cam.current.ty = f.y
    cam.current.tz = f.zoom ?? Math.max(cam.current.zoom, 1.15)
    if (props.reduceMotion) {
      cam.current.x = cam.current.tx
      cam.current.y = cam.current.ty
      cam.current.zoom = cam.current.tz
    }
  }, [props.flyTo, props.reduceMotion])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let W = 0
    let H = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const toScreen = (wx: number, wy: number) => ({
      x: (wx - cam.current.x) * cam.current.zoom + W / 2,
      y: (wy - cam.current.y) * cam.current.zoom + H / 2,
    })
    const toWorld = (sx: number, sy: number) => ({
      x: (sx - W / 2) / cam.current.zoom + cam.current.x,
      y: (sy - H / 2) / cam.current.zoom + cam.current.y,
    })

    const start = performance.now()
    const draw = () => {
      const t = (performance.now() - start) / 1000
      const c = cam.current
      // ease camera toward target
      const k = P.current.reduceMotion ? 1 : 0.08
      c.x += (c.tx - c.x) * k
      c.y += (c.ty - c.y) * k
      c.zoom += (c.tz - c.zoom) * k

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // background
      const g = ctx.createRadialGradient(W * 0.5, H * 0.42, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.75)
      g.addColorStop(0, '#0a0d16')
      g.addColorStop(1, '#05060a')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      drawDots(t)
      drawClusterLabels()
      const hi = P.current.highlight
      const sel = P.current.selectedId
      const hov = hoverId.current
      const active = hov ?? sel
      const nbrs = active ? neighbors.current.get(active) : undefined
      const searchActive = P.current.searchActive

      drawEdges(active, nbrs)
      drawNodes(t, hi, sel, hov, nbrs, searchActive)

      raf = requestAnimationFrame(draw)
    }

    function drawDots(t: number) {
      const c = cam.current
      const step = 90
      const ox = ((-c.x * c.zoom) % (step)) 
      const oy = ((-c.y * c.zoom) % (step))
      ctx.fillStyle = 'rgba(120,140,180,0.06)'
      for (let x = (W / 2 + ox) % step; x < W; x += step) {
        for (let y = (H / 2 + oy) % step; y < H; y += step) {
          const tw = 0.5 + 0.5 * Math.sin(t * 0.6 + x * 0.05 + y * 0.05)
          ctx.globalAlpha = 0.04 + tw * 0.05
          ctx.fillRect(x, y, 1.5, 1.5)
        }
      }
      ctx.globalAlpha = 1
    }

    function drawClusterLabels() {
      for (const cl of P.current.clusters) {
        const wx = cl.anchor.x * 1000 * 0.62
        const wy = cl.anchor.y * 1000 * 0.62
        const s = toScreen(wx, wy)
        ctx.save()
        ctx.font = '600 13px "JetBrains Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillStyle = hexA(cl.color, 0.42)
        ctx.fillText(cl.label.toUpperCase(), s.x, s.y - 8)
        ctx.font = '400 10px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(150,165,190,0.30)'
        const words = cl.blurb
        ctx.fillText(words.length > 52 ? words.slice(0, 52) + '…' : words, s.x, s.y + 8)
        ctx.restore()
      }
    }

    function nodePos(n: Placed, t: number) {
      if (P.current.reduceMotion) return { x: n.x, y: n.y }
      return {
        x: n.x + Math.sin(t * n.freq + n.phase) * n.amp,
        y: n.y + Math.cos(t * n.freq * 0.9 + n.phase) * n.amp,
      }
    }

    function drawEdges(active: string | null, nbrs?: Set<string>) {
      const byId = new Map(P.current.placed.map((n) => [n.id, n]))
      ctx.lineWidth = 1
      for (const e of P.current.edges) {
        const a = live.current.get(e.a)
        const b = live.current.get(e.b)
        if (!a || !b) continue
        const na = byId.get(e.a)!
        const connected = active && (e.a === active || e.b === active)
        let alpha = 0.05 + e.w * 0.06
        let color = '#46506a'
        if (connected) {
          alpha = 0.5
          color = na.cluster === byId.get(e.b)!.cluster
            ? P.current.clusters.find((c) => c.id === na.cluster)!.color
            : '#9fb0d0'
        } else if (active) {
          alpha *= 0.4
        }
        void nbrs
        ctx.strokeStyle = hexA(color.startsWith('#') ? color : '#46506a', alpha)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }

    function drawNodes(
      t: number,
      hi: Set<string>,
      sel: string | null,
      hov: string | null,
      nbrs: Set<string> | undefined,
      searchActive: boolean,
    ) {
      const clusterColor = new Map(P.current.clusters.map((c) => [c.id, c.color]))
      live.current.clear()
      const z = cam.current.zoom
      for (const n of P.current.placed) {
        const wp = nodePos(n, t)
        const s = toScreen(wp.x, wp.y)
        const r = n.r * Math.max(0.8, Math.min(z, 1.8))
        live.current.set(n.id, { x: s.x, y: s.y, r })
        if (s.x < -80 || s.x > W + 80 || s.y < -80 || s.y > H + 80) continue

        const color = clusterColor.get(n.cluster)!
        const isSel = sel === n.id
        const isHov = hov === n.id
        const isNbr = nbrs?.has(n.id)
        const isMatch = hi.has(n.id)

        let dim = 0.0
        if (searchActive && !isMatch) dim = 0.78
        else if ((sel || hov) && !isSel && !isHov && !isNbr) dim = 0.55

        const pulse = isSel || isHov || isMatch ? 1 + 0.12 * Math.sin(t * 4) : 1
        const rr = r * pulse

        // glow
        const glowA = (isSel || isHov || isMatch ? 0.55 : 0.28) * (1 - dim)
        const gr = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, rr * 3.4)
        gr.addColorStop(0, hexA(color, glowA))
        gr.addColorStop(1, hexA(color, 0))
        ctx.fillStyle = gr
        ctx.beginPath()
        ctx.arc(s.x, s.y, rr * 3.4, 0, Math.PI * 2)
        ctx.fill()

        // core
        ctx.beginPath()
        ctx.arc(s.x, s.y, rr, 0, Math.PI * 2)
        ctx.fillStyle = hexA(color, (isSel || isHov ? 1 : 0.9) * (1 - dim * 0.7))
        ctx.fill()
        // ring for experience/idea kinds
        if (n.kind === 'experience' || n.kind === 'idea') {
          ctx.lineWidth = 1.5
          ctx.strokeStyle = hexA('#0a0d16', 1)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(s.x, s.y, rr + 3, 0, Math.PI * 2)
          ctx.strokeStyle = hexA(color, (0.5) * (1 - dim))
          ctx.lineWidth = n.kind === 'idea' ? 1 : 1.5
          if (n.kind === 'idea') ctx.setLineDash([3, 3])
          ctx.stroke()
          ctx.setLineDash([])
        }

        // label
        const showLabel = isSel || isHov || isMatch || n.weight >= 1.1 || z > 1.25
        if (showLabel) {
          const fs = n.weight >= 1.2 ? 13 : 12
          ctx.font = `${isSel || isHov ? '600' : '500'} ${fs}px Inter, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const label = n.label
          const tw = ctx.measureText(label).width
          const ly = s.y + rr + 13
          ctx.globalAlpha = 1 - dim
          ctx.fillStyle = 'rgba(5,6,10,0.65)'
          roundRect(s.x - tw / 2 - 6, ly - 9, tw + 12, 18, 5)
          ctx.fill()
          ctx.fillStyle = isSel || isHov ? '#eaf2ff' : 'rgba(210,222,245,0.9)'
          ctx.fillText(label, s.x, ly)
          ctx.globalAlpha = 1
        }
      }
    }

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }

    // ── interaction ──────────────────────────────────────────────────────────
    let dragging = false
    let moved = false
    let last = { x: 0, y: 0 }
    let downAt = { x: 0, y: 0 }

    const pick = (sx: number, sy: number): string | null => {
      let best: string | null = null
      let bestD = Infinity
      for (const [id, p] of live.current) {
        const d = Math.hypot(p.x - sx, p.y - sy)
        const hit = p.r + 10
        if (d < hit && d < bestD) {
          bestD = d
          best = id
        }
      }
      return best
    }

    const getXY = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onDown = (e: PointerEvent) => {
      dragging = true
      moved = false
      const p = getXY(e)
      last = p
      downAt = p
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      const p = getXY(e)
      if (dragging) {
        const dx = p.x - last.x
        const dy = p.y - last.y
        if (Math.abs(p.x - downAt.x) + Math.abs(p.y - downAt.y) > 4) moved = true
        cam.current.x -= dx / cam.current.zoom
        cam.current.y -= dy / cam.current.zoom
        cam.current.tx = cam.current.x
        cam.current.ty = cam.current.y
        last = p
        canvas.style.cursor = 'grabbing'
      } else {
        const id = pick(p.x, p.y)
        if (id !== hoverId.current) {
          hoverId.current = id
          P.current.onHover(id)
        }
        canvas.style.cursor = id ? 'pointer' : 'grab'
      }
    }
    const onUp = (e: PointerEvent) => {
      const p = getXY(e)
      if (dragging && !moved) {
        const id = pick(p.x, p.y)
        P.current.onSelect(id)
      }
      dragging = false
      canvas.style.cursor = 'grab'
      try { canvas.releasePointerCapture(e.pointerId) } catch { /* noop */ }
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const sx = e.clientX - rect.left
      const sy = e.clientY - rect.top
      const before = toWorld(sx, sy)
      const factor = Math.exp(-e.deltaY * 0.0014)
      const nz = Math.max(0.32, Math.min(3.2, cam.current.zoom * factor))
      cam.current.zoom = nz
      cam.current.tz = nz
      const after = toWorld(sx, sy)
      cam.current.x += before.x - after.x
      cam.current.y += before.y - after.y
      cam.current.tx = cam.current.x
      cam.current.ty = cam.current.y
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointerleave', onUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onUp)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />
}
