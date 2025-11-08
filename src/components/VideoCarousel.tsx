import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import videos
import slide1 from '@/assets/slide1.mp4';
import slide2 from '@/assets/slide2.mp4';
import slide3 from '@/assets/slide3.mp4';
import slide4 from '@/assets/slide4.mp4';
import slide5 from '@/assets/slide5.mp4';

const VideoCarousel = () => {
  const handleBookNow = () => {
    const message = "Hi! I'd like to book a cleaning service. Could you please provide me with more information?";
    const whatsappUrl = `https://wa.me/35699027897?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const slides = [
    {
      video: slide1,
      title: "Home & Office Cleaning",
      description: "Complete cleaning for homes and offices — spotless results, every time.",
      features: [
        "Dusting and surface wiping",
        "Mopping and vacuuming",
        "Deep kitchen & bathroom cleaning",
        "Full organization for a fresh, welcoming space"
      ]
    },
    {
      video: slide2,
      title: "Condominium Cleaning",
      description: "Clean, safe, and welcoming spaces for residents and visitors.",
      features: [
        "Floors, stairs, and handrails",
        "Elevators and mirrors",
        "Entrances and shared spaces always spotless"
      ]
    },
    {
      video: slide3,
      title: "Ironing Service",
      description: "Professional garment care that keeps your clothes flawless.",
      features: [
        "Shirts, dresses, pants",
        "Delicate fabric care",
        "Folded and organized",
        "Same-day service available"
      ]
    },
    {
      video: slide4,
      title: "Airbnb Turnover",
      description: "Fast, reliable cleaning for your next guests.",
      features: [
        "Thorough cleaning of all rooms",
        "Fresh linens and towels",
        "Inventory checks",
        "Perfect setup for a great first impression"
      ]
    },
    {
      video: slide5,
      title: "Pet Sitting",
      description: "Because your pets deserve care and love while you're away.",
      features: [
        "Walks and playtime",
        "Feeding and grooming",
        "Medication if needed",
        "Lots of affection and attention"
      ]
    }
  ];

  return (
    <section id="bandclean-carousel" className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.video-swiper-button-next',
          prevEl: '.video-swiper-button-prev',
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={slide.video} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {slide.title}
                </h2>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
                  {slide.description}
                </p>

                {slide.features.length > 0 && (
                  <div className="mb-8 space-y-3">
                    <p className="text-white/90 font-medium mb-4">
                      {index === 1 ? "We maintain your common areas with care:" : 
                       index === 2 ? "We handle every piece with precision:" :
                       index === 3 ? "Our professional team gets your property guest-ready with:" :
                       index === 4 ? "Our trusted sitters provide:" :
                       "We take care of every detail:"}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      {slide.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white">
                          <Check className="w-5 h-5 text-[#00c853] flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBookNow}
                  className="bg-[#0e8ed2] hover:bg-[#0c7abc] text-white px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="video-swiper-button-prev !text-white !w-12 !h-12 !mt-0 !left-4 !top-1/2 !-translate-y-1/2 after:!text-xl after:!font-bold hover:!text-[#0e8ed2] transition-colors"></div>
      <div className="video-swiper-button-next !text-white !w-12 !h-12 !mt-0 !right-4 !top-1/2 !-translate-y-1/2 after:!text-xl after:!font-bold hover:!text-[#0e8ed2] transition-colors"></div>

      <style>{`
        .video-swiper-button-prev,
        .video-swiper-button-next {
          cursor: pointer;
        }
        .video-swiper-button-prev::after,
        .video-swiper-button-next::after {
          font-family: swiper-icons;
        }
        .video-swiper-button-prev::after {
          content: 'prev';
        }
        .video-swiper-button-next::after {
          content: 'next';
        }
      `}</style>
    </section>
  );
};

export default VideoCarousel;
