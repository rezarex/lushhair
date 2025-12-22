'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Instagram, ZoomIn } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryItems = [
  { src: "/boholessbraids.png", alt: "Knotless Boholess Braids", category: "Braids" },
  { src: "/colouredwig.png", alt: "Custom Colored Wig Unit", category: "Wigs" },
  { src: "/naturalweave.png", alt: "Natural Sew-In Weave", category: "Weaving" },
  { src: "/stitchconrows.png", alt: "Stitch Cornrows with Heart", category: "Braids" },
  { src: "/crotchetinstall.png", alt: "Curly Crochet Install", category: "Crochet" },
  { src: "/sleekbob.png", alt: "Sleek Bob Wig Install", category: "Wigs" },
];

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const lightboxSlides = galleryItems.map((item) => ({ src: item.src, alt: item.alt }));

  return (
    /* Changed background to deep black for a premium gallery feel */
    <section id="gallery" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-12">
          {/* Theme Color: Gold text */}
          <h2 className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-2">
            Lush Hair 2.0 Portfolio
          </h2>
          <p className="text-4xl font-extrabold text-white sm:text-5xl">
            Real Results. Real Beauty.
          </p>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Browse some of our favorite transformations. From intricate braids to flawless installs.
          </p>
        </div>

        {/* --- Gallery Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-80 w-full rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white/5"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              
              {/* Dark Overlay with Gold accents on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                   {/* Category Tag: Changed to Green background with Gold text */}
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-bold text-[#D4AF37] bg-[#2D5A27] rounded-full">
                    {item.category}
                  </span>
                  <p className="text-white font-medium truncate">{item.alt}</p>
                </div>
                
                 {/* Zoom Icon: Changed to Gold */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <div className="bg-[#D4AF37]/20 backdrop-blur-sm p-3 rounded-full text-[#D4AF37] border border-[#D4AF37]/30">
                        <ZoomIn size={28} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom CTA (Instagram Link) --- */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Want to see more daily transformations?</p>
          <a
            href="https://instagram.com/YOUR_HANDLE"
            target="_blank"
            rel="noopener noreferrer"
            /* Button: Black background, Gold border/text, Green hover */
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-widest text-[#D4AF37] bg-transparent border-2 border-[#D4AF37] rounded-full hover:bg-[#2D5A27] hover:border-[#2D5A27] hover:text-white transition duration-300 shadow-lg uppercase"
          >
            <Instagram size={20} className="mr-2" />
            Follow Us on Instagram
          </a>
        </div>

      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
      />
    </section>
  );
}