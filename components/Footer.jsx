// components/Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'; 


const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-500 py-12  text-gray-600">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo/Brand */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-widest">LUSH HAIR</h3>
          <p className="text-sm">Effortless Beauty, Everyday.</p>
          <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Lush Hair. All rights reserved.</p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 tracking-wider">NAVIGATION</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition">Services</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Our Work</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Visit Us</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Book Now</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 tracking-wider">CONTACT</h4>
          <ul className="space-y-2 text-sm">
            <li>+1 (226) 337-8306</li>
            <li>hello@lushhair.com</li>
            <li>119 Flockhart Road, Cambridge, ON</li>
          </ul>
        </div>

        {/* Column 4: Social */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 tracking-wider">FOLLOW US</h4>
          <ul className="flex space-x-4 text-xl ">
            <li><a href="..." aria-label="Our Instagram"><FaInstagram size={24} className='hover:text-pink-500 '/></a></li>
            <li><a href="..." aria-label="Our X (Twitter) profile"><FaXTwitter size={24} className='hover:text-pink-500 '/></a></li>
            <li><a href="..." aria-label="Our Facebook"><FaFacebookF size={24} className='hover:text-pink-500 '/></a></li>
            <li><a href="..." aria-label="Our LinkedIn"><FaLinkedinIn size={24} className='hover:text-pink-500 ' /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;