import { motion } from 'framer-motion'
import { clusters, nodes, profile } from '../data/profile'
import type { GraphNode } from '../lib/types'

function group(kind: GraphNode['kind']) {
  return nodes.filter((n) => n.kind === kind)
}

interface Props {
  onClose: () => void
  onOpenNode: (id: string) => void
}

export default function ResumeMode({ onClose, onOpenNode }: Props) {
  const exp = group('experience')
  const projects = group('project')
  const skills = group('skill')
  const edu = group('education')
  const colorOf = (cl: string) => clusters.find((c) => c.id === cl)?.color ?? '#888'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="scroll-thin absolute inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{profile.name}</h1>
            <p className="mt-1 text-lg text-slate-300">{profile.title}</p>
            <p className="mt-0.5 font-mono text-xs text-slate-500">{profile.location}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
          >
            ← Back to map
          </button>
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-300">{profile.blurb}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={profile.cvHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-gradient-to-r from-cyan-400 to-violet-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            Download CV (PDF)
          </a>
          {profile.social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        <Section title="Experience">
          {exp.map((n) => (
            <button
              key={n.id}
              onClick={() => onOpenNode(n.id)}
              className="group block w-full rounded-xl border border-white/8 bg-white/[0.02] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{n.label}</h3>
                <span className="shrink-0 font-mono text-[11px] text-slate-500">
                  {n.meta?.split(' · ').slice(-1)[0]}
                </span>
              </div>
              {n.meta && <p className="font-mono text-xs text-slate-400">{n.meta}</p>}
              <p className="mt-1.5 text-sm text-slate-300">{n.summary}</p>
            </button>
          ))}
        </Section>

        <Section title="Selected projects">
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((n) => (
              <button
                key={n.id}
                onClick={() => onOpenNode(n.id)}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: colorOf(n.cluster) }} />
                  <h3 className="font-semibold text-white">{n.label}</h3>
                </div>
                <p className="mt-1.5 text-sm text-slate-300">{n.summary}</p>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((n) => (
              <span
                key={n.id}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200"
                style={{ boxShadow: `inset 0 0 0 1px ${colorOf(n.cluster)}22` }}
              >
                {n.label}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Education">
          {edu.map((n) => (
            <div key={n.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <h3 className="font-semibold text-white">{n.label}</h3>
              <p className="font-mono text-xs text-slate-400">{n.meta}</p>
            </div>
          ))}
        </Section>

        <footer className="mt-12 border-t border-white/10 pt-6 text-center font-mono text-[11px] text-slate-600">
          Built as an interactive latent-space map · {new Date().getFullYear()}
        </footer>
      </div>
    </motion.div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
