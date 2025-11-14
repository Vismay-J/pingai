// Google Analytics 4 Event Tracking
export const trackEvent = (eventName, properties = {}) => {
  // Check if gtag is available (Google Analytics loaded)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
  
  // Also log in development
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', eventName, properties)
  }
}

// Convenience functions for common events
export const trackCTAClick = (location, additionalProps = {}) => {
  trackEvent('cta_click', { location, ...additionalProps })
}

export const trackFormSubmit = (formType, additionalProps = {}) => {
  trackEvent('form_submit', { formType, ...additionalProps })
}

export const trackFAQToggle = (questionId) => {
  trackEvent('faq_toggle', { questionId })
}

// Pricing-specific tracking
export const trackPricingClick = (pricingModel, planName, planPrice) => {
  trackEvent('pricing_button_click', {
    pricing_model: pricingModel, // 'credits' or 'subscription'
    plan_name: planName,
    plan_price: planPrice,
    event_category: 'pricing',
    event_label: `${pricingModel}_${planName}`
  })
}

// Waitlist submission tracking
export const trackWaitlistSubmit = (pricingModel, hasPhone, hasName) => {
  trackEvent('waitlist_submit', {
    pricing_model: pricingModel, // 'credits' or 'subscription'
    phone_provided: hasPhone,
    name_provided: hasName,
    event_category: 'conversion',
    event_label: `waitlist_${pricingModel}`
  })
}


