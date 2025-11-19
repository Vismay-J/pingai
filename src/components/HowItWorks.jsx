import React from 'react'
import './HowItWorks.css'

function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Connect',
      description: 'Link Canvas/Brightspace and Google Calendar. We auto-sync your classes and deadlines.'
    },
    {
      number: '2',
      title: 'Get one daily text',
      description: 'At 8AM, Ping sends "what matters today". When there are changes in your class LMS, you get a text or a user update.'
    },
    {
      number: '3',
      title: 'Act by reply',
      description: 'Book slots, RSVP, check status, confirm shifts—no app juggling.'
    }
  ]

  return (
    <section id="how" className="how section">
      <div className="container">
        <h2 className="section-title">How it works</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks


