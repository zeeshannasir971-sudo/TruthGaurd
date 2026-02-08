# 🚀 Deploy TruthGuard to Vercel/Netlify

## Quick Deployment Guide (5 Steps)

### Step 1: Upload Models to Hugging Face (One-Time)

```bash
# Install Hugging Face CLI
pip install huggingface_hub

# Login to Hugging Face
huggingface-cli login

# Upload models
python upload_to_huggingface.py
```

**What this does:**
- Creates a repository on Hugging Face
- Uploads your 3 model files (.pkl)
- Gives you public download URLs

### Step 2: Update Download Script

Edit `src/scripts/download_assets.py`:

```python
# Replace YOUR_USERNAME with your actual Hugging Face username
HUGGINGFACE_BASE_URL = "https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main"
```

### Step 3: Test Locally

```bash
# Delete local models
rm src/ml/artifacts/*.pkl

# Test download
python src/scripts/download_assets.py

# Should download all 3 files successfully
```

### Step 4: Deploy Backend

#### Option A: Vercel (Easiest)
```bash
npm i -g vercel
vercel
```

#### Option B: Railway
1. Go to https://railway.app
2. Connect GitHub repo
3. Deploy automatically

#### Option C: Render
1. Go to https://render.com
2. New Web Service
3. Connect repo

### Step 5: Deploy Frontend

```bash
cd frontend

# Update API URL
echo "NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app" > .env.production

# Deploy
vercel --prod
```

## ✅ That's It!

Your app is now deployed with:
- ✅ Code on GitHub (small)
- ✅ Models on Hugging Face (large)
- ✅ Automatic download on deploy
- ✅ Fast inference

## 📊 What Gets Deployed

### GitHub (5 MB)
```
✅ All code files
✅ download_assets.py script
✅ Directory structure
❌ No .pkl files
❌ No .csv files
```

### Hugging Face (85 MB)
```
✅ fake_news_model.pkl
✅ tfidf_word_vectorizer.pkl
✅ tfidf_char_vectorizer.pkl
```

### Deployed App (90 MB)
```
✅ Code from GitHub
✅ Models downloaded from Hugging Face
✅ Ready to serve predictions
```

## 🔄 Deployment Flow

```
1. Push code to GitHub
   ↓
2. Vercel/Netlify detects push
   ↓
3. Clones repository
   ↓
4. Runs: pip install -r requirements.txt
   ↓
5. Runs: python src/scripts/download_assets.py
   ↓
6. Downloads models from Hugging Face
   ↓
7. Starts Flask app
   ↓
8. App ready! 🎉
```

## ⚡ Performance

### First Deploy
- Build time: 2-3 minutes
- Model download: 30 seconds
- Total: ~3 minutes

### Cold Start (First Request)
- Model loading: 2-5 seconds
- Prediction: <100ms

### Warm Requests
- Prediction: <100ms
- (Models cached in memory)

## 🎯 Deployment Checklist

Before deploying, make sure:

- [ ] Models trained locally (`python -m src.ml.pipeline`)
- [ ] Hugging Face account created
- [ ] Models uploaded to Hugging Face
- [ ] download_assets.py updated with your URLs
- [ ] Tested download locally
- [ ] .gitignore excludes .pkl files
- [ ] Backend deployed
- [ ] Frontend .env.production updated
- [ ] Frontend deployed
- [ ] Tested end-to-end

## 🆘 Troubleshooting

### "Model files not found"
- Check Hugging Face URLs in download_assets.py
- Make sure files are public
- Test download locally first

### "Build failed"
- Check build logs
- Verify requirements.txt is correct
- Ensure download_assets.py has no errors

### "Function too large"
- This is normal - models are downloaded, not bundled
- Vercel/Netlify will handle it

### "Timeout during build"
- Increase timeout in vercel.json
- Or use Railway/Render (no timeout)

## 📚 Full Documentation

- `DEPLOYMENT_STRATEGY.md` - Complete strategy explanation
- `DEPLOYMENT_GUIDE.md` - Detailed deployment guide
- `README.md` - Project overview

## 🎉 Success!

Once deployed, your app will:
- ✅ Work on Vercel/Netlify
- ✅ Download models automatically
- ✅ Serve predictions fast
- ✅ Scale automatically
- ✅ Cost $0 on free tier

**Your TruthGuard app is ready for the world!** 🛡️
