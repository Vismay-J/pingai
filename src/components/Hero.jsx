import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackCTAClick } from '../utils/analytics'
import './Hero.css'

function Hero() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [step, setStep] = useState(0)

  const scenarios = [
    {
      messages: [
        { type: 'user', text: 'Book a meeting with John at 2PM tomorrow' },
        { type: 'ping', text: 'Confirmed. I\'ve added "Meeting with John" to your calendar for tomorrow at 2:00 PM.' }
      ]
    },
    {
      messages: [
        { type: 'user', text: 'delete econ study tomorrow 5pm' },
        { type: 'ping', text: 'Deleted "ECON study" tomorrow 5–6pm' }
      ]
    },
    {
      messages: [
        { type: 'user', text: 'status' },
        { type: 'ping', text: 'You\'ve got 2 events today, 1 due item (MATH201 HW 11:59pm). Next free 45-min window: 2:15–3:00.' }
      ]
    },
    {
      messages: [
        { type: 'user', text: 'can we push chem lab to later in the day' },
        { type: 'ping', text: 'I can move "CHEM110 Lab." Which option?\nA) Fri 3–4pm\nB) Fri 4–5pm\nC) Keep as is' },
        { type: 'user', text: 'b' },
        { type: 'ping', text: 'Moved to Fri 4–5pm' }
      ]
    },
    {
      messages: [
        { type: 'user', text: 'find 30m Thu or Fri after 1pm' },
        { type: 'ping', text: 'I found 3 open slots:\nThu 1:30–2:00\nThu 3:00–3:30\nFri 4:30–5:00\nReply "book #2" or "more."' },
        { type: 'user', text: 'book #2' },
        { type: 'ping', text: 'Booked Thu 3:00–3:30 "Focus time." Invite anyone?' }
      ]
    }
  ]

  useEffect(() => {
    let isMounted = true
    
    const runSequence = async () => {
      while (isMounted) {
        const currentScenario = scenarios[scenarioIndex]
        
        // Reset step
        setStep(0)
        await new Promise(r => setTimeout(r, 1000))
        if (!isMounted) break

        // Iterate through messages in the current scenario
        for (let i = 0; i < currentScenario.messages.length; i++) {
          // Show user message (odd steps: 1, 3, 5...)
          setStep(prev => prev + 1) 
          await new Promise(r => setTimeout(r, 1000))
          if (!isMounted) break

          // Show typing indicator (even steps: 2, 4, 6...)
          setStep(prev => prev + 1)
          await new Promise(r => setTimeout(r, 1500))
          if (!isMounted) break

          // Show ping message (next odd step)
          // Actually, my step logic is:
          // 0: Empty
          // 1: Msg 1 (User)
          // 2: Typing
          // 3: Msg 2 (Ping)
          // 4: Msg 3 (User)
          // 5: Typing
          // 6: Msg 4 (Ping)
          
          // Wait for reading time
          await new Promise(r => setTimeout(r, 2000))
          if (!isMounted) break
        }

        // Wait before next scenario
        await new Promise(r => setTimeout(r, 2000))
        if (!isMounted) break

        // Move to next scenario
        setScenarioIndex(prev => (prev + 1) % scenarios.length)
      }
    }

    runSequence()
    return () => { isMounted = false }
  }, [scenarioIndex]) // Re-run when scenarioIndex changes to start fresh sequence logic

  // Helper to render messages based on current step
  const renderMessages = () => {
    const currentScenario = scenarios[scenarioIndex]
    const messages = []
    
    // Logic to determine which messages to show based on 'step'
    // Step 0: None
    // Step 1: Msg 0
    // Step 2: Msg 0 + Typing
    // Step 3: Msg 0 + Msg 1
    // Step 4: Msg 0 + Msg 1 + Msg 2
    // Step 5: Msg 0 + Msg 1 + Msg 2 + Typing
    // Step 6: Msg 0 + Msg 1 + Msg 2 + Msg 3
    
    // Mapping step to message index
    // 1 -> show index 0
    // 2 -> show index 0, typing
    // 3 -> show index 0, 1
    // 4 -> show index 0, 1, 2
    // 5 -> show index 0, 1, 2, typing
    // 6 -> show index 0, 1, 2, 3
    
    const msgCount = currentScenario.messages.length
    
    // Calculate how many messages to show
    // If step is 1, show 1 msg (index 0)
    // If step is 2, show 1 msg (index 0) + typing
    // If step is 3, show 2 msgs (index 0, 1)
    // If step is 4, show 3 msgs (index 0, 1, 2)
    // If step is 5, show 3 msgs (index 0, 1, 2) + typing
    // If step is 6, show 4 msgs (index 0, 1, 2, 3)
    
    // General formula:
    // Messages to show = ceil(step / 1.5) ? No, that's complicated.
    // Let's just loop.
    
    // We need to know if we are in a "typing" state.
    // Typing happens after a user message, before a ping message.
    // In my scenarios, it's always User -> Ping -> User -> Ping.
    // So typing happens before index 1, 3, 5...
    
    // Let's simplify the state. Instead of a complex step number, let's just track "visibleMessagesCount" and "isTyping".
    // But I used a single 'step' in the useEffect. Let's stick to that and decode it.
    
    // Step 1: Show Msg 0
    // Step 2: Show Msg 0 + Typing
    // Step 3: Show Msg 0 + Msg 1
    // Step 4: Show Msg 0 + Msg 1 + Msg 2
    // Step 5: Show Msg 0 + Msg 1 + Msg 2 + Typing
    // Step 6: Show Msg 0 + Msg 1 + Msg 2 + Msg 3
    
    let visibleCount = 0
    let showTyping = false
    
    if (step === 0) {
      visibleCount = 0
    } else if (step === 1) {
      visibleCount = 1
    } else if (step === 2) {
      visibleCount = 1
      showTyping = true
    } else if (step === 3) {
      visibleCount = 2
    } else if (step === 4) {
      visibleCount = 3
    } else if (step === 5) {
      visibleCount = 3
      showTyping = true
    } else if (step === 6) {
      visibleCount = 4
    }
    
    // Render visible messages
    for (let i = 0; i < visibleCount; i++) {
      if (i < currentScenario.messages.length) {
        const msg = currentScenario.messages[i]
        messages.push(
          <motion.div 
            key={`msg-${i}`}
            className={`chat-bubble ${msg.type}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {msg.text.split('\n').map((line, l) => (
              <React.Fragment key={l}>
                {line}
                {l < msg.text.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.div>
        )
      }
    }
    
    // Render typing indicator
    if (showTyping) {
      messages.push(
        <motion.div 
          key="typing"
          className="chat-bubble ping typing"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </motion.div>
      )
    }
    
    return messages
  }

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
                  <AnimatePresence mode="popLayout">
                    {renderMessages()}
                  </AnimatePresence>
                </div>
                
                <div className="chat-input-area">
                  <div className="chat-input-placeholder">iMessage</div>
                  <div className={`chat-send-btn ${step % 2 !== 0 ? 'active' : ''}`}>↑</div>
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
