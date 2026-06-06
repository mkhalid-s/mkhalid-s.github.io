import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the name, statement and key sections', () => {
    render(<App />)
    expect(screen.getAllByText(/Khalid Shaikh/i).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: /headroom/i }).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /Selected projects/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Experience$/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /github/i }).length).toBeGreaterThan(0)
  })

  it('has an accessible theme toggle', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /dark mode|light mode/i })).toBeInTheDocument()
  })

  it('opens a footnote from a deep-link hash', () => {
    window.location.hash = '#proj-headroom'
    render(<App />)
    expect(screen.getByText(/Compress tool outputs/i)).toBeInTheDocument()
    window.location.hash = ''
  })
})
