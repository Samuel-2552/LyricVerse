import React, { useEffect, useState } from 'react';
import { ChevronDown, Heart, Music, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const FloatingElement = ({ children, delay = 0, intensity = 1 }) => (
    <div
      className="absolute animate-float"
      style={{
        animationDelay: `${delay}s`,
        transform: `translate(${mousePosition.x * intensity * 10}px, ${mousePosition.y * intensity * 10}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Elements */}
      <FloatingElement delay={0} intensity={0.5}>
        <div className="top-1/4 left-1/4 text-pink-400 opacity-60">
          <Heart size={24} fill="currentColor" />
        </div>
      </FloatingElement>
      
      <FloatingElement delay={1} intensity={0.7}>
        <div className="top-1/3 right-1/4 text-purple-400 opacity-60">
          <Music size={28} />
        </div>
      </FloatingElement>
      
      <FloatingElement delay={2} intensity={0.3}>
        <div className="bottom-1/3 left-1/5 text-indigo-400 opacity-60">
          <Sparkles size={20} fill="currentColor" />
        </div>
      </FloatingElement>

      {/* Floating Lyrics */}
      <FloatingElement delay={0.5} intensity={0.4}>
        <div className="top-1/2 left-1/6 text-pink-300 font-playfair text-lg opacity-40 rotate-12">
          "Every word..."
        </div>
      </FloatingElement>
      
      <FloatingElement delay={1.5} intensity={0.6}>
        <div className="bottom-1/4 right-1/6 text-purple-300 font-playfair text-xl opacity-40 -rotate-6">
          "...written for you"
        </div>
      </FloatingElement>

      {/* Main Content */}
      <div 
        className="text-center z-10 px-8 max-w-4xl mx-auto"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="mb-8">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-6 leading-tight">
            A Song Written in
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Scrolls of Love
            </span>
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            An interactive journey through melody, memory, and the magic of you
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center animate-bounce">
          <p className="font-inter text-sm text-gray-500 mb-2 uppercase tracking-wider">
            Scroll to Begin the Journey
          </p>
          <ChevronDown size={24} className="text-gray-400" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;