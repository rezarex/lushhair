import React from 'react';
import { Menu, Star, Scissors, Calendar, MapPin, Phone } from 'lucide-react';

const LushHairLandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header/Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo/Site Name */}
          <div className="flex items-center space-x-2">
            <Scissors className="text-pink-600 w-6 h-6" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-wider">
              Lush Hair
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Services', 'Gallery', 'About Us', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-pink-600 font-medium transition duration-150"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Booking Button */}
          <button className="hidden md:block bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 transition duration-150 shadow-md">
            Book Appointment
          </button>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-gray-600 hover:text-pink-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section - Image with Text Overlay */}
        <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
          {/* Hero Image - Placeholder for your actual image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080/f08080/ffffff?text=Professional+Salon+Hero+Image)' }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 text-white">
            <p className="text-lg font-light mb-2">Experience the Difference</p>
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Style. Confidence. <br className="hidden sm:inline" />Your Hair.
            </h2>
            <p className="mt-4 max-w-xl text-xl font-light">
              We specialize in modern cuts, vibrant coloring, and personalized hair care.
            </p>
            <div className="mt-8 flex space-x-4">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition duration-300 shadow-xl">
                Explore Services
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-600 transition duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials/Review Snippet */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xl italic text-gray-700">
              "Best haircut I've ever had! The team at Lush Hair truly cares about their clients."
            </p>
            <p className="mt-2 text-gray-500">- A Happy Client</p>
          </div>
        </section>

        {/* Services / Gallery Section */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              Our Signature Services
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              From precision cuts to stunning color transformations, we offer a range of services tailored to your unique style.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/600x400/87cefa/ffffff?text=Precision+Cut)' }}></div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Precision Haircuts</h3>
                  <p className="text-gray-600">
                    Expert styling and cutting techniques for both men and women.
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/600x400/ffb6c1/ffffff?text=Vibrant+Coloring)' }}></div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Vibrant Coloring</h3>
                  <p className="text-gray-600">
                    Balayage, highlights, and all-over color using premium products.
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/600x400/add8e6/ffffff?text=Treatment+%26+Styling)' }}></div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Treatments & Styling</h3>
                  <p className="text-gray-600">
                    Deep conditioning, keratin treatments, and professional blowouts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Booking Section */}
        <section className="bg-pink-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Ready for Your New Look?</h2>
            <p className="text-xl mb-8 font-light">
              Book your next appointment with one of our talented stylists today.
            </p>
            <button className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-extrabold hover:bg-gray-100 transition duration-300 shadow-2xl">
              Schedule Your Visit Now
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="text-pink-600 w-6 h-6" />
              <h4 className="text-xl font-bold tracking-wider">Lush Hair</h4>
            </div>
            <p className="text-sm text-gray-400">
              Where quality and style come first.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-400">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Pricing', 'Testimonials', 'Careers'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-pink-600 transition duration-150 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-400">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-pink-600" /> (555) 123-4567
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-pink-600 flex-shrink-0" /> 123 Style Ave, Beauty City, 90210
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Lush Hair. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LushHairLandingPage;