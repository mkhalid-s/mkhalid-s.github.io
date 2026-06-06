import { useEffect, useRef, useState } from 'react'

interface Props {
  matchCount: number | null
  onChange: (q: string) => void
}

export default function SearchBar({ matchCount, onChange }: Props) {
  const [q, setQ] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== ref.current) {
        e.preventDefault()
        ref.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === ref.current) {
        setQ('')
        onChange('')
        ref.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onChange])

  return (
    <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 shadow-2xl">
      <span className="text-cyan-300/70">⌕</span>
      <input
        ref={ref}
        value={q}
        onChange={(e) => {
          setQ(e.target.value)
          onChange(e.target.value)
        }}
        placeholder="Embed a query…  e.g. “cheaper ai”, “java cloud”"
        className="w-[15rem] bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none sm:w-[20rem]"
        spellCheck={false}
      />
      {q && (
        <span className="whitespace-nowrap font-mono text-[11px] text-slate-400">
          {matchCount} match{matchCount === 1 ? '' : 'es'}
        </span>
      )}
      {!q && <kbd className="hidden rounded border border-white/10 px-1.5 text-[10px] text-slate-500 sm:inline">/</kbd>}
    </div>
  )
}
