# 🔄 Deployment Flow Diagram

## Visual Guide: From Local to Production

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR LOCAL COMPUTER                          │
│                                                                   │
│  ┌──────────────┐         ┌──────────────┐                      │
│  │   Backend    │         │   Frontend   │                      │
│  │  (Flask API) │         │  (Next.js)   │                      │
│  │              │         │              │                      │
│  │ Port: 5000   │◄───────►│ Port: 3000   │                      │
│  └──────────────┘         └──────────────┘                      │
│         │                        │                               │
│         │                        │                               │
│         └────────┬───────────────┘                               │
│                  │                                               │
│                  ▼                                               │
│         ┌─────────────────┐                                     │
│         │   Git Commit    │                                     │
│         └─────────────────┘                                     │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ git push
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                          GITHUB                                  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Repository: truthguard-fake-news-detection            │    │
│  │                                                          │    │
│  │  ✅ Source code                                         │    │
│  │  ✅ Configuration files                                 │    │
│  │  ✅ Documentation                                       │    │
│  │  ❌ NO .pkl files (excluded by .gitignore)             │    │
│  │  ❌ NO .csv files (excluded by .gitignore)             │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
└───────────────────┬─────────────────┬───────────────────────────┘
                    │                 │
        ┌───────────┘                 └───────────┐
        │                                         │
        │ Auto-deploy                             │ Auto-deploy
        │                                         │
        ▼                                         ▼
┌──────────────────────┐              ┌──────────────────────┐
│      RAILWAY         │              │       VERCEL         │
│   (Backend Host)     │              │   (Frontend Host)    │
│                      │              │                      │
│  1. Clone from       │              │  1. Clone from       │
│     GitHub           │              │     GitHub           │
│                      │              │                      │
│  2. Install Python   │              │  2. Install Node.js  │
│     dependencies     │              │     dependencies     │
│                      │              │                      │
│  3. Run download     │              │  3. Build Next.js    │
│     script ──────────┼──────┐       │     app              │
│                      │      │       │                      │
│  4. Start Flask      │      │       │  4. Deploy static    │
│     server           │      │       │     + serverless     │
│                      │      │       │                      │
│  URL:                │      │       │  URL:                │
│  your-app.railway    │      │       │  your-app.vercel     │
│  .app                │      │       │  .app                │
└──────────────────────┘      │       └──────────────────────┘
                              │
                              │ Downloads models
                              │
                              ▼
                    ┌──────────────────────┐
                    │   HUGGING FACE HUB   │
                    │                      │
                    │  Repository:         │
                    │  zeeshann07/         │
                    │  truthguard-models   │
                    │                      │
                    │  Files:              │
                    │  ✅ fake_news_model  │
                    │     .pkl (1.1 MB)    │
                    │  ✅ tfidf_word       │
                    │     _vectorizer.pkl  │
                    │     (52.6 MB)        │
                    │  ✅ tfidf_char       │
                    │     _vectorizer.pkl  │
                    │     (3.2 MB)         │
                    └──────────────────────┘
```

---

## 🔄 Request Flow (Production)

```
┌──────────────┐
│    USER      │
│   Browser    │
└──────┬───────┘
       │
       │ 1. Visit https://your-app.vercel.app
       │
       ▼
┌──────────────────────────────────────┐
│         VERCEL (Frontend)            │
│                                      │
│  • Serves Next.js pages              │
│  • Handles routing                   │
│  • Renders UI                        │
└──────┬───────────────────────────────┘
       │
       │ 2. User submits URL/text
       │    POST request to API
       │
       ▼
┌──────────────────────────────────────┐
│       RAILWAY (Backend)              │
│                                      │
│  • Receives request                  │
│  • Loads ML models (cached)          │
│  • Extracts text (if URL)            │
│  • Preprocesses text                 │
│  • Runs prediction                   │
│  • Analyzes sentiment                │
│  • Searches for corroboration        │
│  • Returns JSON response             │
└──────┬───────────────────────────────┘
       │
       │ 3. JSON response with results
       │
       ▼
┌──────────────────────────────────────┐
│         VERCEL (Frontend)            │
│                                      │
│  • Receives API response             │
│  • Renders results                   │
│  • Shows confidence score            │
│  • Displays related articles         │
└──────┬───────────────────────────────┘
       │
       │ 4. Display results
       │
       ▼
┌──────────────┐
│    USER      │
│   Browser    │
└──────────────┘
```

---

## 📦 What Goes Where?

### GitHub (Code Repository)
```
✅ Include:
- Source code (.py, .tsx, .ts, .js)
- Configuration files
- Documentation
- .gitignore
- requirements.txt
- package.json

❌ Exclude:
- Model files (.pkl)
- Datasets (.csv)
- node_modules/
- .venv/
- __pycache__/
```

### Hugging Face (Model Storage)
```
✅ Include:
- fake_news_model.pkl
- tfidf_word_vectorizer.pkl
- tfidf_char_vectorizer.pkl

