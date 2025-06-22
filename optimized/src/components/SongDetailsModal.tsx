import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit, Music } from 'lucide-react';
import FullScreenTextEditor from './FullScreenTextEditor'; // Assuming this component exists

interface SongDetailsModalProps {
  open: boolean;
  song: any;
  onClose: () => void;
  onSave: (updatedSong: any) => void;
}

const SongDetailsModal: React.FC<SongDetailsModalProps> = ({ open, song, onClose, onSave }) => {
  const [isEditingLyrics, setIsEditingLyrics] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset state when the song prop changes
    if (song) {
      setAudioUrl(song.audioUrl || '');
    }
  }, [song]);

  if (!open || !song) {
    return null;
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingLyrics(true);
  };

  const handleSaveLyrics = (lyrics: string) => {
    onSave({ ...song, lyrics, audioUrl });
    setIsEditingLyrics(false);
  };

  const handlePrimarySave = () => {
    onSave({ ...song, audioUrl });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For a real app, you'd upload this file and get a URL.
      // For this demo, we'll use a temporary blob URL.
      const newUrl = URL.createObjectURL(file);
      
      // Revoke the old blob URL if it exists to prevent memory leaks
      if (audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }

      setAudioUrl(newUrl);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && !isEditingLyrics && (
          <>
            <motion.div
              className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={onClose}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md mx-4 relative"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
                      <Music className="text-white" size={28} />
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-bold text-gray-800">{song.title}</h2>
                      {song.alternateTitle && (
                        <p className="text-gray-500 font-inter mt-1">{song.alternateTitle}</p>
                      )}
                    </div>
                  </div>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={handleEditClick}
                  >
                    <Edit size={18} />
                  </button>
                </div>

                <p className="text-gray-600 font-inter text-base leading-relaxed mb-4">
                  {song.lyrics?.substring(0, 120)}{song.lyrics?.length > 120 ? '...' : ''}
                </p>

                {/* Audio URL input */}
                <div className="mb-4">
                  <label className="block font-inter text-sm text-gray-700 mb-2">Audio (MP3 Link or Upload)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="flex-grow rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono text-sm"
                      placeholder="https://... or upload file"
                      value={audioUrl}
                      onChange={e => setAudioUrl(e.target.value)}
                    />
                    <button 
                      className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-inter text-sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload
                    </button>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="audio/mp3,audio/mpeg"
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-inter"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 font-inter"
                    onClick={handlePrimarySave}
                  >
                    Save Changes
                  </button>
                </div>

                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditingLyrics && (
          <FullScreenTextEditor
            title={`Edit Lyrics`}
            initialValue={song.lyrics}
            onSave={handleSaveLyrics}
            onClose={() => setIsEditingLyrics(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SongDetailsModal; 