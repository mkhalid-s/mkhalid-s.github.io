import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the name, statement and key sections', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Khalid Shaikh.' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /insurance platforms/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Projects$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Experience$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /^Applied AI$/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /github/i }).length).toBeGreaterThan(0)
  })

  it('has an accessible theme toggle', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /dark mode|light mode/i })).toBeInTheDocument()
  })

  it('opens a footnote from a deep-link hash', () => {
    window.location.hash = '#exp-guidewire'
    render(<App />)
    // the hero term should be in its expanded (active) state
    expect(screen.getByRole('button', { name: 'insurance platforms' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    window.location.hash = ''
  })

  it('restores section deep links after React mounts', async () => {
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView)
    scrollIntoView.mockClear()
    window.location.hash = '#ai'
    render(<App />)
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
    window.location.hash = ''
  })

  it('shows evidence for the featured open-source project by default', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /APX/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /v0\.4\.0 release/i })).toHaveAttribute(
      'href',
      'https://github.com/mkhalid-s/ai-proxy-stack/releases/tag/v0.4.0',
    )
  })

  it('shows current public projects and verified upstream contributions', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /auth-scrape/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /SIR Saathi/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Headroom' })).toBeInTheDocument()
    expect(
      screen.getByText(/2 merged PRs · 37 tests · 98% extension coverage/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /OAuth2 extension · PR #784/i })).toHaveAttribute(
      'href',
      'https://github.com/headroomlabs-ai/headroom/pull/784',
    )
  })

  it('opens the applied AI explanation from the hero', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'applied AI' }))
    expect(screen.getByRole('region', { name: /Applied AI — details/i })).toBeInTheDocument()
  })

  it('backs the AI positioning with public, measurable case studies', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'OSS Bug Hunter' })).toBeInTheDocument()
    expect(screen.getByText(/5 languages · 18 MCP tools · 322 tests/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'QueryfyAI' })).toBeInTheDocument()
    expect(
      screen.getByText(/19 databases · 15\+ LLM providers · 53 test files/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Personal Assistant OS' })).toBeInTheDocument()
    expect(screen.getByText(/25 test modules · passing CI/i)).toBeInTheDocument()
  })

  it('routes contact through LinkedIn without publishing an email address', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('link', { name: /Let’s connect/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/mkhalidshaikh',
    )
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument()
  })
})
