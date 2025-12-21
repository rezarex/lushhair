'use client';

import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  Star, 
  Scissors, 
  ArrowUpRight, 
  Clock 
} from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$4,250', growth: '+12.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Active Bookings', value: '24', growth: '+3 today', icon: CalendarCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Clients', value: '148', growth: '+8% month', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Avg. Rating', value: '4.8', growth: '120 reviews', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const recentActivity = [
  { id: 1, client: "Jane Doe", service: "Box Braids", time: "2 hours ago", status: "Completed", amount: "$120" },
  { id: 2, client: "Sarah Smith", service: "Wig Install", time: "5 hours ago", status: "Pending", amount: "$85" },
  { id: 3, client: "Kelly Williams", service: "Crochet", time: "Yesterday", status: "Completed", amount: "$90" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Business Overview</h1>
          <p className="text-sm text-gray-500">Welcome back! Here is what's happening with Lush Hair 2.0 today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <button className="px-4 py-2 text-xs font-bold bg-pink-600 text-white rounded-lg">Last 30 Days</button>
          <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-pink-600 transition-colors">Last 7 Days</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={14} className="mr-1" /> {stat.growth.split(' ')[0]}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              <h3 className="text-2xl font-black mt-1 dark:text-white">{stat.value}</h3>
              <p className="text-[10px] text-gray-400 mt-1">{stat.growth.includes('reviews') ? stat.growth : `vs. last month`}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-bold dark:text-white">Recent Transactions</h3>
            <button className="text-pink-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-[10px] uppercase text-gray-400 font-bold">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentActivity.map((item) => (
                  <tr key={item.id} className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">
                          {item.client[0]}
                        </div>
                        <div>
                          <p className="font-semibold dark:text-gray-200">{item.client}</p>
                          <p className="text-[10px] text-gray-400">{item.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                        item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold dark:text-white">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Popular Services */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-xs text-gray-400 mb-4">View tutorial on how to manage your new Lush Admin dashboard.</p>
              <button className="bg-pink-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-pink-700 transition-all">Watch Guide</button>
            </div>
            <Scissors className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 rotate-12" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
             <h3 className="font-bold dark:text-white mb-4 flex items-center gap-2">
               <Clock size={18} className="text-pink-600" /> System Status
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between text-xs">
                   <span className="text-gray-500">API Connection</span>
                   <span className="text-emerald-500 font-bold">Online</span>
                </div>
                <div className="flex justify-between text-xs">
                   <span className="text-gray-500">Database Sync</span>
                   <span className="text-emerald-500 font-bold">Stable</span>
                </div>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                   <p className="text-[10px] text-gray-400 italic">Last backed up: 12 minutes ago</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}