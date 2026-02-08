# 🚀 Deploy TruthGuard Now

This guide provides exact step-by-step instructions to deploy TruthGuard using the configurations we've just set up.

## 🏗️ Architecture
- **Frontend:** Netlify (configured via `netlify.toml`)
- **Backend:** Render (configured via `render.yaml`)
- **Models:** Hugging Face (Auto-downloaded by Backend)

---

## 1️⃣ Deploy Frontend (Netlify)

The frontend is a Next.js application located in the `frontend/` directory.

1. **Log in to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com) and log in.

2. **Add New Site**
   - Click **"Add new site"** > **"Import an existing project"**.

3. **Connect to GitHub**
   - Select **GitHub**.
   - Authorize Netlify if asked.
   - Search for and select your repo: `zeeshannasir971-sudo/TruthGaurd`.

4. **Configure Build (Auto-Detected)**
   - Netlify will detect the `netlify.toml` file in the repository root.
   - **Base directory:** `frontend` (Important! This should be auto-filled)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** `netlify/functions` (optional/default)

5. **Deploy**
   - Click **"Deploy TruthGuard"**.
   - Wait for the build to complete (~2-3 minutes).
   - You will get a URL like `https://truthguard-xyz.netlify.app`.

---

## 2️⃣ Deploy Backend (Render)

The backend is a Python Flask application that serves the API.

1. **Log in to Render**
   - Go to [dashboard.render.com](https://dashboard.render.com).

2. **Create New Web Service**
   - Click **"New +"** button > **"Web Service"**.

3. **Connect GitHub**
   - Select **"Build and deploy from a Git repository"**.
   - Connect your GitHub account if not done.
   - Select `zeeshannasir971-sudo/TruthGaurd`.

4. **Configure Service**
   - **Name:** `truthguard-backend`
   - **Region:** Choose one close to you (e.g., Frankfurt, Oregon).
   - **Branch:** `main`
   - **Root Directory:** `.` (Leave empty or set to root)
   - **Runtime:** **Python 3**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`

5. **Deploy**
   - Choose **"Free"** plan.
   - Click **"Create Web Service"**.
   - Render will start building. Watch the logs.
   - **Note:** It will download the ML models from Hugging Face during the first start. This might take 30-60 seconds extra.

6. **Get Backend URL**
   - Once deployed, copy the URL (e.g., `https://truthguard-backend.onrender.com`).

---

## 3️⃣ Connect Frontend to Backend

Now that the backend is live, tell the frontend where to find it.

1. **Go to Netlify Dashboard**
   - Select your `TruthGuard` site.
   - Go to **"Site configuration"** > **"Environment variables"**.

2. **Add Variable**
   - Click **"Add a variable"**.
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** Your Render Backend URL (e.g., `https://truthguard-backend.onrender.com`)
   - **Scope:** All scopes (Build, Deploy, Runtime).
   - Click **"Create variable"**.

3. **Trigger New Deploy**
   - Go to **"Deploys"** tab.
   - Click **"Trigger deploy"** > **"Deploy site"**.
   - This will rebuild the frontend with the correct API URL.

---

## ✅ Done!
Your application is now fully deployed and production-ready.
- **Frontend:** Accessible via your Netlify URL.
- **Backend:** Running securely on Render.
- **Models:** Hosted on Hugging Face and loaded dynamically.
