import React from 'react'
import './Services.css'

function Services() {
  const services = [
    {
      icon: '🚀',
      title: 'Strategic Planning',
      description: 'Comprehensive business strategies tailored to your goals and market positioning.'
    },
    {
      icon: '💼',
      title: 'Consulting Services',
      description: 'Expert advice and insights to help you make informed business decisions.'
    },
    {
      icon: '📈',
      title: 'Growth Marketing',
      description: 'Data-driven marketing strategies to expand your reach and increase revenue.'
    },
    {
      icon: '🎯',
      title: 'Solution Development',
      description: 'Custom solutions designed to solve your unique business challenges.'
    },
    {
      icon: '🤝',
      title: 'Partnership Building',
      description: 'Connect with the right partners to accelerate your business growth.'
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Streamline operations and improve efficiency across all business functions.'
    }
  ]

  return (
    <section id="services" className="services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We offer a comprehensive range of services designed to help your business succeed
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

