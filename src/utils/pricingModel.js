// Utility to detect which pricing model is active (for A/B testing tracking)
// This detects based on the pricing structure in the component

export const getPricingModel = () => {
  // Check if we're on subscription model by looking for subscription-specific elements
  // or we can use a more reliable method: check the pricing subtitle
  const pricingSection = document.querySelector('#pricing')
  if (!pricingSection) return 'unknown'
  
  const subtitle = pricingSection.querySelector('.pricing-subtitle')
  if (subtitle) {
    const text = subtitle.textContent.toLowerCase()
    if (text.includes('simple, transparent pricing') || text.includes('cancel anytime')) {
      return 'subscription'
    }
    if (text.includes('credit') || text.includes('saves you')) {
      return 'credits'
    }
  }
  
  // Fallback: check for subscription grid class
  const grid = pricingSection.querySelector('.subscription-grid')
  if (grid) {
    return 'subscription'
  }
  
  // Default to credits if we can't determine
  return 'credits'
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
    return sessionStorage.getItem('pricing_model') || 'unknown'
  }
  return 'unknown'
}

