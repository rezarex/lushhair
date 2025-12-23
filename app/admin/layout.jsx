'use client';

import { useState, useEffect } from 'react';
import AdminAuth from './auth/page';
import { LayoutDashboard, Scissors, Star, LogOut, Loader2, MessageSquare, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-black font-sans text-zinc-300">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-white/5 hidden md:flex flex-col">
        <div className="p-6 bg-gradient-to-b from-white to-zinc-200 border-b border-[#D4AF37]/30 flex items-center justify-center">
          <div className="relative w-full h-12">
            <Image 
              src="/logo.png" 
              alt="Lush Hair Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        {/* Navigation List - Logout moved inside this scrollable area */}
        <nav className="flex-1 mt-8 px-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#2D5A27]/10 hover:text-[#D4AF37] transition-all group">
            <LayoutDashboard size={20} className="group-hover:text-[#2D5A27]" />
            <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Overview</span>
          </Link>
          <Link href="/admin/services" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#2D5A27]/10 hover:text-[#D4AF37] transition-all group">
            <Scissors size={20} className="group-hover:text-[#2D5A27]" />
            <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Services</span>
          </Link>
          <Link href="/admin/bookings" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#2D5A27]/10 hover:text-[#D4AF37] transition-all group">
            <CalendarCheck size={20} className="group-hover:text-[#2D5A27]" />
            <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Bookings</span>
          </Link>
          <Link href="/admin/reviews" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#2D5A27]/10 hover:text-[#D4AF37] transition-all group">
            <Star size={20} className="group-hover:text-[#2D5A27]" />
            <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Reviews</span>
          </Link>
          <Link href="/admin/chat" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#2D5A27]/10 hover:text-[#D4AF37] transition-all group">
            <MessageSquare size={20} className="group-hover:text-[#2D5A27]" />
            <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Live Chat</span>
          </Link>

          {/* Separator and Logout moved higher */}
          <div className="pt-4 mt-4 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Empty Footer space to ensure floating buttons don't cover content */}
        <div className="h-16 md:h-20"></div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-zinc-950 border-b border-white/5 flex items-center px-8 justify-between">
          <div>
            <h2 className="font-light text-white uppercase tracking-[0.3em] text-sm">Management Console</h2>
            <div className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-widest mt-0.5">Lush Hair 2.0</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-[#2D5A27] animate-pulse"></div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">System Online</span>
          </div>
        </header>

        <main className="p-8 bg-black min-h-[calc(100vh-80px)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}