import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Preload the hero (Fraunces) fonts so the LCP text doesn't wait on the CSS to
// discover them. Injects <link rel="preload"> for the hashed latin woff2 files.
function preloadHeroFonts(): Plugin {
  return {
    name: 'preload-hero-fonts',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html
      const fonts = Object.keys(ctx.bundle).filter((f) =>
        /fraunces-latin-opsz-(normal|italic)-[^.]+\.woff2$/.test(f),
      )
      return {
        html,
        tags: fonts.map((f) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: '/' + f,
            crossorigin: '',
          },
          injectTo: 'head' as const,
        })),
      }
    },
  }
}

// User site (mkhalid-s.github.io) serves from root, so base is '/'.
export default defineConfig({
  plugins: [react(), preloadHeroFonts()],
  base: '/',
})
