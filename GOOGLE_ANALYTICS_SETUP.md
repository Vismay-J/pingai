# Google Analytics 4 Setup Guide

## Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Admin"** (gear icon) in the bottom left
4. In the **Property** column, click **"Create Property"** (if you haven't created one yet)
   - Property name: "Ping Website"
   - Time zone: Your timezone
   - Currency: USD
   - Click **"Next"** and complete the setup
5. After creating the property, go to **Admin** → **Data Streams**
6. Click **"Add stream"** → **"Web"**
7. Enter:
   - Website URL: Your website URL (e.g., `https://your-site.netlify.app`)
   - Stream name: "Ping Website"
8. Click **"Create stream"**
9. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Add Measurement ID to Your Site

1. Open `.env` file in your project root (create it if it doesn't exist)
2. Add your Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   (Replace `G-XXXXXXXXXX` with your actual Measurement ID)

3. **For Netlify:**
   - Go to Netlify Dashboard → Your site → **Site settings**
   - **Build & deploy** → **Environment variables**
   - Click **"Add variable"**
   - Key: `VITE_GA_MEASUREMENT_ID`
   - Value: Your Measurement ID (e.g., `G-XXXXXXXXXX`)
   - Click **"Save"**
   - **Redeploy** your site for the changes to take effect

## Step 3: Verify It's Working

1. Deploy your site with the Measurement ID
2. Visit your website
3. Click on pricing buttons or submit the waitlist form
4. Go to Google Analytics → **Reports** → **Realtime**
5. You should see events appearing within a few seconds

## Events Being Tracked

### Pricing Interactions
- `pricing_button_click` - When user clicks a pricing plan button
  - `pricing_model`: "credits" or "subscription"
  - `plan_name`: Name of the plan clicked
  - `plan_price`: Price of the plan

### Waitlist Submissions
- `waitlist_submit` - When user submits the waitlist form
  - `pricing_model`: "credits" or "subscription" (based on which branch they saw)
  - `phone_provided`: true/false
  - `name_provided`: true/false

### Other Events
- `cta_click` - CTA button clicks throughout the site
- `form_submit` - Form submissions
- `faq_toggle` - FAQ accordion opens

## Viewing Results in Google Analytics

1. **Realtime Events:**
   - Go to **Reports** → **Realtime** → **Events**
   - See events as they happen

2. **Event Reports:**
   - Go to **Reports** → **Engagement** → **Events**
   - See all tracked events with counts

3. **Custom Reports:**
   - Go to **Explore** → Create custom reports
   - Filter by `pricing_model` to compare credits vs subscription
   - See conversion rates for each pricing model

## A/B Test Analysis

To analyze your split test results:
1. Go to **Explore** → **Free form**
2. Add dimensions: `pricing_model`, `plan_name`
3. Add metrics: Event count, Users
4. Filter by `pricing_button_click` and `waitlist_submit`
5. Compare conversion rates between credits and subscription models

