import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { trackPricingClick, trackCTAClick } from '../utils/analytics'
import { storePricingModel, getStoredPricingModel } from '../utils/pricingModel'
import './Pricing.css'

function Pricing() {
  // Detect and store pricing model when component mounts
  useEffect(() => {
    setTimeout(() => {
      const model = storePricingModel()
      console.log('💰 Pricing model detected:', model)
    }, 100)
  }, [])

  const handlePricingClick = (planName, planPrice) => {
    const pricingModel = getStoredPricingModel()
    console.log('🔘 Pricing button clicked:', { pricingModel, planName, planPrice })
    trackPricingClick(pricingModel, planName, planPrice)
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selected_plan', planName)
      sessionStorage.setItem('selected_plan_price', planPrice)
    }
  }

  const handleCTAClick = (packageName) => {
    trackCTAClick(`pricing_${packageName}`)
  }

  const creditPackages = [
    {
      name: 'Starter Pack',
      icon: '🍀',
      price: '$4',
      period: 'one-time',
      pricePerCredit: '$0.200',
      credits: 20,
      features: ['Basic AI scheduling'],
      idealFor: 'First-time users trying Ping',
      popular: false
    },
    {
      name: 'Smart Saver Pack',
      icon: '⚡',
      price: '$8',
      period: 'one-time',
      pricePerCredit: '$0.130',
      credits: 60,
      features: ['1 Bonus Smart Schedule'],
      idealFor: 'Regular students or professionals',
      popular: true,
      socialProof: 'Trusted by 1,200 students and creators.'
    },
    {
      name: 'Power Pack',
      icon: '🚀',
      price: '$15',
      period: 'one-time',
      pricePerCredit: '$0.100',
      credits: 150,
      features: [
        'Auto-Sync Pro (automatically updates your schedule when deadlines shift)',
        'Priority AI (faster, more responsive scheduling)'
      ],
      idealFor: 'Power users or startup teams',
      popular: false
    },
    {
      name: 'Semester Pack',
      icon: '🎓',
      price: '$25',
      period: 'one-time',
      pricePerCredit: '$0.083',
      credits: 300,
      features: [
        'Team Share (up to 3 users share the same credit wallet)',
        'All Power Pack perks'
      ],
      idealFor: 'Students or professionals planning for an entire semester or quarter',
      popular: false
    },
    {
      name: 'Unlimited Month Plan',
      icon: '∞',
      price: '$15',
      period: '/month',
      pricePerCredit: 'Unlimited',
      credits: null,
      creditsLabel: 'for 1 month',
      features: [
        'All features',
        'Credit rollover if renewed'
      ],
      idealFor: 'Professionals or teams who want predictable monthly access',
      popular: false
    }
  ]

  const subscriptionPlans = [
    {
      name: 'Monthly',
      icon: '📅',
      price: '$8',
      period: '/month',
      originalPrice: null,
      savings: null,
      features: [
        'Unlimited AI scheduling',
        'Real-time LMS sync',
        'Priority support',
        'Cancel anytime'
      ],
      idealFor: 'Flexible usage',
      popular: false
    },
    {
      name: 'Yearly',
      icon: '💎',
      price: '$72',
      period: '/year',
      originalPrice: '$96',
      savings: 'Save 25%',
      features: [
        'Everything in Monthly',
        '2 months free',
        'Early access to new features',
        'Priority support'
      ],
      idealFor: 'Best value',
      popular: true,
      socialProof: 'Most students choose this.'
    }
  ]

  // Determine which plans to show based on the current branch/test
  // This logic relies on the CSS class or DOM structure to detect the model in the utility
  // For rendering, we'll check if we are in the subscription branch context
  // Since we are editing the code directly, we can just render the credit packages for main
  // and subscription for the other branch. 
  // However, to keep it clean for the user's request, I will render the credit packages by default
  // as this is the main branch code. The subscription branch will have its own version.
  
  const plans = creditPackages

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Pricing
        </motion.h2>
        <motion.p 
          className="pricing-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Each credit saves you ~20% of manual scheduling time.
        </motion.p>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <div className="plan-icon">{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-amount">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
              <div className="credit-info">
                <span className="per-credit">{plan.pricePerCredit} per credit</span>
                {plan.credits ? (
                  <span className="total-credits">{plan.credits} credits</span>
                ) : (
                  <span className="total-credits">{plan.creditsLabel}</span>
                )}
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className="ideal-for">
                Ideal for: {plan.idealFor}
              </div>
              {plan.socialProof && (
                <div className="social-proof">{plan.socialProof}</div>
              )}
              <a
                href="#waitlist"
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
                onClick={() => {
                  handlePricingClick(plan.name, plan.price)
                  handleCTAClick(plan.name.toLowerCase().replace(/\s+/g, '-'))
                }}
              >
                Get Started →
              </a>
            </motion.div>
          ))}
        </div>
        <p className="pricing-footer-note">
          Offer 10 free credits to all new users to create a low-friction entry point.
        </p>
      </div>
    </section>
  )
}

export default Pricing
