import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (mkhalid-s.github.io) serves from root, so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
