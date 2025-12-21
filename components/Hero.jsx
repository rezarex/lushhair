import React from 'react';
import Link from 'next/link';

const Hero = () => {
  // Placeholder images - Replace with your actual image URLs
  const mainImage = 'shorthair.png';
  const smallImage1 = 'longhair.png';
  const smallImage2 = 'blonde.png';
  const smallImage3 = 'afro.png';


  return (
  <div className="min-h-screen bg-white text-gray-800 font-sans flex items-center pt-16 pb-24">
      
     
      <main className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        
 
        <div className="lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-6xl font-light tracking-tight leading-none">
            EFFFORLESS <br />
            BEAUTY, <br />
            EVERYDAY
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Abreakana proamt approach to beauty.
          </p>
          <button className="mt-4 px-10 py-3 text-sm font-semibold tracking-widest text-white bg-gray-500 hover:bg-pink-500 transition duration-150 w-fit mx-auto lg:mx-0">
            BOOK NOW
          </button>
        </div>


        <div className="lg:w-1/2 flex justify-center lg:justify-end items-end space-x-4 relative">
          
   
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl 
                        transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer">
            
            <img src="braided.png" alt="Profile 1" className="w-full h-full object-cover grayscale" />
          </div>
          
          
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl translate-y-4
                        transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer">
            
            <img src="shorthair.png" alt="Profile 2" className="w-full h-full object-cover grayscale" />
          </div>
          
        
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl
                        transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl cursor-pointer">
            
            <img src="afro.png" alt="Profile 3" className="w-full h-full object-cover grayscale" />
          </div>

        
            <Link href="#services" passHref className="absolute bottom-[-4rem] right-0 px-6 py-2 text-xs font-bold tracking-widest text-white bg-pink-500 rounded-full hover:bg-pink-600 transition duration-300 uppercase hidden md:inline-flex items-center justify-center shadow-lg">

              OUR WORK

          </Link>
        </div>
      </main>
    </div>
  );
};

export default Hero;