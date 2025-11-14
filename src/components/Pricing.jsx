import React from 'react'
import { trackCTAClick } from '../utils/analytics'
import './Pricing.css'

function Pricing() {
  const handleCTAClick = (packageName) => {
    trackCTAClick(`pricing_${packageName}`)
  }

  const subscriptionPlans = [
    {
      name: 'Monthly Plan',
      icon: '📅',
      price: '$8',
      period: '/month',
      billing: 'Billed monthly',
      features: [
        'Unlimited SMS notifications',
        'Calendar sync (Google, Outlook)',
        'LMS integration (Canvas, Brightspace)',
        'Daily digest messages',
        'Event reminders & alerts',
        'RSVP management',
        'Priority support'
      ],
      idealFor: 'Students and professionals who want flexible monthly access',
      popular: true,
      socialProof: 'Most popular choice'
    },
    {
      name: 'Yearly Plan',
      icon: '💎',
      price: '$72',
      period: '/year',
      originalPrice: '$96',
      savings: 'Save $24 (25% off)',
      billing: 'Billed annually',
      features: [
        'Everything in Monthly Plan',
        '2 months free (vs monthly)',
        'Priority feature requests',
        'Early access to new features',
        'Dedicated account support'
      ],
      idealFor: 'Long-term users who want the best value',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <h2 className="section-title">Pricing</h2>
        <p className="pricing-subtitle">
          Simple, transparent pricing. Cancel anytime.
        </p>
        <div className="pricing-grid subscription-grid">
          {subscriptionPlans.map((plan, index) => (
            <div key={index} className={`pricing-card subscription-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              {plan.savings && (
                <div className="savings-badge">{plan.savings}</div>
              )}
              <div className="plan-icon">{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-amount">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
              {plan.originalPrice && (
                <div className="original-price">
                  <span className="original-price-label">Regular price:</span>
                  <span className="original-price-value">{plan.originalPrice}/year</span>
                </div>
              )}
              <div className="billing-info">
                {plan.billing}
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              <div className="ideal-for">
                ✓ Ideal for: {plan.idealFor}
              </div>
              {plan.socialProof && (
                <div className="social-proof">{plan.socialProof}</div>
              )}
              <a
                href="#waitlist"
                className="btn btn-primary"
                onClick={() => handleCTAClick(plan.name.toLowerCase().replace(/\s+/g, '-'))}
              >
                Get Started →
              </a>
            </div>
          ))}
        </div>
        <p className="pricing-footer-note">
          All plans include a 14-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  )
}

export default Pricing
