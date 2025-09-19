import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Reviews = () => {
  const testimonials = [
    {
      name: "Ester Scicluna",
      location: "Sliema • Home Cleaning",
      rating: 5,
      text: "I booked a 6-hour cleaning package for my home and I was amazed by the results! The team was incredibly thorough and professional. Every corner of my house was spotless when they finished.",
      service: "6-Hour Cleaning Package",
      image: "/testimonial-home-cleaning.jpg"
    },
    {
      name: "Ivan Laurenti",
      location: "St. Julian's • Airbnb Host",
      rating: 5,
      text: "The 4-hour cleaning package was perfect for my Airbnb turnover. Band Clean completed everything efficiently and my guests always comment on how clean and welcoming the space feels.",
      service: "4-Hour Cleaning Package", 
      image: "/testimonial-airbnb.jpg"
    },
    {
      name: "Emma Rodriguez",
      location: "Valletta • Pet Owner",
      rating: 5,
      text: "The pet sitting service is absolutely amazing! They took care of my dog Luna with so much love and sent regular photo updates. Highly recommend!",
      service: "Pet Sitting",
      image: "/testimonial-pet-sitting.jpg"
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
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-soft h-full">
                  <CardContent className="p-8">
                    <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} cleaning service`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg text-foreground mb-6 leading-relaxed text-center">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="text-center border-t pt-6">
                      <h4 className="font-semibold text-lg text-foreground mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground mb-3">
                        {testimonial.location}
                      </p>
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {testimonial.service}
                      </span>
                      
                      <Button 
                        onClick={handleBookNow}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter transition-all duration-300 hover:scale-105"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev !text-primary !w-12 !h-12 !mt-0 !left-4 !top-1/2 !-translate-y-1/2 after:!text-xl after:!font-bold"></div>
          <div className="swiper-button-next !text-primary !w-12 !h-12 !mt-0 !right-4 !top-1/2 !-translate-y-1/2 after:!text-xl after:!font-bold"></div>
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