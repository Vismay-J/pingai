import React from 'react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  const handleScroll = (e, anchor) => {
    e.preventDefault()
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
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Ping</h3>
            <p className="footer-description">
              SMS-first assistant for college students, clubs, TAs, and departments.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#features" onClick={(e) => handleScroll(e, '#features')}>Features</a></li>
              <li><a href="#how" onClick={(e) => handleScroll(e, '#how')}>How It Works</a></li>
              <li><a href="#pricing" onClick={(e) => handleScroll(e, '#pricing')}>Pricing</a></li>
              <li><a href="#faq" onClick={(e) => handleScroll(e, '#faq')}>FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); window.location.hash = 'terms'; window.scrollTo(0, 0); }}>Terms of Service</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); window.location.hash = 'privacy'; window.scrollTo(0, 0); }}>Privacy Policy</a></li>
              <li><a href="#cookies" onClick={(e) => { e.preventDefault(); window.location.hash = 'cookies'; window.scrollTo(0, 0); }}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Ping. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
