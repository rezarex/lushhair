'use client'
import React from 'react';
import useScrollDirection from '../hooks/useScrollDirection';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';



const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();
  const isHome = pathname === '/';
  
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
            <Link href="/" className="flex items-center space-x-3 group transition-opacity hover:opacity-90">

                    <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                      <Image 
                        src="/logo.png" // Ensure the extension matches your file in /public
                        alt="Lush Hair Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    

              </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {['SERVICES', 'GALLERY', 'CONTACT'].map((item) => {
            const label = item.toLowerCase();
            
            // Logic for the href
            let href = '';
            if (item === 'CONTACT') {
              href = '/contact';
            } else {
              // If we are on /contact, we need to go to /#services
              // If we are on /, we can just stay on #services
              href = isHome ? `#${label}` : `/#${label}`;
            }

            return (
              <Link 
                key={item} 
                href={href} 
                className="text-gray-500 hover:text-pink-500 transition duration-150 text-sm tracking-widest font-medium hidden sm:block"
              >
                {item}
              </Link>
            );
          })}

        <Link href="/book" passHref className="px-6 py-2 text-sm font-semibold tracking-widest text-white bg-gray-500 hover:bg-pink-500 transition duration-150 rounded-sm">

          BOOK NOW

        </Link>
          
          {/* <button className="px-6 py-2 text-sm font-semibold tracking-widest text-white bg-gray-500 hover:bg-pink-500 transition duration-150 rounded-sm">
            BOOK NOW
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;