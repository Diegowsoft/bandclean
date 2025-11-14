import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import VideoCarousel from '@/components/VideoCarousel';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-out-cubic',
      once: true
    });
    
    // Redirect authenticated users to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <VideoCarousel />
      <Reviews />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
