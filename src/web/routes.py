import os
from flask import Blueprint, render_template, request, jsonify

from src.utils.fetch import extract_article_text
from src.utils.search import web_corroborate
from src.ml.pipeline import predict, train_model

web_bp = Blueprint("web", __name__, template_folder="templates")

@web_bp.route("/")
def index():
    return render_template("index.html")

@web_bp.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json(force=True)
    url = data.get("url")
    text = data.get("text")
    mode = data.get("mode", "url")

    print(f"Analyze request - Mode: {mode}, URL: {url}, Text length: {len(text) if text else 0}")

    if mode == "url":
        if not url:
            return jsonify({"error": "No URL provided"}), 400
        
        article_text = extract_article_text(url)
        query = url
        
        if not article_text:
            return jsonify({"error": "Could not extract text from URL. The website may be blocking access or the URL may be invalid."}), 400
    else:
        article_text = text or ""
        query = article_text[:160]
        
        if not article_text:
            return jsonify({"error": "No text provided for analysis"}), 400

    try:
        result = predict(article_text)
        corroboration = web_corroborate(query)
        return jsonify({"result": result, "corroboration": corroboration})
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500

@web_bp.route("/train", methods=["POST"])  # Simple endpoint to train using sample dataset
def trigger_train():
    try:
        train_model()
        return jsonify({"status": "trained"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500