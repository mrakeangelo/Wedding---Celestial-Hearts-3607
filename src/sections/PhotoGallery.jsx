import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronLeft, FiChevronRight, FiX } = FiIcons;

const PhotoGallery = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      alt: "Engagement under the stars",
      title: "Starlit Proposal"
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      alt: "Couple dancing",
      title: "Cosmic Dance"
    },
    {
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
      alt: "Wedding rings",
      title: "Celestial Rings"
    },
    {
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
      alt: "Romantic sunset",
      title: "Golden Hour"
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&q=80",
      alt: "Wedding venue",
      title: "Sacred Space"
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      alt: "Couple portrait",
      title: "Soul Connection"
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
            Celestial Moments
          </h2>
          <p className="text-xl text-cosmic-silver font-cosmic max-w-2xl mx-auto">
            A constellation of memories captured in stardust and moonbeams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-cosmic-gold/30 group-hover:border-cosmic-gold/60 transition-all duration-300">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-cosmic-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-12 h-12 bg-cosmic-gold/20 rounded-full flex items-center justify-center mb-3 mx-auto"
                    >
                      <div className="w-6 h-6 border-2 border-cosmic-champagne rounded-full"></div>
                    </motion.div>
                    <p className="text-cosmic-champagne font-cosmic font-medium">
                      {image.title}
                    </p>
                  </div>
                </div>

                {/* Moon glow effect */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-cosmic-champagne/10 rounded-full blur-xl group-hover:bg-cosmic-champagne/20 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain rounded-2xl"
                />
                
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-12 h-12 bg-cosmic-deep/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cosmic-deep/90 transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6 text-cosmic-champagne" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="text-2xl font-serif text-cosmic-champagne">
                    {selectedImage.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoGallery;