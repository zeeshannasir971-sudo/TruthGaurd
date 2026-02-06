"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users, Zap, Award, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">About TruthGuard</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Fighting Misinformation
            <br />
            With AI Technology
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            TruthGuard is an advanced AI-powered platform designed to combat the spread of 
            fake news and misinformation in the digital age.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-8 md:p-12 mb-12 border border-slate-700"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                In today's digital landscape, misinformation spreads faster than ever before. 
                Our mission is to empower individuals, journalists, researchers, and organizations 
                with cutting-edge AI technology to identify and combat fake news. We believe that 
                access to accurate information is fundamental to a healthy democracy and informed society.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Technology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Machine Learning</h3>
              <p className="text-gray-400">
                Our system uses advanced machine learning algorithms trained on thousands of 
                articles to identify patterns and characteristics of fake news with 99.7% accuracy.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sentiment Analysis</h3>
              <p className="text-gray-400">
                We analyze emotional content and subjectivity to detect manipulation tactics 
                commonly used in fake news to provoke strong reactions.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">TF-IDF Vectorization</h3>
              <p className="text-gray-400">
                Advanced text analysis captures vocabulary patterns and linguistic structures 
                that distinguish authentic journalism from fabricated content.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Web Corroboration</h3>
              <p className="text-gray-400">
                Automatic search for related sources and verification resources helps users 
                cross-reference information and make informed decisions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-2xl p-8 md:p-12 mb-12 border border-slate-700"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                TruthGuard is developed by a dedicated team of data scientists, machine learning 
                engineers, and researchers passionate about combating misinformation. Our 
                multidisciplinary approach combines expertise in natural language processing, 
                artificial intelligence, and journalism to create a robust detection system.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We continuously improve our algorithms and expand our training datasets to stay 
                ahead of evolving misinformation tactics. Our commitment to transparency and 
                accuracy drives everything we do.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-400 mb-2">99.7%</div>
            <div className="text-gray-400">Detection Accuracy</div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-purple-400 mb-2">8,980+</div>
            <div className="text-gray-400">Training Articles</div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">Real-time</div>
            <div className="text-gray-400">Analysis Speed</div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Accuracy</h3>
              <p className="text-blue-100">
                We prioritize precision and reliability in every detection
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-blue-100">
                Our methods and results are clear and explainable
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Privacy</h3>
              <p className="text-blue-100">
                We protect user data and respect privacy at all times
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
