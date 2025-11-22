# 🚀 GitHub & Deployment Setup

## Step 1: Verify .env is NOT Committed

**IMPORTANT:** Your `.env` file contains secrets and should NEVER be committed to GitHub.

Check that `.env` is in `.gitignore`:
```bash
cat .gitignore | grep .env
```

You should see:
```
.env
.env.local
.env.production
```

✅ Good! Your secrets are protected.

---

## Step 2: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Check what will be committed
git status

# You should NOT see .env in the list
# If you see .env, STOP and add it to .gitignore first
```

---

## Step 3: Create GitHub Repository

### Option A: Via GitHub Website (Easier)

1. Go to: https://github.com/new
2. **Repository name:** `farmweather-nigeria`
3. **Description:** "Hyperlocal climate intelligence platform for Nigerian farmers"
4. **Visibility:** 
   - ✅ **Private** (recommended for now)
   - Or Public (if you want to showcase)
5. **DO NOT** initialize with README (you already have one)
6. Click "Create repository"

### Option B: Via GitHub CLI

```bash
gh repo create farmweather-nigeria --private --source=. --remote=origin
```

---

## Step 4: Commit and Push

```bash
# Add all files
git add .

# Verify .env is NOT included
git status

# Commit
git commit -m "Initial commit: FarmWeather MVP

- Hyperlocal weather forecasts for Nigerian farmers
- React frontend with Tailwind CSS
- Node.js backend with Express
- MongoDB database integration
- SMS alerts via Termii
- Payment integration with Paystack
- Freemium business model"

# Add remote (if not already added)
git remote add origin https://github.com/YOUR_USERNAME/farmweather-nigeria.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 5: Verify on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/farmweather-nigeria`
2. **Check that .env is NOT visible** ✅
3. Check that README.md is displayed
4. Verify all code files are there

---

## Step 6: Set Up Repository Secrets (for CI/CD later)

1. Go to: Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets (for future CI/CD):
   - `MONGODB_URI`
   - `WEATHER_API_KEY`
   - `JWT_SECRET`
   - `PAYSTACK_SECRET_KEY`

---

## Step 7: Deploy to Render

Now follow: **DEPLOYMENT.md**

Quick steps:
1. Sign up at https://render.com
2. Connect your GitHub repository
3. Add environment variables
4. Deploy!

---

## Common Issues

### "Permission denied (publickey)"
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy output and add to GitHub: Settings → SSH Keys
```

### ".env file is showing on GitHub"
```bash
# Remove from git history
git rm --cached .env
git commit -m "Remove .env from git"
git push

# Make sure .gitignore includes .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Update .gitignore"
git push
```

### "Large files error"
```bash
# Remove node_modules if accidentally added
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

---

## Security Checklist

Before pushing to GitHub:

- [ ] `.env` is in `.gitignore`
- [ ] `.env` is NOT in git status
- [ ] No API keys in code files
- [ ] No passwords in code files
- [ ] `node_modules/` is in `.gitignore`
- [ ] `.env.example` has placeholder values only

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Test live deployment
5. ✅ Share with Wennovation Hub

---

**Your code is now safely on GitHub and ready to deploy! 🎉**
