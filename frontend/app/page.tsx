"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Zap, Target, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">AI-Powered Detection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stop Misinformation
              <br />
              Before It Spreads
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Detect fake news instantly with our advanced AI system. Combining sentiment analysis 
              and machine learning to verify news authenticity with 99.7% accuracy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/detect-url">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/50 transition-all"
                >
                  Analyze URL
                </motion.button>
              </Link>
              
              <Link href="/detect-text">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-slate-600 transition-all"
                >
                  Analyze Text
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">99.7%</div>
              <div className="text-gray-400">Detection Accuracy</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-purple-400 mb-2">&lt;3s</div>
              <div className="text-gray-400">Average Analysis Time</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-green-400 mb-2">8,980+</div>
              <div className="text-gray-400">Articles Trained On</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our advanced system uses multiple layers of analysis to detect fake news
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all"
            >
              <div className="bg-blue-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">TF-IDF Analysis</h3>
              <p className="text-gray-400">
                Advanced text vectorization captures vocabulary patterns and linguistic structures 
                that distinguish authentic from fabricated news.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-purple-500 transition-all"
            >
              <div className="bg-purple-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Sentiment Analysis</h3>
              <p className="text-gray-400">
                Detects emotional manipulation by analyzing polarity and subjectivity, 
                identifying content designed to provoke strong reactions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-green-500 transition-all"
            >
              <div className="bg-green-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Stylistic Features</h3>
              <p className="text-gray-400">
                Examines writing patterns, punctuation usage, and capitalization to identify 
                sensationalized or low-quality content.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Who Can Use TruthGuard?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our platform serves various users in the fight against misinformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700"
            >
              <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Journalists & Researchers</h3>
              <p className="text-gray-400">
                Verify sources and fact-check articles before publication. Ensure credibility 
                and maintain journalistic integrity with instant verification.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700"
            >
              <CheckCircle className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Social Media Managers</h3>
              <p className="text-gray-400">
                Screen content before sharing to your audience. Protect your brand reputation 
                by avoiding the spread of misinformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700"
            >
              <CheckCircle className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Educators & Students</h3>
              <p className="text-gray-400">
                Teach media literacy and critical thinking. Help students learn to identify 
                reliable sources and evaluate information quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700"
            >
              <CheckCircle className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">General Public</h3>
              <p className="text-gray-400">
                Stay informed with verified information. Make better decisions by understanding 
                the credibility of news you consume daily.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-2xl"
          >
            <AlertTriangle className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Don't Let Fake News Fool You
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Start verifying news articles today with our AI-powered detection system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/detect-url">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
                >
                  Try URL Detection
                </motion.button>
              </Link>
              
              <Link href="/detect-text">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Try Text Detection
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 TruthGuard. Powered by AI and Machine Learning.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Achieving 99.7% accuracy in fake news detection
          </p>
        </div>
      </footer>
    </div>
  );
}
