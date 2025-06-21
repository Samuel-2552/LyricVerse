export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  purpose?: string;
}

export interface Song {
  id: string;
  title: string;
  alternateTitle?: string;
  chords: string;
  lyrics: string;
  transliteration?: string;
  language: 'hindi' | 'tamil' | 'telugu' | 'malayalam' | 'english';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}