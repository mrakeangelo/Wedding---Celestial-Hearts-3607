import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWeddingData } from '../contexts/WeddingDataContext';

const AstrologyMap = () => {
  const { weddingData } = useWeddingData();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const zodiacSigns = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const constellations = [
    { name: 'Orion', x: 20, y: 30, size: 'large' },
    { name: 'Cassiopeia', x: 70, y: 20, size: 'medium' },
    { name: 'Ursa Major', x: 40, y: 60, size: 'large' },
    { name: 'Andromeda', x: 80, y: 50, size: 'medium' },
    { name: 'Polaris', x: 60, y: 25, size: 'small' }
  ];

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-cosmic-champagne mb-6">
            Our Celestial Alignment
          </h2>
          <p className="text-xl text-cosmic-silver font-cosmic max-w-2xl mx-auto">
            The stars aligned perfectly on the day we met, creating a cosmic map of our destined love
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Star Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square bg-cosmic-deep/40 rounded-full border-2 border-cosmic-gold/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-cosmic-plum/20 to-transparent"></div>
              
              {/* Constellation points */}
              {constellations.map((constellation, index) => (
                <motion.div
                  key={constellation.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  className="absolute"
                  style={{
                    left: `${constellation.x}%`,
                    top: `${constellation.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`
                    bg-cosmic-gold rounded-full animate-twinkle
                    ${constellation.size === 'large' ? 'w-4 h-4' : 
                      constellation.size === 'medium' ? 'w-3 h-3' : 'w-2 h-2'}
                  `}>
                    <div className="absolute inset-0 bg-cosmic-gold rounded-full animate-pulse-glow"></div>
                  </div>
                  <p className="text-xs text-cosmic-silver font-cosmic mt-2 text-center whitespace-nowrap">
                    {constellation.name}
                  </p>
                </motion.div>
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full">
                <motion.path
                  d="M 20% 30% L 40% 60% L 70% 20% L 80% 50% L 60% 25%"
                  stroke="rgba(212, 175, 55, 0.3)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1 }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Zodiac Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-gold/30">
              <h3 className="text-2xl font-serif text-cosmic-champagne mb-4">
                Zodiac Compatibility
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    {zodiacSigns[weddingData.couple.bride.zodiac]}
                  </div>
                  <div>
                    <p className="text-cosmic-champagne font-cosmic font-medium">
                      {weddingData.couple.bride.name}
                    </p>
                    <p className="text-cosmic-silver text-sm">
                      {weddingData.couple.bride.zodiac}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center py-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-cosmic-gold text-2xl"
                  >
                    ✨
                  </motion.div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    {zodiacSigns[weddingData.couple.groom.zodiac]}
                  </div>
                  <div>
                    <p className="text-cosmic-champagne font-cosmic font-medium">
                      {weddingData.couple.groom.name}
                    </p>
                    <p className="text-cosmic-silver text-sm">
                      {weddingData.couple.groom.zodiac}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-gold/30">
              <h4 className="text-lg font-serif text-cosmic-champagne mb-3">
                Cosmic Reading
              </h4>
              <p className="text-cosmic-silver font-cosmic leading-relaxed">
                {weddingData.couple.bride.zodiac} and {weddingData.couple.groom.zodiac} create a harmonious celestial dance. 
                Your souls were destined to find each other across the vast cosmos, creating a love that transcends earthly bounds.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AstrologyMap;