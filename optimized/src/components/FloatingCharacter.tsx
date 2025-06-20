import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Music, Sparkles } from 'lucide-react';

interface FloatingCharacterProps {
  musicEnabled: boolean;
}

const FloatingCharacter: React.FC<FloatingCharacterProps> = ({ musicEnabled }) => {
  const { scrollY } = useScroll();
  const characterRotate = useTransform(scrollY, [0, 1000], [0, 5]);
  const characterScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const glowIntensity = useTransform(scrollY, [0, 800], [0.3, 0.8]);

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Main Character Circle */}
      <motion.div
        style={{ 
          rotate: characterRotate,
          scale: characterScale,
        }}
        className="relative w-full h-full"
      >
        {/* Glow Effect */}
        <motion.div
          style={{ opacity: glowIntensity }}
          className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-violet-400/30 rounded-full blur-xl"
        />
        
        {/* Character Base */}
        <div className="relative w-full h-full bg-gradient-to-br from-rose-100 to-violet-100 rounded-full border-4 border-white/50 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Character Representation */}
          <div className="absolute inset-8 bg-gradient-to-br from-rose-200/50 to-violet-200/50 rounded-full flex items-center justify-center">
            <div className="text-center">
              {/* Face */}
              <div className="w-24 h-24 bg-gradient-to-br from-rose-300 to-violet-300 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                <Heart size={32} className="text-white" fill="currentColor" />
                
                {/* Eyes - blinking animation */}
                <motion.div
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full"
                />
                <motion.div
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 0.1 }}
                  className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full"
                />
              </div>
              
              {/* Body indication */}
              <div className="w-16 h-20 bg-gradient-to-b from-rose-200 to-violet-200 rounded-t-full mx-auto"></div>
            </div>
          </div>

          {/* Breathing animation */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-violet-50/30 rounded-full"
          />
        </div>

        {/* Floating Elements Around Character */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: musicEnabled ? [1, 1.2, 1] : 1
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0"
        >
          {/* Musical Notes */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <Music className="text-rose-400" size={20} />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Sparkles className="text-violet-400" size={16} fill="currentColor" />
          </div>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Heart className="text-rose-400" size={18} fill="currentColor" />
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Music className="text-violet-400" size={22} />
          </div>
        </motion.div>

        {/* Orbital Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20px] border-2 border-dashed border-rose-300/30 rounded-full"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Lyrics */}
      <motion.div
        animate={{ 
          y: [-5, -15, -5],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute -top-8 -left-12 text-rose-400/60 font-playfair text-sm italic rotate-12"
      >
        "Every note..."
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [-8, -18, -8],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-6 -right-16 text-violet-400/60 font-playfair text-sm italic -rotate-6"
      >
        "...tells a story"
      </motion.div>
    </div>
  );
};

export default FloatingCharacter;