"""
Quick script to upload model files to Hugging Face Hub.
Run this once to upload your trained models.
"""
import os
from pathlib import Path

def upload_models():
    """Upload model files to Hugging Face Hub."""
    
    print("=" * 60)
    print("TruthGuard Model Uploader to Hugging Face")
    print("=" * 60)
    
    # Check if huggingface_hub is installed
    try:
        from huggingface_hub import HfApi, create_repo
    except ImportError:
        print("\n❌ huggingface_hub not installed!")
        print("\nInstall it with:")
        print("  pip install huggingface_hub")
        return False
    
    # Get username
    print("\n📝 Setup Instructions:")
    print("1. Create account at https://huggingface.co/join")
    print("2. Login with: huggingface-cli login")
    print("3. Run this script again")
    
    username = input("\nEnter your Hugging Face username: ").strip()
    if not username:
        print("❌ Username required!")
        return False
    
    repo_name = "truthguard-models"
    repo_id = f"{username}/{repo_name}"
    
    # Initialize API
    api = HfApi()
    
    # Create repository
    print(f"\n📦 Creating repository: {repo_id}")
    try:
        create_repo(repo_id, repo_type="model", exist_ok=True)
        print(f"✅ Repository created: https://huggingface.co/{repo_id}")
    except Exception as e:
        print(f"⚠️  Repository might already exist: {e}")
    
    # Upload files
    artifacts_dir = Path("src/ml/artifacts")
    model_files = [
        "fake_news_model.pkl",
        "tfidf_word_vectorizer.pkl",
        "tfidf_char_vectorizer.pkl"
    ]
    
    print(f"\n📤 Uploading model files...")
    uploaded = 0
    
    for filename in model_files:
        filepath = artifacts_dir / filename
        
        if not filepath.exists():
            print(f"  ⚠️  {filename} not found - skipping")
            continue
        
        size_mb = filepath.stat().st_size / 1024 / 1024
        print(f"\n  Uploading {filename} ({size_mb:.1f} MB)...")
        
        try:
            api.upload_file(
                path_or_fileobj=str(filepath),
                path_in_repo=filename,
                repo_id=repo_id,
                repo_type="model"
            )
            print(f"  ✅ Uploaded {filename}")
            uploaded += 1
        except Exception as e:
            print(f"  ❌ Failed to upload {filename}: {e}")
    
    # Show results
    print("\n" + "=" * 60)
    print(f"✅ Successfully uploaded {uploaded}/{len(model_files)} files")
    print("=" * 60)
    
    if uploaded > 0:
        print(f"\n📍 Your models are now at:")
        print(f"   https://huggingface.co/{repo_id}")
        
        print(f"\n🔗 Update src/scripts/download_assets.py with:")
        print(f'   HUGGINGFACE_BASE_URL = "https://huggingface.co/{repo_id}/resolve/main"')
        
        print(f"\n📥 Download URLs:")
        for filename in model_files:
            print(f"   https://huggingface.co/{repo_id}/resolve/main/{filename}")
    
    return uploaded > 0


if __name__ == "__main__":
    print("\n🚀 Starting upload process...\n")
    
    # Check if models exist
    artifacts_dir = Path("src/ml/artifacts")
    if not artifacts_dir.exists() or not any(artifacts_dir.glob("*.pkl")):
        print("❌ No model files found in src/ml/artifacts/")
        print("\nTrain the model first with:")
        print("  python -m src.ml.pipeline")
        exit(1)
    
    success = upload_models()
    
    if success:
        print("\n✅ Upload complete! Your models are ready for deployment.")
        print("\nNext steps:")
        print("1. Update src/scripts/download_assets.py with your URLs")
        print("2. Test download: python src/scripts/download_assets.py")
        print("3. Deploy to Vercel/Netlify")
    else:
        print("\n⚠️  Upload failed. Check the errors above.")
