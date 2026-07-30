import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  it('leads with a clear value proposition and primary calls to action', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /Dependable systems\.\s*Thoughtful AI\./i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View selected work/i })).toHaveAttribute(
      'href',
      '#work',
    )
    expect(screen.getAllByRole('link', { name: /Download résumé/i })[0]).toHaveAttribute(
      'href',
      'Khalid_Shaikh_CV.pdf',
    )
    expect(screen.getByText(/Khalid Shaikh · Senior software engineer/i)).toBeInTheDocument()
  })

  it('renders selected work ahead of the experience timeline', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'APX' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'FrameFuseVid' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Guidewire Software' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /v0\.4\.0 release/i })).toHaveAttribute(
      'href',
      'https://github.com/mkhalid-s/ai-proxy-stack/releases/tag/v0.4.0',
    )
  })

  it('surfaces employer and upstream open-source links', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Guidewire' })).toHaveAttribute(
      'href',
      'https://www.guidewire.com',
    )
    expect(screen.getByRole('heading', { name: 'Headroom' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /OAuth2 extension/i })).toHaveAttribute(
      'href',
      'https://github.com/headroomlabs-ai/headroom/pull/784',
    )
  })

  it('has an accessible, persistent theme toggle', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(document.querySelector('#theme-color')).toHaveAttribute('content', '#17181b')
  })

  it('opens and closes the mobile navigation menu', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(toggle)
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const workLinks = screen.getAllByRole('link', { name: 'Work' })
    fireEvent.click(workLinks[workLinks.length - 1])
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
  })

  it('scrolls to a desktop navigation section and updates the URL hash', () => {
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView)
    render(<App />)
    fireEvent.click(screen.getAllByRole('link', { name: 'Work' })[0])
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    expect(window.location.hash).toBe('#work')
    window.history.replaceState(null, '', '/')
  })

  it('restores a section deep link after the application mounts', () => {
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView)
    scrollIntoView.mockClear()
    window.history.replaceState(null, '', '#experience')
    render(<App />)
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' })
    window.history.replaceState(null, '', '/')
  })

  it('closes the mobile navigation with Escape and returns focus to its trigger', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(toggle)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('backs the AI positioning with public case studies', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'OSS Bug Hunter' })).toBeInTheDocument()
    expect(screen.getByText(/5 languages · 18 MCP tools · 322 tests/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'QueryfyAI' })).toBeInTheDocument()
  })

  it('routes contact through LinkedIn without publishing an email address', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('link', { name: /Connect on LinkedIn/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/mkhalidshaikh',
    )
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument()
  })
})
