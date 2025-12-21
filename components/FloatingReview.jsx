'use client';

import { useState } from 'react';
import { Star, X, CheckCircle2, User } from 'lucide-react';

// Mock Review Data
const mockReviews = [
  { id: 1, name: "Sarah J.", rating: 5, comment: "The box braids are perfect! Super neat and not too tight. Highly recommend!", service: "Braids" },
  { id: 2, name: "Michelle O.", rating: 5, comment: "Best sew-in I've ever had. It looks so natural. Lush Hair 2.0 is the real deal.", service: "Weaving" },
  { id: 3, name: "Tiffany R.", rating: 4, comment: "Love my custom wig! The styling was exactly what I asked for.", service: "Wigs" },
];

export default function FloatingReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setRating(0);
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
            <h3 className="text-xl font-bold dark:text-white">Thank You!</h3>
            <p className="text-sm text-gray-500">Your review was submitted successfully.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gray-900 p-5 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Star size={18} fill="#F59E0B" className="text-amber-500" />
                <h3 className="text-lg font-bold">4.8/5 Rating</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Mock Reviews List */}
            <div className="max-h-60 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950/30">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Recent Feedback</p>
              {mockReviews.map((rev) => (
                <div key={rev.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold dark:text-white">{rev.name}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < rev.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 italic mb-1 line-clamp-2">"{rev.comment}"</p>
                  <span className="text-[9px] font-medium text-pink-500 bg-pink-50 dark:bg-pink-900/20 px-2 py-0.5 rounded">
                    {rev.service}
                  </span>
                </div>
              ))}
            </div>

            {/* Form to add Review */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star 
                        size={24} 
                        fill={(hover || rating) >= star ? "#F59E0B" : "transparent"} 
                        className={(hover || rating) >= star ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea 
                required
                placeholder="Write your review here..."
                className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl p-3 text-xs focus:ring-2 focus:ring-pink-500 outline-none dark:text-white"
              />

              <button 
                type="submit"
                disabled={rating === 0}
                className="w-full bg-pink-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-pink-700 transition-all disabled:opacity-50"
              >
                Post Review
              </button>
            </form>
          </>
        )}
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-5 py-3 rounded-full shadow-2xl transition-all duration-300 transform ${
          isOpen ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:scale-105 border border-gray-100'
        }`}
      >
        <Star size={18} fill={isOpen ? "white" : "#db2777"} className={isOpen ? "" : "text-pink-600"} />
        <span className="font-bold text-sm">{isOpen ? "Close" : "4.8 Review Score"}</span>
      </button>
    </div>
  );
}