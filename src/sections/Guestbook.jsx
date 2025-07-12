import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWeddingData } from '../contexts/WeddingDataContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSend, FiHeart, FiStar } = FiIcons;

const Guestbook = () => {
  const { guestbookEntries, saveGuestbookEntry } = useWeddingData();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await saveGuestbookEntry(formData);
    
    if (success) {
      setFormData({ name: '', message: '', location: '' });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            Leave a Message in the Stars
          </h2>
          <p className="text-xl text-cosmic-silver font-cosmic max-w-2xl mx-auto">
            Share your cosmic wishes and blessings for our celestial journey together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-8 border border-cosmic-gold/30">
              <h3 className="text-2xl font-serif text-cosmic-champagne mb-6">
                Write Your Celestial Wishes
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-cosmic-silver mb-2 font-cosmic">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 cosmic-input rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-cosmic-silver mb-2 font-cosmic">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 cosmic-input rounded-lg"
                    placeholder="Where are you writing from?"
                  />
                </div>

                <div>
                  <label className="block text-cosmic-silver mb-2 font-cosmic">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full p-3 cosmic-input rounded-lg resize-none font-script"
                    placeholder="Share your wishes, memories, or blessings..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cosmic-button py-3 rounded-lg font-cosmic font-medium flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5"></div>
                      <span>Sending to the stars...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                      <span>Send Message ✨</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Messages Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-4 max-h-96 overflow-y-auto"
          >
            {guestbookEntries.length === 0 ? (
              <div className="text-center py-12 text-cosmic-silver">
                <SafeIcon icon={FiStar} className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-cosmic">
                  Be the first to leave a message in the stars
                </p>
              </div>
            ) : (
              guestbookEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-cosmic-deep/40 backdrop-blur-sm rounded-xl p-6 border border-cosmic-gold/20"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cosmic-plum to-cosmic-nebula rounded-full flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={FiHeart} className="w-5 h-5 text-cosmic-champagne" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-cosmic font-medium text-cosmic-champagne">
                          {entry.name}
                        </h4>
                        {entry.location && (
                          <span className="text-cosmic-silver text-sm">
                            from {entry.location}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-cosmic-silver font-script leading-relaxed">
                        {entry.message}
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          >
                            <SafeIcon icon={FiStar} className="w-3 h-3 text-cosmic-gold" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;