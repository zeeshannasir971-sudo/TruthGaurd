# TruthGuard Deployment Architecture

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT                              │
│                                                                  │
│  1. Train Model Locally                                         │
│     python -m src.ml.pipeline                                   │
│     ↓                                                            │
│  2. Generate .pkl files (85MB total)                            │
│     • fake_news_model.pkl (50MB)                                │
│     • tfidf_word_vectorizer.pkl (20MB)                          │
│     • tfidf_char_vectorizer.pkl (15MB)                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    UPLOAD TO HUGGING FACE                        │
│                                                                  │
│  python upload_to_huggingface.py                                │
│  ↓                                                               │
│  Models stored at:                                              │
│  https://huggingface.co/YOUR_USERNAME/truthguard-models/        │
│                                                                  │
│  Public URLs:                                                   │
│  • .../fake_news_model.pkl                                      │
│  • .../tfidf_word_vectorizer.pkl                                │
│  • .../tfidf_char_vectorizer.pkl                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      PUSH TO GITHUB                              │
│                                                                  │
│  git add .                                                       │
│  git commit -m "Ready for deployment"                           │
│  git push origin main                                            │
│                                                                  │
│  Repository contains (5MB):                                     │
│  ✅ All Python code                                             │
│  ✅ download_assets.py                                          │
│  ✅ requirements.txt                                            │
│  ✅ vercel.json / netlify.toml                                  │
│  ❌ NO .pkl files                                               │
│  ❌ NO .csv files                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL/NETLIFY BUILD                          │
│                                                                  │
│  Step 1: Clone from GitHub                                      │
│  ├─ Get all code files                                          │
│  └─ No model files yet                                          │
│                                                                  │
│  Step 2: Install dependencies                                   │
│  └─ pip install -r requirements.txt                             │
│                                                                  │
│  Step 3: Download models                                        │
│  └─ python src/scripts/download_assets.py                       │
│     ├─ Check if models exist                                    │
│     ├─ Download from Hugging Face                               │
│     ├─ Save to src/ml/artifacts/                                │
│     └─ Verify all files present                                 │
│                                                                  │
│  Step 4: Start application                                      │
│  └─ python app.py                                               │
│     ├─ Run startup.py                                           │
│     ├─ Load models into memory                                  │
│     └─ Start Flask server                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      PRODUCTION RUNTIME                          │
│                                                                  │
│  Request Flow:                                                  │
│                                                                  │
│  User Request                                                   │
│      ↓                                                           │
│  POST /analyze                                                  │
│      ↓                                                           │
│  load_model()                                                   │
│      ├─ Check cache                                             │
│      ├─ If cached: return immediately                           │
│      └─ If not: load from disk (one-time)                       │
│      ↓                                                           │
│  predict(text)                                                  │
│      ├─ Preprocess text                                         │
│      ├─ Extract features                                        │
│      ├─ Run ML prediction                                       │
│      └─ Return result                                           │
│      ↓                                                           │
│  Response (JSON)                                                │
│      └─ {label, prob_fake, sentiment}                           │
│                                                                  │
│  Performance:                                                   │
│  • First request: 2-5s (load models)                            │
│  • Subsequent: <100ms (cached)                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 📦 File Organization

### What's in GitHub (Small - 5MB)

```
project/
├── app.py                              ✅ Flask app
├── startup.py                          ✅ Model download check
├── requirements.txt                    ✅ Dependencies
├── vercel.json                         ✅ Vercel config
├── netlify.toml                        ✅ Netlify config
├── .gitignore                          ✅ Excludes large files
├── upload_to_huggingface.py           ✅ Upload script
│
├── src/
│   ├── ml/
│   │   ├── pipeline.py                ✅ ML logic
│   │   └── artifacts/
│   │       ├── .gitkeep               ✅ Keep directory
│   │       ├── *.pkl                  ❌ NOT in Git
│   │       └── (downloaded on deploy)
│   │
│   ├── scripts/
│   │   └── download_assets.py         ✅ Download logic
│   │
│   ├── utils/
│   │   ├── fetch.py                   ✅ Web scraping
│   │   ├── preprocess.py              ✅ Text processing
│   │   ├── sentiment.py               ✅ Sentiment
│   │   └── search.py                  ✅ Search
│   │
│   ├── web/
│   │   └── routes.py                  ✅ API routes
│   │
│   └── data/
│       ├── .gitkeep                   ✅ Keep directory
│       └── *.csv                      ❌ NOT in Git
│
└── frontend/                           ✅ Next.js app
    ├── app/
    ├── components/
    └── package.json
```

