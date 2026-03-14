import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
import heroSlide4 from '@/assets/hero-slide-4.jpg';
import heroSlide5 from '@/assets/hero-slide-5.jpg';

const Hero = () => {
  const handleBooking = () => {
    const phone = "+35699027897";
    const message = "Hi! I'd like to book a cleaning service with Band Clean.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const heroSlides = [
    { image: heroSlide1, title: "House Cleaning", description: "We make your home shine with professional deep cleaning, leaving every room fresh and spotless." },
    { image: heroSlide2, title: "Office Cleaning", description: "A clean workspace boosts productivity. We keep your office pristine so you can focus on business." },
    { image: heroSlide3, title: "Cleaning of Common Areas", description: "Lobbies, hallways and shared spaces maintained to the highest standard for a welcoming environment." },
    { image: heroSlide4, title: "Airbnb Turnover", description: "Fast, reliable turnovers that guarantee 5-star reviews from every guest, every time." },
    { image: heroSlide5, title: "Ironing Service", description: "Perfectly pressed clothes delivered with care. Save time and always look your best." }
  ];

  return (
    <section id="home" className="relative">
      <div className="w-full h-screen relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          loop={true}
          className="w-full h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl mx-auto px-4">
                    <p className="text-sm md:text-base uppercase tracking-widest text-white/70 mb-4 font-medium">
                      {slide.title}
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                      A cleaning service{' '}
                      <span className="text-white">tailored to your needs</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                      {slide.description}
                    </p>
                    
                    <Button 
                      onClick={handleBooking}
                      className="bg-primary hover:bg-primary-dark text-white text-lg px-12 py-4 h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Pagination Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .swiper-pagination {
              bottom: 30px !important;
            }
            .swiper-pagination-bullet {
              width: 12px !important;
              height: 12px !important;
              background: rgba(255, 255, 255, 0.5) !important;
              opacity: 1 !important;
            }
            .swiper-pagination-bullet-active {
              background: white !important;
            }
          `
        }} />
      </div>
    </section>
  );
};

export default Hero;