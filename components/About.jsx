import React from 'react';

const About = () => {
  return (
    // Changed bg-gray-500 to a deep black/charcoal
    <section id="about" className="py-20 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div>
          {/* Changed pink text to Gold (#D4AF37) */}
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-2 font-semibold">
            Our Philosophy
          </p>
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
            The Art of Personal <br />
            Hair Design
          </h2>
          {/* Adjusted text-gray-400 to a slightly brighter shade for readability on black */}
          <p className="text-gray-300 mb-6 text-lg">
            At <strong className="text-[#D4AF37]">Lush Hair</strong>, we believe that a great hairstyle is a collaboration between client and artist. Our studio is built on a foundation of **exceptional craftsmanship, continuous education, and personalized attention**. We are dedicated to creating looks that enhance your natural beauty and reflect your individual style.
          </p>
          <p className="text-gray-400 mb-8">
            We use only the highest quality, sustainably sourced products to ensure your hair not only looks incredible but remains healthy and vibrant long after you leave our chair.
          </p>
          
          {/* Changed button to Green (#2D5A27) with Gold hover effect */}
          <a 
            href="#artists"
            className="inline-block px-8 py-3 bg-[#2D5A27] text-white border border-[#2D5A27] font-semibold uppercase text-sm tracking-wider hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition duration-300 shadow-lg"
          >
            Meet Our Team
          </a>
        </div>

        {/* Image / Visual Placeholder */}
        <div className="relative h-96 md:h-[500px]">
          <img 
            src="salon.png" 
            alt="Interior view of Lush Hair Salon"
            className="w-full h-full object-cover object-center shadow-2xl grayscale hover:grayscale-0 transition duration-700"
          />
          {/* Changed pink accent border to Gold */}
          <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-30 transform translate-x-4 translate-y-4 -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default About;