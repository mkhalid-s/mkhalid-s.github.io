import type { GraphNode } from '../lib/types'

// Hero-term footnote panel. Shown beneath the statement when a term is active.
export default function Footnote({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  return (
    <div
      id={`fn-${node.id}`}
      role="region"
      aria-label={`${node.label} — details`}
      className="relative rounded-xl border border-ink/10 bg-paper2/60 p-5 backdrop-blur-sm sm:p-6"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 font-mono text-[12px] text-muted transition hover:text-ink"
        aria-label="Close details"
      >
        ✕
      </button>
      {node.meta && <p className="mb-1 font-mono text-[12px] text-muted">{node.meta}</p>}
      <p className="max-w-xl text-[15px] leading-relaxed text-ink/85 sm:text-base">
        {node.summary}
      </p>
      {node.links && (
        <div className="mt-4 flex gap-4">
          {node.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[13px] text-accent underline-offset-4 hover:underline"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
