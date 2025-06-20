import React, { useState, useEffect } from 'react';
import { Quote, Heart, Star, Music2 } from 'lucide-react';

const BehindTheSong: React.FC = () => {
  const [activeVerse, setActiveVerse] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('behind-song');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (elementHeight + windowHeight)
      ));
      
      setScrollProgress(progress);
      setActiveVerse(Math.floor(progress * verses.length));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const verses = [
    {
      lyric: "In the quiet of the morning, when the world's still asleep",
      annotation: "This line was inspired by those early mornings when I'd wake up first, just watching you sleep peacefully. Time felt infinite in those moments.",
      timestamp: "0:15",
      memory: "Our first morning together in that little cabin by the lake",
      emotion: "peaceful",
      color: "from-blue-400 to-cyan-300"
    },
    {
      lyric: "Your laughter fills the silence, makes my restless heart keep",
      annotation: "Your laugh has this magical quality - it can turn my worst days into something beautiful. It's the sound of home.",
      timestamp: "0:45",
      memory: "That rainy Tuesday when you laughed at my terrible cooking",
      emotion: "joyful",
      color: "from-yellow-400 to-orange-400"
    },
    {
      lyric: "Every word I never said, every dream I couldn't speak",
      annotation: "There were so many times I wanted to tell you how I felt, but the words seemed too small for something so big.",
      timestamp: "1:20",
      memory: "Standing on your doorstep after our third date, heart racing",
      emotion: "vulnerable",
      color: "from-purple-400 to-pink-400"
    },
    {
      lyric: "Now this song becomes the bridge, from my heart to yours complete",
      annotation: "Music became our language when words weren't enough. This song is my heart laid bare, hoping it reaches yours.",
      timestamp: "2:10",
      memory: "The night I played you the first few chords on my guitar",
      emotion: "hopeful",
      color: "from-green-400 to-teal-400"
    }
  ];

  const currentVerse = verses[Math.min(activeVerse, verses.length - 1)];

  return (
    <section 
      id="behind-song"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-20"
    >
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Behind the Song
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Every line tells a story, every verse holds a memory. Here's the heart behind the words.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Lyrics Side */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentVerse.color} mr-3`}></div>
                  <span className="font-inter text-sm text-gray-500 uppercase tracking-wider">
                    {currentVerse.timestamp}
                  </span>
                </div>
                
                <blockquote className="relative">
                  <Quote className="absolute -top-2 -left-2 text-gray-200" size={32} />
                  <p className="font-playfair text-2xl md:text-3xl text-gray-800 leading-relaxed pl-8 italic">
                    {currentVerse.lyric}
                  </p>
                </blockquote>
              </div>

              {/* All Verses Preview */}
              <div className="space-y-4">
                {verses.map((verse, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all duration-500 cursor-pointer ${
                      index === activeVerse
                        ? 'bg-white shadow-md border-l-4 border-pink-500'
                        : 'bg-gray-50 hover:bg-white hover:shadow-sm opacity-60'
                    }`}
                    onClick={() => setActiveVerse(index)}
                  >
                    <p className="font-inter text-sm text-gray-600">
                      {verse.lyric}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Side */}
            <div className="sticky top-8">
              <div className={`bg-gradient-to-br ${currentVerse.color} rounded-2xl p-8 text-white shadow-2xl`}>
                <div className="flex items-center mb-6">
                  <Heart className="mr-3" size={24} fill="currentColor" />
                  <span className="font-inter text-sm uppercase tracking-wider opacity-90">
                    The Story Behind
                  </span>
                </div>

                <h3 className="font-playfair text-2xl font-bold mb-4">
                  {currentVerse.memory}
                </h3>

                <p className="font-inter text-lg leading-relaxed mb-6 opacity-95">
                  {currentVerse.annotation}
                </p>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Music2 size={16} className="mr-2 opacity-70" />
                    <span className="font-inter text-sm opacity-70">
                      Emotion: {currentVerse.emotion}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-2 opacity-70" fill="currentColor" />
                    <span className="font-inter text-sm opacity-70">
                      Verse {activeVerse + 1} of {verses.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-playfair text-lg font-bold text-gray-800 mb-4">
                  Song Timeline
                </h4>
                <div className="space-y-3">
                  {verses.map((verse, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        index === activeVerse ? 'bg-pink-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${verse.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-inter text-sm font-medium text-gray-800">
                          {verse.timestamp}
                        </p>
                        <p className="font-inter text-xs text-gray-500">
                          {verse.emotion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehindTheSong;