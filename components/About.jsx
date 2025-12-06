import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-gray-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div>
          <p className="text-pink-500 uppercase tracking-widest text-sm mb-2">
            Our Philosophy
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            The Art of Personal <br />
            Hair Design
          </h2>
          <p className="text-gray-400 mb-6 text-lg">
            At **Lush Hair**, we believe that a great hairstyle is a collaboration between client and artist. Our studio is built on a foundation of **exceptional craftsmanship, continuous education, and personalized attention**. We are dedicated to creating looks that enhance your natural beauty and reflect your individual style.
          </p>
          <p className="text-gray-400 mb-8">
            We use only the highest quality, sustainably sourced products to ensure your hair not only looks incredible but remains healthy and vibrant long after you leave our chair.
          </p>
          
          <a 
            href="#artists"
            className="inline-block px-6 py-3 bg-white text-gray-800 border border-white font-semibold uppercase text-sm tracking-wider hover:bg-gray-200 transition duration-300"
          >
            Meet Our Team
          </a>
        </div>

        {/* Image / Visual Placeholder */}
        <div className="relative h-96 md:h-full">
          {/* Placeholder for a modern, sleek salon interior or team photo */}
          <img 
            src="salon.png" 
            alt="Interior view of Lush Hair Salon"
            className="w-full h-full object-cover object-center shadow-2xl"
          />
          {/* Subtle accent border/overlay */}
          <div className="absolute inset-0 border-4 border-pink-500 opacity-20 transform scale-95 transition-all duration-500"></div>
        </div>
      </div>
    </section>
  );
};

export default About;