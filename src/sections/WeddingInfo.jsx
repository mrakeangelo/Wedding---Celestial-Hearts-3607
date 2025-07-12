import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWeddingData } from '../contexts/WeddingDataContext';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiClock, FiMapPin, FiMusic } = FiIcons;

const WeddingInfo = () => {
  const { weddingData } = useWeddingData();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const infoCards = [
    {
      icon: FiCalendar,
      title: "Ceremony Date",
      content: format(new Date(weddingData.wedding.date), 'EEEE, MMMM do, yyyy'),
      zodiac: "♍"
    },
    {
      icon: FiClock,
      title: "Celestial Time",
      content: weddingData.wedding.time,
      zodiac: "♐"
    },
    {
      icon: FiMapPin,
      title: "Sacred Location",
      content: weddingData.wedding.venue,
      address: weddingData.wedding.address,
      zodiac: "♎"
    },
    {
      icon: FiMusic,
      title: "Reception",
      content: weddingData.wedding.reception,
      zodiac: "♌"
    }
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
            Celestial Celebration Details
          </h2>
          <p className="text-xl text-cosmic-silver font-cosmic max-w-2xl mx-auto">
            Join us as we unite under the cosmic canopy, surrounded by the blessings of the universe
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-gold/30 h-full relative overflow-hidden group-hover:border-cosmic-gold/60 transition-all duration-300">
                {/* Background constellation */}
                <div className="absolute top-2 right-2 text-4xl text-cosmic-gold/20 group-hover:text-cosmic-gold/40 transition-colors duration-300">
                  {card.zodiac}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-cosmic-plum to-cosmic-nebula rounded-full flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cosmic-gold/20 transition-shadow duration-300"
                >
                  <SafeIcon icon={card.icon} className="w-6 h-6 text-cosmic-champagne" />
                </motion.div>

                <h3 className="text-lg font-serif text-cosmic-champagne mb-3">
                  {card.title}
                </h3>

                <p className="text-cosmic-silver font-cosmic leading-relaxed">
                  {card.content}
                </p>

                {card.address && (
                  <p className="text-cosmic-silver/80 font-cosmic text-sm mt-2">
                    {card.address}
                  </p>
                )}

                {/* Hover effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 right-4"
                >
                  <div className="w-8 h-8 bg-cosmic-gold/20 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border border-cosmic-gold rounded-full border-dashed"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-8 border border-cosmic-gold/30 inline-block">
            <h3 className="text-2xl font-serif text-cosmic-champagne mb-6">
              Countdown to Our Celestial Union
            </h3>
            
            <div className="flex justify-center space-x-8">
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, index) => (
                <div key={unit} className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      textShadow: ['0 0 10px rgba(212, 175, 55, 0.3)', '0 0 20px rgba(212, 175, 55, 0.6)', '0 0 10px rgba(212, 175, 55, 0.3)']
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="text-3xl font-serif text-cosmic-gold mb-2"
                  >
                    {Math.floor(Math.random() * 100)}
                  </motion.div>
                  <p className="text-cosmic-silver font-cosmic text-sm">
                    {unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingInfo;