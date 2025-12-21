'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, MessageSquare, Plus, X, Send, User, RefreshCw } from 'lucide-react';

export default function FloatingContact() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Session States
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [sessionKey, setSessionKey] = useState(0); // Used to reset the chat instance

  const whatsappNumber = "+12263378306"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello! I'm interested in booking a service with Lush Hair 2.0.`;

  // Function to start a completely fresh session
  const startNewSession = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsJoined(true);
      // Adding a unique ID to the name for this specific instance
      const uniqueId = Math.floor(1000 + Math.random() * 9000);
      setUserName(`${userName} #${uniqueId}`);
    }
  };

  const closeAndResetChat = () => {
    setIsChatOpen(false);
    setIsJoined(false);
    setUserName('');
    setSessionKey(prev => prev + 1); // Force React to unmount/remount chat body
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end font-sans">
      
      {/* --- Chat Window --- */}
      <div 
        key={sessionKey} // This ensures the whole block resets when sessionKey changes
        className={`mb-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 transform ${
          isChatOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-pink-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Lush Hair Support</p>
              <p className="text-[10px] text-pink-100 uppercase">New Session: {isJoined ? userName : 'Identify Yourself'}</p>
            </div>
          </div>
          <button onClick={closeAndResetChat} className="hover:bg-white/10 p-1 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Chat Body Logic */}
        <div className="h-80 p-4 bg-gray-50 dark:bg-gray-950/50 overflow-y-auto">
          {!isJoined ? (
            /* --- STEP 1: Name Collection Form --- */
            <form onSubmit={startNewSession} className="h-full flex flex-col justify-center space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Welcome to Lush Hair 2.0</p>
                <p className="text-xs text-gray-500">Please enter your name to start a new chat.</p>
              </div>
              <input 
                autoFocus
                type="text" 
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name" 
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none dark:text-white"
              />
              <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition-all">
                Start Chat
              </button>
            </form>
          ) : (
            /* --- STEP 2: Active Chat Area (History will be empty on start) --- */
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex-shrink-0 flex items-center justify-center">
                  <User size={14} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Hello <strong>{userName.split(' #')[0]}</strong>! This is a fresh session. How can we help you today?
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input (Only visible when joined) */}
        {isJoined && (
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-grow bg-gray-100 dark:bg-gray-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 outline-none dark:text-white"
            />
            <button className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700">
              <Send size={18} />
            </button>
          </div>
        )}
      </div>

      {/* --- FAB Toggle --- */}
      <div className={`flex flex-col items-end space-y-4 mb-4 transition-all duration-300 ${isFabOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
        <a href={whatsappLink} target="_blank" className="p-4 bg-green-500 text-white rounded-full shadow-lg"><MessageCircle size={24} /></a>
        <button onClick={() => { setIsChatOpen(true); setIsFabOpen(false); }} className="p-4 bg-pink-500 text-white rounded-full shadow-lg"><MessageSquare size={24} /></button>
      </div>

      <button
        onClick={() => setIsFabOpen(!isFabOpen)}
        className={`p-5 rounded-full shadow-2xl transition-all duration-300 ${isFabOpen || isChatOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-pink-600 text-white'}`}
      >
        {isFabOpen || isChatOpen ? <X size={28} /> : <Plus size={28} />}
      </button>
    </div>
  );
}