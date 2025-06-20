import React, { useEffect, useState } from 'react';
import { Sun, Moon, Heart, Star, CloudRain, Sunrise } from 'lucide-react';

const StoryChapters: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('story-chapters');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (elementHeight + windowHeight)
      ));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scenes = [
    {
      title: "The First Look",
      description: "When our eyes met, time stood still, and the world around us faded into whispers.",
      icon: Sun,
      gradient: "from-yellow-300 to-orange-400",
      textColor: "text-orange-800",
      bgColor: "from-yellow-50 to-orange-50",
      progress: 0.25,
    },
    {
      title: "The Memory Lane",
      description: "Every shared moment became a treasure, collected like polaroids in the album of my heart.",
      icon: Heart,
      gradient: "from-pink-400 to-rose-500",
      textColor: "text-rose-800",
      bgColor: "from-pink-50 to-rose-50",
      progress: 0.5,
    },
    {
      title: "The Longing",
      description: "Distance taught me the weight of missing someone, each day a note in our unfinished symphony.",
      icon: CloudRain,
      gradient: "from-blue-500 to-indigo-600",
      textColor: "text-indigo-800",
      bgColor: "from-blue-50 to-indigo-50",
      progress: 0.75,
    },
    {
      title: "The Reunion",
      description: "Like sunrise after the longest night, your smile brought color back to my world.",
      icon: Sunrise,
      gradient: "from-purple-400 to-pink-500",
      textColor: "text-purple-800",
      bgColor: "from-purple-50 to-pink-50",
      progress: 1,
    },
  ];

  const currentScene = scenes.find(scene => scrollProgress <= scene.progress) || scenes[0];
  const CurrentIcon = currentScene.icon;

  return (
    <section 
      id="story-chapters" 
      className={`min-h-screen bg-gradient-to-br ${currentScene.bgColor} transition-all duration-1000 ease-in-out`}
    >
      <div className="container mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Our Story Unfolds
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
        </div>

        {/* Scene Visualization */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Side */}
            <div className="relative">
              <div className={`w-80 h-80 mx-auto rounded-full bg-gradient-to-br ${currentScene.gradient} p-8 shadow-2xl transform transition-all duration-1000`}>
                <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CurrentIcon size={80} className="text-white" />
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute top-10 left-10 animate-float">
                <Star size={16} className={`${currentScene.textColor} opacity-60`} fill="currentColor" />
              </div>
              <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
                <Heart size={20} className={`${currentScene.textColor} opacity-60`} fill="currentColor" />
              </div>
              <div className="absolute top-1/2 -left-4 animate-float" style={{ animationDelay: '2s' }}>
                <Star size={12} className={`${currentScene.textColor} opacity-40`} fill="currentColor" />
              </div>
            </div>

            {/* Content Side */}
            <div className="text-center lg:text-left">
              <h3 className={`font-playfair text-3xl md:text-4xl font-bold ${currentScene.textColor} mb-6`}>
                {currentScene.title}
              </h3>
              <p className="font-inter text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                {currentScene.description}
              </p>
              
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-inter text-sm text-gray-500 uppercase tracking-wider">
                    Chapter Progress
                  </span>
                  <span className="font-inter text-sm text-gray-500">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 bg-gradient-to-r ${currentScene.gradient} rounded-full transition-all duration-300`}
                    style={{ width: `${scrollProgress * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene Navigation */}
          <div className="flex justify-center mt-16 space-x-4">
            {scenes.map((scene, index) => {
              const SceneIcon = scene.icon;
              return (
                <div
                  key={index}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    scene === currentScene
                      ? `bg-gradient-to-r ${scene.gradient} text-white scale-110`
                      : 'bg-white text-gray-400 hover:text-gray-600'
                  } shadow-lg`}
                >
                  <SceneIcon size={20} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryChapters;