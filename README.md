# Khalid Shaikh — Latent Space

An interactive **latent-space** portfolio. Instead of a scrolling page, my work is a
navigable map: every project, skill and chapter of my career is a point, and related
things sit close together — like a 2-D embedding projection of how I think.

🔗 **Live:** https://mkhalid-s.github.io

## The idea

I build tools that *do more with less* — most recently
[`headroom`](https://github.com/mkhalid-s/headroom), which compresses LLM context by
60–95%. This site turns that idea into the UX:

- **Explore the map** — drag to pan, scroll to zoom, click any point for detail.
- **Embed a query** — the search bar acts like semantic search over my work; type
  *"cheaper ai"* or *"java cloud"* and the camera flies to the matching region.
- **Resume mode** — a clean, recruiter-friendly TL;DR with a CV download, one tap away.

## Tech

Hand-built Canvas 2D rendering engine (no game/3D framework), React + TypeScript,
Tailwind, Framer Motion, Vite. Deployed to GitHub Pages via Actions.

```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
```

All content lives in [`src/data/profile.ts`](src/data/profile.ts) — editing it reshapes
the map.
