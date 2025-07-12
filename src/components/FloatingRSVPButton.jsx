import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import RSVPModal from './RSVPModal';

const { FiCalendar, FiX } = FiIcons;

const FloatingRSVPButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-plum to-cosmic-nebula border-2 border-cosmic-gold/50 shadow-2xl"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 30px rgba(212, 175, 55, 0.6)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 rounded-full border border-cosmic-gold/30 border-dashed"
          />
          
          <SafeIcon icon={FiCalendar} className="w-6 h-6 text-cosmic-champagne" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <RSVPModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingRSVPButton;