# Ping - SMS-First Assistant Website

A production-ready marketing website for Ping, an SMS-first assistant for college students, clubs, TAs, and departments.

## 🚀 Quick Deploy

**Fastest way to publish:**
1. Run `npm run build` to create production files
2. Deploy the `dist` folder to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. See `QUICK_START.md` for detailed instructions

## 📋 Features

- ✅ Modern, responsive design (mobile, tablet, desktop)
- ✅ SEO optimized with Open Graph and Twitter Cards
- ✅ Accessibility compliant (WCAG AA)
- ✅ Fast loading with Vite optimization
- ✅ Smooth scroll navigation
- ✅ Interactive demo form with validation
- ✅ Analytics hooks (placeholder)
- ✅ Scroll-triggered animations

## 🛠️ Development

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
cd business-website
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Production files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
business-website/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation with active state
│   │   ├── Hero.jsx            # Hero with phone mock
│   │   ├── Features.jsx        # Feature cards
│   │   ├── HowItWorks.jsx      # 3-step process
│   │   ├── Impact.jsx          # Metrics tiles
│   │   ├── ValueTeam.jsx       # Value proposition
│   │   ├── Pricing.jsx         # Pricing tiers
│   │   ├── FAQ.jsx             # Accordion FAQ
│   │   ├── DemoForm.jsx        # Contact form
│   │   └── Footer.jsx          # Footer with links
│   ├── utils/
│   │   └── analytics.js        # Analytics hooks
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Design tokens & global styles
├── public/                     # Static assets
├── index.html                  # HTML template with SEO
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## 🎨 Customization

### Brand Colors
Edit CSS variables in `src/index.css`:
- `--color-accent`: #6B5BFF (primary brand color)
- `--color-bg`: Background color
- `--color-text`: Text color

### Content & Copy
Edit individual component files in `src/components/` - all content is clearly marked.

### Analytics
Update `src/utils/analytics.js` with your tracking service (Google Analytics, Mixpanel, etc.)

### Waitlist submissions
Create a `.env` in the project root with your endpoint:

```
VITE_WAITLIST_WEBHOOK_URL=https://your-endpoint.example.com
```

The form will POST JSON like `{ "emailOrPhone": "...", "name": "...", "source": "website-waitlist" }`.

You can use any provider that accepts JSON (Formspree, Zapier/Make, Airtable Automations, Vercel/Netlify function, Supabase, etc.).

## 📦 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages
- Traditional hosting (FTP/cPanel)

Or use `QUICK_START.md` for the fastest deployment path.

## ✅ Pre-Deployment Checklist

- [ ] Set `VITE_WAITLIST_WEBHOOK_URL` in `.env`
- [ ] Configure analytics in `src/utils/analytics.js`
- [ ] Add Open Graph image (`public/og-image.png` - 1200×630px)
- [ ] Update JSON-LD in `index.html` with your website URL
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Verify all navigation links work
- [ ] Test form submission

## 🔧 Technologies

- **React 18** - UI framework
- **Vite 5** - Build tool & dev server
- **CSS3** - Modern CSS with custom properties
- **ES6+** - Modern JavaScript

## 📄 License

This project is available for use in your Ping business.

## 📚 Documentation

- `QUICK_START.md` - Fast deployment guide
- `DEPLOYMENT.md` - Comprehensive deployment options
- Component files contain inline comments for customization
