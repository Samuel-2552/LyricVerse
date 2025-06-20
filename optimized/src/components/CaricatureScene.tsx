import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Flower, Sun } from 'lucide-react';

const CaricatureScene: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentMood, setCurrentMood] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('caricature-scene');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (elementHeight + windowHeight)
      ));
      
      setScrollProgress(progress);
      setCurrentMood(Math.floor(progress * moods.length));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const moods = [
    {
      title: "She smiled...",
      description: "and the world paused to admire the masterpiece",
      bgColor: "from-pink-200 to-rose-300",
      accentColor: "from-pink-500 to-rose-500",
      flowers: 8,
      stars: 6,
      pose: "Happy",
      outfit: "Sunday dress",
    },
    {
      title: "She laughed...",
      description: "and angels took notes on how to make music",
      bgColor: "from-yellow-200 to-orange-300",
      accentColor: "from-yellow-500 to-orange-500",
      flowers: 12,
      stars: 10,
      pose: "Joyful",
      outfit: "Summer glow",
    },
    {
      title: "She dreamed...",
      description: "and the stars rearranged themselves to frame her thoughts",
      bgColor: "from-purple-200 to-indigo-300",
      accentColor: "from-purple-500 to-indigo-500",
      flowers: 15,
      stars: 20,
      pose: "Dreamy",
      outfit: "Moonlight dress",
    },
    {
      title: "She loved...",
      description: "and made me believe in fairy tales again",
      bgColor: "from-red-200 to-pink-400",
      accentColor: "from-red-500 to-pink-600",
      flowers: 20,
      stars: 25,
      pose: "Loving",
      outfit: "Heart's desire",
    },
  ];

  const activeMood = moods[Math.min(currentMood, moods.length - 1)];

  return (
    <section 
      id="caricature-scene"
      className={`min-h-screen bg-gradient-to-br ${activeMood.bgColor} transition-all duration-1000 ease-in-out relative overflow-hidden`}
    >
      {/* Floating Elements */}
      {Array.from({ length: activeMood.flowers }).map((_, index) => (
        <div
          key={`flower-${index}`}
          className="absolute animate-float opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <Flower 
            size={16 + Math.random() * 16} 
            className="text-white" 
            fill="currentColor" 
          />
        </div>
      ))}

      {Array.from({ length: activeMood.stars }).map((_, index) => (
        <div
          key={`star-${index}`}
          className="absolute animate-pulse opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          <Star 
            size={8 + Math.random() * 12} 
            className="text-white" 
            fill="currentColor" 
          />
        </div>
      ))}

      <div className="container mx-auto px-8 py-20 relative z-10">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Caricature Side */}
            <div className="relative">
              {/* Main Character Circle */}
              <div 
                className={`w-96 h-96 mx-auto rounded-full bg-gradient-to-br ${activeMood.accentColor} p-8 shadow-2xl transform transition-all duration-1000`}
                style={{
                  transform: `scale(${0.8 + scrollProgress * 0.4}) rotate(${scrollProgress * 5}deg)`,
                }}
              >
                <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                  {/* Character Representation */}
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart size={40} className="text-white" fill="currentColor" />
                    </div>
                    <p className="text-white font-inter text-lg font-medium">
                      {activeMood.pose}
                    </p>
                    <p className="text-white/80 font-inter text-sm">
                      {activeMood.outfit}
                    </p>
                  </div>

                  {/* Surrounding Elements */}
                  <div className="absolute top-4 left-4 animate-bounce">
                    <Sparkles className="text-white" size={20} fill="currentColor" />
                  </div>
                  <div className="absolute bottom-4 right-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <Sun className="text-white" size={24} />
                  </div>
                  <div className="absolute top-1/2 left-2 animate-bounce" style={{ animationDelay: '1s' }}>
                    <Heart className="text-white" size={16} fill="currentColor" />
                  </div>
                  <div className="absolute top-1/2 right-2 animate-bounce" style={{ animationDelay: '1.5s' }}>
                    <Star className="text-white" size={18} fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Orbital Elements */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-white/20 rounded-full animate-spin-slow"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Heart className="text-white" size={20} fill="currentColor" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <Sparkles className="text-white" size={16} fill="currentColor" />
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Star className="text-white" size={18} fill="currentColor" />
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <Flower className="text-white" size={22} fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="text-center lg:text-left">
              <h2 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                {activeMood.title}
              </h2>
              <p className="font-inter text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
                {activeMood.description}
              </p>

              {/* Mood Indicators */}
              <div className="grid grid-cols-2 gap-6">
                {moods.map((mood, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all duration-500 ${
                      index === currentMood
                        ? 'bg-white/20 backdrop-blur-sm border border-white/30 scale-105'
                        : 'bg-white/10 backdrop-blur-sm hover:bg-white/15'
                    }`}
                  >
                    <h4 className="font-playfair text-lg font-bold text-white mb-2">
                      {mood.title.replace('...', '')}
                    </h4>
                    <p className="font-inter text-sm text-white/70">
                      {mood.pose} • {mood.outfit}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-12">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-inter text-sm text-white/70 uppercase tracking-wider">
                    Character Development
                  </span>
                  <span className="font-inter text-sm text-white/70">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="h-2 bg-white rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaricatureScene;