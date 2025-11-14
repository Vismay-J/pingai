# Quick Start: Deploy Your Ping Website

## Fastest Way to Publish (5 minutes)

### Step 1: Build Your Site
```bash
cd business-website
npm install
npm run build
```

This creates a `dist` folder with your production-ready website.

### Step 2: Choose Your Hosting

#### 🚀 **EASIEST: Vercel (Recommended)**
1. Go to [vercel.com](https://vercel.com) and sign up (GitHub login)
2. Click "Add New Project"
3. Drag and drop your `business-website` folder
4. Vercel auto-detects everything - click "Deploy"
5. Done! Your site is live in ~30 seconds

#### 🌐 **ALTERNATIVE: Netlify**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `dist` folder (after running `npm run build`)
3. Your site is live instantly!

#### 📦 **FOR GITHUB PAGES**
1. Push your code to GitHub
2. Run: `npm install --save-dev gh-pages`
3. Add to package.json: `"deploy": "npm run build && gh-pages -d dist"`
4. Update `vite.config.js` with: `base: '/your-repo-name/'`
5. Run: `npm run deploy`

## Before You Deploy

1. **Configure Waitlist Endpoint**:
   - Create `.env` in project root with:
   ```
   VITE_WAITLIST_WEBHOOK_URL=https://your-endpoint.example.com
   ```

2. **Add Analytics** (optional):
   - Edit `src/utils/analytics.js`
   - Replace placeholder with Google Analytics, Mixpanel, etc.

3. **Create OG Image**:
   - Create a 1200×630px image
   - Save as `public/og-image.png`
   - Should include Ping branding

## Test Locally First

```bash
npm run build
npm run preview
```

Visit the preview URL to make sure everything works!

## Need More Help?

See `DEPLOYMENT.md` for detailed instructions for all hosting platforms.