Purpose:
- Permanent storage for large ML files
- Fast CDN delivery
- Version control for models
- Public or private access
```

### Railway (Backend Hosting)
```
✅ Runs:
- Flask API server
- Python 3.12 runtime
- Model inference
- Web scraping
- Sentiment analysis

✅ Downloads:
- Models from Hugging Face (on first deploy)
- Caches models for future requests

✅ Exposes:
- REST API endpoint
- HTTPS URL
- CORS enabled
```

### Vercel (Frontend Hosting)
```
✅ Runs:
- Next.js application
- React components
- Static pages
- API routes (if needed)

✅ Features:
- Automatic HTTPS
- Global CDN
- Instant cache invalidation
- Zero-config deployment
```

---

## 🔐 Environment Variables

### Backend (Railway)
```env
PYTHON_VERSION=3.12
FLASK_ENV=production
PORT=5000
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

**Important:** 
- `NEXT_PUBLIC_` prefix makes variable available in browser
- Update this when backend URL changes
- No trailing slash in URL

---

## ⚡ Deployment Triggers

### Automatic Deployment
```
Local Changes
    │
    ├─► git commit
    │
    ├─► git push to GitHub
    │
    ├─► GitHub webhook triggers
    │
    ├─► Railway rebuilds backend
    │   └─► Downloads models if missing
    │
    └─► Vercel rebuilds frontend
        └─► Uses new backend URL
```

### Manual Deployment
```bash
# Backend (if using Vercel CLI)
vercel --prod

# Frontend
cd frontend
vercel --prod
```

---

## 🧪 Testing Flow

### 1. Local Testing
```bash
# Terminal 1: Backend
python app.py

# Terminal 2: Frontend
cd frontend
npm run dev

# Browser: http://localhost:3000
```

### 2. Production Testing
```bash
# Test backend directly
curl -X POST https://your-backend.railway.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"mode":"text","text":"Test article"}'

# Test frontend
# Open: https://your-frontend.vercel.app
# Use the UI to test
```

---

## 🔄 Update Workflow

```
1. Make changes locally
   ├─► Edit code
   ├─► Test locally
   └─► Verify it works

2. Commit changes
   ├─► git add .
   ├─► git commit -m "Description"
   └─► git push origin main

3. Automatic deployment
   ├─► Railway detects push
   ├─► Rebuilds backend
   ├─► Vercel detects push
   └─► Rebuilds frontend

4. Verify production
   ├─► Check Railway logs
   ├─► Check Vercel logs
   ├─► Test live site
   └─► Monitor for errors
```

---

## 📊 Monitoring

### Railway Dashboard
- View logs in real-time
- Monitor CPU/memory usage
- Check deployment status
- View environment variables

### Vercel Dashboard
- View build logs
- Monitor bandwidth usage
- Check deployment status
- View analytics

### Hugging Face
- Monitor download count
- Check model versions
- View repository stats

---

## 🚨 Troubleshooting Flow

```
Issue Detected
    │
    ├─► Check browser console
    │   └─► Frontend errors?
    │       ├─► Yes → Check Vercel logs
    │       └─► No → Continue
    │
    ├─► Check network tab
    │   └─► API request failing?
    │       ├─► Yes → Check Railway logs
    │       └─► No → Continue
    │
    ├─► Check Railway logs
    │   └─► Model loading error?
    │       ├─► Yes → Verify Hugging Face
    │       └─► No → Continue
    │
    └─► Check environment variables
        └─► Correct API URL?
            ├─► Yes → Check CORS
            └─► No → Update in Vercel
```

---

## 💡 Best Practices

### 1. Version Control
```bash
# Always commit with meaningful messages
git commit -m "Add feature: user authentication"

# Use branches for big changes
git checkout -b feature/new-model
```

### 2. Environment Variables
```bash
# Never commit secrets
# Use .env files locally
# Use platform dashboards for production
```

### 3. Testing
```bash
# Test locally before pushing
# Use staging environment if available
# Monitor logs after deployment
```

### 4. Documentation
```bash
# Update README when adding features
# Document API changes
# Keep deployment guides current
```

---

## 🎯 Success Metrics

### Deployment Success
- ✅ Backend responds to health checks
- ✅ Frontend loads without errors
- ✅ Models download successfully
- ✅ API requests complete in <2s
- ✅ CORS configured correctly
- ✅ HTTPS enabled on both services

### Performance
- ✅ First load: <3 seconds
- ✅ API response: <1 second
- ✅ Model inference: <500ms
- ✅ 99.9% uptime

---

**For detailed step-by-step instructions, see `GITHUB_DEPLOYMENT_GUIDE.md`**

**For quick deployment, see `QUICK_DEPLOY.md`**
