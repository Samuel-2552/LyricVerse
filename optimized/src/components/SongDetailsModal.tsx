import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Edit, Save, Music } from 'lucide-react';

interface SongDetailsModalProps {
  song: any;
  onClose: () => void;
  onSave: (updatedSong: any) => void;
}

const SongDetailsModal: React.FC<SongDetailsModalProps> = ({ song, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableLyrics, setEditableLyrics] = useState(song.lyrics || '');

  useEffect(() => {
    setEditableLyrics(song.lyrics || 'No lyrics available.');
  }, [song]);

  const handleSave = () => {
    onSave({ ...song, lyrics: editableLyrics });
    setIsEditing(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-2 p-6 md:p-8 relative max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-violet-400 rounded-xl flex items-center justify-center mr-4">
              <Music className="text-white" size={24} />
            </div>
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800">{song.title}</h2>
              {song.alternateTitle && (
                <p className="text-gray-600 font-inter text-md">{song.alternateTitle}</p>
              )}
            </div>
            <div className="flex items-center ml-auto">
                <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all"
                >
                {isEditing ? <X size={20}/> : <Edit size={20} />}
                </button>
                <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                onClick={onClose}
                >
                <X size={22} />
                </button>
            </div>
        </div>

        <div className="overflow-y-auto flex-grow pr-2">
          {isEditing ? (
            <textarea
              value={editableLyrics}
              onChange={(e) => setEditableLyrics(e.target.value)}
              className="w-full h-full min-h-[300px] p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono"
            />
          ) : (
            <p className="whitespace-pre-wrap font-mono text-gray-700 text-base leading-relaxed">
              {editableLyrics}
            </p>
          )}
        </div>
        
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-violet-500 text-white px-6 py-2 rounded-xl font-inter hover:shadow-lg transition-all"
            >
              <Save size={18} />
              <span>Save</span>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SongDetailsModal; 