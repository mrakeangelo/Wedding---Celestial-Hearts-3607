import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWeddingData } from '../contexts/WeddingDataContext';
import { format } from 'date-fns';

const CosmicTimeline = () => {
  const { weddingData } = useWeddingData();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const timelineEvents = [
    {
      date: weddingData.couple.metDate,
      title: "First Cosmic Encounter",
      description: "When two stars collided and created our universe",
      planet: "💫",
      color: "cosmic-rose"
    },
    {
      date: weddingData.couple.engagementDate,
      title: "Engagement Under the Stars",
      description: "A promise sealed by moonlight and eternal love",
      planet: "🌙",
      color: "cosmic-gold"
    },
    {
      date: weddingData.wedding.date,
      title: "Celestial Union",
      description: "Two souls becoming one in cosmic harmony",
      planet: "✨",
      color: "cosmic-champagne"
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-cosmic-champagne mb-6">
            Our Cosmic Timeline
          </h2>
          <p className="text-xl text-cosmic-silver font-cosmic max-w-2xl mx-auto">
            A journey through space and time, marking the celestial moments that brought us together
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cosmic-gold/30 via-cosmic-plum/30 to-cosmic-rose/30"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className={`
                w-full max-w-md 
                ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}
              `}>
                <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-gold/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-2xl"
                    >
                      {event.planet}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-serif text-cosmic-champagne">
                        {event.title}
                      </h3>
                      <p className="text-cosmic-gold font-cosmic text-sm">
                        {format(new Date(event.date), 'MMMM do, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className="text-cosmic-silver font-cosmic leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Central planet indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                className="absolute left-1/2 transform -translate-x-1/2 z-10"
              >
                <div className="w-12 h-12 bg-cosmic-deep rounded-full border-2 border-cosmic-gold flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-gradient-to-br from-cosmic-plum to-cosmic-nebula rounded-full flex items-center justify-center"
                  >
                    <div className="w-4 h-4 bg-cosmic-gold rounded-full animate-pulse-glow"></div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CosmicTimeline;