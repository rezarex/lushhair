import React from 'react';
import Link from 'next/link';

const Hero = () => {
  // Placeholder images - Replace with your actual image URLs
  const mainImage = 'shorthair.png';
  const smallImage1 = 'longhair.png';
  const smallImage2 = 'blonde.png';
  const smallImage3 = 'afro.png';

  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-sans flex items-center pt-16 pb-40">
      
      <main className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative">
        
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-6xl font-light tracking-tight leading-none">
            EFFORTLESS <br />
            BEAUTY, <br />
            EVERYDAY
          </h1>
          <p className="text-lg text-gray-600 font-light">
            A boutique approach to beauty.
          </p>
          {/* UPDATED: Black background with Gold hover */}
          <Link 
            href="/book" 
            className="mt-4 px-10 py-3 text-sm font-semibold tracking-widest text-white bg-black hover:bg-[#D4AF37] transition duration-300 w-fit mx-auto lg:mx-0 shadow-md"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Right Images & Link */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end items-end space-x-4 relative">
          
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer">
            <img src="braided.png" alt="Profile 1" className="w-full h-full object-cover grayscale" />
          </div>
          
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl translate-y-4 transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer">
            <img src="shorthair.png" alt="Profile 2" className="w-full h-full object-cover grayscale" />
          </div>
          
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer">
            <img src="afro.png" alt="Profile 3" className="w-full h-full object-cover grayscale" />
          </div>

          {/* UPDATED: Forest Green background with Black hover */}
          <div className="absolute -bottom-16 right-0 z-50">
            <Link 
              href="/#gallery" 
              className="px-6 py-2 text-xs font-bold tracking-widest text-white bg-[#2D5A27] rounded-full hover:bg-black transition duration-300 uppercase inline-flex items-center justify-center shadow-lg cursor-pointer active:scale-95"
            >
                OUR WORK
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;