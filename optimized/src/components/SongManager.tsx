import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Music } from 'lucide-react';
import { Song as SongType } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface SongManagerProps {
  songs: SongType[];
  onSelectSong: (song: SongType) => void;
  onAddSong: () => void;
  onEditSong: (song: SongType) => void;
}

const SongManager: React.FC<SongManagerProps> = ({ songs, onSelectSong, onAddSong, onEditSong }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const languages = [
    { id: 'all', label: 'All Languages', flag: '🌍' },
    { id: 'english', label: 'English', flag: '🇺🇸' },
    { id: 'hindi', label: 'Hindi', flag: '🇮🇳' },
    { id: 'tamil', label: 'Tamil', flag: '🇮🇳' },
    { id: 'telugu', label: 'Telugu', flag: '🇮🇳' },
    { id: 'malayalam', label: 'Malayalam', flag: '🇮🇳' },
  ];

  const filteredSongs = useMemo(() => songs.filter(song => {
    const searchMatch = searchTerm.trim() === '' ||
                        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (song.alternateTitle && song.alternateTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const languageMatch = selectedLanguage === 'all' || song.language === selectedLanguage;

    return searchMatch && languageMatch;
  }), [songs, searchTerm, selectedLanguage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-playfair text-3xl font-bold text-gray-800">Song Library</h2>
          <p className="text-gray-600 font-inter">Manage your Song repertoire</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddSong}
          className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-violet-500 text-white px-5 py-2.5 rounded-xl font-inter hover:shadow-lg transition-all text-sm md:text-base"
        >
          <Plus size={20} />
          <span>Add New Song</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search songs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter"
          />
        </div>
        
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full md:w-auto px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter"
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
        {filteredSongs.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all flex flex-col"
          >
            <div onClick={() => onSelectSong(song)} className="cursor-pointer flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-violet-400 rounded-xl flex items-center justify-center">
                  <Music className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-1 truncate">{song.title}</h3>
              {song.author && <p className="text-sm text-gray-500 font-inter mb-2 truncate">by {song.author}</p>}
              {song.alternateTitle && <p className="text-gray-600 font-inter mb-3 truncate">{song.alternateTitle}</p>}
            </div>
            
            <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-white/30">
              <div className="flex space-x-2">
                <button
                  className="p-2 text-gray-400 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all"
                  onClick={(e) => { e.stopPropagation(); onEditSong(song); }}
                  aria-label="Edit Song"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/50 rounded-lg transition-all"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Delete Song"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <span className="text-gray-500 font-inter">
                {formatDistanceToNow(new Date(song.updatedAt), { addSuffix: true })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SongManager;