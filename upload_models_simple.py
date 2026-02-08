"""
Simple script to upload models to Hugging Face.
Follow the prompts step by step.
"""
from pathlib import Path
import sys

def main():
    print("=" * 70)
    print("🚀 TruthGuard Model Upload to Hugging Face")
    print("=" * 70)
    
    # Check if models exist
    artifacts_dir = Path("src/ml/artifacts")
    model_files = [
        "fake_news_model.pkl",
        "tfidf_word_vectorizer.pkl",
        "tfidf_char_vectorizer.pkl"
    ]
    
    print("\n📦 Checking for model files...")
    missing_files = []
    for filename in model_files:
        filepath = artifacts_dir / filename
        if filepath.exists():
            size_mb = filepath.stat().st_size / 1024 / 1024
            print(f"  ✅ {filename} ({size_mb:.1f} MB)")
        else:
            print(f"  ❌ {filename} - NOT FOUND")
            missing_files.append(filename)
    
    if missing_files:
        print(f"\n❌ Missing files: {', '.join(missing_files)}")
        print("\nTrain the model first with:")
        print("  python -m src.ml.pipeline")
        return False
    
    # Import Hugging Face
    try:
        from huggingface_hub import HfApi, login, create_repo
    except ImportError:
        print("\n❌ huggingface_hub not installed!")
        print("\nInstall it with:")
        print("  pip install huggingface_hub")
        return False
    
    print("\n" + "=" * 70)
    print("📝 STEP 1: Login to Hugging Face")
    print("=" * 70)
    print("\nYou need a Hugging Face account and access token.")
    print("\n1. Create account: https://huggingface.co/join")
    print("2. Get token: https://huggingface.co/settings/tokens")
    print("   - Click 'New token'")
    print("   - Name: truthguard-upload")
    print("   - Type: Write")
    print("   - Copy the token")
    
    token = input("\n📋 Paste your Hugging Face token here: ").strip()
    
    if not token:
        print("❌ Token required!")
        return False
    
    # Login
    print("\n🔐 Logging in...")
    try:
        login(token=token, add_to_git_credential=True)
        print("✅ Login successful!")
    except Exception as e:
        print(f"❌ Login failed: {e}")
        return False
    
    # Get username
    print("\n" + "=" * 70)
    print("📝 STEP 2: Repository Setup")
    print("=" * 70)
    
    username = input("\n👤 Enter your Hugging Face username: ").strip()
    
    if not username:
        print("❌ Username required!")
        return False
    
    repo_name = "truthguard-models"
    repo_id = f"{username}/{repo_name}"
    
    # Create repository
    print(f"\n📦 Creating repository: {repo_id}")
    try:
        api = HfApi()
        create_repo(repo_id, repo_type="model", exist_ok=True, token=token)
        print(f"✅ Repository ready: https://huggingface.co/{repo_id}")
    except Exception as e:
        print(f"⚠️  Repository might already exist: {e}")
    
    # Upload files
    print("\n" + "=" * 70)
    print("📝 STEP 3: Uploading Model Files")
    print("=" * 70)
    print("\nThis may take a few minutes...")
    
    uploaded = 0
    for filename in model_files:
        filepath = artifacts_dir / filename
        size_mb = filepath.stat().st_size / 1024 / 1024
        
        print(f"\n📤 Uploading {filename} ({size_mb:.1f} MB)...")
        
        try:
            api.upload_file(
                path_or_fileobj=str(filepath),
                path_in_repo=filename,
                repo_id=repo_id,
                repo_type="model",
                token=token
            )
            print(f"  ✅ Uploaded successfully!")
            uploaded += 1
        except Exception as e:
            print(f"  ❌ Upload failed: {e}")
    
    # Show results
    print("\n" + "=" * 70)
    print(f"✅ Upload Complete: {uploaded}/{len(model_files)} files")
    print("=" * 70)
    
    if uploaded > 0:
        print(f"\n🎉 Your models are now at:")
        print(f"   https://huggingface.co/{repo_id}")
        
        print(f"\n📝 NEXT STEP: Update Configuration")
        print("=" * 70)
        print(f"\nEdit: src/scripts/download_assets.py")
        print(f"\nReplace this line:")
        print(f'  HUGGINGFACE_BASE_URL = "https://huggingface.co/YOUR_USERNAME/truthguard-models/resolve/main"')
        print(f"\nWith:")
        print(f'  HUGGINGFACE_BASE_URL = "https://huggingface.co/{username}/truthguard-models/resolve/main"')
        
        print(f"\n🔗 Your model URLs:")
        for filename in model_files:
            print(f"   https://huggingface.co/{repo_id}/resolve/main/{filename}")
        
        print(f"\n✅ Test download with:")
        print(f"   python src/scripts/download_assets.py")
        
        return True
    else:
        print("\n❌ No files were uploaded. Check the errors above.")
        return False

if __name__ == "__main__":
    print("\n")
    success = main()
    print("\n")
    
    if success:
        print("🎊 SUCCESS! Your models are uploaded and ready for deployment!")
    else:
        print("⚠️  Upload incomplete. Please check the errors above.")
    
    input("\nPress Enter to exit...")
