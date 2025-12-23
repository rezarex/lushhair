import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CtaSection() {
  return (
    /* Brighter background to contrast the black section above */
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Card: Deep Forest Green Background */}
        <div className="bg-[#1a3a16] rounded-3xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4 border border-[#D4AF37]/20">
          
          {/* --- Content Block --- */}
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:p-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block uppercase tracking-tight">Ready for your</span>
                <span className="block text-[#D4AF37] uppercase tracking-tight">new look?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-300 font-light">
                Secure your appointment now. Whether it's intricate braids or a flawless weave, our schedule fills up fast!
              </p>
              
              {/* --- Buttons Group --- */}
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                
                {/* Primary CTA: Black with Gold Hover */}
                <a
                  href="/book"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-xl shadow-lg text-white bg-black hover:bg-[#D4AF37] hover:text-black transition duration-300 ease-in-out"
                >
                  Book Appointment
                  <ArrowRight size={18} className="ml-2" />
                </a>
                
                {/* Secondary CTA: Transparent with Gold Border */}
                <a
                  href="/#services"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#D4AF37] text-sm font-black uppercase tracking-widest rounded-xl text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition duration-300 ease-in-out"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
          
          {/* --- Image Section --- */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <Image 
              className="absolute inset-0 h-full w-full object-cover object-center lg:object-left-top transition-transform duration-700 hover:scale-105"
              src="/blonde.png"
              alt="Beautifully styled hair"
              width={800}
              height={600}
              priority
            />
            {/* Subtle Gold Gradient Overlay on the image side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a16] via-transparent to-transparent opacity-60 lg:opacity-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}