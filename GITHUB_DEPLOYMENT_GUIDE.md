# 🚀 GitHub Connection & Deployment Guide

## Complete Step-by-Step Guide for TruthGuard Deployment

This guide will walk you through:
1. Connecting your project to GitHub
2. Deploying the backend (Flask API)
3. Deploying the frontend (Next.js)
4. Configuring everything to work together

---

## ✅ Prerequisites Checklist

Before starting, make sure you have:
- [x] Models uploaded to Hugging Face: `https://huggingface.co/zeeshann07/truthguard-models`
- [x] Git installed on your computer
- [x] GitHub account created
- [x] Project working locally (both frontend and backend)

---

## 📋 PART 1: Connect Project to GitHub

### Step 1: Initialize Git Repository

Open your terminal in the project root directory and run:

```bash
# Initialize git repository
git init

# Check git status
git status
```

You should see all your project files listed as "untracked files".

### Step 2: Add All Files to Git

```bash
# Add all files (respects .gitignore)
git add .

# Verify what will be committed
git status
```

**Important:** The `.gitignore` file will automatically exclude:
- ❌ `src/ml/artifacts/*.pkl` (model files)
- ❌ `src/data/*.csv` (dataset files)
- ❌ `frontend/node_modules/` (dependencies)
- ❌ `.venv/` (Python virtual environment)

These large files will NOT be pushed to GitHub (which is correct!).

### Step 3: Create First Commit

```bash
# Commit all files
git commit -m "Initial commit: TruthGuard fake news detection system"
```

### Step 4: Create GitHub Repository

1. Go to GitHub: https://github.com
2. Click the **"+"** icon in top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name:** `truthguard-fake-news-detection` (or your preferred name)
   - **Description:** `AI-powered fake news detection system with ML and Next.js frontend`
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 5: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/truthguard-fake-news-detection.git

# Verify remote was added
git remote -v

# Push code to GitHub
git branch -M main
git push -u origin main
```

**Enter your GitHub credentials when prompted.**

### Step 6: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your code files
3. Verify that `.pkl` and `.csv` files are NOT present (correct!)
4. Check that `src/ml/artifacts/.gitkeep` exists (preserves folder structure)

✅ **Your code is now on GitHub!**

---

## 🔧 PART 2: Deploy Backend (Flask API)

You have 3 options for backend deployment. I recommend **Railway** (easiest) or **Render** (free tier).

### Option A: Deploy to Railway (Recommended - Easiest)

#### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click **"Login"** → Sign in with GitHub
3. Authorize Railway to access your repositories

#### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `truthguard-fake-news-detection` repository
4. Railway will automatically detect it's a Python project

#### Step 3: Configure Build Settings
Railway should auto-detect, but verify:
- **Build Command:** `pip install -r requirements.txt && python src/scripts/download_assets.py`
- **Start Command:** `python app.py`
- **Python Version:** 3.12

#### Step 4: Add Environment Variables
1. Go to your project → **Variables** tab
2. Add these variables:
   ```
   PYTHON_VERSION=3.12
   FLASK_ENV=production
   PORT=5000
   ```

#### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 3-5 minutes for:
   - Dependencies to install
   - Models to download from Hugging Face
   - App to start
3. Railway will give you a URL like: `https://truthguard-production.up.railway.app`

#### Step 6: Test Backend
```bash
# Test the API (replace with your Railway URL)
curl -X POST https://your-app.up.railway.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"mode":"text","text":"This is a test article about breaking news that seems suspicious."}'
```

✅ **Backend deployed!** Save your Railway URL.

---

### Option B: Deploy to Render (Free Tier Available)

#### Step 1: Create Render Account
1. Go to https://render.com
2. Click **"Get Started"** → Sign up with GitHub
3. Authorize Render

#### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select `truthguard-fake-news-detection`

#### Step 3: Configure Service
Fill in these settings:
- **Name:** `truthguard-api`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** Leave empty
- **Runtime:** `Python 3`
- **Build Command:** 
  ```bash
  pip install -r requirements.txt && python src/scripts/download_assets.py
  ```
- **Start Command:** 
  ```bash
  python app.py
  ```

