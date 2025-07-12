import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const WeddingDataContext = createContext();

export const useWeddingData = () => {
  const context = useContext(WeddingDataContext);
  if (!context) {
    throw new Error('useWeddingData must be used within a WeddingDataProvider');
  }
  return context;
};

export const WeddingDataProvider = ({ children }) => {
  const [weddingData, setWeddingData] = useState({
    couple: {
      bride: {
        name: 'Luna',
        zodiac: 'Pisces',
        birthDate: '1995-03-15'
      },
      groom: {
        name: 'Orion',
        zodiac: 'Scorpio',
        birthDate: '1993-11-08'
      },
      metDate: '2020-06-21',
      engagementDate: '2023-12-25'
    },
    wedding: {
      date: '2024-09-21',
      time: '18:00',
      venue: 'Moonlit Gardens',
      address: '123 Celestial Avenue, Starlight City',
      reception: 'Under the Stars Pavilion'
    },
    story: 'Two souls aligned by cosmic destiny, finding each other when the stars perfectly aligned...',
    isPasswordProtected: false,
    password: '',
    isDraftMode: false
  });

  const [rsvpData, setRsvpData] = useState([]);
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load wedding data from Supabase
  const loadWeddingData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('wedding_data')
        .select('*')
        .eq('id', 1)
        .single();

      if (data && !error) {
        setWeddingData(data.content);
      }
    } catch (error) {
      console.error('Error loading wedding data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save wedding data to Supabase
  const saveWeddingData = async (newData) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('wedding_data')
        .upsert({
          id: 1,
          content: newData,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        setWeddingData(newData);
        return true;
      }
    } catch (error) {
      console.error('Error saving wedding data:', error);
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  // Load RSVP data
  const loadRsvpData = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setRsvpData(data);
      }
    } catch (error) {
      console.error('Error loading RSVP data:', error);
    }
  };

  // Save RSVP response
  const saveRsvpResponse = async (rsvpResponse) => {
    try {
      const { error } = await supabase
        .from('rsvp_responses')
        .insert([{
          ...rsvpResponse,
          created_at: new Date().toISOString()
        }]);

      if (!error) {
        await loadRsvpData();
        return true;
      }
    } catch (error) {
      console.error('Error saving RSVP response:', error);
    }
    return false;
  };

  // Load guestbook entries
  const loadGuestbookEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setGuestbookEntries(data);
      }
    } catch (error) {
      console.error('Error loading guestbook entries:', error);
    }
  };

  // Save guestbook entry
  const saveGuestbookEntry = async (entry) => {
    try {
      const { error } = await supabase
        .from('guestbook_entries')
        .insert([{
          ...entry,
          created_at: new Date().toISOString()
        }]);

      if (!error) {
        await loadGuestbookEntries();
        return true;
      }
    } catch (error) {
      console.error('Error saving guestbook entry:', error);
    }
    return false;
  };

  useEffect(() => {
    loadWeddingData();
    loadRsvpData();
    loadGuestbookEntries();
  }, []);

  const value = {
    weddingData,
    setWeddingData,
    rsvpData,
    guestbookEntries,
    isLoading,
    saveWeddingData,
    saveRsvpResponse,
    saveGuestbookEntry,
    loadRsvpData,
    loadGuestbookEntries
  };

  return (
    <WeddingDataContext.Provider value={value}>
      {children}
    </WeddingDataContext.Provider>
  );
};