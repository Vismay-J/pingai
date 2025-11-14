# A/B Testing Setup - Pricing Models

## Branches Created

### 1. `main` branch (Credits-Based Pricing)
- **Model:** Pay-per-credit system
- **Plans:**
  - Starter Pack: $4 one-time (20 credits)
  - Smart Saver Pack: $8 one-time (60 credits) - Most Popular
  - Power Pack: $15 one-time (150 credits)
  - Semester Pack: $25 one-time (300 credits)
  - Unlimited Month Plan: $15/month
- **Subtitle:** "Each credit saves you ~15 minutes of manual scheduling."

### 2. `subscription-pricing` branch (Subscription Model)
- **Model:** Monthly/Yearly subscription
- **Plans:**
  - Monthly Plan: $8/month - Most Popular
  - Yearly Plan: $72/year (Save $24, 25% off vs monthly)
- **Subtitle:** "Simple, transparent pricing. Cancel anytime."
- **Footer:** "All plans include a 14-day free trial. No credit card required to start."

## Setting Up A/B Testing in Netlify

1. **Go to Netlify Dashboard**
   - Navigate to your site → **Site settings**
   - Go to **Split testing** (or **A/B Testing**)

2. **Configure Split Test**
   - Click **"Enable split testing"**
   - Add branches:
     - **Branch A:** `main` (Credits model)
     - **Branch B:** `subscription-pricing` (Subscription model)
   - Set traffic split (e.g., 50/50 or your preferred ratio)

3. **Deploy Both Branches**
   - Netlify should automatically detect both branches
   - Make sure both branches are deployed:
     - Go to **Deploys** tab
     - You should see deployments for both `main` and `subscription-pricing`

4. **Monitor Results**
   - Track conversions (waitlist signups, clicks, etc.)
   - Use Netlify Analytics or your analytics tool
   - Compare performance between the two models

## Switching Between Branches Locally

To test or make changes to a specific branch:

```powershell
# Switch to credits model (main)
git checkout main

# Switch to subscription model
git checkout subscription-pricing

# Make changes, then commit and push
git add .
git commit -m "Description of changes"
git push
```

## Making Updates

### Update Credits Model (main branch)
```powershell
git checkout main
# Make your changes
git add .
git commit -m "Update credits pricing"
git push
```

### Update Subscription Model (subscription-pricing branch)
```powershell
git checkout subscription-pricing
# Make your changes
git add .
git commit -m "Update subscription pricing"
git push
```

## Important Notes

- **Both branches are independent** - changes to one don't affect the other
- **Netlify will deploy both branches** when you push changes
- **A/B testing splits traffic** between the two versions automatically
- **Monitor analytics** to see which model performs better

## Current Status

✅ `main` branch - Credits-based pricing (pushed to GitHub)
✅ `subscription-pricing` branch - Subscription pricing (pushed to GitHub)
✅ Both branches ready for A/B testing in Netlify

