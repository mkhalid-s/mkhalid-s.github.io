# Khalid Shaikh — personal site

[![Deploy to GitHub Pages](https://github.com/mkhalid-s/mkhalid-s.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/mkhalid-s/mkhalid-s.github.io/actions/workflows/deploy.yml)

A compact portfolio about building dependable insurance platforms, applied AI
systems, and open-source developer tools. It is designed around a simple idea:
**do more with less**.

**[View the live site](https://mkhalid-s.github.io)**

## What the site includes

- A concise professional narrative backed by measurable experience and project evidence.
- Deep-linkable, keyboard-accessible explanations for the main positioning statement.
- Selected projects, upstream open-source work, applied AI case studies, and core skills.
- Responsive light and dark themes with reduced-motion support.
- Search and social metadata, structured `Person` data, a sitemap, and an Open Graph image.

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Vitest and Testing Library
- GitHub Pages and GitHub Actions

Fonts are self-hosted through Fontsource. The production build preloads the hero
font files and uses Framer Motion's smaller `domAnimation` feature bundle.

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Before opening a pull request, run the same checks used in CI:

```bash
npm run lint
npm run format:check
npm test
npm run build
```

## Project structure

```text
src/data/profile.ts       Profile, experience, projects, and skills
src/App.tsx               Page composition and interactions
src/components/           Reusable motion and statement components
src/index.css             Theme tokens, transitions, and global styles
public/                   Resume, social image, sitemap, and crawler files
.github/workflows/        Test, build, and GitHub Pages deployment
```

Most content updates only require editing
[`src/data/profile.ts`](src/data/profile.ts). The hero statement and section order
live in [`src/App.tsx`](src/App.tsx); document metadata lives in
[`index.html`](index.html).

## Deployment

Every pull request runs linting, formatting checks, tests, and a production build.
Merges to `main` deploy the generated `dist/` directory to GitHub Pages.
