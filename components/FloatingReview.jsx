'use client';

import { useState } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';

const mockReviews = [
  { id: 1, name: "Sarah J.", rating: 5, comment: "The box braids are perfect! Super neat.", service: "Braids" },
  { id: 2, name: "Michelle O.", rating: 5, comment: "Best sew-in I've ever had.", service: "Weaving" },
  { id: 3, name: "Elena R.", rating: 4, comment: "Great service, just took a bit longer than expected.", service: "Crochet" },
];

const availableServices = ["Braids", "Crochet", "Weaving", "Wigs", "Extras"];

export default function FloatingReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setRating(0);
      setSelectedServices([]);
    }, 3000);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] font-sans">
      
      {/* --- Review Modal --- */}
      <div 
        className={`absolute bottom-20 left-0 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        
        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold dark:text-white">Review Sent!</h3>
            <p className="text-sm text-gray-500">Thanks for supporting Lush Hair 2.0.</p>
          </div>
        ) : (
          <>
            {/* Header with Average Score */}
            <div className="bg-gray-900 p-5 text-white flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2">
                   <h3 className="text-lg font-bold">4.8</h3>
                   <div className="flex text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" className="opacity-50" />
                   </div>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Based on 120+ happy clients</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Recent Feedback List */}
            <div className="max-h-40 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950/30">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold dark:text-white">{rev.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < rev.rating ? "#F59E0B" : "none"} className={i < rev.rating ? "text-amber-500" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 italic">"{rev.comment}"</p>
                  <span className="text-[9px] text-pink-500 font-bold uppercase mt-1 block">{rev.service}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Your Name</label>
                  <input 
                    type="text" required placeholder="Jane Doe"
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-pink-500 outline-none dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Services</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableServices.map(service => (
                    <label key={service} className="cursor-pointer">
                      <input type="checkbox" className="hidden" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} />
                      <span className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all border ${
                        selectedServices.includes(service) 
                        ? 'bg-pink-600 border-pink-600 text-white' 
                        : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500'
                      }`}>
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
                    <Star size={24} fill={(hover || rating) >= star ? "#F59E0B" : "none"} className={(hover || rating) >= star ? "text-amber-500" : "text-gray-300"} />
                  </button>
                ))}
              </div>

              <textarea required placeholder="Tell us about your experience..." className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl p-3 text-xs focus:ring-1 focus:ring-pink-500 outline-none dark:text-white" rows={2} />

              <button type="submit" disabled={rating === 0 || selectedServices.length === 0} className="w-full bg-pink-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-pink-700 transition-all disabled:opacity-50">
                Post Review
              </button>
            </form>
          </>
        )}
      </div>

      {/* --- Main Floating Button with Average Score --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center space-x-3 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 ${isOpen ? 'ring-2 ring-pink-500' : 'hover:scale-105'}`}
      >
        <div className="flex items-center bg-pink-50 dark:bg-pink-900/30 px-2 py-1 rounded-lg">
          <Star size={14} fill="#db2777" className="text-pink-600 mr-1" />
          <span className="text-xs font-black text-pink-600 dark:text-pink-400">4.8</span>
        </div>
        <span className="font-bold text-sm text-gray-800 dark:text-white pr-1">
          {isOpen ? "Close" : "Reviews"}
        </span>
      </button>
    </div>
  );
}