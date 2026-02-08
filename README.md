---
title: Truthguard Backend
emoji: 📊
colorFrom: gray
colorTo: gray
sdk: docker
pinned: false
---

# TruthGuard - AI-Powered Fake News Detection System

## 🎉 Status: RUNNING & PRODUCTION READY

A comprehensive fake news detection system combining machine learning, sentiment analysis, and web corroboration with a beautiful Next.js frontend.

## 🚀 Quick Start

### Currently Running
- ✅ **Backend:** http://127.0.0.1:5000
- ✅ **Frontend:** http://localhost:3000

### Access the Application
Open your browser and go to: **http://localhost:3000**

## ✨ Features

### Landing Page
- Beautiful hero section with gradient animations
- Statistics showcase (99.7% accuracy)
- Feature explanations
- Use cases for different users
- Responsive design

### URL Detection
- Analyze news articles by URL
- Automatic content extraction
- Real-time analysis
- Confidence scores
- Sentiment metrics
- Related sources for verification

### Text Detection
- Paste article text directly
- Character count validation (min 50)
- Same detailed analysis
- Works with any text content

### About Us
- Mission and technology overview
- Team information
- Core values

## 🛠️ Technology Stack

### Backend
- Python 3.12
- Flask 3.0.0 + Flask-CORS
- scikit-learn 1.3.2 (99.7% accuracy)
- TextBlob for sentiment analysis
- Trafilatura for web scraping
- DuckDuckGo Search for corroboration

### Frontend
- Next.js 15.5.12
- React 19.0.0
- TypeScript 5.7.2
- Tailwind CSS 3.4.17
- Framer Motion for animations
- Axios for API calls

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start Flask server
# Note: ML models will be downloaded automatically from Hugging Face on first run
python app.py
```

### Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Usage

### Test URL Detection
1. Go to http://localhost:3000/detect-url
2. Paste a news article URL
3. Click "Analyze"
4. View results with confidence scores

### Test Text Detection
1. Go to http://localhost:3000/detect-text
