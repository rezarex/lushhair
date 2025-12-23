'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search,
  Filter,
  Phone,
  Loader2,
  Mail,
  MessageSquare
} from 'lucide-react';
import { API_BASE_URL } from '@/config/config';

const BOOKING_API = `${API_BASE_URL}/booking`;
const EDIT_BOOKING_API = (id) => `${API_BASE_URL}/booking/edit/${id}`;

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(BOOKING_API);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Status Update (Edit API)
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(EDIT_BOOKING_API(id), {
        method: 'PUT', // or PATCH depending on your backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      alert("Failed to update booking status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-900/20 text-green-500 border border-green-500/30';
      case 'Pending': return 'bg-yellow-900/20 text-yellow-500 border border-yellow-500/30';
      case 'Cancelled': return 'bg-red-900/20 text-red-400 border border-red-500/30';
      default: return 'bg-zinc-800 text-zinc-400 border border-zinc-700';
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-black min-h-screen">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent uppercase tracking-tighter">
            Bookings
          </h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Lush Hair 2.0 Dashboard</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:border-yellow-600 outline-none w-full md:w-64 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition-all text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Bookings Table Container */}
      <div className="bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-zinc-800">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Client</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Service</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Schedule</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Email</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin text-yellow-500 mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-zinc-500">No bookings found.</td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{booking.name}</span>
                        <span className="text-[10px] text-zinc-600 font-mono uppercase truncate w-24">{booking._id}</span>
                      </div>
                    </td>
                    
                    {/* UPDATED SERVICE COLUMN WITH EXTRA SERVICES TOOLTIP */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 relative group">
                        <span className="text-sm font-bold text-yellow-500 leading-tight">
                          {booking.service}
                        </span>
                        
                        {/* Only show if extraServices exists and is not empty */}
                        {booking.extraServices && (
                          <div className="flex items-center gap-1 cursor-help">
                            <span className="flex items-center gap-1 text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/20 font-black uppercase tracking-tighter">
                              <MessageSquare size={10} /> Extra Request
                            </span>

                            {/* Tooltip Content */}
                            <div className="absolute left-0 top-full mt-2 z-50 hidden group-hover:block w-64 p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                              <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">Additional Details:</p>
                              <p className="text-xs text-white font-light leading-relaxed">
                                {booking.extraServices}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs text-zinc-400 gap-1">
                        <div className="flex items-center gap-1.5"><Calendar size={12} className="text-green-500" /> {booking.bookingDate}</div>
                        <div className="flex items-center gap-1.5"><Clock size={12} className="text-green-500" /> {booking.timeslot}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-xs text-zinc-400">
                        <Mail size={12} className="text-zinc-600 shrink-0" />
                        <span className="w-32">{booking.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(booking.status || 'Pending')}`}>
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Call Button */}
                        <a 
                          href={`tel:${booking.phone}`} 
                          className="p-2 text-zinc-400 hover:text-green-500 hover:bg-green-900/20 rounded-lg transition-colors border border-transparent hover:border-green-500/30"
                          title="Call Client"
                        >
                          <Phone size={16} />
                        </a>
                        
                        {/* Status Toggle Buttons */}
                        {booking.status !== 'Confirmed' && (
                          <button 
                            onClick={() => updateStatus(booking._id, 'Confirmed')}
                            className="p-2 text-zinc-400 hover:text-yellow-500 hover:bg-yellow-900/20 rounded-lg transition-colors border border-transparent hover:border-yellow-500/30"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                        {booking.status !== 'Cancelled' && (
                          <button 
                            onClick={() => updateStatus(booking._id, 'Cancelled')}
                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
        <p className="font-bold tracking-widest uppercase text-[10px]">
          Live: {filteredBookings.length} Appointments Found
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-yellow-500 hover:border-yellow-600 transition-all">Previous</button>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-yellow-500 hover:border-yellow-600 transition-all">Next</button>
        </div>
      </div>
    </div>
  );
}