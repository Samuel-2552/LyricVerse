import React, { useState } from 'react';
import { Heart, Share2, RotateCcw, Download, Mail, MessageCircle, Twitter } from 'lucide-react';

const FinaleSection: React.FC = () => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleShare = (platform: string) => {
    const message = "Just experienced the most beautiful love story told through scrolls ❤️";
    const url = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=A Beautiful Love Story&body=${encodeURIComponent(message + '\n\n' + url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
        break;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-pink-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Hearts */}
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          <Heart 
            size={12 + Math.random() * 20} 
            className="text-white" 
            fill="currentColor" 
          />
        </div>
      ))}

      <div className="container mx-auto px-8 py-20 relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Message */}
          <div className="mb-16">
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Thank You for Being
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                My Song
              </span>
            </h1>
            
            <p className="font-inter text-xl md:text-2xl text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
              Every scroll of this story, every note of this melody, every beat of my heart - 
              they all sing the same truth: you are my greatest love song, and I'm grateful 
              every day that I get to be yours.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-12">
              <blockquote className="font-playfair text-2xl md:text-3xl text-white italic leading-relaxed">
                "In a world full of temporary things, you are a perpetual feeling."
              </blockquote>
              <cite className="font-inter text-white/60 text-sm mt-4 block">
                — Written with all my love
              </cite>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-inter font-medium hover:scale-105 transition-transform shadow-lg"
            >
              <RotateCcw size={20} />
              <span>Experience Again</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-inter font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                <Share2 size={20} />
                <span>Share This Love</span>
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-48">
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Twitter size={16} className="text-blue-500" />
                      <span className="text-gray-800">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Mail size={16} className="text-gray-600" />
                      <span className="text-gray-800">Email</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <MessageCircle size={16} className="text-green-600" />
                      <span className="text-gray-800">Copy Link</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-inter font-medium hover:bg-white/20 transition-colors border border-white/20">
              <Download size={20} />
              <span>Save Memory</span>
            </button>
          </div>

          {/* Love Letter Preview */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">
              A Letter from the Heart
            </h3>
            <p className="font-inter text-white/80 leading-relaxed text-left">
              My Dearest Love,<br /><br />
              
              If I could capture every feeling, every stolen glance, every shared laugh, 
              every quiet moment, and every dream we've built together, this website would 
              need infinite scrolls. But perhaps that's the point - our love story doesn't 
              have an ending, only new chapters waiting to be written.<br /><br />
              
              Thank you for being my muse, my melody, my home.<br /><br />
              
              Forever yours,<br />
              <em>The one who loves you beyond words</em>
            </p>
          </div>

          {/* Success Message */}
          {showMessage && (
            <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-inter">
              Link copied to clipboard! ❤️
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
        <p className="font-inter text-white/40 text-sm">
          Made with infinite love • {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default FinaleSection;