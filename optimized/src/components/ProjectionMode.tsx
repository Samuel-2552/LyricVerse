import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Maximize, Settings, Eye, EyeOff } from 'lucide-react';

interface ProjectionModeProps {
  selectedSong: any;
}

const ProjectionMode: React.FC<ProjectionModeProps> = ({ selectedSong }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChords, setShowChords] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('dark');

  const mockSlides = [
    {
      title: "Amazing Grace",
      content: [
        { chords: "G    C    G    D", lyrics: "Amazing grace, how sweet the song " },
        { chords: "G    C    G    D    G", lyrics: "That saved a wretch like me" }
      ]
    },
    {
      title: "Amazing Grace (Verse 2)",
      content: [
        { chords: "G    C    G    Em", lyrics: "I once was lost, but now am found" },
        { chords: "G    C    G    D    G", lyrics: "Was blind, but now I see" }
      ]
    }
  ];

  const backgroundOptions = [
    { id: 'dark', label: 'Dark', class: 'bg-gray-900 text-white' },
    { id: 'light', label: 'Light', class: 'bg-white text-gray-900' },
    { id: 'blue', label: 'Blue', class: 'bg-blue-900 text-white' },
    { id: 'gradient', label: 'Gradient', class: 'bg-gradient-to-br from-purple-900 to-blue-900 text-white' }
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentBg = backgroundOptions.find(bg => bg.id === backgroundColor);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-playfair text-3xl font-bold text-gray-800">Projection Mode</h2>
          <p className="text-gray-600 font-inter">Full-screen display for live performances</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowChords(!showChords)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              showChords 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/70 text-gray-600 hover:bg-white/90'
            }`}
          >
            {showChords ? <Eye size={16} /> : <EyeOff size={16} />}
            <span className="font-inter text-sm">Chords</span>
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            <Maximize size={16} />
            <span className="font-inter text-sm">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <h3 className="font-inter font-medium text-gray-800 mb-3">Background</h3>
          <div className="grid grid-cols-2 gap-2">
            {backgroundOptions.map((bg) => (
              <button
                key={bg.id}
                onClick={() => setBackgroundColor(bg.id)}
                className={`p-3 rounded-lg text-sm font-inter transition-all ${
                  backgroundColor === bg.id
                    ? 'ring-2 ring-rose-500'
                    : 'hover:bg-gray-50'
                } ${bg.class}`}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <h3 className="font-inter font-medium text-gray-800 mb-3">Slide Navigation</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-inter text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(mockSlides.length - 1, currentSlide + 1))}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-inter text-sm"
            >
              Next
            </button>
          </div>
          <div className="mt-2 text-center text-sm text-gray-600 font-inter">
            Slide {currentSlide + 1} of {mockSlides.length}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <h3 className="font-inter font-medium text-gray-800 mb-3">Settings</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm font-inter text-gray-700">Auto-advance</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm font-inter text-gray-700">Show timer</span>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-12 border border-white/20 aspect-video ${currentBg?.class}`}
      >
        <div className="h-full flex flex-col justify-center text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-8">
            {mockSlides[currentSlide]?.title}
          </h1>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {mockSlides[currentSlide]?.content.map((line, index) => (
              <div key={index} className="space-y-2">
                {showChords && (
                  <div className="font-mono text-lg md:text-xl opacity-70">
                    {line.chords}
                  </div>
                )}
                <div className="font-inter text-2xl md:text-4xl leading-relaxed">
                  {line.lyrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Slide Thumbnails */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {mockSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`flex-shrink-0 w-48 h-32 rounded-lg border-2 transition-all ${
              index === currentSlide
                ? 'border-rose-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            } ${currentBg?.class} p-4`}
          >
            <div className="text-sm font-playfair font-bold mb-2 truncate">
              {slide.title}
            </div>
            <div className="text-xs opacity-70">
              {slide.content[0]?.lyrics}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectionMode;