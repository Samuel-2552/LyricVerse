import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Music } from 'lucide-react';

const MusicSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes mock duration
  const [waveformAnimation, setWaveformAnimation] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
        setWaveformAnimation(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  // Mock waveform data
  const waveformBars = Array.from({ length: 40 }, (_, i) => ({
    height: Math.random() * 80 + 20,
    delay: i * 0.1,
  }));

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
            The Music of Us
          </h2>
          <p className="font-inter text-xl text-white/80 max-w-2xl mx-auto">
            Every beat of this song carries a memory, every note a feeling, every word a promise.
          </p>
        </div>

        {/* Music Player */}
        <div className="max-w-4xl mx-auto">
          {/* Vinyl Record Visualization */}
          <div className="relative mb-12">
            <div className={`w-80 h-80 mx-auto bg-gradient-to-br from-gray-900 to-black rounded-full relative shadow-2xl ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="absolute inset-8 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Music className="text-white" size={24} />
                </div>
              </div>
              {/* Record lines */}
              <div className="absolute inset-12 border border-white/10 rounded-full"></div>
              <div className="absolute inset-16 border border-white/10 rounded-full"></div>
              <div className="absolute inset-20 border border-white/10 rounded-full"></div>
            </div>
            
            {/* Floating hearts */}
            <div className="absolute top-10 left-10 animate-float">
              <Heart className="text-pink-400" size={20} fill="currentColor" />
            </div>
            <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1s' }}>
              <Heart className="text-purple-400" size={16} fill="currentColor" />
            </div>
          </div>

          {/* Waveform */}
          <div className="mb-8">
            <div className="flex items-end justify-center space-x-1 h-20 mb-4">
              {waveformBars.map((bar, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-t from-pink-500 to-purple-400 w-2 rounded-t transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{
                    height: `${bar.height}%`,
                    animationDelay: `${bar.delay}s`,
                    opacity: index < (progress / 100) * waveformBars.length ? 1 : 0.3,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Player Controls */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                  Your Love Song
                </h3>
                <p className="text-white/60">A melody written just for you</p>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="text-white/60" size={20} />
                <div className="w-20 h-2 bg-white/20 rounded-full">
                  <div className="w-3/4 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 cursor-pointer">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-6">
              <button className="p-3 text-white/60 hover:text-white transition-colors">
                <SkipBack size={24} />
              </button>
              
              <button 
                onClick={togglePlay}
                className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              
              <button className="p-3 text-white/60 hover:text-white transition-colors">
                <SkipForward size={24} />
              </button>
            </div>

            {/* Additional Options */}
            <div className="flex justify-center space-x-8 mt-8">
              <button className="text-white/60 hover:text-white transition-colors font-inter text-sm uppercase tracking-wider">
                Lyrics
              </button>
              <button className="text-white/60 hover:text-white transition-colors font-inter text-sm uppercase tracking-wider">
                Instrumental
              </button>
              <button className="text-white/60 hover:text-white transition-colors font-inter text-sm uppercase tracking-wider">
                Loop Chorus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;