import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { trackPricingClick, trackCTAClick } from '../utils/analytics'
import { storePricingModel, getStoredPricingModel } from '../utils/pricingModel'
import './Pricing.css'

function Pricing() {
  const [selectedModel, setSelectedModel] = useState(null) // null, 'credits', or 'subscription'

  // Store pricing model when component mounts
  useEffect(() => {
    setTimeout(() => {
      const model = storePricingModel()
      console.log('💰 Pricing model detected:', model)
    }, 100)
  }, [])

  const handlePricingClick = (planName, planPrice, modelType) => {
    console.log('🔘 Pricing button clicked:', { modelType, planName, planPrice })
    trackPricingClick(modelType, planName, planPrice)
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selected_plan', planName)
      sessionStorage.setItem('selected_plan_price', planPrice)
      sessionStorage.setItem('selected_pricing_model', modelType)
    }
  }

  const handleCTAClick = (packageName) => {
    trackCTAClick(`pricing_${packageName}`)
  }

  // Average usage metrics (based on typical user behavior)
  const usageMetrics = {
    light: { creditsPerDay: 1, creditsPerMonth: 30, description: 'Light users (1-2 scheduling actions/day)' },
    moderate: { creditsPerDay: 3, creditsPerMonth: 90, description: 'Moderate users (3-5 scheduling actions/day)' },
    heavy: { creditsPerDay: 6, creditsPerMonth: 180, description: 'Heavy users (6+ scheduling actions/day)' }
  }

  // Calculate cost comparison
  const calculateCreditCost = (creditsPerMonth) => {
    // Best credit package for given usage
    if (creditsPerMonth <= 20) return { package: 'Starter Pack', cost: 4, credits: 20, months: 1 }
    if (creditsPerMonth <= 60) return { package: 'Smart Saver Pack', cost: 8, credits: 60, months: 1 }
    if (creditsPerMonth <= 150) return { package: 'Power Pack', cost: 15, credits: 150, months: 1 }
    // For 300 credits, use Semester Pack
    if (creditsPerMonth <= 300) return { package: 'Semester Pack', cost: 25, credits: 300, months: 1 }
    // For higher usage, calculate based on best per-credit rate
    const semesterPacks = Math.ceil(creditsPerMonth / 300)
    return { package: 'Semester Pack', cost: 25 * semesterPacks, credits: 300 * semesterPacks, months: semesterPacks }
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

  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Choose Your Plan
        </motion.h2>
        <motion.p 
          className="pricing-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Pick the pricing model that works best for your usage
        </motion.p>

        {/* Comparison Metrics Section */}
        <motion.div 
          className="pricing-comparison"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="comparison-title">Which model is right for you?</h3>
          <div className="comparison-metrics">
            {Object.entries(usageMetrics).map(([key, metric]) => {
              const creditCost = calculateCreditCost(metric.creditsPerMonth)
              const monthlyCreditCost = creditCost.cost / creditCost.months
              const subscriptionMonthly = 8
              const subscriptionYearly = 72 / 12 // $6/month
              
              return (
                <div key={key} className="metric-card">
                  <div className="metric-header">
                    <h4>{metric.description}</h4>
                    <div className="metric-usage">
                      <span className="metric-value">{metric.creditsPerDay}</span>
                      <span className="metric-label">credits/day</span>
                      <span className="metric-separator">•</span>
                      <span className="metric-value">{metric.creditsPerMonth}</span>
                      <span className="metric-label">credits/month</span>
                    </div>
                  </div>
                  <div className="metric-comparison">
                    <div className="comparison-option">
                      <div className="option-label">Credits</div>
                      <div className="option-cost">${monthlyCreditCost.toFixed(2)}/month*</div>
                      <div className="option-package">{creditCost.package}</div>
                    </div>
                    <div className="comparison-vs">vs</div>
                    <div className="comparison-option">
                      <div className="option-label">Subscription</div>
                      <div className="option-cost">${subscriptionMonthly}/month</div>
                      <div className="option-savings">or ${subscriptionYearly}/month yearly</div>
                    </div>
                  </div>
                  <div className="metric-recommendation">
                    {monthlyCreditCost < subscriptionMonthly ? (
                      <span className="recommend-badge credits">💡 Credits save ${(subscriptionMonthly - monthlyCreditCost).toFixed(2)}/month</span>
                    ) : (
                      <span className="recommend-badge subscription">💡 Subscription is better value</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="comparison-note">
            * Credit costs calculated based on best package for your usage. Credits never expire.
          </p>
        </motion.div>

        {/* Two-Column Layout for Both Models */}
        <div className="pricing-models-container">
          {/* Credits Model */}
          <motion.div 
            className="pricing-model-section"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="model-header">
              <h3 className="model-title">Pay-as-You-Go (Credits)</h3>
              <p className="model-description">Perfect if you use Ping occasionally or want to pay only for what you use</p>
            </div>
            <div className="pricing-grid credits-grid">
              {creditPackages.map((plan, index) => (
                <motion.div 
                  key={index} 
                  className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
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
                    <span className="total-credits">{plan.credits} credits</span>
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
                      handlePricingClick(plan.name, plan.price, 'credits')
                      handleCTAClick(plan.name.toLowerCase().replace(/\s+/g, '-'))
                    }}
                  >
                    Get Started →
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Subscription Model */}
          <motion.div 
            className="pricing-model-section"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="model-header">
              <h3 className="model-title">Unlimited Subscription</h3>
              <p className="model-description">Best for regular users who want unlimited access and predictable monthly costs</p>
            </div>
            <div className="pricing-grid subscription-grid">
              {subscriptionPlans.map((plan, index) => (
                <motion.div 
                  key={index} 
                  className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="popular-badge">Most Popular</div>
                  )}
                  <div className="plan-icon">{plan.icon}</div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">{plan.period}</span>
                    {plan.originalPrice && (
                      <>
                        <span className="original-price">{plan.originalPrice}</span>
                        {plan.savings && (
                          <span className="savings-badge">{plan.savings}</span>
                        )}
                      </>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="monthly-equivalent">
                      ${(parseFloat(plan.price.replace('$', '')) / 12).toFixed(0)}/month
                    </div>
                  )}
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
                      handlePricingClick(plan.name, plan.price, 'subscription')
                      handleCTAClick(plan.name.toLowerCase().replace(/\s+/g, '-'))
                    }}
                  >
                    Get Started →
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <p className="pricing-footer-note">
          All new users get 10 free credits to try Ping. No credit card required.
        </p>
      </div>
    </section>
  )
}

export default Pricing
