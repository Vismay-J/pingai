import React, { useEffect, useRef, useState } from 'react'
import './Features.css'

function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

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

  return (
    <section id="features" className="features section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Features</h2>
        <div className={`features-grid ${isVisible ? 'visible' : ''}`}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features


