// Utility to detect which pricing model is active (for tracking)
// Now both models are shown, so this detects which one the user interacts with

export const getPricingModel = () => {
  const pricingSection = document.querySelector('#pricing')
  if (!pricingSection) return 'unknown'
  
  // Check if both models are present (new structure)
  const creditsGrid = pricingSection.querySelector('.credits-grid')
  const subscriptionGrid = pricingSection.querySelector('.subscription-grid')
  
  if (creditsGrid && subscriptionGrid) {
    return 'both' // Both models are available
  }
  
  // Fallback: check for subscription grid class
  if (subscriptionGrid) {
    return 'subscription'
  }
  
  // Fallback: check for credits grid
  if (creditsGrid) {
    return 'credits'
  }
  
  // Default to both if we can't determine (new default)
  return 'both'
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

