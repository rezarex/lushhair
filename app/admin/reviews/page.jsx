'use client';

import { useState } from 'react';
import { Star, CheckCircle, Trash2, ShieldQuestion, StarHalf, Circle } from 'lucide-react';

const initialReviews = [
  { 
    id: 'rev1', 
    name: "Aisha M.", 
    rating: 5, 
    comment: "Absolutely loved my crochet install! So quick and beautifully done. Lush Hair 2.0 is my new go-to!", 
    service: "Crochet", 
    date: "2023-10-26",
    status: 'pending' // pending, approved, rejected
  },
  { 
    id: 'rev2', 
    name: "Britney K.", 
    rating: 4, 
    comment: "The box braids look amazing! The team was super friendly. Only wish it was a bit faster.", 
    service: "Braids", 
    date: "2023-10-25",
    status: 'pending' 
  },
  { 
    id: 'rev3', 
    name: "Carlos P.", 
    rating: 5, 
    comment: "My partner loved the wig I got. Lush Hair made a custom piece that was perfect for her.", 
    service: "Wigs", 
    date: "2023-10-24",
    status: 'approved' 
  },
  { 
    id: 'rev4', 
    name: "Daniella L.", 
    rating: 3, 
    comment: "Had a basic sew-in. It's okay, but I've had better. Might try another service next time.", 
    service: "Weaving", 
    date: "2023-10-23",
    status: 'pending' 
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'

  const updateReviewStatus = (id, newStatus) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: newStatus } : review
    ));
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    return review.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"><ShieldQuestion size={12} /> Pending</span>;
      case 'approved': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"><CheckCircle size={12} /> Approved</span>;
      case 'rejected': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"><Circle size={12} /> Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Reviews</h2>

      {/* Filter Buttons */}
      <div className="flex space-x-3">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-pink-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          All ({reviews.length})
        </button>
        <button 
          onClick={() => setFilter('pending')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          Pending ({reviews.filter(r => r.status === 'pending').length})
        </button>
        <button 
          onClick={() => setFilter('approved')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          Approved ({reviews.filter(r => r.status === 'approved').length})
        </button>
      </div>

      {/* Reviews List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredReviews.length === 0 ? (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">No reviews to display for this filter.</p>
          ) : (
            filteredReviews.map(review => (
              <div key={review.id} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Reviewer & Rating */}
                <div className="col-span-1 md:col-span-1">
                  <p className="font-semibold dark:text-white">{review.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{review.service}</p>
                  <div className="flex text-amber-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-amber-500" : "text-gray-300 dark:text-gray-600"} />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="col-span-1 md:col-span-2">
                  <p className="text-gray-700 dark:text-gray-300 italic">"{review.comment}"</p>
                  <p className="text-xs text-gray-400 mt-2">Submitted on {review.date}</p>
                </div>

                {/* Actions & Status */}
                <div className="col-span-1 md:col-span-1 flex flex-col items-start md:items-end space-y-2">
                  {getStatusBadge(review.status)}
                  <div className="flex space-x-2 mt-2">
                    {review.status === 'pending' && (
                      <button 
                        onClick={() => updateReviewStatus(review.id, 'approved')} 
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                        title="Approve Review"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {review.status !== 'rejected' && ( // Allow re-rejecting approved if needed
                      <button 
                        onClick={() => updateReviewStatus(review.id, 'rejected')} 
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                        title="Reject Review"
                      >
                        <Circle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteReview(review.id)} 
                      className="p-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
                      title="Delete Review Permanently"
                    >
                      <Trash2 size={18} />
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