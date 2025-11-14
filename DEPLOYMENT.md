# Deployment Guide for Ping Website

This guide walks you through publishing your Ping website to various hosting platforms.

## Prerequisites

1. **Install dependencies** (if you haven't already):
   ```bash
   cd business-website
   npm install
   ```

2. **Build the production version**:
   ```bash
   npm run build
   ```
   This creates an optimized `dist` folder with all your production files.

3. **Preview the build locally** (optional):
   ```bash
   npm run preview
   ```
   Visit `http://localhost:4173` to verify everything works.

## Hosting Options

### Option 1: Vercel (Recommended - Free & Easiest)

**Best for:** Quick deployment, automatic HTTPS, custom domains

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd business-website
   vercel
   ```
   Or:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Import Project"
   - Connect your repository
   - Vercel auto-detects Vite settings

3. **Custom Domain** (optional):
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS as instructed

### Option 2: Netlify (Free Tier Available)

**Best for:** Simple static sites, form handling

1. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   cd business-website
   netlify deploy
   ```

2. **Or via web interface**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect GitHub repo for auto-deploy

3. **Build settings** (if using Git):
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: GitHub Pages (Free)

**Best for:** Open source projects, simple hosting

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Update vite.config.js**:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/'  // Change to your GitHub repo name
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repo → Settings → Pages
   - Source: `gh-pages` branch

### Option 4: Cloudflare Pages (Free)

**Best for:** Fast CDN, global distribution

1. Go to [cloudflare.com/pages](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`

### Option 5: Traditional Hosting (cPanel, FTP)

**For:** Shared hosting, traditional servers

1. **Build your site**:
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder contents** via FTP/cPanel:
   - Upload all files from `dist/` to your `public_html` or `www` folder
   - Ensure `index.html` is in the root
   - If your site is in a subfolder, update `vite.config.js` base path

3. **Server requirements**:
   - Must serve `index.html` for all routes (single-page app)
   - Create `.htaccess` (Apache) or `_redirects` (Netlify-style) with:
     ```
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
     ```

## Before Deploying Checklist

- [ ] Update webhook URL in `DemoForm.jsx` (replace `https://example.com/api/demo`)
- [ ] Update analytics in `src/utils/analytics.js` with your tracking service
- [ ] Add Open Graph image (`public/og-image.png` - 1200×630px)
- [ ] Update JSON-LD in `index.html` with your actual website URL
- [ ] Test the build locally: `npm run build && npm run preview`
- [ ] Verify all links and navigation work
- [ ] Test the demo form submission

## Environment Variables (if needed)

For services like Vercel/Netlify, you can set environment variables:
- In Vercel: Project Settings → Environment Variables
- In Netlify: Site Settings → Build & Deploy → Environment

## Custom Domain Setup

1. **Buy a domain** (if you don't have one):
   - Namecheap, Google Domains, Cloudflare, etc.

2. **Configure DNS**:
   - For Vercel: Add CNAME pointing to `cname.vercel-dns.com`
   - For Netlify: Add CNAME pointing to your Netlify subdomain
   - Wait for DNS propagation (can take up to 48 hours)

## Post-Deployment

1. **Test everything**:
   - Navigation links
   - Form submission
   - Mobile responsiveness
   - Page speed (use Google PageSpeed Insights)

2. **Monitor**:
   - Analytics dashboard
   - Form submissions (check your webhook endpoint)
   - Error logs (if available in hosting dashboard)

3. **SEO**:
   - Submit sitemap to Google Search Console
   - Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

## Troubleshooting

**404 errors on refresh**: Server needs to redirect all routes to `index.html`

**Images/assets not loading**: Check `vite.config.js` base path matches your deployment path

**Forms not submitting**: Verify webhook URL is correct and accessible

**Slow loading**: Optimize images, enable compression in hosting settings


