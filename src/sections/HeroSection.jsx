import React from 'react';
import { motion } from 'framer-motion';
import { useWeddingData } from '../contexts/WeddingDataContext';
import { format } from 'date-fns';

const HeroSection = () => {
  const { weddingData } = useWeddingData();

  const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const currentPhase = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % 8;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-plum/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-nebula/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="text-center z-10 px-6">
        {/* Moon phase indicator */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl mb-8"
        >
          <motion.span
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            {moonPhases[currentPhase]}
          </motion.span>
        </motion.div>

        {/* Couple names */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-cosmic-champagne mb-4">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-block"
            >
              {weddingData.couple.bride.name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-cosmic-gold mx-8"
            >
              &
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-block"
            >
              {weddingData.couple.groom.name}
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl text-cosmic-silver font-script"
          >
            Two souls aligned by cosmic destiny
          </motion.p>
        </motion.div>

        {/* Wedding date */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mb-12"
        >
          <div className="inline-block bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl px-8 py-4 border border-cosmic-gold/30">
            <p className="text-cosmic-gold font-cosmic text-lg mb-2">
              Save the Date
            </p>
            <p className="text-2xl font-serif text-cosmic-champagne">
              {format(new Date(weddingData.wedding.date), 'MMMM do, yyyy')}
            </p>
          </div>
        </motion.div>

        {/* Constellation decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="flex justify-center space-x-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3
              }}
              className="w-2 h-2 bg-cosmic-gold rounded-full"
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cosmic-silver text-sm font-cosmic"
          >
            <div className="w-6 h-10 border-2 border-cosmic-gold/50 rounded-full mx-auto mb-2 flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-cosmic-gold rounded-full mt-2"
              />
            </div>
            <p>Scroll to explore our story</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;