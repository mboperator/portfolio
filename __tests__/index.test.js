import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LandingPage from '../src/app/page'

beforeEach(() => {
  render(<LandingPage />)
})

describe('Home', () => {
  it('should render the hero section', () => {
    const heroHeading = screen.getByRole("heading", { name: "marcus bernales"})
    expect(heroHeading).toBeInTheDocument()
  })

  describe('Portfolio Section', () => {
    it('should render ila lantern', () => {
      const item = screen.getByRole("heading", { name: "ila lantern"})
      expect(item).toBeInTheDocument()
    })
    it('should render redeemer\'s community', () => {
      const item = screen.getByRole("heading", { name: "redeemer's community"})
      expect(item).toBeInTheDocument()
    })
    it('should render odyssey journal', () => {
      const item = screen.getByRole("heading", { name: "odyssey journal"})
      expect(item).toBeInTheDocument()
    })
    it('should render prequalification', () => {
      const item = screen.getByRole("heading", { name: "prequalification"})
      expect(item).toBeInTheDocument()
    })
    it('should render bid management', () => {
      const item = screen.getByRole("heading", { name: "bid management"})
      expect(item).toBeInTheDocument()
    })
  })

  it('should render a link to email me', () => {
    const emailLink = screen.getByRole("link")
    expect(emailLink).toBeInTheDocument()
    expect(emailLink.href).toBe('mailto:hello@marcusbernal.es')
  })
})
