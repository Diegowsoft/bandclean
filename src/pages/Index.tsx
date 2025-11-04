import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Reviews />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
