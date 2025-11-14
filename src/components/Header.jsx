import React, { useState, useEffect } from 'react'
import './Header.css'

function Header({ isMenuOpen, setIsMenuOpen }) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'how', 'impact', 'pricing', 'faq', 'waitlist']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (anchor) => {
    setIsMenuOpen(false)
    // If on a legal page, go back to home first
    const hash = window.location.hash.slice(1)
    if (hash === 'terms' || hash === 'privacy' || hash === 'cookies') {
      window.location.hash = ''
      window.scrollTo(0, 0)
      setTimeout(() => {
        const element = document.querySelector(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home') }} aria-label="Ping home">
              <span className="logo-bubble">
                <span className="logo-text">Ping</span>
              </span>
            </a>
          </div>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a 
              href="#features" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#features') }}
              className={activeSection === 'features' ? 'active' : ''}
            >
              Features
            </a>
            <a 
              href="#how" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#how') }}
              className={activeSection === 'how' ? 'active' : ''}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#pricing') }}
              className={activeSection === 'pricing' ? 'active' : ''}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#faq') }}
              className={activeSection === 'faq' ? 'active' : ''}
            >
              FAQ
            </a>
            <a 
              href="#waitlist" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#waitlist') }}
              className="btn btn-primary nav-cta"
            >
              Join Waitlist
            </a>
          </nav>
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
