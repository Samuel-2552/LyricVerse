import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Type, Music, Copy, Share2 } from 'lucide-react';

interface SongDisplayProps {
  song: any;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ song }) => {
  const [showChords, setShowChords] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  if (!song) {
    return (
      <div className="text-center py-12">
        <Music className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600 font-inter">Select a song to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-playfair text-3xl font-bold text-gray-800">{song.title}</h2>
          {song.alternateTitle && (
            <p className="text-gray-600 font-inter text-lg">{song.alternateTitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all">
            <Copy size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20">
        <button
          onClick={() => setShowChords(!showChords)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            showChords 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/50 text-gray-600 hover:bg-white/70'
          }`}
        >
          {showChords ? <Eye size={16} /> : <EyeOff size={16} />}
          <span className="font-inter text-sm">Chords</span>
        </button>

        <button
          onClick={() => setShowTransliteration(!showTransliteration)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            showTransliteration 
              ? 'bg-violet-500 text-white' 
              : 'bg-white/50 text-gray-600 hover:bg-white/70'
          }`}
        >
          <Type size={16} />
          <span className="font-inter text-sm">Transliteration</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-inter text-sm text-gray-600">Font Size:</span>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="font-inter text-sm text-gray-600">{fontSize}px</span>
        </div>
      </div>

      {/* Song Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
      >
        <div 
          className="space-y-6 font-mono leading-relaxed"
          style={{ fontSize: `${fontSize}px` }}
        >
          {/* Mock song content */}
          <div className="space-y-4">
            <div>
              {showChords && (
                <div className="text-rose-600 font-bold mb-1">
                  G    C    G    D
                </div>
              )}
              <div className="text-gray-800">
                Amazing grace, how sweet the sound
              </div>
              {showTransliteration && (
                <div className="text-violet-600 italic text-sm">
                  A-mey-zing greys, haw sweet dha sawnd
                </div>
              )}
            </div>

            <div>
              {showChords && (
                <div className="text-rose-600 font-bold mb-1">
                  G    C    G    D    G
                </div>
              )}
              <div className="text-gray-800">
                That saved a wretch like me
              </div>
              {showTransliteration && (
                <div className="text-violet-600 italic text-sm">
                  Dhat seyved a rech layk mee
                </div>
              )}
            </div>

            <div>
              {showChords && (
                <div className="text-rose-600 font-bold mb-1">
                  G    C    G    Em
                </div>
              )}
              <div className="text-gray-800">
                I once was lost, but now am found
              </div>
              {showTransliteration && (
                <div className="text-violet-600 italic text-sm">
                  Ay wans was lost, bat naw am fawnd
                </div>
              )}
            </div>

            <div>
              {showChords && (
                <div className="text-rose-600 font-bold mb-1">
                  G    C    G    D    G
                </div>
              )}
              <div className="text-gray-800">
                Was blind, but now I see
              </div>
              {showTransliteration && (
                <div className="text-violet-600 italic text-sm">
                  Was blaynd, bat naw ay see
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SongDisplay;