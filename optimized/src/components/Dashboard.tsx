import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Plus, 
  Search, 
  Settings, 
  LogOut, 
  Home,
  BookOpen,
  Users,
  Mic,
  Eye,
  Monitor,
  Globe,
  Menu,
  X,
  User
} from 'lucide-react';
import { User as UserType } from '../types';
import SongManager from './SongManager';
import SongDisplay from './SongDisplay';
import ChoirView from './ChoirView';
import ProjectionMode from './ProjectionMode';
import BibleLookup from './BibleLookup';
import AddSongModal from './AddSongModal';
import ProfileModal from './ProfileModal';
import UpgradePlanModal from './UpgradePlanModal';

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSong, setSelectedSong] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addSongOpen, setAddSongOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'songs', label: 'Songs', icon: Music },
    { id: 'choir', label: 'Choir View', icon: Users },
    { id: 'projection', label: 'Projection', icon: Monitor },
    { id: 'bible', label: 'Bible', icon: BookOpen },
  ];

  const languages = [
    { id: 'english', label: 'English', flag: '🇺🇸' },
    { id: 'hindi', label: 'Hindi', flag: '🇮🇳' },
    { id: 'tamil', label: 'Tamil', flag: '🇮🇳' },
    { id: 'telugu', label: 'Telugu', flag: '🇮🇳' },
    { id: 'malayalam', label: 'Malayalam', flag: '🇮🇳' },
  ];

  const floatingButtons = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'songs', icon: Music, label: 'Songs' },
    { id: 'bible', icon: BookOpen, label: 'Bible' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'songs':
        return <SongManager onSelectSong={setSelectedSong} onAddNewSong={() => setAddSongOpen(true)} />;
      case 'choir':
        return <ChoirView selectedSong={selectedSong} />;
      case 'projection':
        return <ProjectionMode selectedSong={selectedSong} />;
      case 'bible':
        return <BibleLookup />;
      default:
        return <DashboardHome user={user} setAddSongOpen={setAddSongOpen} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      {/* Floating Sidebar Access Buttons */}
      <div className="fixed top-1/2 left-2 z-50 flex flex-col space-y-3 md:hidden">
        {floatingButtons.map(btn => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveTab(btn.id)}
              className={`p-3 rounded-full shadow-lg transition-all ${activeTab === btn.id ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-rose-100'}`}
              aria-label={btn.label}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-rose-500 to-violet-500 rounded-xl flex items-center justify-center">
                <Music className="text-white" size={20} />
              </div>
              <div>
                <h1 className="font-playfair text-lg md:text-2xl font-bold text-gray-800">LyricVerse</h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Choir Collaboration Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm rounded-full p-1">
              <div className="flex items-center space-x-2 px-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-rose-400 to-violet-400 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-inter text-xs md:text-sm text-gray-700 hidden sm:inline">{user.name}</span>
              </div>
              
              <div className="w-px h-6 bg-gray-200/80 mx-1"></div>

              <button
                onClick={() => setProfileOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/70 rounded-full transition-all"
              >
                <User size={18} />
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/70 rounded-full transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: 1, 
            x: sidebarOpen || window.innerWidth >= 768 ? 0 : -280 
          }}
          className={`
            fixed md:relative z-50 md:z-auto
            w-64 md:w-64 bg-white/50 backdrop-blur-sm border-r border-white/20 
            min-h-screen p-4 md:p-6 transition-transform duration-300 flex flex-col
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all text-sm md:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/70 hover:text-gray-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-inter">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all text-sm md:text-base text-gray-600 hover:bg-white/70 hover:text-gray-800"
            >
              <LogOut size={18} />
              <span className="font-inter">Logout</span>
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'home' ? <DashboardHome user={user} setAddSongOpen={setAddSongOpen} setActiveTab={setActiveTab} /> : renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* AddSongModal */}
      <AnimatePresence>
        {addSongOpen && (
          <AddSongModal open={addSongOpen} onClose={() => setAddSongOpen(false)} />
        )}
      </AnimatePresence>

      {/* ProfileModal */}
      <AnimatePresence>
        {profileOpen && (
          <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} onUpgrade={() => { setProfileOpen(false); setUpgradeOpen(true); }} user={user} />
        )}
      </AnimatePresence>

      {/* UpgradePlanModal */}
      <AnimatePresence>
        {upgradeOpen && (
          <UpgradePlanModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} user={user} />
        )}
      </AnimatePresence>
    </div>
  );
};

const DashboardHome: React.FC<{ user: UserType; setAddSongOpen: (open: boolean) => void; setActiveTab: (tab: string) => void }> = ({ user, setAddSongOpen, setActiveTab }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-playfair text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4"
        >
          Welcome back, {user.name}!
        </motion.h2>
        <p className="font-inter text-lg md:text-xl text-gray-600">
          Ready to create beautiful music together?
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:shadow-lg transition-all"
        >
          <div className="flex items-center space-x-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Plus className="text-white" size={20} />
            </div>
            <h3 className="font-playfair text-lg md:text-xl font-bold text-gray-800">Add New Song</h3>
          </div>
          <p className="text-gray-600 font-inter mb-3 md:mb-4 text-sm md:text-base">
            Create a new song with lyrics, chords, and translations.
          </p>
          <button className="w-full py-2 md:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-inter hover:shadow-md transition-all text-sm md:text-base" onClick={() => setAddSongOpen(true)}>
            Get Started
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:shadow-lg transition-all"
        >
          <div className="flex items-center space-x-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <h3 className="font-playfair text-lg md:text-xl font-bold text-gray-800">Choir Mode</h3>
          </div>
          <p className="text-gray-600 font-inter mb-3 md:mb-4 text-sm md:text-base">
            Start a collaborative session with your choir members.
          </p>
          <button className="w-full py-2 md:py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg font-inter hover:shadow-md transition-all text-sm md:text-base" onClick={() => setActiveTab('choir')}>
            Start Session
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:shadow-lg transition-all md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center space-x-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Monitor className="text-white" size={20} />
            </div>
            <h3 className="font-playfair text-lg md:text-xl font-bold text-gray-800">Projection</h3>
          </div>
          <p className="text-gray-600 font-inter mb-3 md:mb-4 text-sm md:text-base">
            Display lyrics and chords for live performances
            with LyricVerse.
          </p>
          <button className="w-full py-2 md:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-inter hover:shadow-md transition-all text-sm md:text-base" onClick={() => setActiveTab('projection')}>
            Launch
          </button>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20"
      >
        <h3 className="font-playfair text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Recent Activity</h3>
        <div className="space-y-3 md:space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white/50 rounded-xl">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-rose-400 to-violet-400 rounded-full flex items-center justify-center">
                <Music className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <h4 className="font-inter font-medium text-gray-800 text-sm md:text-base">Amazing Grace</h4>
                <p className="text-xs md:text-sm text-gray-600">Updated 2 hours ago</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <Eye size={18} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;