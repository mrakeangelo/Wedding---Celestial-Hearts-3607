import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../sections/HeroSection';
import AstrologyMap from '../sections/AstrologyMap';
import CosmicTimeline from '../sections/CosmicTimeline';
import WeddingInfo from '../sections/WeddingInfo';
import PhotoGallery from '../sections/PhotoGallery';
import Guestbook from '../sections/Guestbook';
import StarField from '../components/StarField';
import ThemeToggle from '../components/ThemeToggle';
import FloatingRSVPButton from '../components/FloatingRSVPButton';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-cosmic-midnight relative overflow-hidden"
    >
      <StarField density={150} />
      <ThemeToggle />
      <FloatingRSVPButton />
      
      <div className="relative z-10">
        <HeroSection />
        <AstrologyMap />
        <CosmicTimeline />
        <WeddingInfo />
        <PhotoGallery />
        <Guestbook />
        
        <footer className="py-12 text-center border-t border-cosmic-gold/20">
          <p className="text-cosmic-silver font-cosmic">
            Celestial Hearts – An Astrology Wedding Template by{' '}
            <span className="text-cosmic-gold font-medium">Mrake Agency</span>
          </p>
        </footer>
      </div>
    </motion.div>
  );
};

export default HomePage;