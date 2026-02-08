from flask import Flask, render_template, request, jsonify
import os
from flask_cors import CORS
from src.web.routes import web_bp

# Run startup checks (download models if needed)
try:
    from startup import ensure_models_downloaded
    ensure_models_downloaded()
except Exception as e:
    print(f"Startup check failed: {e}")

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend
app.register_blueprint(web_bp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
