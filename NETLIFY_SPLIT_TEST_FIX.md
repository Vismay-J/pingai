# Fixing Netlify Split Testing - Branch Recognition

## Issue
Netlify split testing says "requires a repository with at least 2 branches" even though both branches exist on GitHub.

## Solution Steps

### Option 1: Manually Deploy Both Branches (Recommended)

1. **Go to Netlify Dashboard**
   - Navigate to your site
   - Go to **Deploys** tab

2. **Trigger Deploy for `main` branch**
   - Click **"Trigger deploy"** → **"Deploy branch"**
   - Select `main` branch
   - Click **"Deploy"**

3. **Trigger Deploy for `subscription-pricing` branch**
   - Click **"Trigger deploy"** again → **"Deploy branch"**
   - Select `subscription-pricing` branch
   - Click **"Deploy"**

4. **Wait for both deployments to complete**
   - You should see both branches in the Deploys list

5. **Now try Split Testing again**
   - Go to **Site settings** → **Split testing**
   - It should now recognize both branches

### Option 2: Reconnect Repository

If Option 1 doesn't work:

1. **Go to Site Settings**
   - Your site → **Site settings**
   - **Build & deploy** → **Continuous Deployment**

2. **Disconnect Git Provider**
   - Click **"Unlink repository"** or **"Disconnect"**
   - Confirm the disconnection

3. **Reconnect Git Provider**
   - Click **"Link to Git provider"**
   - Select **GitHub** and authorize
   - Select your repository: `Vismay-J/pingai`
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click **"Save"**

4. **Netlify will deploy both branches**
   - It should automatically detect and deploy `main`
   - You may need to manually trigger `subscription-pricing` (see Option 1, step 3)

5. **Enable Split Testing**
   - Go to **Site settings** → **Split testing**
   - Enable split testing
   - Add both branches:
     - Branch A: `main`
     - Branch B: `subscription-pricing`

### Option 3: Force Push to Trigger Deployments

If you want to force Netlify to see the branches, make a small change and push:

```powershell
# On subscription-pricing branch
git checkout subscription-pricing
# Make a tiny change (like add a comment)
# Then commit and push
git add .
git commit -m "Trigger Netlify deployment"
git push origin subscription-pricing
```

This will trigger a new deployment that Netlify will detect.

## Verify Branches Are Available

After deploying, check:
1. **Deploys tab** - Should show deployments for both `main` and `subscription-pricing`
2. **Split testing settings** - Should list both branches in the dropdown

## Troubleshooting

**If branches still don't appear:**
- Make sure both branches are pushed to GitHub (they are ✅)
- Check that Netlify has access to your GitHub repository
- Try disconnecting and reconnecting (Option 2)
- Contact Netlify support if issue persists

## Current Status

✅ `main` branch - Pushed to GitHub
✅ `subscription-pricing` branch - Pushed to GitHub
⏳ Waiting for Netlify to deploy both branches

