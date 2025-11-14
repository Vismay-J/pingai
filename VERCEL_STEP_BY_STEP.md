# Step-by-Step: Deploy to Vercel

## Method 1: Using Vercel Website (Easiest)

### Step 1: Sign Up for Vercel
1. Open your web browser
2. Go to: **https://vercel.com**
3. Click the **"Sign Up"** button (top right)
4. Choose **"Continue with GitHub"** (recommended) or use email
   - If using GitHub: This lets you import projects easily later
   - If using email: You'll verify your email address

### Step 2: Add Your Project
After signing in, you'll see the Vercel dashboard:

1. Click **"Add New..."** button
2. Select **"Project"** from the dropdown menu
3. You'll see two options:
   - **Option A: Upload a folder** (easiest for first time)
   - **Option B: Import Git Repository** (if you have it on GitHub)

### Step 3A: Upload Folder Method

1. Click **"Upload a folder"** or drag-and-drop area
2. Navigate to your project folder:
   - Go to: `C:\Users\jainv\business-website`
   - **IMPORTANT:** Select the **entire `business-website` folder** (not just dist)
3. Drag it into the Vercel upload area OR click to browse and select the folder
4. Vercel will automatically detect it's a Vite project

### Step 3B: GitHub Import Method (Alternative)

If you want to use GitHub:

1. **First, push your code to GitHub:**
   - Go to [github.com](https://github.com) and create a new repository
   - Name it something like "ping-website"
   - Don't initialize with README
   - Open terminal/Git Bash in your `business-website` folder:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/ping-website.git
     git push -u origin main
     ```

2. **Then in Vercel:**
   - Click "Import Git Repository"
   - Find your repository and click "Import"

### Step 4: Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset:** Vite (should auto-detect)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` (should be auto-filled)
- **Output Directory:** `dist` (should be auto-filled)
- **Install Command:** `npm install` (should be auto-filled)

**Just click through - Vercel usually gets this right automatically!**

### Step 5: Deploy!

1. Click the **"Deploy"** button
2. Wait 30-60 seconds while Vercel:
   - Installs your dependencies
   - Builds your project
   - Deploys it

### Step 6: Your Site is Live!

Once it's done, you'll see:
- ✅ **"Congratulations"** message
- A URL like: `https://your-project-name.vercel.app`
- Click **"Visit"** or the URL to see your live site!

**That's it! Your website is now live on the internet!** 🎉

---

## Method 2: Using Vercel CLI (Advanced - Command Line)

If you prefer using command line:

### Step 1: Install Vercel CLI

Open PowerShell in your `business-website` folder and run:
```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```
This will open a browser window to authenticate.

### Step 3: Deploy

```bash
vercel
```

The CLI will ask a few questions:
- **Set up and deploy?** → Type `Y` and press Enter
- **Which scope?** → Press Enter (use default)
- **Link to existing project?** → Type `N` and press Enter (first time)
- **Project name?** → Press Enter (or type a custom name)
- **Directory?** → Press Enter (use `./`)
- **Override settings?** → Press Enter (use defaults)

It will deploy and give you a URL!

---

## Troubleshooting

### "Build Failed" Error

If deployment fails:
1. **Check your build works locally first:**
   ```bash
   cd business-website
   npm install
   npm run build
   ```
   If this fails, fix errors before deploying.

2. **Common issues:**
   - Missing dependencies: Make sure `package.json` has all needed packages
   - Node version: Vercel uses Node 18+ by default (should be fine)

### "Cannot find module" Error

Make sure all your import paths are correct. Check:
- Import statements in components
- File paths are relative (like `./Component` not `Component`)

### Want to Redeploy After Changes?

1. **Via Website:** Just push code to GitHub (if connected) OR upload folder again
2. **Via CLI:** Run `vercel` again

---

## What Happens After Deployment?

✅ Your site gets:
- A free HTTPS URL (secure connection)
- Automatic deployments when you push to GitHub (if connected)
- CDN distribution (fast loading worldwide)
- Analytics (basic stats in Vercel dashboard)

### Add Custom Domain (Optional)

1. In Vercel dashboard → Your project → **Settings**
2. Click **"Domains"**
3. Add your domain (e.g., `ping.com`)
4. Follow DNS instructions (update your domain's nameservers)

---

## Quick Reference

**Vercel Website:** https://vercel.com  
**Your Project Location:** `C:\Users\jainv\business-website`  
**Build Command:** `npm run build` (auto-detected)  
**Output:** `dist` folder (auto-detected)

**Need help?** Vercel has great documentation at: https://vercel.com/docs


