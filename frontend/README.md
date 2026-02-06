# TruthGuard - Fake News Detection Frontend

A modern, responsive Next.js frontend for the AI-powered fake news detection system.

## Features

- 🎨 Beautiful landing page with animations
- 🔍 URL-based article analysis
- 📝 Text-based content analysis
- 📊 Real-time sentiment analysis visualization
- 🔗 Web corroboration with related sources
- 📱 Fully responsive design
- ⚡ Fast and optimized with Next.js 14

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API requests
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend Flask server running on `http://127.0.0.1:5000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── about/
│   │   └── page.tsx          # About us page
│   ├── detect-url/
│   │   └── page.tsx          # URL detection page
│   ├── detect-text/
│   │   └── page.tsx          # Text detection page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── Navbar.tsx            # Navigation component
├── public/                   # Static assets
└── package.json
```

## Pages

### Landing Page (`/`)
- Hero section with call-to-action
- Feature highlights
- Statistics showcase
- Use cases
- Call-to-action sections

### About Us (`/about`)
- Mission statement
- Technology overview
- Team information
- Core values

### URL Detection (`/detect-url`)
- URL input and analysis
- Real-time results
- Sentiment metrics
- Related sources
- Error handling for blocked websites

### Text Detection (`/detect-text`)
- Text area for content input
- Character count validation
- Analysis results
- Sentiment visualization
- Related articles

## API Integration

The frontend connects to the Flask backend at `http://127.0.0.1:5000/analyze`

### Request Format:
```json
{
  "mode": "url" | "text",
  "url": "https://example.com/article",  // for URL mode
  "text": "Article content..."            // for text mode
}
```

### Response Format:
```json
{
  "result": {
    "label": 0 | 1,
    "prob_fake": 0.0-1.0,
    "sentiment": {
      "polarity": -1.0-1.0,
      "subjectivity": 0.0-1.0
    }
  },
  "corroboration": [
    {
      "title": "Article title",
      "link": "https://...",
      "snippet": "Preview text"
    }
  ]
}
```

## Building for Production

```bash
npm run build
npm start
```

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme.

### API Endpoint
Update the API endpoint in the detection pages if your backend runs on a different address.

## Error Handling

The frontend handles various error scenarios:
- Invalid URLs
- Website blocking automated access
- Network errors
- Insufficient text length
- Backend unavailability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Part of the TruthGuard Fake News Detection System
