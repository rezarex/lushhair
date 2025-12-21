'use client';

import { useState } from 'react';
import { 
  Send, 
  User, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Phone
} from 'lucide-react';

const mockConversations = [
  { id: 1, name: "Sarah J. #4829", lastMsg: "How much for a sew-in?", time: "2m ago", online: true, unread: true },
  { id: 2, name: "Mike Ross #1102", lastMsg: "Do you have slots for Saturday?", time: "15m ago", online: true, unread: false },
  { id: 3, name: "Jenny Doe #8831", lastMsg: "Thank you so much!", time: "1h ago", online: false, unread: false },
];

export default function AdminChatPage() {
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-160px)] flex bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      
      {/* --- Sidebar: Active Conversations --- */}
      <aside className="w-80 border-r border-gray-100 dark:border-gray-700 flex flex-col bg-gray-50/50 dark:bg-gray-900/20">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((chat) => (
            <button 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full p-4 flex items-start gap-3 border-b border-gray-50 dark:border-gray-800 transition-colors ${
                activeChat?.id === chat.id ? 'bg-white dark:bg-gray-800 ring-1 ring-inset ring-pink-500/20' : 'hover:bg-gray-100/50 dark:hover:bg-gray-700/30'
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 flex items-center justify-center font-bold">
                  {chat.name[0]}
                </div>
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full"></div>}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold dark:text-white truncate">{chat.name}</span>
                  <span className="text-[10px] text-gray-400">{chat.time}</span>
                </div>
                <p className={`text-[11px] truncate ${chat.unread ? 'font-bold text-gray-900 dark:text-gray-200' : 'text-gray-500'}`}>
                  {chat.lastMsg}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* --- Main: Chat Window --- */}
      <section className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
              {activeChat?.name[0]}
            </div>
            <div>
              <h3 className="text-sm font-bold dark:text-white">{activeChat?.name}</h3>
              <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Live Now
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all"><Phone size={18} /></button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"><MoreVertical size={18} /></button>
          </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-gray-900/10">
          {/* Client Message */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-600">
              <p className="text-sm dark:text-gray-200">Hello! I'm interested in booking box braids for this Friday. Do you have any space available?</p>
              <span className="text-[10px] text-gray-400 mt-1 block">10:42 AM</span>
            </div>
          </div>

          {/* Admin Reply */}
          <div className="flex flex-row-reverse items-start gap-2 max-w-[80%] ml-auto">
            <div className="bg-pink-600 p-3 rounded-2xl rounded-tr-none shadow-md">
              <p className="text-sm text-white">Hi! Let me check our schedule. We actually have a 2:00 PM slot open. Would that work for you?</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-pink-100">10:45 AM</span>
                <CheckCircle2 size={10} className="text-pink-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <footer className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <form 
            onSubmit={(e) => { e.preventDefault(); setMessage(''); }}
            className="flex items-center gap-3"
          >
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 bg-gray-100 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none dark:text-white"
            />
            <button className="bg-pink-600 text-white p-3 rounded-xl hover:bg-pink-700 transition-all shadow-lg shadow-pink-500/20">
              <Send size={20} />
            </button>
          </form>
        </footer>
      </section>
    </div>
  );
}