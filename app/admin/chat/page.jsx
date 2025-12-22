'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
import { 
  Send, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  User,
  Phone,
  Clock
} from 'lucide-react';

import { CHAT_API_BASE_URL } from '@/config/config';

// The endpoint that returns the array of chat objects
const HISTORY_API = `${CHAT_API_BASE_URL}/api/chat/history`;

export default function AdminChatPage() {
  // Initialize as empty array to prevent .forEach errors
  const [allMessages, setAllMessages] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  // 1. Fetch History & Initialize Socket
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(HISTORY_API);
        const data = await res.json();
        
        // Ensure data is an array before setting state
        const historyData = Array.isArray(data) ? data : [];
        setAllMessages(historyData);
        
        // Auto-select the first user if none selected
        if (historyData.length > 0 && !activeUser) {
          setActiveUser(historyData[0].user);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
        setAllMessages([]); 
      }
    };

    fetchHistory();

    // Socket Setup
    socketRef.current = io(CHAT_API_BASE_URL);
    
    socketRef.current.on('chat message', (data) => {
      setAllMessages((prev) => [...prev, {
        _id: Math.random().toString(),
        user: data.user,
        text: data.message || data.text,
        sender: data.sender || 'client',
        timestamp: new Date().toISOString()
      }]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // 2. Group messages into Unique Sessions (Sidebar logic)
  const conversations = useMemo(() => {
    const groups = {};
    
    // Safety check: only run if allMessages is an array
    if (Array.isArray(allMessages)) {
      allMessages.forEach(msg => {
        // Update group with the latest message from each user
        groups[msg.user] = {
          userName: msg.user,
          lastMsg: msg.text,
          time: msg.timestamp,
          unread: msg.msgStatus === 'unread' && msg.sender === 'client'
        };
      });
    }
    
    return Object.values(groups)
      .filter(c => c.userName.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [allMessages, searchTerm]);

  // 3. Filter messages for the current active chat window
  const activeChatMessages = useMemo(() => {
    return Array.isArray(allMessages) 
      ? allMessages.filter(m => m.user === activeUser)
      : [];
  }, [allMessages, activeUser]);

  // 4. Send Message Handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeUser) return;

    const payload = {
      user: activeUser,
      message: inputText,
      sender: 'admin'
    };

    socketRef.current.emit('chat message', payload);
    setInputText('');
  };

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChatMessages]);

  return (
    <div className="h-[calc(100vh-160px)] flex bg-black rounded-2xl shadow-2xl border border-amber-500/20 overflow-hidden">
      
      {/* --- Sidebar --- */}
      <aside className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-950">
        <div className="p-4 border-b border-zinc-800 bg-black">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-900 text-white border border-zinc-800 rounded-lg outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <button 
              key={chat.userName}
              onClick={() => setActiveUser(chat.userName)}
              className={`w-full p-4 flex items-start gap-3 border-b border-zinc-900 transition-all ${
                activeUser === chat.userName ? 'bg-zinc-900 border-l-4 border-l-amber-500' : 'hover:bg-zinc-900/40'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold">
                {chat.userName[0].toUpperCase()}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-200 truncate">{chat.userName}</span>
                  <span className="text-[9px] text-zinc-500 uppercase">
                    {new Date(chat.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className={`text-[11px] truncate ${chat.unread ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
                  {chat.lastMsg}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* --- Chat Content --- */}
      <section className="flex-1 flex flex-col bg-zinc-950">
        {activeUser ? (
          <>
            <header className="p-4 border-b border-zinc-800 flex justify-between items-center bg-black">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xs">
                  {activeUser[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeUser}</h3>
                  <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    Encrypted Session
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-zinc-400">
                <button className="p-2 hover:text-amber-500 transition-colors"><Phone size={18} /></button>
                <button className="p-2 hover:bg-zinc-900 rounded-lg"><MoreVertical size={18} /></button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeChatMessages.map((msg) => (
                <div key={msg._id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3 rounded-2xl ${
                    msg.sender === 'admin' 
                      ? 'bg-emerald-800 text-white rounded-tr-none' 
                      : 'bg-zinc-900 text-gray-200 border border-zinc-800 rounded-tl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 opacity-50 text-[9px]">
                      {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      {msg.sender === 'admin' && <CheckCircle2 size={10} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="p-4 bg-black border-t border-zinc-800">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your official response..."
                  className="flex-1 bg-zinc-900 text-white border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                />
                <button className="bg-amber-500 text-black p-3 rounded-xl hover:bg-amber-400 transition-all">
                  <Send size={20} />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-700">
            <Clock size={48} className="mb-4 opacity-20" />
            <p>Select a client session to view history</p>
          </div>
        )}
      </section>
    </div>
  );
}