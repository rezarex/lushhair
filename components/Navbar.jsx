'use client'
import React from 'react';
import useScrollDirection from '../hooks/useScrollDirection';

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  
  // Tailwind classes for show/hide transition
  const navClass = 
    scrollDirection === 'down' 
      ? '-translate-y-full'  // Hides the navbar
      : 'translate-y-0';     // Shows the navbar

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 ease-in-out ${navClass}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          {/* Logo element for LUSH HAIR */}
          <svg
            className="w-6 h-6 text-black transform -rotate-45"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-.126-.01-.249-.022-.372C19.467 5.768 15.116 2 12 2zM4 12c0-4.418 3.582-8 8-8v16c-4.418 0-8-3.582-8-8z" />
          </svg>
          <span className="text-gray-500 hover:text-gray-900 text-xl font-medium tracking-widest">LUSH HAIR</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {['SERVICES', 'WORK', 'VISIT'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-500 hover:text-pink-500 transition duration-150 text-sm tracking-widest hidden sm:block">
              {item}
            </a>
          ))}
          <button className="px-6 py-2 text-sm font-semibold tracking-widest text-white bg-gray-500 hover:bg-pink-500 transition duration-150">
            BOOK NOW
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;