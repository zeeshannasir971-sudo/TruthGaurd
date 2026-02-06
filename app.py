from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from src.web.routes import web_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend
app.register_blueprint(web_bp)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)