# 📤 Step-by-Step Guide: Upload Models to Hugging Face

## 🎯 What You'll Do

Upload your 3 trained model files (.pkl) to Hugging Face so they can be downloaded during deployment.

## ⏱️ Time Required: 10-15 minutes

---

## 📋 Prerequisites

✅ Models trained (you already have these in `src/ml/artifacts/`)
✅ Internet connection
✅ Hugging Face account (we'll create if needed)

---

## 🚀 Step 1: Create Hugging Face Account

### If you DON'T have an account:

1. **Open browser** and go to: https://huggingface.co/join

2. **Fill in the form:**
   - Email: your-email@example.com
   - Username: choose a username (remember this!)
   - Password: create a strong password

3. **Verify your email**
   - Check your inbox
   - Click the verification link

4. **Done!** You now have a Hugging Face account

### If you ALREADY have an account:

✅ Skip to Step 2!

---

## 🔑 Step 2: Get Your Access Token

1. **Login to Hugging Face:** https://huggingface.co/login

2. **Go to Settings:** https://huggingface.co/settings/tokens

3. **Click "New token"** button

4. **Fill in the form:**
   - Name: `truthguard-upload`
   - Type: Select **"Write"** (important!)
   - Click **"Generate token"**

5. **Copy the token**
   - It looks like: `hf_xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Keep it safe!** You'll need it in the next step
   - Don't share it with anyone

---

## 📤 Step 3: Run Upload Script

### Open your terminal and run:

```bash
python upload_models_simple.py
```

### The script will ask you for:

**1. Your Hugging Face Token**
```
📋 Paste your Hugging Face token here: 
```
→ Paste the token you copied in Step 2
→ Press Enter

**2. Your Username**
```
👤 Enter your Hugging Face username: 
```
→ Type your username (from Step 1)
→ Press Enter

### What happens next:

The script will:
1. ✅ Login to Hugging Face
2. ✅ Create a repository called `truthguard-models`
3. ✅ Upload `fake_news_model.pkl` (~50MB)
4. ✅ Upload `tfidf_word_vectorizer.pkl` (~20MB)
5. ✅ Upload `tfidf_char_vectorizer.pkl` (~15MB)

**This takes 5-10 minutes depending on your internet speed.**

---

## 📝 Step 4: Update Configuration

After upload completes, the script will show you:

```
📝 NEXT STEP: Update Configuration
Edit: src/scripts/download_assets.py

Replace this line:
  HUGGINGFACE_BASE_URL = "https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main"

With:
  HUGGINGFACE_BASE_URL = "https://huggingface.co/your-actual-username/truthguard-models/resolve/main"
```

### Do this:

1. **Open file:** `src/scripts/download_assets.py`

2. **Find line 11:**
   ```python
   HUGGINGFACE_BASE_URL = "https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main"
   ```

3. **Replace `YOUR_USERNAME` with your actual username**
   ```python
   HUGGINGFACE_BASE_URL = "https://huggingface.co/john-doe/truthguard-models/resolve/main"
   ```

4. **Save the file**

---

## ✅ Step 5: Test Download

Now test that the download works:

```bash
# Delete local models
rm src/ml/artifacts/*.pkl

# Test download
python src/scripts/download_assets.py
```

### Expected output:

```
============================================================
TruthGuard Model Downloader
============================================================
📁 Artifacts directory: src\ml\artifacts

📥 Downloading 3 file(s)...

Downloading fake_news_model.pkl...
  Progress: 100.0%
✅ Downloaded fake_news_model.pkl (50.2 MB)

Downloading tfidf_word_vectorizer.pkl...
  Progress: 100.0%
✅ Downloaded tfidf_word_vectorizer.pkl (20.1 MB)

Downloading tfidf_char_vectorizer.pkl...
  Progress: 100.0%
✅ Downloaded tfidf_char_vectorizer.pkl (15.3 MB)

============================================================
✅ Successfully downloaded 3/3 files
============================================================

🔍 Verifying model files...
  ✅ fake_news_model.pkl (50.2 MB)
  ✅ tfidf_word_vectorizer.pkl (20.1 MB)
  ✅ tfidf_char_vectorizer.pkl (15.3 MB)

✅ All models ready for deployment!
```

---

## 🎉 Success!

If you see the output above, you're done! Your models are:

✅ Uploaded to Hugging Face
✅ Publicly accessible
✅ Ready for deployment
✅ Will download automatically on Vercel/Netlify

---

## 🔗 View Your Models

Your models are now at:
```
https://huggingface.co/YOUR_USERNAME/truthguard-models
```

You can:
- View the files
- Download them manually
- Share the link
- Use them in deployment

---

## 🚀 Next Steps

Now you can deploy!

### Deploy Backend:
```bash
vercel
```

### Deploy Frontend:
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=https://your-backend.vercel.app" > .env.production
vercel --prod
```

---

## 🆘 Troubleshooting

### "Token invalid"
→ Get a new token from https://huggingface.co/settings/tokens
→ Make sure you selected "Write" type

### "Upload failed"
→ Check your internet connection
→ Try again (script is safe to re-run)

### "Models not found"
→ Train models first: `python -m src.ml.pipeline`

### "Permission denied"
→ Make sure token has "Write" permissions
→ Check repository name is correct

---

## 📞 Need Help?

1. Check the error message carefully
2. Try running the script again
3. Make sure you have a stable internet connection
4. Verify your token has "Write" permissions

---

## ✅ Checklist

- [ ] Created Hugging Face account
- [ ] Got access token (Write permission)
- [ ] Ran `python upload_models_simple.py`
- [ ] Pasted token when asked
- [ ] Entered username when asked
- [ ] All 3 files uploaded successfully
- [ ] Updated `src/scripts/download_assets.py`
- [ ] Tested download with `python src/scripts/download_assets.py`
- [ ] All models downloaded successfully

**If all checked, you're ready to deploy!** 🎊
