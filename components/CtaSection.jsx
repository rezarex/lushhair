import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CtaSection() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-pink-600 rounded-xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4 dark:bg-pink-700">
          
          {/* --- Content Block --- */}
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:p-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready for your new look?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-pink-100 dark:text-pink-200">
                Secure your appointment now. Whether it's intricate braids or a flawless weave, our schedule fills up fast!
              </p>
              
              {/* --- Buttons Group --- */}
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                
                {/* Primary CTA Button */}
                <a
                  href="/book-now" // Link this to your actual booking page/system
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-pink-600 bg-white hover:bg-pink-50 transition duration-150 ease-in-out dark:text-pink-700 dark:hover:bg-gray-100"
                >
                  Book Appointment
                  <ArrowRight size={20} className="ml-2" />
                </a>
                
                {/* Secondary CTA Button */}
                <a
                  href="/contact" // Link this to your contact or FAQ page
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white border-white border-opacity-70 hover:bg-pink-500 hover:border-pink-500 transition duration-150 ease-in-out dark:hover:bg-pink-800"
                >
                  View Pricing
                </a>
              </div>
              {/* --- End Buttons Group --- */}
            </div>
          </div>
          
          {/* --- Image/Visual Placeholder (for visual appeal) --- */}
          <div className="aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            {/* Replace the placeholder div below with an actual optimized Next.js Image component */}
            {/* <div className="h-full w-full bg-pink-800 bg-opacity-30 flex items-center justify-center p-8">
              <span className="text-xl font-semibold text-white/90">
                
              </span>
            </div> */}
            {/* Example of using the Next.js Image component (uncomment when ready):  */}
            <Image 
              className="transform translate-y-6 translate-x-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="/blonde.png"
              alt="Beautifully styled hair"
              width={500}
              height={300}
            />
           
          </div>
        </div>
      </div>
    </div>
  );
}