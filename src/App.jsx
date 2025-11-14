/**
 * Ping - SMS-first assistant for college students, clubs, TAs, and departments
 * 
 * To customize:
 * - Brand colors: Edit CSS variables in src/index.css (:root)
 * - Copy/content: Edit individual component files in src/components/
 * - Analytics: Update src/utils/analytics.js with your tracking service
 * - Demo form webhook: Update fetch URL in src/components/DemoForm.jsx
 */

import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Impact from './components/Impact'
import ValueTeam from './components/ValueTeam'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import DemoForm from './components/DemoForm'
import Footer from './components/Footer'
import Terms from './components/Terms'
import Privacy from './components/Privacy'
import CookiePolicy from './components/CookiePolicy'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home'
      if (hash === 'terms' || hash === 'privacy' || hash === 'cookies') {
        setCurrentPage(hash)
      } else {
        setCurrentPage('home')
      }
    }

    // Check initial hash
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'terms':
        return <Terms />
      case 'privacy':
        return <Privacy />
      case 'cookies':
        return <CookiePolicy />
      default:
        return (
          <>
            <Hero />
            <Features />
            <HowItWorks />
            <Impact />
            <ValueTeam />
            <Pricing />
            <FAQ />
            <DemoForm />
          </>
        )
    }
  }

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App
