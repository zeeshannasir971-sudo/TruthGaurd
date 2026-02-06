"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TruthGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/detect-url"
              className="text-gray-300 hover:text-white transition-colors"
            >
              URL Detection
            </Link>
            <Link
              href="/detect-text"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Text Detection
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800 border-t border-slate-700"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                Home
              </Link>
              <Link
                href="/detect-url"
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                URL Detection
              </Link>
              <Link
                href="/detect-text"
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                Text Detection
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                About Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
