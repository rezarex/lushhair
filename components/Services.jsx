'use client'; // Required for hooks in Next.js App Router

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, Tag, Sparkles, MapPin, Info, Zap, RefreshCw, Scissors, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/config';

const SERVICES_API = `${API_BASE_URL}/services`;

// Mapping icons to categories (fallback to Zap)
const categoryIcons = {
  "Braids": Zap,
  "Crochet & Weaving": RefreshCw,
  "Wigs & Styling": Scissors,
};

const extras = [
  { name: "Edge Styling", price: "$10", icon: Sparkles },
  { name: "Deep Conditioning", price: "$25", icon: Info },
  { name: "Travel Fee (Home Visits)", price: "$15–$30", icon: MapPin },
];

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(SERVICES_API);
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        
        // Group the flat API array into categories
        const grouped = data.reduce((acc, item) => {
          const category = item.category || "General";
          if (!acc[category]) {
            acc[category] = {
              category: category,
              image: item.image, // Uses the first image found for that category
              icon: categoryIcons[category] || Zap,
              items: []
            };
          }
          acc[category].items.push({
            name: item.servicename,
            price: item.price,
            time: item.duration
          });
          return acc;
        }, {});

        setServices(Object.values(grouped));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center text-pink-600">
      <Loader2 className="animate-spin mb-2" size={40} />
      <p>Loading our services...</p>
    </div>
  );

  if (error) return <div className="py-20 text-center text-red-500">Error: {error}</div>;

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-2">Lush Hair 2.0</h2>
          <p className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Our Professional Services
          </p>
        </div>

        {/* --- Main Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((cat) => (
            <div 
              key={cat.category} 
              className="group border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={cat.image || "/placeholder.png"} 
                  alt={cat.category}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                   <div className="p-2 bg-white/90 backdrop-blur shadow-sm text-pink-600 rounded-lg">
                    <cat.icon size={20} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-white mb-4">{cat.category}</h3>
                <div className="space-y-4">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start border-b border-gray-200/50 dark:border-gray-700 pb-3 last:border-0">
                      <div>
                        <span className="block font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                        <span className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock size={12} className="mr-1" /> {item.time}
                        </span>
                      </div>
                      <span className="text-pink-600 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Extras --- */}
        <div className="bg-pink-50 dark:bg-pink-900/10 rounded-2xl p-8 mb-12 border border-pink-100 dark:border-pink-900/30">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Tag size={20} className="mr-2 text-pink-600" /> Extras & Add-ons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {extras.map((extra) => (
              <div key={extra.name} className="flex items-center justify-between sm:justify-start sm:gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <extra.icon size={18} className="text-pink-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{extra.name}</span>
                <span className="ml-auto text-pink-600 font-bold">{extra.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Policy Footer --- */}
        <div className="max-w-3xl mx-auto text-center border-t border-gray-100 dark:border-gray-800 pt-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            <Info size={16} className="mr-2" />
            Booking & Cancellation Policy
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            A <strong>30% deposit</strong> is required for all appointments over $100. 
            Cancellations made <strong>48+ hours</strong> in advance will receive a full deposit refund. 
          </p>
        </div>
      </div>
    </section>
  );
}