import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  it('leads with a short positioning line and a single work link', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Insurance platforms\.\s*Local-first tools\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /See work/i })).toHaveAttribute('href', '#work')
    expect(screen.queryByRole('link', { name: /résumé/i })).not.toBeInTheDocument()
    expect(screen.getByText(/Khalid Shaikh · Software Engineer/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Guidewire Cloud Platform and AI-powered InsuranceSuite/i),
    ).toBeInTheDocument()
    expect(screen.queryByText(/Bengaluru/i)).not.toBeInTheDocument()
  })

  it('renders selected work and does not pin a release tag', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('heading', { name: 'LeanRelay' })).toBeInTheDocument()
    expect(
      container.querySelector('a[href="https://github.com/mkhalid-s/lean-relay"]'),
    ).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'FrameFuseVid' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /v0\.4\.0 release/i })).not.toBeInTheDocument()
  })

  it('keeps a factual experience timeline with durations and stacks, not cities or calendar dates', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('heading', { name: 'Guidewire Software' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Capgemini India' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Reliance Jio' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'eGain Communications' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '3i Infotech' })).toBeInTheDocument()
    expect(screen.getAllByText('~5 years').length).toBeGreaterThan(0)
    expect(screen.getAllByText('~3 years').length).toBeGreaterThan(0)
    expect(screen.getAllByText('~1.5 years').length).toBeGreaterThan(0)
    expect(screen.getAllByText('<1 year').length).toBeGreaterThan(0)
    expect(screen.getAllByText('~2 years').length).toBeGreaterThan(0)
    expect(screen.getByRole('navigation', { name: /relative tenure/i })).toBeInTheDocument()
    expect(screen.getByText('InsuranceSuite')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Guidewire Cloud Platform migration' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Treasury management system' })).toBeInTheDocument()
    expect(
      screen.getAllByText(/12\+ years across insurance, consulting, telecom, and banking/i).length,
    ).toBeGreaterThan(0)
    expect(container.textContent).not.toMatch(/Bengaluru|Navi Mumbai|Pune/)
    expect(container.textContent).not.toMatch(/Oct 2021|Aug 2018|Feb 2017|Jun 2016|Mar 2014/)
  })

  it('surfaces employer and upstream open-source links', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Guidewire Software' })).toHaveAttribute(
      'href',
      'https://www.guidewire.com',
    )
    expect(screen.getByRole('heading', { name: 'Headroom' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'pxpipe' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /OAuth2 extension/i })).toHaveAttribute(
      'href',
      'https://github.com/headroomlabs-ai/headroom/pull/784',
    )
    expect(screen.getByRole('link', { name: /OAuth identity fix/i })).toHaveAttribute(
      'href',
      'https://github.com/teamchong/pxpipe/pull/99',
    )
  })

  it('has an accessible, persistent theme toggle', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(document.querySelector('#theme-color')).toHaveAttribute('content', '#12100e')
  })

  it('opens and closes the mobile navigation menu', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    expect(toggle).toHaveClass('mobile-only')
    fireEvent.click(toggle)
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const workLinks = screen.getAllByRole('link', { name: 'Work' })
    fireEvent.click(workLinks[workLinks.length - 1])
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument()
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
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('keeps desktop navigation separate from the mobile menu trigger', () => {
    render(<App />)
    expect(screen.getByRole('navigation', { name: /primary navigation/i })).toHaveClass(
      'desktop-only',
    )
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument()
  })

  it('lists applied-AI experiments in their own section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'OSS Bug Hunter' })).toBeInTheDocument()
    expect(screen.getByText(/5 languages · 18 MCP tools · 322 tests/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'QueryfyAI' })).toBeInTheDocument()
  })

  it('highlights a stack chip everywhere when it is selected', () => {
    render(<App />)
    const javaChips = screen.getAllByRole('button', { name: 'Java' })
    expect(javaChips.length).toBeGreaterThan(1)
    fireEvent.click(javaChips[0])
    javaChips.forEach((chip) => expect(chip).toHaveAttribute('aria-pressed', 'true'))
    fireEvent.click(javaChips[0])
    javaChips.forEach((chip) => expect(chip).toHaveAttribute('aria-pressed', 'false'))
  })

  it('jumps to work when the 1 key is pressed', () => {
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView)
    window.history.replaceState(null, '', '/')
    render(<App />)
    scrollIntoView.mockClear()
    fireEvent.keyDown(window, { key: '1' })
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    expect(window.location.hash).toBe('#work')
    window.history.replaceState(null, '', '/')
  })

  it('routes contact through footer social links without publishing an email or résumé', () => {
    const { container } = render(<App />)
    expect(
      screen
        .getByRole('contentinfo')
        .querySelector('a[href="https://www.linkedin.com/in/mkhalidshaikh"]'),
    ).toBeTruthy()
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument()
    expect(container.querySelector('a[href*="Khalid_Shaikh_CV"]')).not.toBeInTheDocument()
    expect(screen.queryByText(/Let’s work together/i)).not.toBeInTheDocument()
  })
})
