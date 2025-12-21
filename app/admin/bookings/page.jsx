'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Phone
} from 'lucide-react';

const initialBookings = [
  { 
    id: 'BK-9021', 
    client: "Vanessa Williams", 
    email: "vanessa@example.com",
    phone: "+1 234 567 8901",
    service: "Box Braids (Medium)", 
    date: "2023-10-30", 
    time: "10:00 AM", 
    deposit: "Paid", 
    amount: "$120.00",
    status: 'Confirmed' 
  },
  { 
    id: 'BK-9022', 
    client: "Nesta Smith", 
    email: "tasha.s@example.com",
    phone: "+1 234 567 8902",
    service: "Wig Install", 
    date: "2023-10-30", 
    time: "02:30 PM", 
    deposit: "Pending", 
    amount: "$85.00",
    status: 'Pending' 
  },
  { 
    id: 'BK-9023', 
    client: "Michelle Obama", 
    email: "michelle@whitehouse.gov",
    phone: "+1 234 567 0001",
    service: "Crochet Braids", 
    date: "2023-10-31", 
    time: "09:00 AM", 
    deposit: "Paid", 
    amount: "$90.00",
    status: 'Confirmed' 
  }
];

export default function BookingsManagement() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Bookings</h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 outline-none w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-gray-800 transition-all text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Client / ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Service</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Schedule</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Deposit</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">{booking.client}</span>
                      <span className="text-[10px] text-gray-400 font-mono uppercase">{booking.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs text-gray-600 dark:text-gray-400 gap-1">
                      <div className="flex items-center gap-1.5"><Calendar size={12} className="text-pink-600" /> {booking.date}</div>
                      <div className="flex items-center gap-1.5"><Clock size={12} className="text-pink-600" /> {booking.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-bold uppercase ${booking.deposit === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {booking.deposit}
                      </span>
                      <span className="text-xs font-bold dark:text-white">{booking.amount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors" title="Call Client">
                        <Phone size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination / Summary Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>Showing {bookings.length} upcoming appointments</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all">Previous</button>
          <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all">Next</button>
        </div>
      </div>
    </div>
  );
}