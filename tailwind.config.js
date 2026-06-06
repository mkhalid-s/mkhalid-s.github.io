/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#f4f1ea',
        paper2: '#ece7dc',
        ink: '#171410',
        muted: '#6f6657',
        accent: '#2540ff',
        accent2: '#ff5a2c',
      },
    },
  },
  plugins: [],
}
