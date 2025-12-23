'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { Clock, Tag, Info, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/config';

const SERVICES_API = `${API_BASE_URL}/services`;
const EXTRAS_API = `${API_BASE_URL}/extras`;

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, extrasRes] = await Promise.all([
          fetch(SERVICES_API),
          fetch(EXTRAS_API)
        ]);

        if (!servicesRes.ok || !extrasRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const servicesData = await servicesRes.json();
        const extrasData = await extrasRes.json();

        setServices(servicesData);
        setExtras(extrasData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const IconRenderer = ({ iconName, size = 20, className = "" }) => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.Zap;
    return <IconComponent size={size} className={className} />;
  };

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center text-[#2D5A27]">
      <Loader2 className="animate-spin mb-2" size={40} />
      <p className="font-medium">Loading Lush Services...</p>
    </div>
  );

  if (error) return (
    <div className="py-20 text-center text-red-500 bg-red-50 rounded-xl m-4">
      <p className="font-bold">Error loading services</p>
      <p className="text-sm">{error}</p>
    </div>
  );

  return (
    // Background set to Light Gray
    <section id="services" className="py-20 bg-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          {/* Theme Color: Green */}
          <h2 className="text-[#2D5A27] font-bold tracking-widest uppercase text-sm mb-2">Lush Hair 2.0</h2>
          <p className="text-4xl font-extrabold text-black sm:text-5xl">
            Our Professional Services
          </p>
        </div>

        {/* --- Main Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((cat) => (
            <div 
              key={cat._id} 
              className="group border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={cat.image || "/placeholder.png"}
                  alt={cat.category}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                   {/* Theme Color: Green Icon Container */}
                   <div className="p-2 bg-white/90 backdrop-blur shadow-sm text-[#2D5A27] rounded-lg">
                    <IconRenderer iconName={cat.icon} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">{cat.category}</h3>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <div key={item._id} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0">
                      <div>
                        <span className="block font-semibold text-gray-800">{item.name}</span>
                        <span className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock size={12} className="mr-1 text-[#D4AF37]" /> {item.time}
                        </span>
                      </div>
                      {/* Theme Color: Gold Pricing */}
                      {/* <span className="text-[#D4AF37] font-bold">{item.price}</span> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Extras & Add-ons --- */}
        {/* Theme Color: Green Container */}
        <div className="bg-[#2D5A27]/5 rounded-2xl p-8 mb-12 border border-[#2D5A27]/10">
          <h3 className="text-lg font-bold text-black mb-6 flex items-center">
            <Tag size={20} className="mr-2 text-[#2D5A27]" /> Some Extras & Add-ons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {extras.map((extra) => (
              <div key={extra._id} className="flex items-center justify-between sm:justify-start sm:gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <IconRenderer iconName={extra.icon} className="text-[#D4AF37]" size={18} />
                <span className="text-gray-700 font-medium">{extra.name}</span>
                {/* <span className="ml-auto text-[#2D5A27] font-bold">{extra.price}</span> */}
              </div>
            ))}
          </div>
        </div>

        {/* --- Policy Footer --- */}
        <div className="max-w-3xl mx-auto text-center border-t border-gray-200 pt-8">
          {/* Theme Color: Black and Gold theme for the Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-black text-[#D4AF37] text-sm font-medium mb-4">
            <Info size={16} className="mr-2" />
            Booking & Cancellation Policy
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            A <strong className="text-black">30% deposit</strong> is required for all appointments over $100. 
            Cancellations made <strong className="text-black">48+ hours</strong> in advance will receive a full deposit refund.
          </p>
        </div>

      </div>
    </section>
  );
}