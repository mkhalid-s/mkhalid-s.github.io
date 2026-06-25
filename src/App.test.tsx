import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the name, statement and key sections', () => {
    render(<App />)
    expect(screen.getAllByText(/Khalid Shaikh/i).length).toBeGreaterThan(0)
    expect(
      screen.getAllByRole('button', { name: /Guidewire cloud platform/i }).length,
    ).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /^Now$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Projects$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Experience$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /AI engineering/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Skills$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Contact$/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /github/i }).length).toBeGreaterThan(0)
  })

  it('shows the hero status pill and current toolkit', () => {
    render(<App />)
    expect(screen.getByText(/Open to interesting conversations/i)).toBeInTheDocument()
    expect(screen.getByText(/^Toolkit$/i)).toBeInTheDocument()
    // LangChain appears in toolkit + skills, so just assert presence
    expect(screen.getAllByText('LangChain').length).toBeGreaterThan(0)
  })

  it('shows project status and stack chips', () => {
    render(<App />)
    expect(screen.getAllByText(/Open source/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/In progress/i).length).toBeGreaterThan(0)
    expect(screen.getByText('FFmpeg')).toBeInTheDocument()
  })

  it('has an accessible theme toggle', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /dark mode|light mode/i })).toBeInTheDocument()
  })

  it('opens a footnote from a deep-link hash', () => {
    window.location.hash = '#exp-guidewire'
    render(<App />)
    expect(screen.getByRole('button', { name: 'Guidewire cloud platform' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    window.location.hash = ''
  })

  it('renders the colophon and last-updated date in the footer', () => {
    render(<App />)
    expect(screen.getByText(/Fraunces · Inter · JetBrains Mono/i)).toBeInTheDocument()
    // "Updated <Month> YYYY" — appears in the Now panel and the footer
    expect(screen.getAllByText(/Updated /i).length).toBeGreaterThan(0)
  })
})
