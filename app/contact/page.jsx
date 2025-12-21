'use client';

import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { GOOGLE_API_KEY } from '@/config/config';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-pink-600 py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-xl text-pink-100 max-w-2xl mx-auto">
          Have questions about our services or want to book a special session? We're here to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information & Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a message</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" id="full-name" className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl shadow-sm py-3 px-4 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" id="email" className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl shadow-sm py-3 px-4 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea id="message" rows="4" className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl shadow-sm py-3 px-4 focus:ring-pink-500 focus:border-pink-500"></textarea>
              </div>
              <button type="submit" className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all">
                Send Message <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Map & Details Section */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 space-y-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-pink-600 mt-1" />
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Our Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">119 Flockhart Road, Cambridge, ON N3C 3V1</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-pink-600 mt-1" />
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Business Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">Mon - Fri: 9am to 6pm<br />Sat: 10am to 4pm</p>
                </div>
              </div>
            </div>

            {/* Google Maps Integration */}
            <div className="w-full h-96 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                // Use backticks (`) and ${} to pass the key and address
                src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=119+Flockart+Road,Cambridge,ON`}
            ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}