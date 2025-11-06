import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Reviews = () => {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const MAX_CHARS = 150;

  const toggleReview = (index: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const testimonials = [
    {
      name: "Juliana Cortes",
      rating: 5,
      text: "Highly recommended!!! Martina and all the girls. Her work is very reliable, efficient and made my place spotless! Thank you!!!"
    },
    {
      name: "Luis Puliciccihio",
      rating: 5,
      text: "This is by far the best cleaning company in Malta! Their team is professional, reliable, and always delivers excellent results. Highly recommended for anyone looking for top-quality cleaning services."
    },
    {
      name: "Nicole Pirotta",
      rating: 5,
      text: "I highly recommend Band Clean, they are professional, efficient and do a very good job in a short amount of time."
    },
    {
      name: "Tiago Garbim",
      rating: 5,
      text: "Fantastic service! Martina was incredibly professional and left my apartment spotless. She brought a staff member with her, and she was just as great—thorough, efficient, and friendly. The quality of their work is top-notch, and their positive attitude made the whole experience even better. I'll definitely be reaching out to them again. Thank you so much!"
    },
    {
      name: "Petros Nikou",
      rating: 5,
      text: "Great cleaning and ironing services. Martina and her team are just INCREDIBLE. They are fast, efficient and kind! Normal prices, always meeting our needs, and easy to schedule an appointment."
    },
    {
      name: "Mariana Querino",
      rating: 5,
      text: "Very efficient, friendly and detailed cleaning! I highly recommend!"
    },
    {
      name: "Victor",
      rating: 5,
      text: "Friendly and professional. I really recommend their services!"
    }
  ];

  const handleBookNow = () => {
    const message = "Hi! I'd like to book a cleaning service. Could you please provide me with more information?";
    const whatsappUrl = `https://wa.me/35699027897?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-card font-inter" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real testimonials from our satisfied customers
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="max-w-6xl mx-auto mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => {
              const isExpanded = expandedReviews.has(index);
              const isLong = testimonial.text.length > MAX_CHARS;
              const displayText = isExpanded || !isLong 
                ? testimonial.text 
                : testimonial.text.slice(0, MAX_CHARS) + '...';

              return (
                <SwiperSlide key={index}>
                  <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-soft h-full">
                    <CardContent className="p-8 flex flex-col">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg text-foreground mb-4 leading-relaxed text-center flex-grow">
                        "{displayText}"
                      </blockquote>
                      
                      {isLong && (
                        <button
                          onClick={() => toggleReview(index)}
                          className="text-primary hover:text-primary/80 text-sm font-medium mb-4 flex items-center justify-center gap-1 transition-colors"
                        >
                          {isExpanded ? 'Show Less' : 'Learn More'}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                      
                      <div className="text-center border-t pt-6 mt-auto">
                        <h4 className="font-semibold text-lg text-foreground mb-1">
                          {testimonial.name}
                        </h4>
                        
                        <Button 
                          onClick={handleBookNow}
                          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-inter transition-all duration-300 hover:scale-105"
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev !text-primary !w-12 !h-12 !mt-0 !left-4 !top-1/2 !-translate-y-1/2 after:!text-xl after:!font-bold"></div>
          <div className="swiper-button-next !text-primary !w-12 !h-12 !mt-0 !right-4 !top-1/2 !-translate-y-1/2 after:!text-xl after:!font-bold"></div>
        </div>

        {/* Social Media Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            onClick={() => window.open('https://www.facebook.com/people/Band-Clean/61562921752290/?sk=reviews', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-inter transition-all duration-300 hover:scale-105"
          >
            <Facebook className="w-5 h-5 mr-2" />
            View Facebook Reviews
          </Button>
          <Button
            onClick={() => window.open('https://www.instagram.com/band_clean/', '_blank')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter transition-all duration-300 hover:scale-105"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow on Instagram
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Cleans Completed</div>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="text-3xl font-bold text-primary mb-2">4.9</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="400">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Customer Satisfaction</div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: hsl(var(--primary));
          opacity: 0.3;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Reviews;