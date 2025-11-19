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
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                     <circle cx="12" cy="12" r="12" fill="#E44E3A"/>
                     {/* Outer ring - 8 person-like shapes (simple arcs) */}
                     <g fill="#FFFFFF">
                       {/* Top */}
                       <ellipse cx="12" cy="5" rx="2" ry="3" opacity="0.9"/>
                       {/* Top-right */}
                       <ellipse cx="17.5" cy="7.5" rx="2" ry="3" opacity="0.9" transform="rotate(45 17.5 7.5)"/>
                       {/* Right */}
                       <ellipse cx="19" cy="12" rx="3" ry="2" opacity="0.9"/>
                       {/* Bottom-right */}
                       <ellipse cx="17.5" cy="16.5" rx="2" ry="3" opacity="0.9" transform="rotate(-45 17.5 16.5)"/>
                       {/* Bottom */}
                       <ellipse cx="12" cy="19" rx="2" ry="3" opacity="0.9"/>
                       {/* Bottom-left */}
                       <ellipse cx="6.5" cy="16.5" rx="2" ry="3" opacity="0.9" transform="rotate(45 6.5 16.5)"/>
                       {/* Left */}
                       <ellipse cx="5" cy="12" rx="3" ry="2" opacity="0.9"/>
                       {/* Top-left */}
                       <ellipse cx="6.5" cy="7.5" rx="2" ry="3" opacity="0.9" transform="rotate(-45 6.5 7.5)"/>
                     </g>
                     {/* Inner ring - 8 dots */}
                     <g fill="#FFFFFF">
                       <circle cx="12" cy="5" r="1.2" opacity="0.9"/>
                       <circle cx="19" cy="12" r="1.2" opacity="0.9"/>
                       <circle cx="12" cy="19" r="1.2" opacity="0.9"/>
                       <circle cx="5" cy="12" r="1.2" opacity="0.9"/>
                       <circle cx="16.66" cy="7.34" r="1.2" opacity="0.9"/>
                       <circle cx="16.66" cy="16.66" r="1.2" opacity="0.9"/>
                       <circle cx="7.34" cy="16.66" r="1.2" opacity="0.9"/>
                       <circle cx="7.34" cy="7.34" r="1.2" opacity="0.9"/>
                     </g>
                   </svg>
                   Canvas
                </span>
                <span className="lms-item blackboard">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                     {/* Golden frame */}
                     <rect x="1" y="1" width="22" height="22" rx="2" fill="#D4AF37" stroke="#B8941F" strokeWidth="0.5"/>
                     {/* Blackboard surface */}
                     <rect x="2.5" y="2.5" width="19" height="19" rx="1.5" fill="#1A1A1A"/>
                     {/* Bb text */}
                     <text x="12" y="15" fontFamily="Georgia, serif" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">Bb</text>
                     {/* Dashed line */}
                     <line x1="5" y1="17" x2="19" y2="17" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.6"/>
                   </svg>
                   Blackboard
                </span>
                <span className="lms-item brightspace">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                     <circle cx="12" cy="12" r="12" fill="#FF8C00"/>
                     {/* Stylized rounded B */}
                     <path d="M8.5 6.5C8.5 6.2 8.7 6 9 6H11.5C12.3 6 13 6.7 13 7.5C13 8.1 12.6 8.6 12.2 8.8C12.6 9 13 9.4 13 9.8C13 10.6 12.3 11.3 11.5 11.3H9V16.5H8.5V6.5ZM9 7.5V9H11.5C11.8 9 12 8.8 12 8.5C12 8.2 11.8 8 11.5 8H9V7.5ZM9 10H11.5C11.8 10 12 9.8 12 9.5C12 9.2 11.8 9 11.5 9H9V10Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
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
