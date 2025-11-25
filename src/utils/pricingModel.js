// Utility to detect which pricing model is active (for analytics tracking)
// With the simplified pricing model, we primarily rely on sessionStorage

export const getPricingModel = () => {
  // First check sessionStorage (most reliable with new simplified model)
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('pricing_model')
    if (stored && (stored === 'subscription' || stored === 'credits')) {
      return stored
    }
  }
  
  // Fallback: Check DOM for active toggle button
  const pricingSection = document.querySelector('#pricing')
  if (pricingSection) {
    const activeToggle = pricingSection.querySelector('.toggle-btn.active')
    if (activeToggle) {
      const text = activeToggle.textContent.toLowerCase()
      if (text.includes('monthly')) {
        return 'subscription'
      }
      if (text.includes('pay as you go') || text.includes('credits')) {
        return 'credits'
      }
    }
    
    // Check for featured card (subscription is featured)
    const featuredCard = pricingSection.querySelector('.pricing-card-simple.featured')
    if (featuredCard) {
      return 'subscription'
    }
  }
  
  // Default to subscription (since it's the default state)
  return 'subscription'
}

// Store pricing model in sessionStorage when pricing section is viewed
export const storePricingModel = () => {
  if (typeof window !== 'undefined') {
    const model = getPricingModel()
    sessionStorage.setItem('pricing_model', model)
    return model
  }
  return 'unknown'
}

// Get stored pricing model (from sessionStorage)
export const getStoredPricingModel = () => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('pricing_model')
    if (stored && (stored === 'subscription' || stored === 'credits')) {
      return stored
    }
    // If not found, try to detect from DOM
    return getPricingModel()
  }
  return 'unknown'
}

