# GitHub & Netlify Integration Setup

This guide will help you connect your project to GitHub and enable automatic deployments on Netlify.

## Step 1: Initialize Git Repository

Open PowerShell in your project directory and run:

```powershell
cd C:\Users\jainv\business-website
git init
git add .
git commit -m "Initial commit"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `business-website` (or any name you prefer)
4. Description: "Ping - SMS-first assistant website"
5. Choose **Private** or **Public** (your choice)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 3: Connect Local Repository to GitHub

After creating the repo, GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/business-website.git
git branch -M main
git push -u origin main
```

If you're prompted for credentials:
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (not your GitHub password)
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` permissions
  - Use that token as your password

## Step 4: Connect GitHub to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your `business-website` repository
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click **"Deploy site"**

## Step 5: Configure Environment Variables (if needed)

If you have a `.env` file with `VITE_WAITLIST_WEBHOOK_URL`:

1. In Netlify dashboard → Your site → **Site settings**
2. Go to **Build & deploy** → **Environment variables**
3. Click **"Add variable"**
4. Add:
   - **Key:** `VITE_WAITLIST_WEBHOOK_URL`
   - **Value:** Your webhook URL (or leave empty to use Netlify function)
5. Click **"Save"**

## Step 6: Link Existing Netlify Site (Alternative)

If you already have a Netlify site and want to connect it to GitHub:

1. In Netlify dashboard → Your site → **Site settings**
2. Go to **Build & deploy** → **Continuous Deployment**
3. Click **"Link to Git provider"**
4. Select **GitHub** and authorize
5. Select your `business-website` repository
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click **"Save"**

## Automatic Deployments

Once connected:
- **Every push to `main` branch** → Automatic production deployment
- **Pull requests** → Preview deployments
- **No more manual uploads needed!**

## Future Workflow

1. Make changes to your code
2. Commit changes:
   ```powershell
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Netlify automatically builds and deploys!

## Troubleshooting

**Git push fails:**
- Make sure you have a Personal Access Token (not password)
- Check that the remote URL is correct: `git remote -v`

**Netlify build fails:**
- Check build logs in Netlify dashboard
- Make sure `package.json` has all dependencies
- Verify build command is `npm run build`

**Environment variables not working:**
- Make sure variable names start with `VITE_` for Vite projects
- Redeploy after adding environment variables

