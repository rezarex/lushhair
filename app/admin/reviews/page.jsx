'use client';

import { useState, useEffect } from 'react';
import { Star, CheckCircle, Trash2, ShieldQuestion, Circle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/config';

const REVIEW_API = `${API_BASE_URL}/review`;
const EDIT_REVIEW_API = (id) => `${API_BASE_URL}/review/edit/${id}`;
const DELETE_REVIEW_API = (id) => `${API_BASE_URL}/review/delete/${id}`;

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(REVIEW_API);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id, newStatus) => {
    try {
      const response = await fetch(EDIT_REVIEW_API(id), {
        method: 'PUT', // Assuming PUT/PATCH for editing
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setReviews(reviews.map(review => 
          review._id === id ? { ...review, status: newStatus } : review
        ));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteReview = async (id) => {
    if (!confirm("Are you sure you want to delete this review permanently?")) return;

    try {
      const response = await fetch(DELETE_REVIEW_API(id), {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== id));
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    return review.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-900/20 text-yellow-500 border border-yellow-500/30"><ShieldQuestion size={12} /> Pending</span>;
      case 'approved': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-900/20 text-green-500 border border-green-500/30"><CheckCircle size={12} /> Approved</span>;
      case 'rejected': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-900/20 text-red-400 border border-red-500/30"><Circle size={12} /> Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">
          Review Management
        </h2>
        {loading && <Loader2 className="animate-spin text-green-500" />}
      </div>

      {/* Filter Buttons: Black, Green, Gold */}
      <div className="flex flex-wrap gap-3">
        {[
          { id: 'all', label: 'All', color: 'border-yellow-600' },
          { id: 'pending', label: 'Pending', color: 'border-yellow-600' },
          { id: 'approved', label: 'Approved', color: 'border-green-600' }
        ].map((btn) => (
          <button 
            key={btn.id}
            onClick={() => setFilter(btn.id)} 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
              filter === btn.id 
              ? 'bg-green-600 border-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]' 
              : `bg-zinc-900 border-zinc-800 text-gray-400 hover:border-yellow-600`
            }`}
          >
            {btn.label} ({btn.id === 'all' ? reviews.length : reviews.filter(r => r.status === btn.id).length})
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
        <div className="divide-y divide-zinc-800">
          {filteredReviews.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              {loading ? "Fetching latest reviews..." : "No reviews found for this category."}
            </div>
          ) : (
            filteredReviews.map(review => (
              <div key={review._id} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center hover:bg-zinc-900/50 transition-colors">
                
                {/* Reviewer & Rating */}
                <div className="col-span-1">
                  <p className="font-bold text-yellow-500 text-lg">{review.client}</p>
                  <p className="text-xs font-bold text-green-500 uppercase tracking-widest">{review.service}</p>
                  <div className="flex text-yellow-500 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < parseInt(review.rating) ? "currentColor" : "none"} className={i < parseInt(review.rating) ? "text-yellow-500" : "text-zinc-700"} />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="col-span-1 md:col-span-2">
                  <p className="text-gray-300 italic leading-relaxed">"{review.experience}"</p>
                  <p className="text-[10px] text-zinc-500 mt-2 uppercase font-medium">
                    Posted: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions & Status */}
                <div className="col-span-1 flex flex-col items-start md:items-end space-y-3">
                  {getStatusBadge(review.status)}
                  <div className="flex space-x-2">
                    {review.status !== 'approved' && (
                      <button 
                        onClick={() => updateReviewStatus(review._id, 'approved')} 
                        className="p-2 bg-zinc-900 border border-zinc-800 hover:border-green-500 hover:text-green-500 text-gray-400 rounded-lg transition-all"
                        title="Approve"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    {review.status !== 'rejected' && (
                      <button 
                        onClick={() => updateReviewStatus(review._id, 'rejected')} 
                        className="p-2 bg-zinc-900 border border-zinc-800 hover:border-red-500 hover:text-red-500 text-gray-400 rounded-lg transition-all"
                        title="Reject"
                      >
                        <Circle size={20} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteReview(review._id)} 
                      className="p-2 bg-zinc-900 border border-zinc-800 hover:border-yellow-600 hover:text-yellow-500 text-gray-400 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}