import React from 'react'
import { motion } from 'framer-motion'
import './Features.css'

function Features() {
  const features = [
    {
      icon: '📅',
      title: 'Live LMS → Calendar Sync',
      description: 'Ingest assignments and updates from Canvas and Brightspace; keep Google Calendar and Notion in sync—color-coded by class, always current.'
    },
    {
      icon: '📬',
      title: '8AM Digest + Change Alerts',
      description: 'One short text with what matters today, plus instant pings for room/time changes and smart "leave now" nudges.'
    },
    {
      icon: '💬',
      title: 'SMS Actions',
      description: 'Reply to RSVP Y/N, "book #2", "status" for headcount and open roles, or start office-hours queues (JOIN, position, next-up)—all by text.'
    },
    {
      icon: '📋',
      title: 'Personal Planning Sheets',
      description: 'Upload your personal planning sheets to sync up to your personalization. Keep your custom schedules and preferences in perfect alignment.'
    }
  ]

  const handleMouseMove = (e) => {
    const cards = document.getElementsByClassName('feature-card')
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  return (
    <section id="features" className="features section" onMouseMove={handleMouseMove}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Features
        </motion.h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
