import React from 'react';
import { motion } from 'framer-motion';
import HomePage from './HomePage';

const PreviewPage = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-cosmic-deep/90 backdrop-blur-sm border-b border-cosmic-gold/30 p-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-cosmic-gold rounded-full animate-pulse"></div>
            <span className="text-cosmic-champagne font-cosmic">
              Preview Mode
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="cosmic-button px-4 py-2 rounded-lg font-cosmic text-sm">
              Edit
            </button>
            <button className="bg-cosmic-deep/60 border border-cosmic-gold/30 text-cosmic-champagne px-4 py-2 rounded-lg font-cosmic text-sm hover:bg-cosmic-deep/80 transition-colors">
              Share Link
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="pt-20">
        <HomePage />
      </div>
    </div>
  );
};

export default PreviewPage;