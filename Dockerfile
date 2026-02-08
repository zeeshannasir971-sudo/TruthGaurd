FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy application code
COPY . .

# Download models during build
RUN python -c "from src.scripts.download_assets import download_models; download_models()"

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Set environment variables
ENV FLASK_ENV=production
ENV PORT=7860

# Run with Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
