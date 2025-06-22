import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Plus, Music } from 'lucide-react';
import { Song as SongType } from '../types';
import AudioPlayer from './AudioPlayer';

interface ProjectionModeProps {
  selectedSong: SongType;
  onBackToManager: () => void;
}

const ProjectionMode: React.FC<ProjectionModeProps> = ({ selectedSong, onBackToManager }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const generateSlidesFromLyrics = (lyrics: string): Array<{ title: string; content: Array<{ chords: string | null; lyrics: string }> }> => {
    if (!lyrics) return [];
    const stanzas = lyrics.split(/\\n\\s*\\n/);
    return stanzas.map((stanza, index) => {
      const lines = stanza.split('\\n');
      const content = [];
      for (let i = 0; i < lines.length; i++) {
        const isChordLine = /^[A-G][#b]?([m|maj|min|dim|aug|sus]?[2-9]?)?(\\s+[A-G][#b]?([m|maj|min|dim|aug|sus]?[2-9]?)?)*\\s*$/.test(lines[i].trim());
        if (isChordLine && i + 1 < lines.length && lines[i+1].trim() !== '') {
          content.push({ chords: lines[i].trim(), lyrics: lines[i + 1].trim() });
          i++;
        } else if (lines[i].trim() !== '') {
          content.push({ chords: null, lyrics: lines[i].trim() });
        }
      }
      return {
        title: `${selectedSong.title} (Part ${index + 1})`,
        content: content,
      };
    }).filter(slide => slide.content.length > 0);
  };

  const slides = useMemo(() => generateSlidesFromLyrics(selectedSong.lyrics), [selectedSong]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      previewRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  const currentBgClass = 'bg-gray-900 text-white';

  return (
    <div className="space-y-6">
      {!isFullscreen && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-gray-800">Projection Mode</h2>
              <p className="text-gray-600 font-inter">Display for {selectedSong.title}</p>
            </div>
            <div className="flex items-center space-x-2">
               <button
                  onClick={onBackToManager}
                  className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
                >
                  <Music size={16} />
                  <span className="font-inter text-sm">Back to Library</span>
                </button>
              <button
                onClick={toggleFullscreen}
                className="flex items-center space-x-2 bg-violet-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                <Maximize size={16} />
                <span className="font-inter text-sm">Fullscreen</span>
              </button>
            </div>
          </div>
          {selectedSong.audioUrl && <AudioPlayer src={selectedSong.audioUrl} />}
        </>
      )}

      <motion.div
        ref={previewRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-4 sm:p-8 md:p-12 border border-white/20 aspect-video flex flex-col justify-center text-center ${currentBgClass}`}
      >
          <div className="space-y-4">
            {(slides[currentSlide]?.content || []).map((line, index) => (
              <div key={index}>
                {line.chords && (
                  <div className="font-mono text-lg sm:text-xl md:text-2xl opacity-70">
                    {line.chords}
                  </div>
                )}
                <div className="font-inter text-2xl sm:text-3xl md:text-4xl leading-relaxed">
                  {line.lyrics}
                </div>
              </div>
            ))}
          </div>
      </motion.div>

      {!isFullscreen && slides.length > 1 && (
        <div className="flex justify-center items-center space-x-4">
            <button onClick={() => setCurrentSlide(s => Math.max(0, s - 1))} className="px-4 py-2 bg-gray-100 rounded-lg">Prev</button>
            <span>Slide {currentSlide + 1} of {slides.length}</span>
            <button onClick={() => setCurrentSlide(s => Math.min(slides.length - 1, s + 1))} className="px-4 py-2 bg-gray-100 rounded-lg">Next</button>
        </div>
      )}
    </div>
  );
};

export default ProjectionMode;