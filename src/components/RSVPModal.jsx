import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeddingData } from '../contexts/WeddingDataContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiCheck, FiHeart } = FiIcons;

const RSVPModal = ({ onClose }) => {
  const { saveRsvpResponse } = useWeddingData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: 1,
    dietary_restrictions: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await saveRsvpResponse(formData);
    
    if (success) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
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

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-cosmic-deep/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-cosmic-gold/30 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-cosmic-gold rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <SafeIcon icon={FiCheck} className="w-8 h-8 text-cosmic-deep" />
          </motion.div>
          
          <h3 className="text-2xl font-serif text-cosmic-champagne mb-4">
            Thank You!
          </h3>
          
          <p className="text-cosmic-silver mb-6">
            Your response has been recorded among the stars. We can't wait to celebrate with you!
          </p>
          
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <SafeIcon icon={FiHeart} className="w-4 h-4 text-cosmic-rose" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cosmic-deep/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-cosmic-gold/30 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-cosmic-champagne">
            RSVP to Our Celestial Celebration
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cosmic-plum/30 rounded-full transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-cosmic-silver" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-cosmic-silver mb-2 font-cosmic">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 cosmic-input rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-cosmic-silver mb-2 font-cosmic">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 cosmic-input rounded-lg"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-cosmic-silver mb-2 font-cosmic">
              Will you be attending? *
            </label>
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
              className="w-full p-3 cosmic-input rounded-lg"
            >
              <option value="">Select your response</option>
              <option value="yes">Yes, I'll be there! ✨</option>
              <option value="no">Sorry, I can't make it 💫</option>
            </select>
          </div>

          {formData.attendance === 'yes' && (
            <>
              <div>
                <label className="block text-cosmic-silver mb-2 font-cosmic">
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full p-3 cosmic-input rounded-lg"
                >
                  <option value={1}>Just me</option>
                  <option value={2}>2 people</option>
                  <option value={3}>3 people</option>
                  <option value={4}>4 people</option>
                </select>
              </div>

              <div>
                <label className="block text-cosmic-silver mb-2 font-cosmic">
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  name="dietary_restrictions"
                  value={formData.dietary_restrictions}
                  onChange={handleChange}
                  className="w-full p-3 cosmic-input rounded-lg"
                  placeholder="Any dietary requirements?"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-cosmic-silver mb-2 font-cosmic">
              Message for the Couple
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 cosmic-input rounded-lg resize-none"
              placeholder="Share your wishes for the happy couple..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full cosmic-button py-3 rounded-lg font-cosmic font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="loading-spinner w-5 h-5"></div>
                <span>Sending to the stars...</span>
              </div>
            ) : (
              'Send RSVP ✨'
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RSVPModal;