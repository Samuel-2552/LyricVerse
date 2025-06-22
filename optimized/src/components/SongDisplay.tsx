import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Type, Music, Copy, Share2, Monitor, ArrowLeft, Edit } from 'lucide-react';
import FullScreenTextEditor from './FullScreenTextEditor';
import { Song as SongType } from '../types';
import ShareModal from './ShareModal';
import AudioPlayer from './AudioPlayer';

interface SongDisplayProps {
  song: SongType;
  onBack: () => void;
  onSave: (updatedSong: SongType) => void;
  onGoToProjection: () => void;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ song, onBack, onSave, onGoToProjection }) => {
  const [showChords, setShowChords] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isEditing, setIsEditing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!song) {
    return (
      <div className="text-center py-12">
        <Music className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600 font-inter">Select a song to display</p>
      </div>
    );
  }

  const handleSaveLyrics = (lyrics: string) => {
    onSave({ ...song, lyrics });
    setIsEditing(false);
  };

  const getShareUrl = () => {
    return `${window.location.origin}/song/${song.id}`;
  };

  const processLyrics = () => {
    if (!song?.lyrics) return [];
    // A simple parser: assumes chords are on their own lines above the lyric line.
    const lines = song.lyrics.split('\n');
    const processed = [];
    for (let i = 0; i < lines.length; i++) {
      // Basic check to see if a line could be chords (common chord characters)
      const isChordLine = /^[A-G][#b]?([m|maj|min|dim|aug|sus]?[2-9]?)?(\s+[A-G][#b]?([m|maj|min|dim|aug|sus]?[2-9]?)?)*\s*$/.test(lines[i].trim());
      
      if (isChordLine && i + 1 < lines.length && lines[i+1].trim() !== '') {
        processed.push({
          chords: lines[i],
          text: lines[i + 1]
        });
        i++; // Skip the next line as it's already processed
      } else if (lines[i].trim() !== '') {
        processed.push({
          chords: null,
          text: lines[i]
        });
      }
    }
    return processed;
  };

  const lyricLines = processLyrics();

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
              <button 
                  onClick={onBack}
                  className="p-2 text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-full transition-all flex-shrink-0"
              >
                  <ArrowLeft size={22} />
              </button>
              <div>
                  <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800">{song.title}</h2>
                  {song.author && <p className="text-gray-500 font-inter text-sm">by {song.author}</p>}
                  {song.alternateTitle && (
                      <p className="text-gray-600 font-inter text-md sm:text-lg">{song.alternateTitle}</p>
                  )}
              </div>
          </div>
          
          <div className="flex items-center space-x-2 self-end sm:self-center">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all" onClick={() => setIsEditing(true)}>
                <Edit size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all" onClick={() => navigator.clipboard.writeText(song.lyrics)}>
                <Copy size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all" onClick={() => setIsShareModalOpen(true)}>
                <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Audio Player */}
        {song.audioUrl && (
          <AudioPlayer src={song.audioUrl} />
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
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
          
          <div className="flex items-center gap-2">
              <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all bg-white/60 text-gray-700 hover:bg-white/80"
                  onClick={() => setIsShareModalOpen(true)}
              >
                  <Share2 size={16} />
                  <span className="font-inter text-sm hidden sm:inline">Share</span>
              </button>
              <button
                  onClick={onGoToProjection}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all bg-amber-500 hover:bg-amber-600 text-white"
              >
                  <Monitor size={16} />
                  <span className="font-inter text-sm hidden sm:inline">Projection</span>
              </button>
          </div>
        </div>

        {/* Song Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
        >
          <div 
            className="space-y-4 font-mono leading-relaxed"
            style={{ fontSize: `${fontSize}px` }}
          >
            {lyricLines.length > 0 ? (
              lyricLines.map((line, index) => (
                <div key={index}>
                  {showChords && line.chords && (
                    <div className="text-rose-600 font-bold mb-1">
                      {line.chords}
                    </div>
                  )}
                  <div className="text-gray-800">
                    {line.text}
                  </div>
                  {/* Placeholder for transliteration */}
                  {showTransliteration && (
                    <div className="text-violet-600 italic text-sm mt-1">
                      {/* Transliteration for: {line.text} */}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-inter">No lyrics available for this song.</p>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <FullScreenTextEditor
            title={`Edit Lyrics`}
            initialValue={song.lyrics}
            onSave={handleSaveLyrics}
            onClose={() => setIsEditing(false)}
          />
        )}
      </AnimatePresence>
      
      <ShareModal 
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={getShareUrl()}
      />
    </>
  );
};

export default SongDisplay;