#### Step 4: Select Plan
- Choose **"Free"** plan (or paid if you prefer)
- Free tier limitations:
  - Spins down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds

#### Step 5: Add Environment Variables
In the **Environment** section, add:
```
PYTHON_VERSION=3.12
FLASK_ENV=production
PORT=10000
```

#### Step 6: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Render will give you a URL like: `https://truthguard-api.onrender.com`

#### Step 7: Test Backend
```bash
curl -X POST https://truthguard-api.onrender.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"mode":"text","text":"Test article content here."}'
```

✅ **Backend deployed on Render!**

---

### Option C: Deploy to Vercel (Alternative)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy Backend
```bash
# From project root
vercel --prod
```

Follow the prompts:
- Link to existing project? **No**
- Project name? **truthguard-backend**
- Directory? **.**
- Override settings? **No**

Vercel will give you a URL like: `https://truthguard-backend.vercel.app`

✅ **Backend deployed on Vercel!**

---

## 🎨 PART 3: Deploy Frontend (Next.js)

### Option A: Deploy to Vercel (Recommended for Next.js)

#### Step 1: Prepare Frontend
1. Make sure your backend URL is ready from Part 2
2. We'll configure it in the next steps

#### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Click **"Sign Up"** → Sign up with GitHub
3. Authorize Vercel

#### Step 3: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your `truthguard-fake-news-detection` repository
3. Vercel will detect it has a Next.js app in the `frontend` folder

#### Step 4: Configure Project Settings
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `frontend` ⚠️ **IMPORTANT!**
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

#### Step 5: Add Environment Variables
Click **"Environment Variables"** and add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

Replace `your-backend-url.railway.app` with your actual backend URL from Part 2.

**Example:**
```
NEXT_PUBLIC_API_URL=https://truthguard-production.up.railway.app
```

#### Step 6: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Vercel will give you a URL like: `https://truthguard.vercel.app`

#### Step 7: Update Frontend API Configuration
Your frontend is already configured to use environment variables! Check `frontend/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
```

This means:
- ✅ In production: Uses your Railway/Render backend URL
- ✅ In development: Uses localhost:5000

✅ **Frontend deployed on Vercel!**

---

### Option B: Deploy Frontend to Netlify

#### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub
3. Authorize Netlify

#### Step 2: Add New Site
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select your repository

#### Step 3: Configure Build Settings
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `frontend/.next`
- **Node version:** 18 or higher

#### Step 4: Add Environment Variables
Go to **Site settings** → **Environment variables**:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

#### Step 5: Deploy
1. Click **"Deploy site"**
2. Wait for build to complete
3. Netlify gives you a URL like: `https://truthguard.netlify.app`

✅ **Frontend deployed on Netlify!**

---

## 🔗 PART 4: Connect Frontend & Backend

### Step 1: Update Backend CORS Settings

Your backend needs to allow requests from your frontend domain.

Edit `app.py` and update the CORS configuration:

```python
from flask_cors import CORS

# Update this line
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",  # Local development
            "https://truthguard.vercel.app",  # Your Vercel URL
            "https://truthguard.netlify.app"  # Your Netlify URL (if using)
        ]
    }
})
```

### Step 2: Commit and Push Changes

```bash
git add app.py
git commit -m "Update CORS for production frontend"
git push origin main
```

### Step 3: Redeploy Backend
- **Railway:** Automatically redeploys on push
- **Render:** Automatically redeploys on push
- **Vercel:** Run `vercel --prod` again

### Step 4: Test Full Application

1. Open your frontend URL: `https://truthguard.vercel.app`
2. Navigate to **"Detect by URL"**
3. Test with a news URL
4. Verify the analysis works

✅ **Everything is connected!**

---

## 🎯 PART 5: Custom Domain (Optional)

### For Vercel Frontend

1. Go to your project → **Settings** → **Domains**
2. Add your custom domain (e.g., `truthguard.com`)
3. Follow DNS configuration instructions
4. Vercel provides free SSL certificate

### For Railway Backend

1. Go to your service → **Settings** → **Domains**
2. Add custom domain (e.g., `api.truthguard.com`)
3. Update DNS records as instructed
4. Update frontend environment variable with new API URL

