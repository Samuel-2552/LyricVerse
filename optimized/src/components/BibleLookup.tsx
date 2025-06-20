import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Copy, Share2 } from 'lucide-react';

const BibleLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('NIV');

  const bibleBooks = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    'Matthew', 'Mark', 'Luke', 'John', 'Acts',
    'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians'
  ];

  const versions = [
    { id: 'NIV', name: 'New International Version' },
    { id: 'ESV', name: 'English Standard Version' },
    { id: 'KJV', name: 'King James Version' },
    { id: 'NASB', name: 'New American Standard Bible' }
  ];

  const mockVerses = [
    {
      reference: 'John 3:16',
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      version: 'NIV'
    },
    {
      reference: 'Psalm 23:1',
      text: 'The Lord is my shepherd, I lack nothing.',
      version: 'NIV'
    },
    {
      reference: 'Romans 8:28',
      text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      version: 'NIV'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-2">Bible Lookup</h2>
        <p className="text-gray-600 font-inter">Search and display scripture verses</p>
      </div>

      {/* Search Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search verses or enter reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter"
          />
        </div>
        
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter"
        >
          <option value="">All Books</option>
          {bibleBooks.map((book) => (
            <option key={book} value={book}>{book}</option>
          ))}
        </select>

        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-inter"
        >
          {versions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.name}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {mockVerses.map((verse, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold text-gray-800">
                    {verse.reference}
                  </h3>
                  <p className="text-sm text-gray-500 font-inter">{verse.version}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
            
            <blockquote className="text-gray-700 font-inter text-lg leading-relaxed italic">
              "{verse.text}"
            </blockquote>
          </motion.div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">Popular Verses</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'John 3:16', 'Psalm 23:1', 'Romans 8:28', 'Philippians 4:13',
            'Isaiah 41:10', 'Jeremiah 29:11', 'Matthew 28:19', 'Ephesians 2:8-9'
          ].map((reference) => (
            <button
              key={reference}
              className="p-3 bg-white/50 hover:bg-white/70 rounded-lg text-left font-inter text-sm text-gray-700 transition-all"
            >
              {reference}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BibleLookup;