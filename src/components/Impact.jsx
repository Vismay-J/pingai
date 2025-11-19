import React, { useEffect, useRef, useState } from 'react'
import './Impact.css'

function Impact() {
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

  const metrics = [
    {
      value: '25–30%',
      label: 'time saved per student each week by eliminating manual updates'
    },
    {
      value: '+15–20%',
      label: 'higher engagement rate using Y/N + auto-nudges'
    }
  ]

  return (
    <section id="impact" className="impact section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Impact</h2>
        <div className={`impact-grid ${isVisible ? 'visible' : ''}`}>
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="impact-tile"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="impact-value">{metric.value}</div>
              <p className="impact-label">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Impact


