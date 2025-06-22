import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Music, Heart, Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react';
import FloatingCharacter from './FloatingCharacter';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    purpose: ''
  });
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [purposeError, setPurposeError] = useState('');

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const characterY = useTransform(scrollY, [0, 1000], [0, -100]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && !formData.purpose) {
      setPurposeError('Please select a purpose for registration.');
      return;
    }
    setPurposeError('');
    const user: User = {
      id: Date.now().toString(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      purpose: formData.purpose
    };
    onLogin(user);
  };

  const FloatingNote = ({ delay = 0, size = 20, className = "" }) => (
    <motion.div
      className={`absolute text-rose-300/40 ${className}`}
      animate={{
        y: [-10, -30, -10],
        x: [-5, 5, -5],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      <Music size={size} />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 overflow-hidden relative">
      {/* Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 md:top-20 md:left-20 bg-rose-200 rounded-full mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-20 right-10 w-48 h-48 md:w-96 md:h-96 md:top-40 md:right-20 bg-violet-200 rounded-full mix-blend-multiply animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 md:w-80 md:h-80 md:bottom-20 md:left-1/3 bg-amber-200 rounded-full mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>
      </motion.div>

      {/* Floating Musical Notes - Reduced for mobile */}
      <div className="hidden md:block">
        <FloatingNote delay={0} className="top-1/4 left-1/4" />
        <FloatingNote delay={1} size={16} className="top-1/3 right-1/4" />
        <FloatingNote delay={2} size={24} className="bottom-1/3 left-1/5" />
        <FloatingNote delay={1.5} size={18} className="bottom-1/4 right-1/3" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-4 md:p-6"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Music className="text-white" size={20} />
            </div>
            <span className="font-playfair text-xl md:text-2xl font-bold text-gray-800">LyricVerse</span>
          </div>
          
          <button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className={`p-2 rounded-full transition-all ${
              musicEnabled 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/50 backdrop-blur-sm text-gray-600 hover:bg-white/70'
            }`}
          >
            <Sparkles size={20} />
          </button>
        </div>
      </motion.header>

      <div className="relative z-10 min-h-screen flex items-center px-4 md:px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Character & Story */}
          <motion.div 
            style={{ y: characterY, opacity: textOpacity }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight"
            >
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-rose-500 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                LyricVerse
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-inter text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Where music meets storytelling. Join a community of creators and explore the magic of collaborative choir performances.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 md:mb-12 scale-75 md:scale-100"
            >
              <FloatingCharacter musicEnabled={musicEnabled} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="font-inter text-xs md:text-sm text-gray-500 mb-2 uppercase tracking-wider">
                Sing the unseen. Scroll the unsaid.
              </p>
              <div className="flex items-center justify-center space-x-3 md:space-x-4 text-gray-400">
                <Heart size={14} fill="currentColor" />
                <div className="w-8 md:w-12 h-px bg-gray-300"></div>
                <Music size={14} />
                <div className="w-8 md:w-12 h-px bg-gray-300"></div>
                <Sparkles size={14} fill="currentColor" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md mx-auto order-1 lg:order-2"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {isSignUp ? 'Join the Choir' : 'Welcome Back'}
                </h2>
                <p className="text-gray-600 font-inter text-sm md:text-base">
                  {isSignUp ? 'Create your musical journey' : 'Continue your musical journey'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {isSignUp && (
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all font-inter text-sm md:text-base"
                      required={isSignUp}
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all font-inter text-sm md:text-base"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all font-inter text-sm md:text-base"
                    required
                  />
                </div>

                {/* Purpose selection (only for sign up) */}
                {isSignUp && (
                  <div className="mb-2">
                    <label className="block font-inter text-sm text-gray-700 mb-2">Purpose <span className="text-rose-500">*</span></label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className={`flex-1 py-2 rounded-lg font-inter text-base border-2 transition-all ${formData.purpose === 'church' ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white border-rose-500' : 'bg-white border-gray-200 text-gray-700'}`}
                        onClick={() => setFormData({ ...formData, purpose: 'church' })}
                      >
                        Church Purpose
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 rounded-lg font-inter text-base border-2 transition-all ${formData.purpose === 'all' ? 'bg-gray-100 border-violet-400 text-violet-700' : 'bg-white border-gray-200 text-gray-700'}`}
                        onClick={() => setFormData({ ...formData, purpose: 'all' })}
                      >
                        All Purpose
                      </button>
                    </div>
                    {purposeError && <div className="text-xs text-rose-500 mt-1">{purposeError}</div>}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-xl md:rounded-2xl font-inter font-medium hover:shadow-lg transition-all text-sm md:text-base"
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </motion.button>

                <div className="text-center pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-gray-600 hover:text-gray-800 font-inter text-sm transition-colors"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center hidden md:block"
      >
        <p className="font-inter text-sm text-gray-500 mb-2 uppercase tracking-wider">
          Scroll to begin the journey
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;