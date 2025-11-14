import React from 'react'
import './About.css'

function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Us</h2>
            <p className="about-description">
              We are a dedicated team of professionals committed to delivering exceptional 
              results for businesses of all sizes. With years of experience and a passion 
              for innovation, we help companies navigate challenges and achieve their goals.
            </p>
            <p className="about-description">
              Our approach is collaborative, transparent, and results-oriented. We believe 
              in building long-term partnerships with our clients, providing ongoing support 
              and adapting our strategies to meet evolving business needs.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Happy Clients</p>
              </div>
              <div className="stat">
                <h3 className="stat-number">10+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
              <div className="stat">
                <h3 className="stat-number">50+</h3>
                <p className="stat-label">Team Members</p>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="visual-card card-1">
              <div className="card-content">
                <h4>Innovation</h4>
                <p>Cutting-edge solutions</p>
              </div>
            </div>
            <div className="visual-card card-2">
              <div className="card-content">
                <h4>Excellence</h4>
                <p>Quality-driven approach</p>
              </div>
            </div>
            <div className="visual-card card-3">
              <div className="card-content">
                <h4>Partnership</h4>
                <p>Collaborative success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

