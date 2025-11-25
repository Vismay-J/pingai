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

  const handlePricingClick = (planName, planPrice, type, credits = null, pricePerCredit = null) => {
    console.log('🔘 Pricing button clicked:', { type, planName, planPrice, credits, pricePerCredit })
    trackPricingClick(type, planName, planPrice)
    trackCTAClick(`pricing_${type}_${planName.toLowerCase().replace(/\s+/g, '-')}`)
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pricing_model', type)
      sessionStorage.setItem('selected_plan', planName)
      sessionStorage.setItem('selected_plan_price', planPrice)
      if (credits) {
        sessionStorage.setItem('selected_credits', credits.toString())
        sessionStorage.setItem('price_per_credit', pricePerCredit)
      }
    }
  }

  const creditPackages = [
    {
      name: 'Starter Pack',
      price: '$4',
      credits: 20,
      pricePerCredit: '$0.20',
      description: 'Perfect for trying out Ping and occasional scheduling needs',
      features: [
        '20 credits included',
        'Credits never expire',
        'All core features',
        'Great for testing'
      ],
      popular: false
    },
    {
      name: 'Value Pack',
      price: '$8',
      credits: 60,
      pricePerCredit: '$0.13',
      description: 'Best for regular users who schedule a few times per week',
      features: [
        '60 credits included',
        '33% savings vs Starter',
        'Credits never expire',
        'All core features'
      ],
      popular: true
    },
    {
      name: 'Power Pack',
      price: '$15',
      credits: 150,
      pricePerCredit: '$0.10',
      description: 'Ideal for frequent users who schedule daily or manage multiple calendars',
      features: [
        '150 credits included',
        '50% savings vs Starter',
        'Credits never expire',
        'All core features'
      ],
      popular: false
    }
  ]

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
        {billingType === 'subscription' ? (
          <div className="pricing-simple-grid">
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
          </div>
        ) : (
          <div className="pricing-credits-grid">
            {creditPackages.map((pkg, index) => (
              <motion.div 
                key={index}
                className={`pricing-card-simple ${pkg.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {pkg.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <div className="plan-header">
                  <h3 className="plan-name">{pkg.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">{pkg.price}</span>
                    <span className="price-period">one-time</span>
                  </div>
                </div>
                <div className="credit-info">
                  <span className="total-credits">{pkg.credits} credits</span>
                  <span className="per-credit">{pkg.pricePerCredit}/credit</span>
                </div>
                <p className="plan-description">
                  {pkg.description}
                </p>
                <ul className="plan-features-simple">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`btn ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handlePricingClick(pkg.name, pkg.price, 'credits', pkg.credits, pkg.pricePerCredit)}
                >
                  Join Waitlist
                </a>
              </motion.div>
            ))}
          </div>
        )}

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
