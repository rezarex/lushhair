'use client';

import { useState, useEffect } from 'react';
import { Star, X, CheckCircle2, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/config';

const REVIEW_API = `${API_BASE_URL}/review`;
const ADD_REVIEW_API = `${API_BASE_URL}/review/add`;

const availableServices = ["Braids", "Crochet", "Weaving", "Wigs", "Extras"];

export default function FloatingReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Data State
  const [reviews, setReviews] = useState([]);
  
  // Form State
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [clientName, setClientName] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // 1. Fetch Reviews on Mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(REVIEW_API);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle POST Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      client: clientName,
      experience: experience,
      service: selectedService,
      rating: rating.toString(),
      status: "pending"
    };

    try {
      const response = await fetch(ADD_REVIEW_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        fetchReviews(); // Refresh list
        setTimeout(() => {
          setIsOpen(false);
          setSubmitted(false);
          resetForm();
        }, 3000);
      }
    } catch (error) {
      alert("Failed to post review");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(0);
    setClientName("");
    setExperience("");
    setSelectedService("");
  };

  const averageRating = reviews.length 
    ? (reviews.reduce((acc, rev) => acc + parseInt(rev.rating), 0) / reviews.length).toFixed(1) 
    : "0.0";

  return (
    <div className="fixed bottom-8 left-8 z-[100] font-sans">
      
      {/* --- Review Modal --- */}
      <div 
        className={`absolute bottom-20 left-0 w-80 sm:w-96 bg-black rounded-2xl shadow-2xl border border-yellow-600/30 overflow-hidden transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        
        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center space-y-4 bg-black">
            <div className="w-16 h-16 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Review Received!</h3>
            <p className="text-sm text-gray-400">Your feedback keeps us glowing.</p>
          </div>
        ) : (
          <>
            {/* Header: Black & Gold */}
            <div className="bg-black p-5 text-white border-b border-yellow-600/20 flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2">
                   <h3 className="text-lg font-bold text-yellow-500">{averageRating}</h3>
                   <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.round(averageRating) ? "currentColor" : "none"} className={i < Math.round(averageRating) ? "" : "opacity-30"} />
                      ))}
                   </div>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Client Feedback</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded text-gray-400">
                <X size={20} />
              </button>
            </div>

            {/* Recent Feedback List */}
            <div className="max-h-40 overflow-y-auto p-4 space-y-3 bg-zinc-950">
              {loading ? (
                <div className="flex justify-center p-4"><Loader2 className="animate-spin text-green-500" /></div>
              ) : reviews.map((rev) => (
                <div key={rev._id} className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-yellow-500">{rev.client}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < parseInt(rev.rating) ? "#eab308" : "none"} className={i < parseInt(rev.rating) ? "text-yellow-500" : "text-zinc-700"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-300 italic">"{rev.experience}"</p>
                  <span className="text-[9px] text-green-500 font-bold uppercase mt-1 block">{rev.service}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4 bg-black">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">Client Name</label>
                <input 
                  type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-green-500 outline-none text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">Service</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableServices.map(service => (
                    <button 
                      key={service} type="button"
                      onClick={() => setSelectedService(service)}
                      className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all border ${
                        selectedService === service 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-1 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
                    <Star size={24} fill={(hover || rating) >= star ? "#eab308" : "none"} className={(hover || rating) >= star ? "text-yellow-500" : "text-zinc-700"} />
                  </button>
                ))}
              </div>

              <textarea 
                required value={experience} onChange={(e) => setExperience(e.target.value)}
                placeholder="How was your experience?" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs focus:border-green-500 outline-none text-white" rows={2} 
              />

              <button 
                type="submit" 
                disabled={rating === 0 || !selectedService || submitting} 
                className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {submitting ? <Loader2 className="animate-spin mr-2" size={16} /> : "Post Review"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* --- Main Floating Button --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center space-x-3 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform bg-black border-2 border-yellow-600/50 ${isOpen ? 'scale-95' : 'hover:scale-105 hover:border-green-500'}`}
      >
        <div className="flex items-center bg-zinc-900 px-2 py-1 rounded-lg">
          <Star size={14} fill="#eab308" className="text-yellow-500 mr-1" />
          <span className="text-xs font-black text-white">{averageRating}</span>
        </div>
        <span className="font-bold text-sm text-yellow-500 pr-1">
          {isOpen ? "Close" : "Reviews"}
        </span>
      </button>
    </div>
  );
}