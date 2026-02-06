# TruthGuard - Deployment Guide

## ✅ Project Status: READY FOR DEPLOYMENT

Both frontend and backend are running successfully with zero errors!

## Current Running Services

### Backend (Flask)
- **URL:** http://127.0.0.1:5000
- **Status:** ✅ Running
- **Features:** AI detection, sentiment analysis, web scraping, corroboration

### Frontend (Next.js)
- **URL:** http://localhost:3000
- **Status:** ✅ Running
- **Features:** Landing page, URL detection, text detection, about page

## Local Development

### Start Backend
```bash
python app.py
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## Production Deployment

### Backend Deployment (Flask)

#### Option 1: Heroku
```bash
# Install Heroku CLI
# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Install gunicorn
pip install gunicorn
pip freeze > requirements.txt

# Deploy
heroku create your-app-name
git push heroku main
```

#### Option 2: AWS EC2
1. Launch EC2 instance (Ubuntu)
2. Install Python and dependencies
3. Use Gunicorn + Nginx
4. Configure security groups (port 5000)

#### Option 3: DigitalOcean App Platform
1. Connect GitHub repository
2. Select Python app
3. Set build command: `pip install -r requirements.txt`
4. Set run command: `gunicorn app:app`

### Frontend Deployment (Next.js)

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variable
# NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

#### Option 2: Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variable: `NEXT_PUBLIC_API_URL`

#### Option 3: AWS Amplify
1. Connect repository
2. Build settings: Auto-detected
3. Add environment variables
4. Deploy

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000  # Local
# NEXT_PUBLIC_API_URL=https://your-backend.com  # Production
```

### Backend
No environment variables required for basic setup.

## Production Checklist

### Backend
- [ ] Install gunicorn: `pip install gunicorn`
- [ ] Update Flask debug mode to False
- [ ] Configure CORS for production domain
- [ ] Set up SSL/HTTPS
- [ ] Configure rate limiting
- [ ] Set up logging
- [ ] Configure database (if needed)

### Frontend
- [ ] Update API_URL to production backend
- [ ] Build for production: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Configure custom domain
- [ ] Set up SSL/HTTPS
- [ ] Enable analytics (optional)

## Docker Deployment

### Backend Dockerfile
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

### Frontend Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000
    depends_on:
      - backend
```

## Performance Optimization

### Backend
- Use Gunicorn with multiple workers
- Enable caching for model predictions
- Implement request rate limiting
- Use CDN for static assets

### Frontend
- Enable Next.js image optimization
- Use static generation where possible
- Implement lazy loading
- Enable compression

## Monitoring

### Backend
- Set up error logging (Sentry)
- Monitor API response times
- Track model prediction accuracy
- Monitor server resources

### Frontend
- Set up analytics (Google Analytics, Plausible)
- Monitor Core Web Vitals
- Track user interactions
- Monitor error rates

## Security

### Backend
- Enable HTTPS only
- Implement rate limiting
- Validate all inputs
- Keep dependencies updated
- Use environment variables for secrets

### Frontend
- Enable HTTPS only
- Implement CSP headers
- Sanitize user inputs
- Keep dependencies updated
- Use secure cookies

## Scaling

### Backend
- Horizontal scaling with load balancer
- Use Redis for caching
- Implement queue system for heavy tasks
- Database replication (if using DB)

### Frontend
- Use CDN for static assets
- Enable edge caching
- Implement service workers
- Use image optimization

## Cost Estimation

### Free Tier Options
- **Backend:** Heroku free tier, Railway free tier
- **Frontend:** Vercel free tier, Netlify free tier
- **Total:** $0/month for low traffic

### Production (Medium Traffic)
- **Backend:** $7-25/month (Heroku, DigitalOcean)
- **Frontend:** $0-20/month (Vercel Pro if needed)
- **Domain:** $10-15/year
- **Total:** ~$10-50/month

## Support & Maintenance

### Regular Tasks
- Update dependencies monthly
- Retrain model with new data
- Monitor error logs
- Review user feedback
- Update documentation

### Backup Strategy
- Backup model files
- Backup configuration
- Version control all code
- Document deployment process

## Troubleshooting

### Backend Issues
- Check Flask logs
- Verify all dependencies installed
- Check CORS configuration
- Verify model files exist

### Frontend Issues
- Check browser console
- Verify API URL is correct
- Check network tab for failed requests
- Verify environment variables

## Success Metrics

### Technical
- 99.9% uptime
- <3s average response time
- <100ms API latency
- Zero critical errors

### Business
- User engagement rate
- Analysis completion rate
- User retention
- Feature usage statistics

## Next Steps

1. ✅ Local development working
2. ⏭️ Choose deployment platforms
3. ⏭️ Set up CI/CD pipeline
4. ⏭️ Configure monitoring
5. ⏭️ Launch to production
6. ⏭️ Gather user feedback
7. ⏭️ Iterate and improve

---

**Congratulations!** Your TruthGuard fake news detection system is ready for deployment! 🎉

For questions or support, refer to the documentation or create an issue in the repository.
