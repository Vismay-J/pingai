import React from 'react'
import { trackCTAClick } from '../utils/analytics'
import './Hero.css'

function Hero() {
  const handleCTAClick = (type) => {
    trackCTAClick(`hero_${type}`)
  }

  const handleScroll = (e, anchor) => {
    e.preventDefault()
    const element = document.querySelector(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="social-proof">
              <div className="proof-quote">"One message a day. No app fatigue."</div>
              <div className="proof-quote">"Saved me 30–45 minutes this week."</div>
              <div className="proof-quote">"Our no-shows dropped 18%."</div>
            </div>
            
            <h1 className="hero-title">
              The one text that keeps your plan accurate.
            </h1>
            
            <p className="hero-description">
              Ping syncs your LMS to your calendar and turns updates into quick actions—RSVP, book, "leave now"—right from SMS. No new app to manage.
            </p>
            
            <div className="hero-buttons">
              <a 
                href="#waitlist" 
                className="btn btn-primary"
                onClick={(e) => {
                  handleCTAClick('primary')
                  handleScroll(e, '#waitlist')
                }}
              >
                Join the waitlist →
              </a>
              <a 
                href="#how" 
                className="btn btn-secondary"
                onClick={(e) => {
                  handleCTAClick('secondary')
                  handleScroll(e, '#how')
                }}
              >
                See how it works →
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mock">
              <div className="phone-header">
                <div className="phone-notch"></div>
              </div>
              <div className="phone-content">
                <div className="phone-message phone-digest">
                  <div className="message-time">8:00 AM</div>
                  <div className="message-bubble digest-bubble">
                    <div className="message-label">8AM Digest</div>
                    <div className="message-text">
                      <strong>Today:</strong><br />
                      • CS101 Lecture @ 10am<br />
                      • Math Quiz due @ 5pm<br />
                      • Club meeting @ 7pm
                    </div>
                  </div>
                </div>
                <div className="phone-message phone-alert">
                  <div className="message-time">10:12 AM</div>
                  <div className="message-bubble alert-bubble">
                    <div className="message-label">Room changed</div>
                    <div className="message-text">
                      <strong>CS101 moved to Room 205</strong><br />
                      Leave in 12 min to make it on time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
