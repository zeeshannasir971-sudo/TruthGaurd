# TruthGuard Frontend Setup Guide

## Quick Start

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start the Backend (Flask)

In a separate terminal, from the project root:

```bash
# Activate virtual environment
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # Mac/Linux

# Install flask-cors if not already installed
pip install flask-cors

# Start Flask server
python app.py
```

The backend should be running on `http://127.0.0.1:5000`

### Step 3: Start the Frontend (Next.js)

In the frontend directory:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## What You'll See

### Landing Page (/)
- Beautiful hero section with gradient backgrounds
- Statistics showcase (99.7% accuracy)
- Feature explanations (TF-IDF, Sentiment Analysis, Stylistic Features)
- Use cases for different user types
- Call-to-action buttons

### URL Detection (/detect-url)
- Input field for article URLs
- Real-time analysis with loading states
- Results showing:
  - Fake/Real classification
  - Confidence percentage
  - Sentiment polarity and subjectivity
  - Related sources for verification
- Error handling with helpful messages when websites block access

### Text Detection (/detect-text)
- Large text area for pasting content
- Character counter (minimum 50 characters)
- Same analysis results as URL detection
- Clear button to reset

### About Us (/about)
- Mission statement
- Technology overview
- Team information
- Statistics and values

## Features

✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **Smooth Animations** - Framer Motion for polished UX
✅ **Error Handling** - Clear messages when things go wrong
✅ **Loading States** - Visual feedback during analysis
✅ **Dark Theme** - Modern slate/blue color scheme
✅ **Accessibility** - Semantic HTML and ARIA labels

## Troubleshooting

### "Failed to analyze the URL"
- Make sure the Flask backend is running
- Check that the URL starts with http:// or https://
- Some websites block automated access - use Text Detection instead

### "CORS Error"
- Ensure flask-cors is installed: `pip install flask-cors`
- Check that app.py has `CORS(app)` enabled

### Port Already in Use
- Next.js default port is 3000
- Flask default port is 5000
- Change ports if needed in the respective config files

### Module Not Found
- Run `npm install` in the frontend directory
- Make sure you're using Node.js 18+

## Customization

### Change API Endpoint
If your Flask backend runs on a different address, update the axios calls in:
- `app/detect-url/page.tsx`
- `app/detect-text/page.tsx`

Change `http://127.0.0.1:5000` to your backend URL.

### Modify Colors
Edit `tailwind.config.ts` to change the color scheme.

### Add New Pages
Create new folders in `app/` directory following Next.js 14 app router conventions.

## Production Deployment

### Build the Frontend
```bash
npm run build
npm start
```

### Deploy Options
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** (see Dockerfile if provided)

## Tech Stack Details

- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Lucide React** - Beautiful icon set

## Support

For issues or questions:
1. Check that both frontend and backend are running
2. Verify all dependencies are installed
3. Check browser console for errors
4. Review Flask terminal for backend errors

Enjoy using TruthGuard! 🛡️
