import React from 'react';
import { Heart, Music, BookOpen, User, Sparkles, Gift } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const navItems = [
    { icon: Heart, label: 'Beginning', section: 0 },
    { icon: BookOpen, label: 'Story', section: 1 },
    { icon: Music, label: 'Music', section: 2 },
    { icon: Sparkles, label: 'Behind', section: 3 },
    { icon: User, label: 'You', section: 4 },
    { icon: Gift, label: 'Finale', section: 5 },
  ];

  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
      <div className="flex items-center space-x-6">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => scrollToSection(item.section)}
              className={`p-2 rounded-full transition-all duration-300 ${
                currentSection === item.section
                  ? 'bg-pink-500 text-white scale-110'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;