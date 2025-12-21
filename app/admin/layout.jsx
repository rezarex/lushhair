'use client';

import { useState, useEffect } from 'react';
import AdminAuth from './auth/page';
import { LayoutDashboard, Calendar, Scissors, Star, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if token exists on load
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

  // 1. Show a loader while checking localStorage to prevent "flicker"
  if (checkingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin text-pink-600" size={40} />
      </div>
    );
  }

  // 2. If NOT logged in, show the Login/Signup page
  if (!isAuthenticated) {
    return <AdminAuth onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // 3. If logged in, show the Dashboard layout
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-xl font-black text-pink-600 tracking-tighter italic">LUSH ADMIN</h1>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-1">
          <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all">
            <LayoutDashboard size={20} />
            <span className="font-semibold">Overview</span>
          </Link>
          <Link href="/admin/services" className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all">
            <Scissors size={20} />
            <span className="font-semibold">Services</span>
          </Link>
          <Link href="/admin/reviews" className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all">
            <Star size={20} />
            <span className="font-semibold">Manage Reviews</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all font-bold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center px-8 justify-between">
          <h2 className="font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lush Hair 2.0</div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}