### What's in Hugging Face (Large - 85MB)

```
truthguard-models/
├── fake_news_model.pkl                 📦 50MB
├── tfidf_word_vectorizer.pkl          📦 20MB
└── tfidf_char_vectorizer.pkl          📦 15MB
```

## 🔄 Deployment Workflow

### Initial Setup (One-Time)

```bash
# 1. Train model locally
python -m src.ml.pipeline

# 2. Install Hugging Face CLI
pip install huggingface_hub

# 3. Login to Hugging Face
huggingface-cli login

# 4. Upload models
python upload_to_huggingface.py

# 5. Update download_assets.py with your URLs

# 6. Test download
rm src/ml/artifacts/*.pkl
python src/scripts/download_assets.py

# 7. Commit and push
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Every Deployment

```bash
# 1. Make code changes
# 2. Commit and push
git push origin main

# 3. Vercel/Netlify automatically:
#    - Clones repo
#    - Installs dependencies
#    - Downloads models
#    - Deploys app
```

## 🎯 Key Benefits

### ✅ Works on Vercel/Netlify
- No Git LFS needed
- No large file commits
- Automatic model download
- Fast deployment

### ✅ Efficient Storage
- GitHub: 5MB (code only)
- Hugging Face: 85MB (models)
- Total: 90MB (properly separated)

### ✅ Fast Performance
- Models cached in memory
- <100ms prediction time
- Scales automatically

### ✅ Easy Updates
- Update code: Push to GitHub
- Update models: Upload to Hugging Face
- Both independent

## 🚀 Deployment Platforms

### Backend Options

| Platform | Pros | Cons | Cost |
|----------|------|------|------|
| **Vercel** | Easy, fast, Python support | Function size limits | Free tier |
| **Railway** | No timeouts, simple | Slightly slower | Free tier |
| **Render** | Reliable, good docs | Cold starts | Free tier |
| **Heroku** | Mature, stable | Slower deploys | $7/mo |

### Frontend Options

| Platform | Pros | Cons | Cost |
|----------|------|------|------|
| **Vercel** | Best for Next.js | None | Free tier |
| **Netlify** | Easy, fast | None | Free tier |
| **AWS Amplify** | AWS integration | More complex | Free tier |

## 📊 Performance Metrics

### Build Time
```
Clone repo:          10s
Install deps:        60s
Download models:     30s
Start app:          10s
─────────────────────────
Total:              ~2min
```

### Runtime Performance
```
Cold start:         2-5s (first request)
Warm requests:      <100ms
Model loading:      One-time per instance
Predictions:        <100ms each
```

### Resource Usage
```
Memory:             ~200MB (with models loaded)
Disk:               ~90MB (code + models)
CPU:                Low (inference only)
```

## 🔒 Security

### ✅ Secure Practices
- Models on public Hugging Face (read-only)
- No secrets in code
- Environment variables for config
- CORS properly configured

### ❌ Avoid
- Committing .pkl files to Git
- Hardcoding API keys
- Training during deployment
- Loading large CSVs in functions

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ GitHub repo < 10MB
- ✅ Models on Hugging Face
- ✅ Build completes in < 3 minutes
- ✅ App starts successfully
- ✅ First request works (may be slow)
- ✅ Subsequent requests < 100ms
- ✅ No errors in logs
- ✅ Frontend connects to backend

## 📚 Documentation Files

- `DEPLOY_NOW.md` - Quick 5-step guide
- `DEPLOYMENT_STRATEGY.md` - Complete strategy
- `DEPLOYMENT_GUIDE.md` - Detailed instructions
- `DEPLOYMENT_ARCHITECTURE.md` - This file

## 🎊 You're Ready!

Your TruthGuard project now has:

✅ Proper separation of code and assets
✅ Automatic model downloading
✅ Vercel/Netlify compatibility
✅ Fast deployment
✅ Scalable architecture
✅ Production-ready setup

**Deploy with confidence!** 🚀
