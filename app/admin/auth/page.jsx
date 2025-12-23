'use client';

import { useState } from 'react';
import { Lock, Mail, User, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/config';

export default function AdminAuth({ onLoginSuccess }) {
  const SIGNUP_API = `${API_BASE_URL}/auth/register`;
  const SIGNIN_API = `${API_BASE_URL}/auth/login`;

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? SIGNIN_API : SIGNUP_API;
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (data.token) {
        localStorage.setItem('admin-token', data.token);
      }
      
      if (onLoginSuccess) onLoginSuccess();

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full max-w-md text-center">
        <div className="inline-block px-4 py-1.5 mb-4 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5">
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">Secure Access</span>
        </div>
        <h1 className="text-4xl font-light text-white tracking-[0.2em] uppercase">Lush Admin</h1>
        <h2 className="mt-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          {isLogin ? 'Authorization Required' : 'Establish New Administrator'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-zinc-950 py-10 px-6 shadow-2xl border border-white/5 sm:rounded-3xl sm:px-12 relative overflow-hidden">
          {/* Subtle Green Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D5A27]/5 blur-[60px] rounded-full"></div>
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none text-xs tracking-widest transition-all"
                    placeholder="ADMIN NAME"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none text-xs tracking-widest transition-all"
                  placeholder="ADMIN@LUSHHAIR.COM"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-12 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none text-xs tracking-widest transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-[#D4AF37]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 py-4 bg-[#2D5A27] hover:bg-[#1a3a16] text-white rounded-2xl shadow-xl shadow-[#2D5A27]/10 text-[10px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : (isLogin ? "Sign In" : "Create Account")}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[9px] font-black text-zinc-500 hover:text-[#D4AF37] uppercase tracking-[0.2em] transition-colors"
            >
              {isLogin ? "Request New Admin Credentials" : "Return to Secure Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}