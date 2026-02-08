"""
Startup script that runs before the Flask app starts.
Downloads models if they don't exist.
"""
import os
import sys

def ensure_models_downloaded():
    """Ensure ML models are downloaded before app starts."""
    from pathlib import Path
    
    artifacts_dir = Path("src/ml/artifacts")
    required_files = [
        "fake_news_model.pkl",
        "tfidf_word_vectorizer.pkl",
        "tfidf_char_vectorizer.pkl"
    ]
    
    # Check if all models exist
    all_exist = all((artifacts_dir / f).exists() for f in required_files)
    
    if not all_exist:
        print("=" * 60)
        print("🚀 First-time setup: Downloading ML models...")
        print("=" * 60)
        
        try:
            from src.scripts.download_assets import download_models, verify_models
            
            success = download_models()
            if success and verify_models():
                print("\n✅ Models ready! Starting application...")
            else:
                print("\n⚠️  Warning: Some models may be missing")
                print("The app will attempt to download them on first request")
        except Exception as e:
            print(f"\n⚠️  Could not download models during startup: {e}")
            print("Models will be downloaded on first API request")
    else:
        print("✅ All models present. Starting application...")

if __name__ == "__main__":
    ensure_models_downloaded()
