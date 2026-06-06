import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom lacks IntersectionObserver, which framer-motion's whileInView uses.
if (!('IntersectionObserver' in window)) {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
    root = null
    rootMargin = ''
    thresholds = []
  }
  // @ts-expect-error minimal mock for tests
  window.IntersectionObserver = IO
  // @ts-expect-error minimal mock for tests
  global.IntersectionObserver = IO
}

// jsdom lacks matchMedia; framer-motion / theme logic may probe it.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}
