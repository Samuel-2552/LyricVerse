import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { User } from '../types';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  user: User;
}

const plans = {
  basic: 'Basic',
  plus: 'Plus',
  premium: 'Premium',
};

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, onUpgrade, user }) => {
  const [purpose, setPurpose] = useState(user.purpose || 'all');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-2 p-6 md:p-8 relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-2 text-center">Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-violet-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-center">
            <div className="font-inter text-lg font-semibold text-gray-800">{user.name}</div>
            <div className="font-inter text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-inter text-sm text-gray-700 mb-1">Purpose</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-inter text-base border-2 transition-all ${purpose === 'church' ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white border-rose-500' : 'bg-white border-gray-200 text-gray-700'}`}
              onClick={() => setPurpose('church')}
            >
              Church Purpose
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-inter text-base border-2 transition-all ${purpose === 'all' ? 'bg-gray-100 border-violet-400 text-violet-700' : 'bg-white border-gray-200 text-gray-700'}`}
              onClick={() => setPurpose('all')}
            >
              All Purpose
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-inter text-sm text-gray-700 mb-1">Current Plan</label>
          <div className="font-inter text-base text-gray-800 mb-1">{plans[user.plan || 'basic']}</div>
          <div className="text-xs text-gray-500 mb-2">{user.plan === 'plus' ? 'Edit and display to others' : user.plan === 'premium' ? 'All features + workspace' : 'View, edit, share (free)'}</div>
          <button
            className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-inter font-semibold hover:shadow-lg transition-all text-base"
            onClick={onUpgrade}
          >
            Upgrade Plan
          </button>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">(Profile details are dummy. Will fetch from backend.)</div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal; 