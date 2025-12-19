'use client'; // Needed for useState and interactivity

import { useState } from 'react';
import Image from 'next/image';
import { Instagram, ZoomIn } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- Placeholder Data ---
// Replace 'src' with your actual image paths in /public/images/gallery/
const galleryItems = [
  { src: "/images/gallery/braids-1.jpg", alt: "Knotless Boholess Braids", category: "Braids" },
  { src: "/images/gallery/wig-1.jpg", alt: "Custom Colored Wig Unit", category: "Wigs" },
  { src: "/images/gallery/weave-1.jpg", alt: "Natural Sew-In Weave", category: "Weaving" },
  { src: "/images/gallery/braids-2.jpg", alt: "Stitch Cornrows with Heart", category: "Braids" },
  { src: "/images/gallery/crochet-1.jpg", alt: "Curly Crochet Install", category: "Crochet" },
  { src: "/images/gallery/wig-2.jpg", alt: "Sleek Bob Wig Install", category: "Wigs" },
];

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler to open specific image
  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  // Format slides for the Lightbox library
  const lightboxSlides = galleryItems.map((item) => ({ src: item.src, alt: item.alt }));

  return (
    <section id="gallery" className="py-20 bg-pink-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-2">
            Lush Hair 2.0 Portfolio
          </h2>
          <p className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Real Results. Real Beauty.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse some of our favorite transformations. From intricate braids to flawless installs.
          </p>
        </div>

        {/* --- Gallery Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-80 w-full rounded-2xl overflow-hidden shadow-md cursor-pointer"
            >
              {/* Image with Bouncy Hover Effect */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              
              {/* Dark Overlay & Hover Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                   {/* Category Tag */}
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-pink-100 bg-pink-600/80 rounded-full">
                    {item.category}
                  </span>
                  {/* Description */}
                  <p className="text-white font-medium truncate">{item.alt}</p>
                </div>
                
                 {/* Zoom Icon in Center */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                        <ZoomIn size={28} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom CTA (Instagram Link) --- */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Want to see more daily transformations?</p>
          <a
            href="https://instagram.com/YOUR_HANDLE" // Replace with your link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl"
          >
            <Instagram size={20} className="mr-2" />
            Follow Us on Instagram
          </a>
        </div>

      </div>

      {/* --- Lightbox Component --- */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
        // Optional: Add plugins like Zoom or Captions if desired later
      />
    </section>
  );
}