import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface UpgradePlanModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    features: [
      'View songs',
      'Edit songs',
      'Share songs',
    ],
    highlight: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '$4.99/mo',
    features: [
      'Everything in Basic',
      'Display to others',
    ],
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99/mo',
    features: [
      'Everything in Plus',
      'Workspace option',
    ],
    highlight: false,
  },
];

const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({ open, onClose, user }) => {
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
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-2 p-6 md:p-8 relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-2 text-center">Upgrade Your Plan</h2>
        <p className="text-gray-500 text-center mb-6">Choose the plan that fits your needs. Payment is for demo only.</p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border-2 p-4 flex flex-col items-center ${plan.highlight ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'}`}
            >
              <div className="font-playfair text-xl font-bold mb-2 text-gray-800">{plan.name}</div>
              <div className="font-inter text-2xl font-bold mb-4 text-rose-500">{plan.price}</div>
              <ul className="mb-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700 text-sm">
                    <CheckCircle size={16} className="text-green-500 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg font-inter font-semibold transition-all ${plan.highlight ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {plan.id === (user.plan || 'basic') ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">(Payment option is a placeholder. Integrate real payment in production.)</div>
      </motion.div>
    </motion.div>
  );
};

export default UpgradePlanModal; 