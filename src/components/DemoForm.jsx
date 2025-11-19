import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { trackWaitlistSubmit, trackFormSubmit } from '../utils/analytics'
import { getStoredPricingModel } from '../utils/pricingModel'
import { submitWaitlistEntry } from '../utils/waitlist'
import './DemoForm.css'

function DemoForm() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    name: '',
    consent: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validatePhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length >= 10 && digitsOnly.length <= 15
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: fieldValue })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Phone number is required'
    } else {
      const isPhone = validatePhone(formData.emailOrPhone)
      if (!isPhone) {
        newErrors.emailOrPhone = 'Please enter a valid phone number (at least 10 digits)'
      }
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms and consent to receive texts'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')
    
    const pricingModel = getStoredPricingModel()
    const hasPhone = !!formData.emailOrPhone.trim()
    const hasName = !!formData.name.trim()
    
    const selectedPlan = typeof window !== 'undefined' 
      ? sessionStorage.getItem('selected_plan') 
      : null
    
    trackWaitlistSubmit(pricingModel, hasPhone, hasName, selectedPlan)
    trackFormSubmit('waitlist', { pricing_model: pricingModel, selected_plan: selectedPlan })

    try {
      await submitWaitlistEntry({
        emailOrPhone: formData.emailOrPhone,
        name: formData.name || '',
        source: 'website-waitlist',
        consent: formData.consent,
        pricingModel: pricingModel
      })

      setIsSuccess(true)
      setFormData({ emailOrPhone: '', name: '', consent: false })
      setErrors({})
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsSuccess(false), 5000)
    }
  }

  return (
    <section id="waitlist" className="demo section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join the waitlist
        </motion.h2>
        <motion.p 
          className="demo-helper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Be first to know when we launch.
        </motion.p>
        <motion.form 
          className="demo-form" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="form-group">
            <label htmlFor="emailOrPhone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              required
              aria-invalid={errors.emailOrPhone ? 'true' : 'false'}
              aria-describedby={errors.emailOrPhone ? 'emailOrPhone-error' : undefined}
            />
            {errors.emailOrPhone && (
              <span id="emailOrPhone-error" className="error-message" role="alert">
                {errors.emailOrPhone}
              </span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Name (optional)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                aria-invalid={errors.consent ? 'true' : 'false'}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
              />
              <label htmlFor="consent" className="checkbox-label">
                I have read the <a href="#terms" onClick={(e) => { e.preventDefault(); window.location.hash = 'terms'; window.scrollTo(0, 0); }}>terms and conditions</a> and consent to receive text messages from Ping. <span className="required">*</span>
              </label>
            </div>
            {errors.consent && (
              <span id="consent-error" className="error-message" role="alert">
                {errors.consent}
              </span>
            )}
          </div>

          {isSuccess && (
            <motion.div 
              className="success-message" 
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              You're on the list. We'll be in touch soon.
            </motion.div>
          )}
          {errorMessage && (
            <div className="error-message" role="alert">
              {errorMessage}
            </div>
          )}

          <motion.button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Joining...' : 'Join waitlist'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

export default DemoForm
