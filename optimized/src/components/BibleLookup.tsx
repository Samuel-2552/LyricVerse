import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Copy, Share2, Plus, Edit, Trash2, Check } from 'lucide-react';
import AddVerseModal from './AddVerseModal';

interface Verse {
    id: string;
    reference: string;
    text: string;
    version: string;
    isCustom?: boolean;
}

const ViewVerseModal = ({ verse, onClose }: { verse: Verse | null; onClose: () => void }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (verse) {
            navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference} (${verse.version})`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
      <AnimatePresence>
        {verse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <BookOpen className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-playfair text-2xl font-bold text-gray-800">
                        {verse.reference}
                      </h3>
                      <p className="text-md text-gray-500 font-inter">{verse.version}</p>
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-700 font-inter text-xl md:text-2xl leading-relaxed my-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                 "{verse.text}"
                </blockquote>

                <div className="flex justify-end items-center space-x-4">
                    <button onClick={onClose} className="px-6 py-2.5 bg-gray-200/80 text-gray-800 rounded-lg hover:bg-gray-300/80 transition-all font-inter font-medium">Close</button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy} 
                        className="px-6 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all font-inter font-semibold flex items-center space-x-2 shadow-lg shadow-rose-500/30"
                    >
                        {copied ? <Check size={18}/> : <Copy size={18}/>}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </motion.button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
};

const BibleLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('NIV');
  
  const initialVerses: Verse[] = [
    { id: 'john316', reference: 'John 3:16', text: 'For God so loved the world...', version: 'NIV' },
    { id: 'psalm231', reference: 'Psalm 23:1', text: 'The Lord is my shepherd...', version: 'NIV' },
    { id: 'romans828', reference: 'Romans 8:28', text: 'And we know that in all things God works for the good...', version: 'NIV' }
  ];
  const [verses, setVerses] = useState<Verse[]>(initialVerses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVerse, setEditingVerse] = useState<Verse | null>(null);
  const [viewingVerse, setViewingVerse] = useState<Verse | null>(null);

  const bibleBooks = useMemo(() => [...new Set(initialVerses.map(v => v.reference.split(' ')[0]))], [initialVerses]);

  const versions = [
    { id: 'NIV', name: 'New International Version' },
    { id: 'ESV', name: 'English Standard Version' },
    { id: 'KJV', name: 'King James Version' },
    { id: 'NASB', name: 'New American Standard Bible' }
  ];

  const handleSaveVerse = (verseData: { reference: string; text: string }) => {
    if (editingVerse) {
      setVerses(verses.map(v => v.id === editingVerse.id ? { ...v, ...verseData } : v));
    } else {
      const newVerse: Verse = { ...verseData, id: new Date().toISOString(), version: 'Custom', isCustom: true };
      setVerses([...verses, newVerse]);
    }
  };
  
  const handleDeleteVerse = (id: string) => {
    setVerses(verses.filter(v => v.id !== id));
  };
  
  const filteredVerses = useMemo(() => {
    return verses.filter(verse => {
      const searchMatch = searchTerm.trim() === '' ||
                          verse.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          verse.text.toLowerCase().includes(searchTerm.toLowerCase());
      const bookMatch = selectedBook === '' || verse.reference.startsWith(selectedBook);
      const versionMatch = selectedVersion === 'ALL' || verse.version === selectedVersion;
      return searchMatch && bookMatch && versionMatch;
    });
  }, [verses, searchTerm, selectedBook, selectedVersion]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
            <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-2">Bible Lookup</h2>
            <p className="text-gray-600 font-inter">Search and manage scripture verses</p>
        </div>
        <button
            onClick={() => { setEditingVerse(null); setIsModalOpen(true); }}
            className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-violet-500 text-white px-5 py-2.5 rounded-xl font-inter hover:shadow-lg transition-all"
        >
            <Plus size={20} />
            <span>Add New Verse</span>
        </button>
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
        {filteredVerses.map((verse, index) => (
          <motion.div
            key={verse.id}
            onClick={() => setViewingVerse(verse)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all cursor-pointer"
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
                {verse.isCustom && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setEditingVerse(verse); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white/50 rounded-lg"><Edit size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteVerse(verse.id); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/50 rounded-lg"><Trash2 size={16} /></button>
                  </>
                )}
                <button onClick={(e) => e.stopPropagation()} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg"><Copy size={16} /></button>
                <button onClick={(e) => e.stopPropagation()} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg"><Share2 size={16} /></button>
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

      <AddVerseModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVerse}
        initialData={editingVerse}
      />
      <ViewVerseModal verse={viewingVerse} onClose={() => setViewingVerse(null)} />
    </div>
  );
};

export default BibleLookup;