import { motion } from 'framer-motion'
import { profile } from '../data/profile'

interface Props {
  onExplore: () => void
  onResume: () => void
}

export default function Intro({ onExplore, onResume }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 px-5 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 16, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 220, damping: 26 }}
        className="glass w-full max-w-xl rounded-2xl p-7 text-center shadow-2xl sm:p-9"
      >
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
          Latent space
        </div>
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-base text-slate-300">{profile.title}</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
          You&rsquo;re looking at a map of how I think. Every project, skill and chapter of
          my work is a point — related things sit close together. <br className="hidden sm:block" />
          Drag to pan, scroll to zoom, click a point, or search to fly to a region.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={onExplore}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 sm:w-auto"
          >
            Explore the map →
          </button>
          <button
            onClick={onResume}
            className="w-full rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 sm:w-auto"
          >
            Resume mode (TL;DR)
          </button>
        </div>
        <p className="mt-5 font-mono text-[11px] text-slate-500">
          Best on desktop · works on mobile · ~30 seconds either way
        </p>
      </motion.div>
    </motion.div>
  )
}
