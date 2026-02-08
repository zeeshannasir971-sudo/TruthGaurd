# TruthGuard Deployment Strategy for Vercel/Netlify

## 🎯 Problem: Large Files Don't Work on Vercel/Netlify

Vercel and Netlify have limitations:
- ❌ No Git LFS support during build
- ❌ Cannot commit large .pkl files (50MB+)
- ❌ Cannot commit large .csv files (100MB+)
- ❌ Serverless functions have size limits

## ✅ Solution: Separate Code from Assets

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     GitHub Repository                    │
│  ✅ Frontend code                                        │
│  ✅ Backend/API code                                     │
│  ✅ ML inference logic                                   │
│  ✅ Model loading code                                   │
│  ✅ Asset download script                                │
│  ❌ NO .pkl files                                        │
│  ❌ NO .csv files                                        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Hugging Face Hub / Google Drive             │
│  📦 fake_news_model.pkl (50MB)                          │
│  📦 tfidf_word_vectorizer.pkl (20MB)                    │
│  📦 tfidf_char_vectorizer.pkl (15MB)                    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Deployment (Vercel/Netlify)             │
│  1. Clone code from GitHub                               │
│  2. Run download_assets.py                               │
│  3. Download models from Hugging Face                    │
│  4. Load models into memory                              │
│  5. Start serving API                                    │
└─────────────────────────────────────────────────────────┘
```

## 📁 What Goes Where

### ✅ Commit to GitHub (Small Files)

```
project/
├── app.py                          # Flask entry point
├── startup.py                      # Model download on startup
├── requirements.txt                # Python dependencies
├── vercel.json                     # Vercel config
├── netlify.toml                    # Netlify config
├── .gitignore                      # Excludes large files
├── src/
│   ├── ml/
│   │   ├── pipeline.py            # ML logic (with lazy loading)
│   │   └── artifacts/
│   │       └── .gitkeep           # Keep directory structure
│   ├── utils/
│   │   ├── fetch.py
│   │   ├── preprocess.py
│   │   ├── sentiment.py
│   │   └── search.py
│   ├── web/
│   │   └── routes.py
│   ├── scripts/
│   │   └── download_assets.py     # Downloads models
│   └── data/
│       └── .gitkeep
└── frontend/                       # Next.js app
```

### ❌ DO NOT Commit (Large Files)

```
❌ src/ml/artifacts/*.pkl           # Model files (50MB+)
❌ src/data/*.csv                   # Dataset files (100MB+)
❌ *.h5, *.hdf5                     # Other ML formats
```

## 🚀 Step-by-Step Deployment Process

### Step 1: Upload Models to Hugging Face Hub

#### Option A: Hugging Face Hub (Recommended)

1. **Create Hugging Face Account**
   - Go to https://huggingface.co/join
   - Create account

2. **Create New Model Repository**
   ```bash
   # Install Hugging Face CLI
   pip install huggingface_hub
   
   # Login
   huggingface-cli login
   
   # Create repository
   huggingface-cli repo create truthguard-models --type model
   ```

3. **Upload Model Files**
   ```bash
   # Upload each model file
   huggingface-cli upload YOUR_USERNAME/truthguard-models \
     src/ml/artifacts/fake_news_model.pkl
   
   huggingface-cli upload YOUR_USERNAME/truthguard-models \
     src/ml/artifacts/tfidf_word_vectorizer.pkl
   
   huggingface-cli upload YOUR_USERNAME/truthguard-models \
     src/ml/artifacts/tfidf_char_vectorizer.pkl
   ```

4. **Get Public URLs**
   ```
   https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main/fake_news_model.pkl
   https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main/tfidf_word_vectorizer.pkl
   https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main/tfidf_char_vectorizer.pkl
   ```

5. **Update download_assets.py**
   ```python
   HUGGINGFACE_BASE_URL = "https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main"
   ```

#### Option B: Google Drive (Alternative)

1. **Upload Files to Google Drive**
   - Upload each .pkl file
   - Right-click → Share → Get link
   - Set to "Anyone with the link can view"

2. **Get File IDs**
   ```
   https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing
   ```

3. **Update download_assets.py**
   ```python
   MODEL_FILES = {
       "fake_news_model.pkl": {
           "url": f"{GOOGLE_DRIVE_BASE}YOUR_FILE_ID_1",
       },
       # ... other files
   }
   ```

### Step 2: Update Configuration

1. **Edit src/scripts/download_assets.py**
   - Replace `YOUR_USERNAME` with your Hugging Face username
   - Or add Google Drive file IDs

2. **Test Locally**
   ```bash
   # Delete local models
   rm src/ml/artifacts/*.pkl
   
   # Test download
   python src/scripts/download_assets.py
   
   # Should download all models successfully
   ```

### Step 3: Deploy Backend

#### Option A: Vercel (Recommended for Flask)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables** (if needed)
   ```bash
   vercel env add HUGGINGFACE_TOKEN
   ```

4. **Get Backend URL**
   ```
   https://your-project.vercel.app
   ```

#### Option B: Railway (Alternative)

1. **Connect GitHub**
   - Go to https://railway.app
   - Connect repository

2. **Configure**
   - Build command: `pip install -r requirements.txt && python src/scripts/download_assets.py`
   - Start command: `gunicorn app:app`

3. **Deploy**
   - Automatic on push

#### Option C: Render (Alternative)

1. **Create Web Service**
   - Go to https://render.com
   - New → Web Service

2. **Configure**
   - Build: `pip install -r requirements.txt && python src/scripts/download_assets.py`
   - Start: `gunicorn app:app`

### Step 4: Deploy Frontend

1. **Update API URL**
   ```bash
   cd frontend
   echo "NEXT_PUBLIC_API_URL=https://your-backend.vercel.app" > .env.production
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Or Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```

## 🔄 How It Works in Production

### First Deployment

```
1. Vercel/Netlify clones your GitHub repo
   ✅ Gets all code
   ❌ No .pkl files (excluded by .gitignore)

2. Runs build command
   ✅ pip install -r requirements.txt
   ✅ python src/scripts/download_assets.py
   
3. download_assets.py runs
   ✅ Creates src/ml/artifacts/ directory
   ✅ Downloads fake_news_model.pkl from Hugging Face
   ✅ Downloads tfidf_word_vectorizer.pkl
   ✅ Downloads tfidf_char_vectorizer.pkl
   ✅ Verifies all files present

4. App starts
   ✅ startup.py checks models exist
   ✅ Models loaded into memory
   ✅ API ready to serve requests
```

### Subsequent Requests

```
1. User makes API request
   ↓
2. load_model() called
   ↓
3. Check cache
   ✅ Models already in memory
   ↓
4. Return cached models
   ↓
5. Make prediction
   ↓
6. Return result
```

## 📊 File Sizes

```
GitHub Repository:     ~5 MB (code only)
Hugging Face Hub:      ~85 MB (models)
Deployed App:          ~90 MB (code + downloaded models)
```

## ⚠️ Common Mistakes to Avoid

### ❌ DON'T: Train model during deployment
```python
# This will FAIL on Vercel/Netlify
def deploy():
    train_model()  # ❌ Too slow, too much memory
    load_model()
```

### ✅ DO: Download pre-trained model
```python
# This WORKS
def deploy():
    download_models()  # ✅ Fast, efficient
    load_model()       # ✅ Load from disk
```

### ❌ DON'T: Load 100MB CSV in serverless function
```python
# This will FAIL
df = pd.read_csv("huge_dataset.csv")  # ❌ Too large
```

### ✅ DO: Use pre-trained model only
```python
# This WORKS
model = load_model()  # ✅ Model already trained
prediction = model.predict(text)  # ✅ Fast inference
```

### ❌ DON'T: Commit large files to Git
```bash
git add src/ml/artifacts/*.pkl  # ❌ Will fail push
```

### ✅ DO: Upload to Hugging Face
```bash
huggingface-cli upload ...  # ✅ Proper storage
```

## 🧪 Testing Before Deployment

### Test 1: Model Download
```bash
# Delete models
rm src/ml/artifacts/*.pkl

# Run download script
python src/scripts/download_assets.py

# Should succeed and download all files
```

### Test 2: App Startup
```bash
# Start app
python app.py

# Should:
# 1. Check for models
# 2. Download if missing
# 3. Start successfully
```

### Test 3: API Request
```bash
# Test prediction
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"mode":"text","text":"Test article content here..."}'

# Should return prediction
```

## 📈 Performance Expectations

### Cold Start (First Request)
```
Model download:  10-30 seconds (one-time)
Model loading:   2-5 seconds
First prediction: 3-8 seconds total
```

### Warm Requests (Subsequent)
```
Model loading:   0 seconds (cached)
Prediction:      <100ms
Total response:  <200ms
```

## 🎯 Deployment Checklist

- [ ] Models uploaded to Hugging Face Hub
- [ ] download_assets.py updated with correct URLs
- [ ] Tested model download locally
- [ ] .gitignore excludes .pkl and .csv files
- [ ] vercel.json or netlify.toml configured
- [ ] Backend deployed and tested
- [ ] Frontend .env.production updated with backend URL
- [ ] Frontend deployed
- [ ] End-to-end test successful

## 🚀 Ready to Deploy!

Your project is now structured correctly for Vercel/Netlify deployment:

1. ✅ Code in GitHub (small)
2. ✅ Models in Hugging Face (large)
3. ✅ Automatic download on deploy
4. ✅ Fast inference in production
5. ✅ No Git LFS needed
6. ✅ No large file commits

**Next Steps:**
1. Upload models to Hugging Face
2. Update download_assets.py URLs
3. Test locally
4. Deploy to Vercel/Netlify
5. Celebrate! 🎉
