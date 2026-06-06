import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the name, statement and key sections', () => {
    render(<App />)
    expect(screen.getAllByText(/Khalid Shaikh/i).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: /headroom/i }).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /Selected work/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /github/i }).length).toBeGreaterThan(0)
  })

  it('has an accessible theme toggle', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /dark mode|light mode/i })).toBeInTheDocument()
  })
})
