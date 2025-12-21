'use client';

import { useState } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';

const mockReviews = [
  { id: 1, name: "Sarah J.", rating: 5, comment: "The box braids are perfect! Super neat.", service: "Braids" },
  { id: 2, name: "Michelle O.", rating: 5, comment: "Best sew-in I've ever had.", service: "Weaving" },
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
      <div className={`absolute bottom-20 left-0 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}>
        
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
            <div className="bg-gray-900 p-5 text-white flex justify-between items-center">
              <h3 className="text-lg font-bold">Client Reviews</h3>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded"><X size={20} /></button>
            </div>

            {/* Mock List */}
            <div className="max-h-48 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950/30">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold dark:text-white">{rev.name}</span>
                    <span className="text-[10px] text-pink-500 font-bold uppercase">{rev.service}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-gray-100 dark:border-gray-800 space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Your Name</label>
                <input 
                  type="text" required placeholder="Jane Doe"
                  className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 outline-none dark:text-white"
                />
              </div>

              {/* Service Selection (Checkboxes styled as Chips) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Services Received</label>
                <div className="flex flex-wrap gap-2">
                  {availableServices.map(service => (
                    <label key={service} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                      />
                      <span className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                        selectedServices.includes(service) 
                        ? 'bg-pink-600 text-white shadow-md' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating & Review */}
              <div className="flex justify-center space-x-1">
                {[1,2,3,4,5].map(star => (
                  <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
                    <Star size={24} fill={(hover || rating) >= star ? "#F59E0B" : "transparent"} className={(hover || rating) >= star ? "text-amber-500" : "text-gray-300"} />
                  </button>
                ))}
              </div>

              <textarea required placeholder="Write your review..." className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl p-3 text-xs focus:ring-2 focus:ring-pink-500 outline-none dark:text-white" />

              <button type="submit" disabled={rating === 0 || selectedServices.length === 0} className="w-full bg-pink-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-pink-700 transition-all disabled:opacity-50">
                Submit Review
              </button>
            </form>
          </>
        )}
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 px-5 py-3 rounded-full shadow-2xl transition-all duration-300 bg-white border border-gray-100">
        <Star size={18} fill="#db2777" className="text-pink-600" />
        <span className="font-bold text-sm text-gray-800">{isOpen ? "Close" : "Review Us"}</span>
      </button>
    </div>
  );
}