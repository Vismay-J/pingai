import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackCTAClick } from '../utils/analytics'
import './Hero.css'

function Hero() {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // Reset
        setAnimationStep(0)
        await new Promise(r => setTimeout(r, 1000))
        
        // Step 1: User message
        setAnimationStep(1)
        await new Promise(r => setTimeout(r, 1500))
        
        // Step 2: Typing
        setAnimationStep(2)
        await new Promise(r => setTimeout(r, 1500))
        
        // Step 3: Ping reply
        setAnimationStep(3)
        await new Promise(r => setTimeout(r, 4000))
      }
    }
    sequence()
  }, [])

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
              <div className="phone-content chat-interface">
                <div className="chat-header">
                  <div className="chat-contact">
                    <div className="contact-avatar">P</div>
                    <div className="contact-info">
                      <div className="contact-name">Ping</div>
                      <div className="contact-status">iMessage</div>
                    </div>
                  </div>
                </div>
                
                <div className="chat-messages">
                  <AnimatePresence mode="wait">
                    {animationStep >= 1 && (
                      <motion.div 
                        className="chat-bubble user"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        Book a meeting with John at 2PM tomorrow
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {animationStep === 2 && (
                      <motion.div 
                        className="chat-bubble ping typing"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {animationStep >= 3 && (
                      <motion.div 
                        className="chat-bubble ping"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        Confirmed. I've added "Meeting with John" to your calendar for tomorrow at 2:00 PM.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="chat-input-area">
                  <div className="chat-input-placeholder">iMessage</div>
                  <div className="chat-send-btn">↑</div>
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
