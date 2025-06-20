import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Music, Globe } from 'lucide-react';
import SongDetailsModal from './SongDetailsModal';

interface SongManagerProps {
  onSelectSong: (song: any) => void;
  onAddNewSong: () => void;
}

const SongManager: React.FC<SongManagerProps> = ({ onSelectSong, onAddNewSong }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [songForModal, setSongForModal] = useState<any | null>(null);

  const [mockSongs, setMockSongs] = useState([
    {
      id: 1,
      title: 'Amazing Grace',
      lyrics: 'Amazing grace, how sweet the sound...',
      alternateTitle: 'अद्भुत अनुग्रह',
      language: 'english',
      category: 'Hymns',
      updatedAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'How Great Thou Art',
      lyrics: 'O Lord my God, when I in awesome wonder...',
      alternateTitle: 'कितना महान है तू',
      language: 'english',
      category: 'Worship',
      updatedAt: '1 day ago'
    },
    {
      id: 3,
      title: 'येशु नाम सुन्दर',
      lyrics: 'येशु नाम सुन्दर नाम...',
      alternateTitle: 'Jesus Name Beautiful',
      language: 'hindi',
      category: 'Praise',
      updatedAt: '3 days ago'
    }
  ]);

  const languages = [
    { id: 'all', label: 'All Languages', flag: '🌍' },
    { id: 'english', label: 'English', flag: '🇺🇸' },
    { id: 'hindi', label: 'Hindi', flag: '🇮🇳' },
    { id: 'tamil', label: 'Tamil', flag: '🇮🇳' },
    { id: 'telugu', label: 'Telugu', flag: '🇮🇳' },
    { id: 'malayalam', label: 'Malayalam', flag: '🇮🇳' },
  ];

  const handleSaveSong = (updatedSong: any) => {
    setMockSongs(mockSongs.map(s => s.id === updatedSong.id ? updatedSong : s));
    setSongForModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-playfair text-3xl font-bold text-gray-800">Song Library</h2>
          <p className="text-gray-600 font-inter">Manage your choir's repertoire</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddNewSong}
          className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-violet-500 text-white px-6 py-3 rounded-xl font-inter hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          <span>Add New Song</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter"
          />
        </div>
        
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.flag} {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Songs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSongs.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSongForModal(song)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-violet-400 rounded-xl flex items-center justify-center">
                <Music className="text-white" size={24} />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); setSongForModal(song); }}>
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/50 rounded-lg transition-all" onClick={(e) => e.stopPropagation()}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">
              {song.title}
            </h3>
            
            {song.alternateTitle && (
              <p className="text-gray-600 font-inter mb-3">
                {song.alternateTitle}
              </p>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-inter">
                {song.category}
              </span>
              <span className="text-gray-500 font-inter">
                {song.updatedAt}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {songForModal && (
        <SongDetailsModal
          song={songForModal}
          onClose={() => setSongForModal(null)}
          onSave={handleSaveSong}
        />
      )}
    </div>
  );
};

export default SongManager;