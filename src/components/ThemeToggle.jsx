import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSun, FiMoon } = FiIcons;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-cosmic-deep/80 backdrop-blur-sm border border-cosmic-gold/30 hover:border-cosmic-gold/60 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : 180,
            scale: isDark ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <SafeIcon icon={FiMoon} className="w-5 h-5 text-cosmic-champagne" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <SafeIcon icon={FiSun} className="w-5 h-5 text-cosmic-gold" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;