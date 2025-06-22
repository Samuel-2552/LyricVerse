import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Song as SongType } from '../types'; // Assuming a similar structure for props

interface Verse {
    reference: string;
    text: string;
    version: string;
}

interface AddVerseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (verse: Omit<Verse, 'version'>) => void;
  initialData?: Omit<Verse, 'version'> | null;
}

const AddVerseModal: React.FC<AddVerseModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [reference, setReference] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      if (initialData) {
        setReference(initialData.reference);
        setText(initialData.text);
      } else {
        setReference('');
        setText('');
      }
      setError('');
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (!reference.trim() || !text.trim()) {
      setError('Both reference and text fields are required.');
      return;
    }
    onSave({ reference, text });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-lg relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-playfair text-xl font-bold text-gray-800 text-center mb-4">
                {initialData ? 'Edit Verse' : 'Add New Verse'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-inter text-sm text-gray-700 mb-1">Reference</label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="e.g., John 3:16"
                  />
                </div>
                <div>
                  <label className="block font-inter text-sm text-gray-700 mb-1">Verse Text</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Enter the verse text..."
                  />
                </div>
              </div>

              {error && <p className="text-xs text-rose-500 mt-3 text-center">{error}</p>}

              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-inter"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 font-inter"
                  onClick={handleSave}
                >
                  Save Verse
                </button>
              </div>

              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddVerseModal; 