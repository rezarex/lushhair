'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, MessageSquare, Plus, X, Send, User } from 'lucide-react';
import { io } from 'socket.io-client';
import { CHAT_API_BASE_URL } from '@/config/config';

// Initialize socket outside or in a ref to prevent multiple connections
let socket;

export default function FloatingContact() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Session States
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  
  const scrollRef = useRef(null);

  const whatsappNumber = "+12263378306"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello! I'm interested in booking a service with Lush Hair 2.0.`;

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Socket Connection
  useEffect(() => {
    if (isJoined) {
      // Connect to the Socket server
      socket = io(CHAT_API_BASE_URL);

      socket.on('connect', () => {
        console.log('Connected to Chat Server');
      });

      // Listen for incoming messages
      socket.on('chat message', (data) => {
        // Only show messages if they belong to this specific unique user session
        // or if they are from the admin directed at this user
        if (data.user === userName) {
          setMessages((prev) => [...prev, {
            user: data.user,
            text: data.message || data.text,
            sender: 'client',
            timestamp: new Date()
          }]);
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [isJoined, userName]);

  const startNewSession = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      const uniqueId = Math.floor(1000 + Math.random() * 9000);
      const uniqueName = `${userName}#${uniqueId}`;
      setUserName(uniqueName);
      setIsJoined(true);
      setMessages([]); // Ensure history is empty for new session
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const messageData = {
      user: userName,
      message: inputMessage, // Backend expects 'message' based on your controller
      sender: 'client'
    };

    // Emit via Socket
    socket.emit('chat message', messageData);
    
    setInputMessage('');
  };

  const closeAndResetChat = () => {
    setIsChatOpen(false);
    setIsJoined(false);
    setUserName('');
    setMessages([]);
    setSessionKey(prev => prev + 1);
    if (socket) socket.disconnect();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end font-sans pointer-events-none">
      
      {/* --- Chat Window --- */}
      <div 
        key={sessionKey}
        className={`mb-6 w-80 sm:w-96 bg-black rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden transition-all duration-500 transform pointer-events-auto ${
          isChatOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        {/* Chat Header - Black & Gold */}
        <div className="bg-gradient-to-r from-black to-gray-900 p-4 text-white flex justify-between items-center border-b border-amber-500/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <User size={20} className="text-black" />
            </div>
            <div>
              <p className="font-bold text-sm text-amber-400">Lush Hair Support</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                {isJoined ? `ID: ${userName.split('#')[1]}` : 'Secure Concierge'}
              </p>
            </div>
          </div>
          <button onClick={closeAndResetChat} className="hover:bg-white/10 p-1 rounded transition-colors">
            <X size={20} className="text-amber-500" />
          </button>
        </div>

        {/* Chat Body */}
        <div ref={scrollRef} className="h-80 p-4 bg-zinc-950 overflow-y-auto">
          {!isJoined ? (
            <form onSubmit={startNewSession} className="h-full flex flex-col justify-center space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm font-semibold text-amber-500 uppercase tracking-wider">Lush Hair 2.0</p>
                <p className="text-xs text-gray-400">Enter your name to begin a private session.</p>
              </div>
              <input 
                autoFocus
                type="text" 
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-amber-500 outline-none text-white placeholder:text-zinc-600"
              />
              <button type="submit" className="w-full bg-amber-500 text-black py-3 rounded-xl font-bold hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                Start Private Chat
              </button>
            </form>
          ) : (
            <div className="flex flex-col space-y-4">
              {/* Welcome Message */}
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-zinc-800 text-amber-500 rounded-full flex-shrink-0 flex items-center justify-center border border-amber-500/20">
                  <User size={14} />
                </div>
                <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-zinc-800">
                  <p className="text-sm text-gray-300">
                    Hello <span className="text-amber-400 font-bold">{userName.split('#')[0]}</span>. How can we assist you today?
                  </p>
                </div>
              </div>

              {/* Dynamic Messages */}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'client' 
                      ? 'bg-emerald-700 text-white rounded-tr-none' 
                      : 'bg-zinc-900 text-gray-200 border border-zinc-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Input */}
        {isJoined && (
          <form onSubmit={sendMessage} className="p-4 bg-black border-t border-zinc-800 flex items-center space-x-2">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message our team..." 
              className="flex-grow bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none text-white"
            />
            <button type="submit" className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-500 transition-colors">
              <Send size={18} />
            </button>
          </form>
        )}
      </div>

      {/* --- FAB Toggle --- */}
      <div className={`flex flex-col items-end space-y-4 mb-4 transition-all duration-300 pointer-events-auto ${isFabOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
        <a href={whatsappLink} target="_blank" className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-500"><MessageCircle size={24} /></a>
        <button onClick={() => { setIsChatOpen(true); setIsFabOpen(false); }} className="p-4 bg-zinc-900 text-amber-500 border border-amber-500/50 rounded-full shadow-lg hover:bg-black"><MessageSquare size={24} /></button>
      </div>

      <button
        onClick={() => setIsFabOpen(!isFabOpen)}
        className={`p-5 rounded-full shadow-2xl transition-all duration-300 pointer-events-auto ${isFabOpen || isChatOpen ? 'bg-amber-500 text-black rotate-90' : 'bg-black text-amber-500 border border-amber-500'}`}
      >
        {isFabOpen || isChatOpen ? <X size={28} /> : <Plus size={28} />}
      </button>
    </div>
  );
}