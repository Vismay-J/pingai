// Google Analytics 4 Event Tracking
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window === 'undefined') return
  
  // Ensure dataLayer exists (GA4 uses this)
  window.dataLayer = window.dataLayer || []
  
  // Push to dataLayer (this is the reliable way for GA4)
  const eventData = {
    event: eventName,
    ...properties
  }
  
  window.dataLayer.push(eventData)
  
  // Also use gtag if available (for immediate execution)
  if (window.gtag && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, properties)
    } catch (e) {
      console.warn('gtag error:', e)
    }
  }
  
  // Always log for debugging (helps verify events are firing)
  console.log('📊 GA4 Event:', eventName, properties)
  console.log('📊 dataLayer length:', window.dataLayer.length)
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

// Pricing-specific tracking - tracks exact plan selected
export const trackPricingClick = (pricingModel, planName, planPrice) => {
  // Clean plan name for better tracking
  const cleanPlanName = planName.toLowerCase().replace(/\s+/g, '_')
  
  // Extract numeric value from price
  const numericPrice = parseFloat(planPrice.replace(/[^0-9.]/g, '')) || 0
  
  trackEvent('pricing_button_click', {
    pricing_model: pricingModel, // 'credits' or 'subscription'
    plan_name: planName, // Full name: "Monthly Plan", "Yearly Plan", "Starter Pack", etc.
    plan_id: cleanPlanName, // Clean ID: "monthly_plan", "yearly_plan", "starter_pack", etc.
    plan_price: planPrice,
    value: numericPrice, // Numeric value for GA4
    currency: 'USD'
  })
  
  // Also track as a separate event with plan-specific name for easier filtering
  // This creates events like: plan_click_monthly_plan, plan_click_yearly_plan, etc.
  trackEvent(`plan_click_${cleanPlanName}`, {
    pricing_model: pricingModel,
    plan_name: planName,
    plan_price: planPrice,
    value: numericPrice,
    currency: 'USD'
  })
}

// Waitlist submission tracking
export const trackWaitlistSubmit = (pricingModel, hasPhone, hasName, selectedPlan = null) => {
  const eventData = {
    pricing_model: pricingModel, // 'credits' or 'subscription'
    phone_provided: hasPhone,
    name_provided: hasName
  }
  
  // Add selected plan if available (which specific plan they clicked)
  if (selectedPlan) {
    eventData.selected_plan = selectedPlan
    eventData.plan_id = selectedPlan.toLowerCase().replace(/\s+/g, '_')
  }
  
  trackEvent('waitlist_submit', eventData)
}


