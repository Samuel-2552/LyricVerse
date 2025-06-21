import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication
    const checkAuth = () => {
      const savedUser = localStorage.getItem('lyricverse_user');
      const token = localStorage.getItem('lyricverse_token');
      
      if (savedUser && token) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          // Clear invalid data
          localStorage.removeItem('lyricverse_user');
          localStorage.removeItem('lyricverse_token');
        }
      }
      setIsLoading(false);
    };

    setTimeout(checkAuth, 1000);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('lyricverse_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lyricverse_user');
    localStorage.removeItem('lyricverse_token');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading LyricVerse...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!user ? (
          <LoginPage key="login" onLogin={handleLogin} />
        ) : (
          <Dashboard key="dashboard" user={user} onLogout={handleLogout} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;