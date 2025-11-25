import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { trackPricingClick, trackCTAClick, trackEvent } from '../utils/analytics'
import './Pricing.css'

function Pricing() {
  const [billingType, setBillingType] = useState('subscription')

  // Store pricing model in sessionStorage when component mounts or billing type changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pricing_model', billingType)
    }
  }, [billingType])

  // Track initial pricing section view (only once on mount)
  useEffect(() => {
    trackEvent('pricing_section_view', {
      pricing_model: billingType,
      default_model: 'subscription'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  const handleToggle = (newType) => {
    if (newType !== billingType) {
      // Track toggle event
      trackEvent('pricing_toggle', {
        from_model: billingType,
        to_model: newType,
        pricing_model: newType
      })
      
      setBillingType(newType)
      
      // Store in sessionStorage immediately
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pricing_model', newType)
      }
    }
  }

  const handlePricingClick = (planName, planPrice, type) => {
    console.log('🔘 Pricing button clicked:', { type, planName, planPrice })
    trackPricingClick(type, planName, planPrice)
    trackCTAClick(`pricing_${type}_${planName.toLowerCase().replace(/\s+/g, '-')}`)
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pricing_model', type)
      sessionStorage.setItem('selected_plan', planName)
      sessionStorage.setItem('selected_plan_price', planPrice)
    }
  }

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple Pricing
        </motion.h2>
        <motion.p 
          className="pricing-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Choose what works for you. Same features, different billing.
        </motion.p>

        {/* Toggle Switch */}
        <motion.div 
          className="billing-toggle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <button 
            className={`toggle-btn ${billingType === 'subscription' ? 'active' : ''}`}
            onClick={() => handleToggle('subscription')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-btn ${billingType === 'credits' ? 'active' : ''}`}
            onClick={() => handleToggle('credits')}
          >
            Pay As You Go
          </button>
        </motion.div>

        {/* Pricing Cards */}
        <div className="pricing-simple-grid">
          {billingType === 'subscription' ? (
            <motion.div 
              className="pricing-card-simple featured"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="plan-header">
                <h3 className="plan-name">Unlimited</h3>
                <div className="plan-price">
                  <span className="price-amount">$8</span>
                  <span className="price-period">/month</span>
                </div>
              </div>
              <p className="plan-description">
                Unlimited scheduling, syncing, and reminders. No limits, no surprises.
              </p>
              <ul className="plan-features-simple">
                <li>Unlimited AI scheduling</li>
                <li>Real-time LMS sync</li>
                <li>Daily digest & alerts</li>
                <li>Cancel anytime</li>
              </ul>
              <a
                href="#waitlist"
                className="btn btn-primary"
                onClick={() => handlePricingClick('Monthly Unlimited', '$8', 'subscription')}
              >
                Join Waitlist
              </a>
            </motion.div>
          ) : (
            <motion.div 
              className="pricing-card-simple"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="plan-header">
                <h3 className="plan-name">Credits</h3>
                <div className="plan-price">
                  <span className="price-amount">$0.10</span>
                  <span className="price-period">/action</span>
                </div>
              </div>
              <p className="plan-description">
                Pay only for what you use. Each action (schedule, sync, reminder) costs 1 credit.
              </p>
              <ul className="plan-features-simple">
                <li>Buy credits as needed</li>
                <li>Credits never expire</li>
                <li>Same features as unlimited</li>
                <li>Start with 10 free credits</li>
              </ul>
              <a
                href="#waitlist"
                className="btn btn-primary"
                onClick={() => handlePricingClick('Pay As You Go', '$0.10/action', 'credits')}
              >
                Join Waitlist
              </a>
            </motion.div>
          )}
        </div>

        <motion.p 
          className="pricing-footer-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          🎁 All new users get 10 free credits to try Ping
        </motion.p>
      </div>
    </section>
  )
}

export default Pricing
