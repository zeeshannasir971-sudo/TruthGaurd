"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { analyzeContent, AnalysisResult, Corroboration } from "@/lib/api";

export default function DetectTextPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [corroboration, setCorroboration] = useState<Corroboration[]>([]);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    if (text.trim().length < 50) {
      setError("Please enter at least 50 characters for accurate analysis");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setCorroboration([]);

    try {
      const data = await analyzeContent('text', text);
      setResult(data.result);
      setCorroboration(data.corroboration || []);
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to analyze the text. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isFake = result && result.label === 1;
  const confidence = result ? (result.prob_fake * 100).toFixed(1) : "0";
  const charCount = text.length;

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Text Analysis</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Analyze Article Text
          </h1>
          <p className="text-xl text-gray-400">
            Paste article text or headlines to check authenticity
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 rounded-xl p-8 border border-slate-700 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">
              Article Text
            </label>
            <span className={`text-sm ${charCount < 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
              {charCount} characters {charCount < 50 && '(minimum 50)'}
            </span>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article text, headline, or news content here..."
            rows={12}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            disabled={loading}
          />
          
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setText("")}
              className="text-gray-400 hover:text-white transition-colors text-sm"
              disabled={loading || !text}
            >
              Clear Text
            </button>
            
            <button
              onClick={handleAnalyze}
              disabled={loading || charCount < 50}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Text"
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

              {/* Analysis Details */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <h4 className="font-semibold mb-3">What this means:</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  {isFake ? (
                    <>
                      <p>• This content shows characteristics commonly found in fake news</p>
                      <p>• Consider verifying with multiple trusted sources</p>
                      <p>• Look for emotional manipulation or sensationalized language</p>
                    </>
                  ) : (
                    <>
                      <p>• This content appears to follow legitimate news patterns</p>
                      <p>• Still recommended to verify with original sources</p>
                      <p>• Check publication date and author credentials</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Corroboration */}
            {corroboration.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold mb-4">Related Sources</h3>
                <p className="text-gray-400 mb-6">
                  Found {corroboration.length} related articles for cross-reference
                </p>
                <div className="space-y-4">
                  {corroboration.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-slate-900 rounded-lg p-4 hover:bg-slate-700 transition-colors border border-slate-700 hover:border-purple-500"
                    >
                      <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                      {item.snippet && (
                        <p className="text-sm text-gray-400">{item.snippet}</p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
              <h4 className="font-semibold text-purple-300 mb-2">Understanding the analysis</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Our AI analyzes vocabulary, sentiment, and writing style</li>
                <li>• Polarity shows emotional tone (negative to positive)</li>
                <li>• Subjectivity indicates opinion-based vs. factual content</li>
                <li>• Always verify important information with multiple sources</li>
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
                <span>Paste at least 50 characters for accurate analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Include headlines and main article content when possible</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Works with news articles, social media posts, and headlines</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Longer text generally provides more accurate results</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
