import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

const LANGUAGES = [
  { id: 'english', label: 'English' },
  { id: 'hindi', label: 'Hindi' },
  { id: 'tamil', label: 'Tamil' },
  { id: 'telugu', label: 'Telugu' },
  { id: 'malayalam', label: 'Malayalam' },
];

const SCALES = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

interface AddSongModalProps {
  open: boolean;
  onClose: () => void;
}

const AddSongModal: React.FC<AddSongModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    altTitle: '',
    language: '',
    author: '',
    genre: '',
    lyrics: '',
    transliteration: '',
    link: '',
    scale: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.altTitle.trim()) newErrors.altTitle = 'Alternate title is required.';
    if (!form.language) newErrors.language = 'Language is required.';
    if (!form.link.trim()) newErrors.link = 'Song link is required.';
    if (!form.lyrics.trim()) newErrors.lyrics = 'Lyrics are required.';
    if (!form.scale.trim()) newErrors.scale = 'Scale is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // Submit logic here
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-2 p-6 md:p-8 relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-2 text-center">Add New Song</h2>
        <p className="text-gray-500 text-center mb-6">Fill in the details below to create a new song.</p>
        <form className="space-y-4 max-h-[70vh] overflow-y-auto px-1" onSubmit={handleSubmit}>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Title<span className="text-rose-500 ml-1">*</span></label>
            <input name="title" value={form.title} onChange={handleChange} required className={`w-full rounded-lg border ${errors.title ? 'border-rose-400' : 'border-gray-200'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400`} placeholder="Song Title" />
            {errors.title && <div className="text-xs text-rose-500 mt-1">{errors.title}</div>}
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Alternate Title<span className="text-rose-500 ml-1">*</span></label>
            <input name="altTitle" value={form.altTitle} onChange={handleChange} required className={`w-full rounded-lg border ${errors.altTitle ? 'border-rose-400' : 'border-gray-200'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400`} placeholder="Alternate Title" />
            {errors.altTitle && <div className="text-xs text-rose-500 mt-1">{errors.altTitle}</div>}
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Language<span className="text-rose-500 ml-1">*</span></label>
            <select name="language" value={form.language} onChange={handleChange} required className={`w-full rounded-lg border ${errors.language ? 'border-rose-400' : 'border-gray-200'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400`}>
              <option value="">Select Language</option>
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.label}</option>
              ))}
            </select>
            {errors.language && <div className="text-xs text-rose-500 mt-1">{errors.language}</div>}
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Author</label>
            <input name="author" value={form.author} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400" placeholder="Author Name" />
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Genre</label>
            <input name="genre" value={form.genre} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400" placeholder="Genre" />
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Lyrics<span className="text-rose-500 ml-1">*</span></label>
            <textarea name="lyrics" value={form.lyrics} onChange={handleChange} required className={`w-full rounded-lg border ${errors.lyrics ? 'border-rose-400' : 'border-gray-200'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 min-h-[80px]`} placeholder="Lyrics" />
            {errors.lyrics && <div className="text-xs text-rose-500 mt-1">{errors.lyrics}</div>}
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Transliteration</label>
            <textarea name="transliteration" value={form.transliteration} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 min-h-[60px]" placeholder="Transliteration (optional)" />
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Song Link<span className="text-rose-500 ml-1">*</span></label>
            <input name="link" value={form.link} onChange={handleChange} required className={`w-full rounded-lg border ${errors.link ? 'border-rose-400' : 'border-gray-200'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400`} placeholder="https://..." />
            <div className="flex items-center mt-2 text-xs text-rose-500 bg-rose-50 rounded-lg px-2 py-1">
              <AlertTriangle size={16} className="mr-1" />
              Caution: If the link is found malicious, your account will be blocked.
            </div>
            {errors.link && <div className="text-xs text-rose-500 mt-1">{errors.link}</div>}
          </div>
          <div>
            <label className="block font-inter text-sm text-gray-700 mb-1">Scale</label>
            <select name="scale" value={form.scale} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400">
              <option value="">Select Scale</option>
              {SCALES.map((scale) => (
                <option key={scale} value={scale}>{scale}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full py-3 mt-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-inter font-semibold hover:shadow-lg transition-all text-base">
            Submit Song
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddSongModal; 