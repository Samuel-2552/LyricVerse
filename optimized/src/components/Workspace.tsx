import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LogIn, Eye, Edit, UserCheck, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';

const Workspace: React.FC = () => {
    const [accessCode, setAccessCode] = useState<string | null>(null);
    const [joinCode, setJoinCode] = useState('');
    const [permission, setPermission] = useState<'view' | 'edit' | 'full'>('view');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    const [session, setSession] = useState<{code: string; role: string} | null>(null);
    const [mobileView, setMobileView] = useState<'create' | 'join'>('create');

    const generateCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setAccessCode(code);
    };

    const handleCopy = () => {
        if (accessCode) {
            navigator.clipboard.writeText(accessCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCreate = () => {
        if (accessCode) {
            // Mock creating a session
            setSession({ code: accessCode, role: `Host (${permission})` });
        }
    };

    const handleJoin = () => {
        if (joinCode.length === 6) {
            setError('');
            // Mock joining a session
            setSession({ code: joinCode, role: 'Participant (View)' });
        } else {
            setError('Please enter a valid 6-digit code.');
        }
    };

    if(session) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-center p-4"
            >
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <ShieldCheck className="text-white" size={48} />
                </div>
                <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-2">Workspace Active</h2>
                <p className="font-inter text-lg text-gray-600">
                    You are connected to workspace <span className="font-bold text-teal-600">{session.code}</span>
                </p>
                <p className="font-inter text-gray-500 capitalize">
                    Your role: <span className="font-semibold">{session.role}</span>
                </p>
                <button 
                    onClick={() => setSession(null)} 
                    className="mt-8 px-8 py-3 bg-white/80 backdrop-blur-sm border border-white/30 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all font-inter"
                >
                    Leave Workspace
                </button>
            </motion.div>
        )
    }

    const createPanel = (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-4">
            <h3 className="font-playfair text-xl font-bold text-gray-800 flex items-center"><Plus className="mr-2 text-rose-500"/>Create a Workspace</h3>
            {accessCode ? (
                <div className="space-y-4">
                    <p className="font-inter text-sm text-gray-600">Share this code with your team:</p>
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                        <input type="text" readOnly value={accessCode.split('').join(' ')} className="bg-transparent text-gray-800 w-full outline-none font-mono text-2xl tracking-[0.2em] text-center" />
                        <motion.button whileTap={{ scale: 0.9 }} onClick={handleCopy} className={`p-2 rounded-md transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </motion.button>
                    </div>
                    <div className="space-y-2 pt-2">
                        <label className="font-inter text-sm text-gray-700 font-medium">Permissions for new members:</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => setPermission('view')} className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${permission === 'view' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-200 hover:bg-gray-50'}`}><Eye size={16}/><span className="text-sm font-medium">View</span></button>
                            <button onClick={() => setPermission('edit')} className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${permission === 'edit' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-200 hover:bg-gray-50'}`}><Edit size={16}/><span className="text-sm font-medium">Edit</span></button>
                            <button onClick={() => setPermission('full')} className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${permission === 'full' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-200 hover:bg-gray-50'}`}><UserCheck size={16}/><span className="text-sm font-medium">Full</span></button>
                        </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCreate} className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-lg font-inter hover:shadow-lg transition-all font-semibold">
                        <span>Start Session</span>
                        <ArrowRight size={18}/>
                    </motion.button>
                </div>
            ) : (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={generateCode} className="w-full py-3 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-lg font-inter hover:shadow-lg transition-all font-semibold">
                    Generate Access Code
                </motion.button>
            )}
        </div>
    );

    const joinPanel = (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-4">
            <h3 className="font-playfair text-xl font-bold text-gray-800 flex items-center"><LogIn className="mr-2 text-violet-500"/>Join a Workspace</h3>
            <div className="space-y-4">
                <div>
                    <label className="font-inter text-sm text-gray-700 mb-1 font-medium">Enter 6-Digit Code</label>
                    <input
                        type="text"
                        maxLength={6}
                        value={joinCode}
                        onChange={e => setJoinCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono text-center text-3xl tracking-[0.2em]"
                        placeholder="_ _ _ _ _ _"
                    />
                    {error && <p className="text-xs text-rose-500 mt-1 text-center">{error}</p>}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleJoin} className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700 text-white rounded-lg font-inter hover:bg-gray-800 transition-all font-semibold">
                    <span>Join Session</span>
                    <ArrowRight size={18}/>
                </motion.button>
            </div>
        </div>
    );

  return (
    <div className="space-y-8">
        <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-2">Workspace</h2>
            <p className="text-gray-600 font-inter">Create or join a real-time collaboration session.</p>
        </div>

        <div className="max-w-5xl mx-auto">
            {/* Desktop View */}
            <div className="hidden md:relative md:grid md:grid-cols-2 md:gap-8">
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div className="w-px h-full bg-gray-200"></div>
                </div>
                {createPanel}
                {joinPanel}
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 px-4">
                 <div className="flex bg-gray-200/80 rounded-xl p-1">
                    <button
                        onClick={() => setMobileView('create')}
                        className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                            mobileView === 'create' ? 'bg-white text-gray-800 shadow-md' : 'text-gray-500'
                        }`}
                    >
                        Create Session
                    </button>
                    <button
                        onClick={() => setMobileView('join')}
                        className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                            mobileView === 'join' ? 'bg-white text-gray-800 shadow-md' : 'text-gray-500'
                        }`}
                    >
                        Join Session
                    </button>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mobileView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {mobileView === 'create' ? createPanel : joinPanel}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </div>
  );
};

export default Workspace; 