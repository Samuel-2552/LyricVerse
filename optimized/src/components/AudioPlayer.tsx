import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleProgressChange = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(progressBarRef.current?.value || 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center space-x-4">
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={togglePlayPause} className="p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      <div className="flex items-center flex-grow space-x-3">
        <span className="text-sm font-mono text-gray-600">{formatTime(currentTime)}</span>
        <input
          ref={progressBarRef}
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f472b6 ${ (currentTime / duration) * 100 }%, #e5e7eb ${ (currentTime / duration) * 100 }%)`
          }}
        />
        <span className="text-sm font-mono text-gray-600">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center space-x-2">
          <button onClick={() => setIsMuted(!isMuted)} className="text-gray-600 hover:text-gray-800">
            {isMuted || volume === 0 ? <VolumeX size={20}/> : <Volume2 size={20}/>}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
                setIsMuted(false);
                setVolume(Number(e.target.value));
            }}
            className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
      </div>
    </div>
  );
};

export default AudioPlayer; 