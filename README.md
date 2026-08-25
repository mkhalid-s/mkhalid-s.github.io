# Khalid Shaikh — personal site

[![Deploy to GitHub Pages](https://github.com/mkhalid-s/mkhalid-s.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/mkhalid-s/mkhalid-s.github.io/actions/workflows/deploy.yml)

A compact public index of work: insurance platforms, cloud migrations, and
local-first open-source tools.

**[View the live site](https://mkhalid-s.github.io)**

## What the site includes

- Selected open-source projects and upstream contributions.
- An experience timeline with roles, approximate tenure, and tech stacks — without cities or calendar dates.
- Responsive light and dark themes with reduced-motion support.

The public site is not a résumé. A full CV is not hosted here.

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Vitest and Testing Library
- GitHub Pages and GitHub Actions

Fonts are self-hosted through Fontsource. The production build preloads the hero
font files.

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
src/data/profile.ts       Profile, experience, and project content
src/App.tsx               Page composition and interactions
src/index.css             Theme tokens, transitions, and global styles
public/                   Favicon, sitemap, and crawler files
.github/workflows/        Test, build, and GitHub Pages deployment
```

Most content updates only require editing
[`src/data/profile.ts`](src/data/profile.ts). The hero statement and section order
live in [`src/App.tsx`](src/App.tsx); document metadata lives in
[`index.html`](index.html).

## Deployment

Every pull request runs linting, formatting checks, tests, and a production build.
Merges to `main` deploy the generated `dist/` directory to GitHub Pages.
