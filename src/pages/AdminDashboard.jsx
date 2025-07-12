import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeddingData } from '../contexts/WeddingDataContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiEye, FiLock, FiUnlock, FiUsers, FiMessageSquare, FiSettings } = FiIcons;

const AdminDashboard = () => {
  const { 
    weddingData, 
    saveWeddingData, 
    rsvpData, 
    guestbookEntries, 
    isLoading 
  } = useWeddingData();
  
  const [activeTab, setActiveTab] = useState('wedding');
  const [formData, setFormData] = useState(weddingData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveWeddingData(formData);
    setIsSaving(false);
    
    if (success) {
      alert('Wedding data saved successfully!');
    } else {
      alert('Error saving wedding data. Please try again.');
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'wedding', label: 'Wedding Info', icon: FiSettings },
    { id: 'rsvp', label: 'RSVP Responses', icon: FiUsers },
    { id: 'guestbook', label: 'Guestbook', icon: FiMessageSquare }
  ];

  return (
    <div className="min-h-screen bg-cosmic-midnight p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif text-cosmic-champagne mb-4">
            Admin Dashboard
          </h1>
          <p className="text-cosmic-silver font-cosmic">
            Manage your celestial wedding website
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-cosmic transition-all
                ${activeTab === tab.id 
                  ? 'bg-cosmic-plum text-cosmic-champagne' 
                  : 'bg-cosmic-deep/60 text-cosmic-silver hover:bg-cosmic-deep/80'
                }
              `}
            >
              <SafeIcon icon={tab.icon} className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'wedding' && (
            <div className="space-y-8">
              {/* Wedding Settings */}
              <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-gold/30">
                <h2 className="text-2xl font-serif text-cosmic-champagne mb-6">
                  Wedding Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cosmic-silver mb-2 font-cosmic">
                      Bride's Name
                    </label>
                    <input
                      type="text"
                      value={formData.couple.bride.name}
                      onChange={(e) => handleChange('couple', 'bride', { ...formData.couple.bride, name: e.target.value })}
                      className="w-full p-3 cosmic-input rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cosmic-silver mb-2 font-cosmic">
                      Groom's Name
                    </label>
                    <input
                      type="text"
                      value={formData.couple.groom.name}
                      onChange={(e) => handleChange('couple', 'groom', { ...formData.couple.groom, name: e.target.value })}
                      className="w-full p-3 cosmic-input rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cosmic-silver mb-2 font-cosmic">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      value={formData.wedding.date}
                      onChange={(e) => handleChange('wedding', 'date', e.target.value)}
                      className="w-full p-3 cosmic-input rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cosmic-silver mb-2 font-cosmic">
                      Wedding Time
                    </label>
                    <input
                      type="time"
                      value={formData.wedding.time}
                      onChange={(e) => handleChange('wedding', 'time', e.target.value)}
                      className="w-full p-3 cosmic-input rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cosmic-silver mb-2 font-cosmic">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={formData.wedding.venue}
                      onChange={(e) => handleChange('wedding', 'venue', e.target.value)}
                      className="w-full p-3 cosmic-input rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cosmic-silver mb-2 font-cosmic">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.wedding.address}
                      onChange={(e) => handleChange('wedding', 'address', e.target.value)}
                      className="w-full p-3 cosmic-input rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="cosmic-button px-6 py-3 rounded-lg font-cosmic font-medium flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="loading-spinner w-5 h-5"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSave} className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'rsvp' && (
            <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-gold/30">
              <h2 className="text-2xl font-serif text-cosmic-champagne mb-6">
                RSVP Responses ({rsvpData.length})
              </h2>
              
              <div className="space-y-4">
                {rsvpData.map((rsvp, index) => (
                  <div key={index} className="bg-cosmic-deep/40 rounded-xl p-4 border border-cosmic-gold/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-cosmic font-medium text-cosmic-champagne">
                          {rsvp.name}
                        </h3>
                        <p className="text-cosmic-silver text-sm">{rsvp.email}</p>
                        <p className="text-cosmic-gold text-sm mt-1">
                          {rsvp.attendance === 'yes' ? '✅ Attending' : '❌ Not Attending'}
                        </p>
                        {rsvp.guests > 1 && (
                          <p className="text-cosmic-silver text-sm">
                            Guests: {rsvp.guests}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-cosmic-silver text-xs">
                          {new Date(rsvp.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {rsvp.message && (
                      <p className="text-cosmic-silver font-script mt-3 italic">
                        "{rsvp.message}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'guestbook' && (
            <div className="bg-cosmic-deep/60 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-gold/30">
              <h2 className="text-2xl font-serif text-cosmic-champagne mb-6">
                Guestbook Messages ({guestbookEntries.length})
              </h2>
              
              <div className="space-y-4">
                {guestbookEntries.map((entry, index) => (
                  <div key={index} className="bg-cosmic-deep/40 rounded-xl p-4 border border-cosmic-gold/20">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-cosmic font-medium text-cosmic-champagne">
                          {entry.name}
                        </h3>
                        {entry.location && (
                          <p className="text-cosmic-silver text-sm">
                            from {entry.location}
                          </p>
                        )}
                      </div>
                      <p className="text-cosmic-silver text-xs">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <p className="text-cosmic-silver font-script leading-relaxed">
                      {entry.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;