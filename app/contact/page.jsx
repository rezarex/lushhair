'use client';

import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { GOOGLE_API_KEY } from '@/config/config';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Black Background */}
      <div className="bg-black py-20 px-4 sm:px-6 lg:px-8 text-center text-white border-b border-[#D4AF37]/20">
        <h1 className="text-4xl font-light tracking-[0.2em] sm:text-5xl uppercase">Get in Touch</h1>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto font-light">
          Have questions about our services or want to book a special session? Our boutique team is here to assist you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information & Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-black uppercase tracking-tight">Send us a message</h2>
              <p className="mt-2 text-gray-600">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="full-name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  id="full-name" 
                  className="mt-2 block w-full bg-gray-50 border-gray-200 rounded-xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-[#2D5A27] focus:border-[#2D5A27] outline-none transition-all" 
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="mt-2 block w-full bg-gray-50 border-gray-200 rounded-xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-[#2D5A27] focus:border-[#2D5A27] outline-none transition-all" 
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="mt-2 block w-full bg-gray-50 border-gray-200 rounded-xl shadow-sm py-4 px-5 focus:ring-2 focus:ring-[#2D5A27] focus:border-[#2D5A27] outline-none transition-all"
                  placeholder="Tell us about your hair goals..."
                ></textarea>
              </div>
              
              {/* Submit Button: Forest Green with Gold Hover text */}
              <button 
                type="submit" 
                className="w-full inline-flex justify-center items-center py-4 px-6 rounded-xl shadow-lg text-sm font-black uppercase tracking-[0.2em] text-white bg-[#2D5A27] hover:bg-black hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] transition-all duration-300"
              >
                Send Message <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Map & Details Section */}
          <div className="space-y-8">
            <div className="bg-black rounded-3xl p-10 space-y-8 border border-[#D4AF37]/30 shadow-2xl">
              <div className="flex items-start space-x-5">
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Our Location</h3>
                  <p className="mt-1 text-gray-400 font-light">119 Flockhart Road,<br />Cambridge, ON N3C 3V1</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-5">
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Business Hours</h3>
                  <p className="mt-1 text-gray-400 font-light">Mon - Fri: 9am to 6pm<br />Sat: 10am to 4pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Contact</h3>
                  <p className="mt-1 text-gray-400 font-light">(519) 000-0000<br />hello@lushhair.com</p>
                </div>
              </div>
            </div>

            {/* Google Maps Integration - Dark border to match info card */}
            <div className="w-full h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-black">
              <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=119+Flockhart+Road,Cambridge,ON`}
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}