# ⚡ Quick Deploy Reference

## 🚀 Deploy in 10 Minutes

### 1️⃣ Push to GitHub (2 minutes)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/truthguard.git
git push -u origin main
```

### 2️⃣ Deploy Backend to Railway (3 minutes)
1. Go to https://railway.app
2. Login with GitHub
3. New Project → Deploy from GitHub
4. Select your repository
5. Add environment variables:
   ```
   PYTHON_VERSION=3.12
   FLASK_ENV=production
   ```
6. Deploy → Copy your URL

### 3️⃣ Deploy Frontend to Vercel (3 minutes)
1. Go to https://vercel.com
2. Login with GitHub
3. Import Project → Select repository
4. **Root Directory:** `frontend` ⚠️
5. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
   ```
6. Deploy → Copy your URL

### 4️⃣ Update CORS (2 minutes)
Edit `app.py`:
```python
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "https://your-frontend.vercel.app"  # Add this
        ]
    }
})
```

Push changes:
```bash
git add app.py
git commit -m "Update CORS"
git push
```

### ✅ Done!
Visit your frontend URL and test the application.

---

## 🔗 Important URLs

### Your Deployments
- **Frontend:** `https://__________.vercel.app`
- **Backend:** `https://__________.railway.app`
- **Models:** `https://huggingface.co/zeeshann07/truthguard-models`
- **GitHub:** `https://github.com/________/truthguard`

### Dashboards
- **Railway:** https://railway.app/dashboard
- **Vercel:** https://vercel.com/dashboard
- **Hugging Face:** https://huggingface.co/zeeshann07

---

## 🧪 Test Commands

### Test Backend
```bash
curl -X POST https://your-backend.railway.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"mode":"text","text":"Test article about breaking news."}'
```

### Test Frontend
1. Open: `https://your-frontend.vercel.app`
2. Go to "Detect by Text"
3. Paste sample text
4. Click "Analyze"

---

## 🔄 Update Deployment

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Both Railway and Vercel auto-deploy!
```

---

## ⚠️ Common Issues

### "Models not found"
- Check Railway logs
- Verify Hugging Face models are public
- Rebuild deployment

### CORS errors
- Update `app.py` with frontend URL
- Push changes to GitHub
- Wait for Railway to redeploy

### Frontend can't connect
- Check `NEXT_PUBLIC_API_URL` in Vercel settings
- Verify backend URL is correct
- Check backend is running

---

## 📋 Deployment Checklist

**Before deploying:**
- [x] Models on Hugging Face
- [x] Code works locally
- [x] `.gitignore` excludes `.pkl` files

**After deploying:**
- [ ] Backend responds to requests
- [ ] Frontend loads correctly
- [ ] Test URL detection
- [ ] Test text detection
- [ ] Check mobile view

---

## 💡 Pro Tips

1. **Free Tiers:**
   - Railway: $5 free credit/month
   - Vercel: Unlimited for personal projects
   - Render: Free tier available (slower)

2. **Custom Domains:**
   - Add in Vercel/Railway settings
   - Update DNS records
   - Free SSL included

3. **Monitoring:**
   - Check Railway logs for errors
   - Use Vercel Analytics
   - Monitor API response times

4. **Scaling:**
   - Railway auto-scales
   - Vercel handles traffic spikes
   - Models cached after first load

---

**Need detailed instructions? See `GITHUB_DEPLOYMENT_GUIDE.md`**
