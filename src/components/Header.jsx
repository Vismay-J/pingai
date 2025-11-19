import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Header.css'

function Header({ isMenuOpen, setIsMenuOpen }) {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
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
    const hash = window.location.hash.slice(1)
    
    if (['terms', 'privacy', 'cookies'].includes(hash)) {
      window.location.hash = ''
      window.scrollTo(0, 0)
      setTimeout(() => {
        const element = document.querySelector(anchor)
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      const element = document.querySelector(anchor)
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home') }} aria-label="Ping home">
              <motion.span 
                className="logo-bubble"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="logo-text">Ping</span>
              </motion.span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="nav desktop-nav">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <motion.a 
              href="#waitlist" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#waitlist') }}
              className="btn btn-primary nav-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist
            </motion.a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Nav Overlay */}
          <div className={`nav mobile-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#waitlist" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#waitlist') }}
              className="btn btn-primary nav-cta"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
