// components/Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'; 
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 text-gray-600">
      {/* justify-items-center ensures each grid cell's content is centered within its equal-width column */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
        
        {/* Column 1: Logo/Brand */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="group transition-opacity hover:opacity-90 mb-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <Image 
                src="/logo.png" 
                alt="Lush Hair Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <p className="text-sm font-light tracking-wide text-gray-500">
            Effortless Beauty, Everyday.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            &copy; {new Date().getFullYear()} Lush Hair.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-gray-800 mb-6 text-xs tracking-[0.2em] uppercase">Navigation</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Our Work</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Visit Us</a></li>
            <li><Link href="/booking" className="hover:text-pink-500 transition-colors">Book Now</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-gray-800 mb-6 text-xs tracking-[0.2em] uppercase">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-pink-500 transition-colors">+1 (226) 337-8306</li>
            <li className="hover:text-pink-500 transition-colors">hello@lushhair.com</li>
            <li className="text-gray-400 leading-relaxed">119 Flockhart Road,<br/>Cambridge, ON</li>
          </ul>
        </div>

        {/* Column 4: Social */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-gray-800 mb-6 text-xs tracking-[0.2em] uppercase">Follow Us</h4>
          <ul className="flex justify-center md:justify-start space-x-5">
            <li><a href="#" aria-label="Instagram"><FaInstagram size={20} className='hover:text-pink-500 transition-colors'/></a></li>
            <li><a href="#" aria-label="X"><FaXTwitter size={20} className='hover:text-pink-500 transition-colors'/></a></li>
            <li><a href="#" aria-label="Facebook"><FaFacebookF size={20} className='hover:text-pink-500 transition-colors'/></a></li>
            <li><a href="#" aria-label="LinkedIn"><FaLinkedinIn size={20} className='hover:text-pink-500 transition-colors' /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;