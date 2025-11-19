import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackCTAClick } from '../utils/analytics'
import './Hero.css'

function Hero() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef(null)

  const scenarios = [
    [
      { type: 'user', text: 'Book a meeting with John at 2PM tomorrow' },
      { type: 'ping', text: 'Confirmed. I\'ve added "Meeting with John" to your calendar for tomorrow at 2:00 PM.' }
    ],
    [
      { type: 'user', text: 'add "Math review" today 2:30–3:30' },
      { type: 'ping', text: 'That overlaps with "Study group" 2:30–3:30. Want me to move the existing event or the new one?' },
      { type: 'user', text: 'squeeze the new one in and move the existing down' },
      { type: 'ping', text: 'Done.\n• Math review set for 2:30–3:25 (5-min buffer)\n• Study group moved to 3:30–4:30\nNo other conflicts.' }
    ],
    [
      { type: 'user', text: 'delete econ study tomorrow 5pm' },
      { type: 'ping', text: 'Deleted "ECON study" tomorrow 5–6pm' }
    ],
    [
      { type: 'user', text: 'status' },
      { type: 'ping', text: 'You\'ve got 2 events today, 1 due item (MATH201 HW 11:59pm). Next free 45-min window: 2:15–3:00.' }
    ],
    [
      { type: 'user', text: 'can we push chem lab to later in the day' },
      { type: 'ping', text: 'I can move "CHEM110 Lab." Which option?\nA) Fri 3–4pm\nB) Fri 4–5pm\nC) Keep as is' },
      { type: 'user', text: 'b' },
      { type: 'ping', text: 'Moved to Fri 4–5pm' }
    ],
    [
      { type: 'user', text: 'find 30m Thu or Fri after 1pm' },
      { type: 'ping', text: 'I found 3 open slots:\nThu 1:30–2:00\nThu 3:00–3:30\nFri 4:30–5:00\nReply "book #2" or "more."' },
      { type: 'user', text: 'book #2' },
      { type: 'ping', text: 'Booked Thu 3:00–3:30 "Focus time." Invite anyone?' }
    ]
  ]

  useEffect(() => {
    let isMounted = true
    
    const runSequence = async () => {
      let scenarioIndex = 0
      
      while (isMounted) {
        // Clear messages at the start of each scenario
        setMessages([])
        await new Promise(r => setTimeout(r, 500))
        if (!isMounted) break

        const currentScenario = scenarios[scenarioIndex]
        
        // Iterate through messages in the current scenario
        for (let i = 0; i < currentScenario.length; i++) {
          const msg = currentScenario[i]
          
          // If it's a user message, show it immediately (simulating user hitting send)
          if (msg.type === 'user') {
            await new Promise(r => setTimeout(r, 1000)) // Pause before user "sends"
            if (!isMounted) break
            setMessages(prev => [...prev, msg])
          } 
          // If it's a ping message, show typing first
          else {
            await new Promise(r => setTimeout(r, 500)) // Small pause before typing starts
            if (!isMounted) break
            setIsTyping(true)
            
            // Scroll to bottom when typing starts
             if (chatContainerRef.current) {
                const scrollHeight = chatContainerRef.current.scrollHeight
                chatContainerRef.current.scrollTo({
                    top: scrollHeight,
                    behavior: 'smooth'
                })
            }
            
            await new Promise(r => setTimeout(r, 1500)) // Typing duration
            if (!isMounted) break
            setIsTyping(false)
            setMessages(prev => [...prev, msg])
          }

          // Scroll to bottom after message is added
          if (chatContainerRef.current) {
             // Use a slight delay to allow render
             setTimeout(() => {
                 if (chatContainerRef.current) {
                    const scrollHeight = chatContainerRef.current.scrollHeight
                    chatContainerRef.current.scrollTo({
                        top: scrollHeight,
                        behavior: 'smooth'
                    })
                 }
             }, 100)
          }
        }

        // Wait before next scenario
        await new Promise(r => setTimeout(r, 4000))
        if (!isMounted) break

        // Move to next scenario (looping)
        scenarioIndex = (scenarioIndex + 1) % scenarios.length
      }
    }

    runSequence()
    return () => { isMounted = false }
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
             <motion.div className="lms-logos" variants={itemVariants}>
              <span className="lms-label">Works with</span>
              <div className="lms-list">
                <span className="lms-item canvas">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                   Canvas
                </span>
                <span className="lms-item blackboard">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                   Blackboard
                </span>
                <span className="lms-item brightspace">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                   Brightspace
                </span>
              </div>
            </motion.div>

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
                
                <div className="chat-messages" ref={chatContainerRef}>
                  <AnimatePresence mode="wait">
                    {messages.map((msg, index) => (
                      <motion.div 
                        key={index}
                        className={`chat-bubble ${msg.type}`}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {msg.text.split('\n').map((line, l) => (
                          <React.Fragment key={l}>
                            {line}
                            {l < msg.text.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
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
                </div>
                
                <div className="chat-input-area">
                  <div className="chat-input-placeholder">iMessage</div>
                  <div className="chat-send-btn">↑</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
