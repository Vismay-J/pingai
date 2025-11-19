import React, { useState } from 'react'
import { trackFAQToggle } from '../utils/analytics'
import './FAQ.css'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      id: '1',
      question: 'How does Ping keep my calendar accurate?',
      answer: 'We sync assignments and updates from Canvas/Brightspace into Google Calendar (and Notion). When dates or rooms change, you get an instant text and your calendar updates.'
    },
    {
      id: '2',
      question: 'How do I get notified about changes?',
      answer: 'When there are changes in your class LMS, you get a text or a user update. Ping automatically syncs updates and sends you instant notifications.'
    },
    {
      id: '3',
      question: 'Do I need to install an app?',
      answer: 'No. Ping runs over SMS, the one place students already check.'
    },
    {
      id: '4',
      question: 'Who is Ping for?',
      answer: 'Students, TAs, and departments that want fewer misses and higher engagement without more apps.'
    }
  ]

  const handleToggle = (index, questionId) => {
    setOpenIndex(openIndex === index ? null : index)
    trackFAQToggle(questionId)
  }

  return (
    <section id="faq" className="faq section">
      <div className="container">
        <h2 className="section-title">FAQ</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'open' : ''}`}
                onClick={() => handleToggle(index, faq.id)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className={`faq-answer ${openIndex === index ? 'open' : ''}`}
                aria-hidden={openIndex !== index}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ


