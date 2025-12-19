// pages/index.js or app/page.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/Services';
import CtaSection from '@/components/CtaSection';
import GallerySection from '@/components/Gallery';

export default function Home() {
  return (
    <div className="bg-gray-800">
      {/* The Navbar is placed inside the Hero for absolute positioning over the dark background */}
      <Navbar />
      <Hero />
      <About/>
      <ServicesSection/>
      <GallerySection/>
      <CtaSection/>
      <Footer/>
    </div>
  );
}