"""
Download ML model artifacts from remote storage.
This runs automatically on deployment to Vercel/Netlify.
"""
import os
import requests
from pathlib import Path

# Configuration
HUGGINGFACE_BASE_URL = "https://huggingface.co/zeeshann07/truthguard-models/resolve/main"
# Alternative: Use Google Drive public links
GOOGLE_DRIVE_BASE = "https://drive.google.com/uc?export=download&id="

# Model file IDs (you'll replace these after uploading)
MODEL_FILES = {
    "fake_news_model.pkl": {
        "url": f"{HUGGINGFACE_BASE_URL}/fake_news_model.pkl",
        # "url": f"{GOOGLE_DRIVE_BASE}YOUR_FILE_ID_HERE",  # Alternative
        "size_mb": 50
    },
    "tfidf_word_vectorizer.pkl": {
        "url": f"{HUGGINGFACE_BASE_URL}/tfidf_word_vectorizer.pkl",
        "size_mb": 20
    },
    "tfidf_char_vectorizer.pkl": {
        "url": f"{HUGGINGFACE_BASE_URL}/tfidf_char_vectorizer.pkl",
        "size_mb": 15
    }
}

ARTIFACTS_DIR = Path(__file__).parent.parent / "ml" / "artifacts"


def download_file(url: str, destination: Path, chunk_size: int = 8192):
    """Download a file with progress indication."""
    print(f"Downloading {destination.name}...")
    
    try:
        response = requests.get(url, stream=True, timeout=300)
        response.raise_for_status()
        
        total_size = int(response.headers.get('content-length', 0))
        downloaded = 0
        
        with open(destination, 'wb') as f:
            for chunk in response.iter_content(chunk_size=chunk_size):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_size > 0:
                        progress = (downloaded / total_size) * 100
                        print(f"  Progress: {progress:.1f}%", end='\r')
        
        print(f"\n✅ Downloaded {destination.name} ({downloaded / 1024 / 1024:.1f} MB)")
        return True
        
    except Exception as e:
        print(f"❌ Failed to download {destination.name}: {str(e)}")
        return False


def check_model_exists(filename: str) -> bool:
    """Check if model file already exists."""
    filepath = ARTIFACTS_DIR / filename
    return filepath.exists() and filepath.stat().st_size > 0


def download_models():
    """Download all required model files."""
    print("=" * 60)
    print("TruthGuard Model Downloader")
    print("=" * 60)
    
    # Create artifacts directory if it doesn't exist
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"📁 Artifacts directory: {ARTIFACTS_DIR}")
    
    # Check which files need downloading
    files_to_download = []
    for filename, info in MODEL_FILES.items():
        if check_model_exists(filename):
            print(f"✅ {filename} already exists (skipping)")
        else:
            files_to_download.append((filename, info))
    
    if not files_to_download:
        print("\n🎉 All model files are already downloaded!")
        return True
    
    # Download missing files
    print(f"\n📥 Downloading {len(files_to_download)} file(s)...")
    success_count = 0
    
    for filename, info in files_to_download:
        destination = ARTIFACTS_DIR / filename
        if download_file(info["url"], destination):
            success_count += 1
        else:
            print(f"⚠️  Warning: Failed to download {filename}")
    
    print("\n" + "=" * 60)
    print(f"✅ Successfully downloaded {success_count}/{len(files_to_download)} files")
    print("=" * 60)
    
    return success_count == len(files_to_download)


def verify_models():
    """Verify all required models are present."""
    print("\n🔍 Verifying model files...")
    all_present = True
    
    for filename in MODEL_FILES.keys():
        if check_model_exists(filename):
            filepath = ARTIFACTS_DIR / filename
            size_mb = filepath.stat().st_size / 1024 / 1024
            print(f"  ✅ {filename} ({size_mb:.1f} MB)")
        else:
            print(f"  ❌ {filename} - MISSING")
            all_present = False
    
    return all_present


if __name__ == "__main__":
    print("\n🚀 Starting model download process...\n")
    
    success = download_models()
    
    if success:
        verify_models()
        print("\n✅ All models ready for deployment!")
    else:
        print("\n⚠️  Some models failed to download. Check the errors above.")
        exit(1)
