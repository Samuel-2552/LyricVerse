import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface FullScreenTextEditorProps {
  initialValue: string;
  onSave: (value: string) => void;
  onClose: () => void;
  title: string;
}

const FullScreenTextEditor: React.FC<FullScreenTextEditorProps> = ({ initialValue, onSave, onClose, title }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-rose-100/80 via-white/80 to-violet-100/80 backdrop-blur-[6px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/80 border border-white/60 shadow-2xl rounded-2xl w-[95vw] h-[90vh] md:w-4/5 md:h-4/5 flex flex-col p-4 md:p-8 relative backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="font-playfair text-xl font-bold text-gray-800 truncate pr-4">{title}</h2>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-gray-500 hover:text-gray-800 bg-white/70 hover:bg-white/90 border border-gray-200 rounded-full transition-colors shadow-sm"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <button
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg font-inter font-semibold hover:shadow-lg transition-all"
              onClick={handleSave}
              aria-label="Done"
            >
              <Check size={20} />
              <span className="hidden sm:inline">Done</span>
            </button>
          </div>
        </div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full flex-grow rounded-lg border border-gray-200 p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-rose-400 text-base leading-relaxed resize-none font-mono bg-white/70 backdrop-blur placeholder-gray-400"
          placeholder="Start typing..."
        />
      </motion.div>
    </motion.div>
  );
};

export default FullScreenTextEditor; 