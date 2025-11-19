import React from 'react'
import { motion } from 'framer-motion'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-text">
            <motion.div className="social-proof" variants={itemVariants}>
              <div className="proof-quote">"One message a day. No app fatigue."</div>
              <div className="proof-quote">"Saved me 25% of my planning time."</div>
            </motion.div>
            
            <motion.h1 className="hero-title" variants={itemVariants}>
              The one text that keeps your plan <span className="title-highlight">accurate</span>.
            </motion.h1>
            
            <motion.p className="hero-description" variants={itemVariants}>
              Ping syncs your LMS to your calendar and turns updates into quick actions—RSVP, book, "leave now"—right from SMS. No new app to manage.
            </motion.p>
            
            <motion.p className="hero-description hero-highlight" variants={itemVariants}>
              Turn quick texts into scheduled events and ready-to-send emails with one tap.
            </motion.p>
            
            <motion.div className="hero-buttons" variants={itemVariants}>
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
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="phone-mock">
              <div className="phone-header">
                <div className="phone-notch"></div>
              </div>
              <div className="phone-content">
                <div className="phone-overlay">
                  <div className="phone-message">
                    <div className="message-header">
                      <span>Ping • 8:00 AM</span>
                    </div>
                    <div className="message-body">
                      <strong>Today's Digest:</strong>
                      • CS101 Lecture @ 10am<br />
                      • Math Quiz due @ 5pm<br />
                      • Study group @ 7pm
                    </div>
                  </div>
                  
                  <div className="phone-message">
                    <div className="message-header">
                      <span style={{ color: '#ef4444' }}>Ping • 10:12 AM</span>
                    </div>
                    <div className="message-body">
                      <strong>⚠️ Room Change Alert</strong>
                      CS101 moved to Room 205.<br />
                      Leave in 12 min to make it on time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-video-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="video-section-title">See how Ping works</h3>
          <div className="video-container">
            <iframe
              className="demo-video"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Ping Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
