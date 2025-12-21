'use client';

import { useState } from 'react';
import { MessageCircle, MessageSquare, Plus, X, Send, User } from 'lucide-react';

export default function FloatingContact() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const whatsappNumber = "+12263378306"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello! I'm interested in booking a service with Lush Hair 2.0.`;

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsFabOpen(false); // Close the menu when chat opens
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end font-sans">
      
      {/* --- Actual Chat Window --- */}
      <div 
        className={`mb-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 ease-in-out transform ${
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
              <p className="text-[10px] text-pink-100 uppercase tracking-widest">Typically replies in minutes</p>
            </div>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-1 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Chat Body (Default Greeting) */}
        <div className="h-80 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 flex flex-col space-y-4">
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex-shrink-0 flex items-center justify-center">
              <User size={14} />
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Hi there! Welcome to <strong>Lush Hair 2.0</strong>. 👋 
                <br /><br />
                How can we help you today? Feel free to ask about our braiding styles, current availability, or travel fees!
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block text-right">Just now</span>
            </div>
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-grow bg-gray-100 dark:bg-gray-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 outline-none dark:text-white"
          />
          <button className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* --- Sub-options (WhatsApp & Toggle Live Chat) --- */}
      <div 
        className={`flex flex-col items-end space-y-4 mb-4 transition-all duration-300 ease-out ${
          isFabOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
        }`}
      >
        {/* WhatsApp Option */}
        <div className="flex items-center group">
          <span className="mr-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-md text-sm font-semibold text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle size={24} />
          </a>
        </div>

        {/* Live Chat Option (Toggles the window above) */}
        <div className="flex items-center group">
          <span className="mr-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-md text-sm font-semibold text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
            Live Chat
          </span>
          <button
            onClick={toggleChat}
            className="p-4 bg-pink-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <MessageSquare size={24} />
          </button>
        </div>
      </div>

      {/* --- Main FAB Toggle --- */}
      <button
        onClick={() => setIsFabOpen(!isFabOpen)}
        className={`p-5 rounded-full shadow-2xl transition-all duration-300 transform ${
          isFabOpen || isChatOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-pink-600 text-white hover:scale-105'
        }`}
      >
        {isFabOpen || isChatOpen ? <X size={28} /> : <Plus size={28} />}
      </button>
    </div>
  );
}