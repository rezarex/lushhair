import { Zap, Scissors, RefreshCw, Star } from 'lucide-react';

const services = [
  {
    icon: Zap, // Using Zap (lightning) to represent speed/expertise
    title: 'Expert Hair Braiding',
    description: 'We specialize in all types of braids, including box braids, cornrows, and Senegalese twists. Achieve intricate styles that last.',
    callout: 'Starting at $50',
  },
  {
    icon: RefreshCw, // Using RefreshCw (circular arrows) to represent creation/renewal
    title: 'Custom Crochet Styles',
    description: 'Get beautiful volume and texture with our custom crochet installs. Choose from a wide selection of hair and patterns for a flawless look.',
    callout: 'Book a consultation',
  },
  {
    icon: Scissors, // Using Scissors to represent precision/cutting/styling
    title: 'Premium Hair Weaving',
    description: 'From sew-ins to quick weaves, our professional weaving services guarantee a secure, natural-looking finish with minimal tension.',
    callout: 'Most Popular',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Header Content --- */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-pink-600 uppercase tracking-wider dark:text-pink-400">
            Our Offerings
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl dark:text-white">
            Transform Your Look
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Explore our main styling services designed for beauty, longevity, and health.
          </p>
        </div>
        {/* --- End Header Content --- */}

        {/* --- Services Grid --- */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group flex flex-col p-8 bg-white shadow-xl rounded-xl transition duration-300 transform hover:scale-[1.02] hover:shadow-2xl dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700"
            >
              <div className="flex items-center space-x-4">
                {/* Icon Circle */}
                <div className="p-3 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                  <service.icon size={28} strokeWidth={2} />
                </div>
                {/* Title and Callout */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>
                {/* Dynamic Callout Badge */}
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                  {service.callout}
                </span>
              </div>
              
              <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
              
              <div className="mt-6">
                <a
                  href={`#book-${index}`} // Link to a booking/details page
                  className="text-pink-600 hover:text-pink-700 font-semibold text-sm transition duration-150 ease-in-out dark:text-pink-400 dark:hover:text-pink-300"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* --- End Services Grid --- */}

      </div>
    </section>
  );
}