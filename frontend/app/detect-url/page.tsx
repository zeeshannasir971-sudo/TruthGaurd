"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Loader2, CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { analyzeContent, AnalysisResult, Corroboration } from "@/lib/api";

export default function DetectURLPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [corroboration, setCorroboration] = useState<Corroboration[]>([]);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setCorroboration([]);

    try {
      const data = await analyzeContent('url', url);
      setResult(data.result);
      setCorroboration(data.corroboration || []);
    } catch (err: any) {
      if (err.response?.data?.error) {
        const errorMsg = err.response.data.error;
        if (errorMsg.includes("Could not extract text")) {
          setError(
            "We cannot currently analyze this article. The website may be blocking automated access or the content structure is not supported. Please try copying the article text and using the Text Detection feature instead."
          );
        } else {
          setError(errorMsg);
        }
      } else {
        setError("Failed to analyze the URL. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isFake = result && result.label === 1;
  const confidence = result ? (result.prob_fake * 100).toFixed(1) : "0";

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Link2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">URL Analysis</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Analyze News Article URL
          </h1>
          <p className="text-xl text-gray-400">
            Paste a news article URL to check its authenticity
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 rounded-xl p-8 border border-slate-700 mb-8"
        >
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Article URL
          </label>
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="https://example.com/news-article"
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              disabled={loading}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Main Result */}
            <div
              className={`rounded-xl p-8 border-2 ${
                isFake
                  ? "bg-red-500/10 border-red-500/50"
                  : "bg-green-500/10 border-green-500/50"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                {isFake ? (
                  <XCircle className="w-12 h-12 text-red-400" />
                ) : (
                  <CheckCircle className="w-12 h-12 text-green-400" />
                )}
                <div>
                  <h2 className="text-3xl font-bold">
                    {isFake ? "Likely Fake News" : "Likely Real News"}
                  </h2>
                  <p className="text-gray-400">
                    Confidence: {confidence}% probability of being fake
                  </p>
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Polarity</div>
                  <div className="text-2xl font-bold">
                    {result.sentiment.polarity.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {result.sentiment.polarity > 0 ? "Positive" : result.sentiment.polarity < 0 ? "Negative" : "Neutral"} sentiment
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Subjectivity</div>
                  <div className="text-2xl font-bold">
                    {result.sentiment.subjectivity.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {result.sentiment.subjectivity > 0.5 ? "Highly subjective" : "More objective"}
                  </div>
                </div>
              </div>
            </div>

            {/* Corroboration */}
            {corroboration.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold mb-4">Related Sources</h3>
                <p className="text-gray-400 mb-6">
                  Cross-reference with these related articles for verification
                </p>
                <div className="space-y-4">
                  {corroboration.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-slate-900 rounded-lg p-4 hover:bg-slate-700 transition-colors border border-slate-700 hover:border-blue-500"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            {item.title}
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </h4>
                          {item.snippet && (
                            <p className="text-sm text-gray-400">{item.snippet}</p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <h4 className="font-semibold text-blue-300 mb-2">How to interpret results</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Higher confidence scores indicate stronger detection certainty</li>
                <li>• Polarity measures emotional tone (negative to positive)</li>
                <li>• Subjectivity indicates opinion vs. factual content</li>
                <li>• Always cross-reference with multiple sources</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Tips */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-8 border border-slate-700"
          >
            <h3 className="text-xl font-bold mb-4">Tips for best results:</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Use complete URLs starting with http:// or https://</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Works best with news articles from major publications</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>If extraction fails, try the Text Detection feature instead</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Some websites may block automated access</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