---

## 📊 PART 6: Verify Deployment

### Backend Health Check

```bash
# Check if backend is running
curl https://your-backend-url.railway.app/

# Test analysis endpoint
curl -X POST https://your-backend-url.railway.app/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "text",
    "text": "Breaking news: Scientists discover new planet in solar system."
  }'
```

Expected response:
```json
{
  "result": {
    "label": 0,
    "prob_fake": 0.15,
    "sentiment": {...}
  },
  "corroboration": [...]
}
```

### Frontend Check

1. Visit your frontend URL
2. Check all pages load:
   - ✅ Landing page
   - ✅ About page
   - ✅ Detect by URL
   - ✅ Detect by Text
3. Test both detection modes
4. Verify results display correctly

---

## 🔧 Troubleshooting

### Issue: "Models not found" error

**Solution:**
1. Check Railway/Render logs
2. Verify `download_assets.py` ran during build
3. Check Hugging Face models are public: https://huggingface.co/zeeshann07/truthguard-models
4. Manually trigger download:
   ```bash
   python src/scripts/download_assets.py
   ```

### Issue: CORS errors in browser

**Solution:**
1. Check `app.py` CORS configuration includes your frontend URL
2. Verify frontend URL is correct (no trailing slash)
3. Redeploy backend after changes

### Issue: Frontend can't connect to backend

**Solution:**
1. Check `NEXT_PUBLIC_API_URL` environment variable in Vercel
2. Verify backend URL is accessible
3. Check browser console for errors
4. Verify backend is not sleeping (Render free tier)

### Issue: Build fails on Vercel/Railway

**Solution:**
1. Check build logs for specific error
2. Verify `requirements.txt` is correct
3. Ensure Python version is 3.12
4. Check that `download_assets.py` completes successfully

### Issue: Slow first request (Render free tier)

**Expected behavior:**
- Render free tier spins down after 15 minutes
- First request takes 30-60 seconds to wake up
- Subsequent requests are fast

**Solution:** Upgrade to paid tier or use Railway

---

## 📝 Deployment Checklist

### Before Deployment
- [x] Models uploaded to Hugging Face
- [x] `.gitignore` excludes large files
- [x] Code pushed to GitHub
- [x] Frontend environment variables configured
- [x] Backend CORS configured

### After Deployment
- [ ] Backend URL is accessible
- [ ] Frontend URL is accessible
- [ ] Test URL detection feature
- [ ] Test text detection feature
- [ ] Check browser console for errors
- [ ] Verify model predictions are accurate
- [ ] Test on mobile devices
- [ ] Share with users!

---

## 🎉 Success!

Your TruthGuard system is now live on the internet!

### Your URLs
- **Frontend:** `https://truthguard.vercel.app` (or your custom domain)
- **Backend API:** `https://truthguard-production.railway.app`
- **Models:** `https://huggingface.co/zeeshann07/truthguard-models`
- **Code:** `https://github.com/YOUR_USERNAME/truthguard-fake-news-detection`

### Share Your Project
- Add the live URL to your GitHub README
- Share on LinkedIn, Twitter, portfolio
- Add to your resume/CV
- Demo to potential employers

---

## 🔄 Making Updates

### Update Code
```bash
# Make changes to your code
git add .
git commit -m "Description of changes"
git push origin main
```

Both Railway and Vercel will automatically redeploy!

### Update Models
1. Upload new models to Hugging Face
2. Models will be downloaded on next deployment
3. Or manually trigger: `python src/scripts/download_assets.py`

---

## 💡 Next Steps

1. **Monitor Usage:** Check Railway/Vercel analytics
2. **Add Features:** Implement user accounts, history, etc.
3. **Improve Model:** Retrain with more data
4. **Add Tests:** Write unit and integration tests
5. **Documentation:** Create API documentation
6. **SEO:** Optimize for search engines
7. **Analytics:** Add Google Analytics

---

## 📞 Need Help?

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Flask Docs:** https://flask.palletsprojects.com

---

**Made with ❤️ using AI and Machine Learning**

Good luck with your deployment! 🚀
