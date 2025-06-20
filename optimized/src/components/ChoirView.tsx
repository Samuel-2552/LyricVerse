import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

interface ChoirViewProps {
  selectedSong: any;
}

const ChoirView: React.FC<ChoirViewProps> = ({ selectedSong }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const mockLines = [
    { text: "Amazing grace, how sweet the sound", chords: "G    C    G    D" },
    { text: "That saved a wretch like me", chords: "G    C    G    D    G" },
    { text: "I once was lost, but now am found", chords: "G    C    G    Em" },
    { text: "Was blind, but now I see", chords: "G    C    G    D    G" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-2">Choir View</h2>
        <p className="text-gray-600 font-inter">Line-by-line synchronized display</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20">
        <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-full transition-all">
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-full hover:shadow-lg transition-all"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        
        <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-full transition-all">
          <SkipForward size={24} />
        </button>

        <div className="flex items-center space-x-2 ml-8">
          <Volume2 size={20} className="text-gray-600" />
          <input type="range" className="w-20" />
        </div>
      </div>

      {/* Current Line Display */}
      <motion.div
        key={currentLine}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-rose-50 to-violet-50 rounded-2xl p-12 text-center border border-white/20"
      >
        <div className="space-y-6">
          <div className="text-rose-600 font-bold text-2xl font-mono">
            {mockLines[currentLine]?.chords}
          </div>
          <div className="text-gray-800 text-4xl font-playfair leading-relaxed">
            {mockLines[currentLine]?.text}
          </div>
        </div>
      </motion.div>

      {/* Line Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockLines.map((line, index) => (
          <button
            key={index}
            onClick={() => setCurrentLine(index)}
            className={`p-4 rounded-xl transition-all text-left ${
              index === currentLine
                ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white shadow-lg'
                : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/20'
            }`}
          >
            <div className="text-sm opacity-70 mb-1">Line {index + 1}</div>
            <div className="font-inter text-sm truncate">{line.text}</div>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="flex justify-between items-center mb-2">
          <span className="font-inter text-sm text-gray-600">Progress</span>
          <span className="font-inter text-sm text-gray-600">
            {currentLine + 1} / {mockLines.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 bg-gradient-to-r from-rose-500 to-violet-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentLine + 1) / mockLines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChoirView;