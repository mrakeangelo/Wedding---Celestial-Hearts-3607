import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import PreviewPage from './pages/PreviewPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { WeddingDataProvider } from './contexts/WeddingDataContext';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <WeddingDataProvider>
        <div className="App">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <Router key="main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/preview" element={<PreviewPage />} />
                </Routes>
              </Router>
            )}
          </AnimatePresence>
        </div>
      </WeddingDataProvider>
    </ThemeProvider>
  );
}

export default App;