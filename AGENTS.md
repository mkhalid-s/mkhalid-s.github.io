# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static front-end: an interactive personal portfolio built
with React + TypeScript + Vite (Tailwind, Framer Motion). There is no backend,
database, or external service — everything runs client-side.

### Services

There is one "service": the Vite dev server.

- Dev server: `npm run dev` (serves on http://localhost:5173, not auto-exposed to
  the network; pass `--host` if external access is needed).
- Standard scripts live in `package.json`: `lint`, `format:check`, `test`
  (Vitest), `build` (`tsc && vite build`), `preview`.

The CI pipeline (`.github/workflows/deploy.yml`) runs, in order:
`npm run lint`, `npm run format:check`, `npm test`, `npm run build`. Match this
sequence before considering a change complete.

### Notes / gotchas

- Node 22 (preinstalled) works fine; CI pins Node 20.
- Tests use `jsdom` (configured in `vitest.config.ts`); no browser needed for
  `npm test`.
- The core interaction is in `src/App.tsx` / `src/components/Statement.tsx`:
  bold "terms" in the hero sentence open deep-linkable footnotes (URL hash like
  `#exp-guidewire`). All content lives in `src/data/profile.ts`.
