# 🚀 Deploy TruthGuard (Free Version)

This guide provides exact instructions to deploy TruthGuard completely for **FREE**.

## 🏗️ Architecture
- **Frontend:** Netlify (Free)
- **Backend:** Hugging Face Spaces (Free - No Credit Card Required)
- **Models:** Hugging Face (Integrated)

---

## 1️⃣ Deploy Backend (Hugging Face Spaces)

We will deploy the Python backend on Hugging Face Spaces, which offers generous free resources for ML apps.

1.  **Log in to Hugging Face**
    - Go to [huggingface.co](https://huggingface.co) and log in.

2.  **Create a New Space**
    - Click your profile picture > **"New Space"**.
    - **Space Name:** `truthguard-backend`
    - **License:** `MIT` (optional)
    - **SDK:** Select **Docker** (Important! Do not select Streamlit/Gradio).
    - **Space Hardware:** Select **"Free"** (2 vCPU · 16GB RAM).
    - Click **"Create Space"**.

3.  **Connect to GitHub**
    - In your new Space, verify you are in the **"App"** tab (or go to "Settings").
    - We will deploy by pushing our code to this Space. The easiest way is to mirror or push your existing GitHub repo.
    - **Option A (Easy):** Go to **"Settings"** tab in your Space > **"Git repository"** section > Connect your GitHub repository `zeeshannasir971-sudo/TruthGaurd`.
    - **Option B (Manual):** Hugging Face gives you a git command. You can add it as a remote and push:
      ```bash
      git remote add space https://huggingface.co/spaces/YOUR_USERNAME/truthguard-backend
      git push space main
      ```

4.  **Wait for Build**
    - The Space will start "Building". It might take 3-5 minutes as it installs dependencies and downloads the models.
    - Once "Running", you will see your API is live.
    - **Get the URL:** Click the **Embed this space** button (top right) or look at the URL bar. It usually looks like:
      `https://yourusername-truthguard-backend.hf.space`
      (Make sure to use the direct URL, not the iframe one. Right-click the "Direct URL" link if available, or just append `/` to the domain).

---

## 2️⃣ Deploy Frontend (Netlify)

1.  **Log in to Netlify**
    - Go to [app.netlify.com](https://app.netlify.com).

2.  **Add New Site**
    - Click **"Add new site"** > **"Import an existing project"**.

3.  **Connect to GitHub**
    - Select **GitHub** and choose `zeeshannasir971-sudo/TruthGaurd`.

4.  **Configure Build**
    - **Base directory:** `frontend`
    - **Build command:** `npm run build`
    - **Publish directory:** `.next`
    - Click **"Deploy"**.

5.  **Connect to Backend**
    - Go to **"Site configuration"** > **"Environment variables"**.
    - Add Variable:
        - **Key:** `NEXT_PUBLIC_API_URL`
        - **Value:** Your Hugging Face Space URL (e.g., `https://zeeshann07-truthguard-backend.hf.space`)
          *Note: Ensure no trailing slash `/` at the end unless your code expects it.*
    - Go to **"Deploys"** and **"Trigger deploy"** to update the site.

---

## ✅ Done!
- **Frontend:** Netlify
- **Backend:** Hugging Face Spaces (Docker)
- **Cost:** $0/month

