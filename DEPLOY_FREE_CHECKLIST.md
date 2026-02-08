# Deploy TruthGuard for Free – Checklist

Your project is **ready to deploy**. These steps are all free (no credit card).

---

## What was fixed for deployment

1. **Missing API client** – Added `frontend/lib/api.ts` so the frontend can call your backend (it was imported but the file did not exist).
2. **Netlify + Next.js** – Set `output: "export"` in `next.config.js` and `publish = "out"` in `frontend/netlify.toml` so Netlify can host the static site correctly.

---

## Step 1: Deploy backend (Hugging Face Spaces)

1. Go to [huggingface.co](https://huggingface.co) and log in (or sign up).
2. Click your profile picture → **New Space**.
3. Settings:
   - **Space name:** `truthguard-backend`
   - **SDK:** **Docker** (not Streamlit/Gradio).
   - **Hardware:** **Free** (2 vCPU · 16GB RAM).
4. Create the Space, then connect your code:
   - **Option A:** In the Space → **Settings** → **Git repository** → connect your GitHub repo (e.g. `zeeshannasir971-sudo/TruthGaurd`).
   - **Option B:** Add the Space as a git remote and push:
     ```bash
     git remote add space https://huggingface.co/spaces/YOUR_USERNAME/truthguard-backend
     git push space main
     ```
5. Wait for the Space to **build** (a few minutes). When it shows **Running**, copy the Space URL (e.g. `https://YOUR_USERNAME-truthguard-backend.hf.space`). No trailing slash.

---

## Step 2: Deploy frontend (Netlify)

1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. **Add new site** → **Import an existing project** → **GitHub** → choose your repo (e.g. `TruthGaurd`).
3. Build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. **Add environment variable:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: your Hugging Face Space URL from Step 1 (e.g. `https://YOUR_USERNAME-truthguard-backend.hf.space`)
5. Click **Deploy**. After the build finishes, your site URL will be something like `https://something.netlify.app`.

---

## Step 3: Test

- Open your Netlify URL and try **Detect URL** and **Detect Text**. They should call your backend on Hugging Face.

---

## Summary

| Part      | Where              | Cost   |
|----------|--------------------|--------|
| Backend  | Hugging Face Space | Free   |
| Frontend | Netlify             | Free   |
| **Total**|                    | **$0** |

If you change the backend URL later, update `NEXT_PUBLIC_API_URL` in Netlify (Site configuration → Environment variables) and trigger a new deploy.
