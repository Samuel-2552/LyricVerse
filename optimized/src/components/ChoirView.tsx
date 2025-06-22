import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Play, Pause, SkipForward, SkipBack, Volume2, Plus } from 'lucide-react';
import { Song as SongType } from '../types';

// This parser function will convert the song's flat lyric string into structured lines
const parseLyrics = (lyrics: string): Array<{ text: string; chords: string | null }> => {
    if (!lyrics) return [];
    const lines = lyrics.split('\\n');
    const processed = [];
    for (let i = 0; i < lines.length; i++) {
        // Basic check for a chord line
        const isChordLine = /^[A-G][#b]?([m|maj|min|dim|aug|sus]?[2-9]?)?(\\s+[A-G][#b]?([m|maj|min|dim|aug|sus]?[2-9]?)?)*\\s*$/.test(lines[i].trim());
        if (isChordLine && i + 1 < lines.length && lines[i+1].trim() !== '') {
            processed.push({ chords: lines[i].trim(), text: lines[i + 1].trim() });
            i++;
        } else if (lines[i].trim()) {
            processed.push({ chords: null, text: lines[i].trim() });
        }
    }
    return processed.filter(l => l.text);
};


interface ChoirViewProps {
  songs: SongType[];
}

const ChoirView: React.FC<ChoirViewProps> = ({ songs }) => {
  const [loadedSong, setLoadedSong] = useState<SongType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const lyricLines = useMemo(() => loadedSong ? parseLyrics(loadedSong.lyrics) : [], [loadedSong]);

  // Sync audio element's playing state with component state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioPlaying = () => setIsPlaying(true);
    const setAudioPaused = () => setIsPlaying(false);

    audio.addEventListener('play', setAudioPlaying);
    audio.addEventListener('pause', setAudioPaused);
    audio.addEventListener('ended', setAudioPaused);

    return () => {
      audio.removeEventListener('play', setAudioPlaying);
      audio.removeEventListener('pause', setAudioPaused);
      audio.removeEventListener('ended', setAudioPaused);
    };
  }, [loadedSong]);


  const handleLoadSong = () => {
    setError('');
    // Extracts the last part of a URL, which should be the ID
    const songId = inputValue.split('/').pop()?.trim();
    if (!songId) {
        setError('Please enter a valid song link or ID.');
        return;
    }

    const song = songs.find(s => s.id === songId);
    if (song) {
        setLoadedSong(song);
    } else {
        setError('Song not found. Please check the link or ID.');
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };
  
  const handlePrevLine = () => setCurrentLine(prev => Math.max(0, prev - 1));
  const handleNextLine = () => setCurrentLine(prev => Math.min(lyricLines.length - 1, prev + 1));


  // Initial view for pasting a link
  if (!loadedSong) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4" style={{minHeight: '70vh'}}>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg"
        >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-rose-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                <Plus className="text-white" size={40} />
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Join Choir Session</h2>
            <p className="text-gray-500 font-inter mb-6">
                Paste the song link or code to start the session.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLoadSong()}
                    placeholder="Paste link or code here..."
                    className="flex-grow w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter text-sm"
                />
                <button
                    onClick={handleLoadSong}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-xl font-inter hover:shadow-lg transition-all"
                >
                    Load
                </button>
            </div>
            {error && <p className="text-rose-500 mt-4 font-inter">{error}</p>}
        </motion.div>
      </div>
    );
  }

  // Main view after a song has been loaded
  return (
    <div className="space-y-4 md:space-y-6">
      {loadedSong.audioUrl && (
          <audio ref={audioRef} src={loadedSong.audioUrl} />
      )}
      <div className="text-center">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{loadedSong.title}</h2>
        <p className="text-gray-500 font-inter text-sm sm:text-base">Line-by-line synchronized display</p>
      </div>

      <div className="flex items-center justify-center space-x-2 sm:space-x-4 p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20">
        <button onClick={handlePrevLine} className="p-2 sm:p-3 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-full transition-all">
            <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button onClick={togglePlayPause} className="p-3 sm:p-4 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-full hover:shadow-lg transition-all">
          {isPlaying ? <Pause className="w-6 h-6 sm:w-7 sm:h-7" /> : <Play className="w-6 h-6 sm:w-7 sm:h-7" />}
        </button>
        <button onClick={handleNextLine} className="p-2 sm:p-3 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-full transition-all">
            <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="items-center space-x-2 ml-2 sm:ml-8 hidden sm:flex">
          <Volume2 size={20} className="text-gray-600" />
          <input type="range" className="w-20" onChange={e => { if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value); }} min="0" max="1" step="0.1" defaultValue="1" />
        </div>
      </div>

      <motion.div key={currentLine} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-rose-50 to-violet-50 rounded-2xl p-6 sm:p-8 md:p-12 text-center border border-white/20">
        <div className="space-y-4">
          {lyricLines[currentLine]?.chords && (
            <div className="text-rose-600 font-bold text-lg sm:text-xl md:text-2xl font-mono">{lyricLines[currentLine]?.chords}</div>
          )}
          <div className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-playfair leading-relaxed">{lyricLines[currentLine]?.text}</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {lyricLines.map((line, index) => (
          <button
            key={index}
            onClick={() => setCurrentLine(index)}
            className={`p-3 sm:p-4 rounded-xl transition-all text-left ${index === currentLine ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white shadow-lg' : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/20'}`}
          >
            <div className="text-xs sm:text-sm opacity-70 mb-1">Line {index + 1}</div>
            <div className="font-inter text-xs sm:text-sm truncate">{line.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoirView;