import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Sarah Johnson",
      location: "Malta",
      rating: 5,
      text: "Band Clean transformed my Airbnb property! Their turnover service is incredibly thorough and fast. Guests always comment on how spotless everything is. Highly recommended!",
      service: "Airbnb Turnover"
    },
    {
      name: "Michael Chen",
      location: "Sliema",
      rating: 5,
      text: "I've been using their weekly cleaning service for 6 months now. The team is professional, punctual, and pays attention to every detail. My home has never looked better!",
      service: "Home Cleaning"
    },
    {
      name: "Emma Rodriguez",
      location: "Valletta",
      rating: 5,
      text: "The pet sitting service is amazing! They took such good care of my dog Luna while I was traveling. Regular updates and photos gave me peace of mind. Thank you!",
      service: "Pet Sitting"
    },
    {
      name: "David Thompson",
      location: "St. Julian's",
      rating: 5,
      text: "Their ironing service saved my life! Professional quality work and my shirts have never looked so crisp. The team is reliable and always on time.",
      service: "Ironing Service"
    },
    {
      name: "Lisa Wang",
      location: "Msida",
      rating: 5,
      text: "Band Clean cleaned my office space weekly and the results were consistently excellent. Professional team, fair pricing, and outstanding customer service.",
      service: "Office Cleaning"
    },
    {
      name: "Carlos Silva",
      location: "Gzira",
      rating: 5,
      text: "I run multiple Airbnb properties and Band Clean handles all my turnovers. They're fast, efficient, and help me maintain 5-star reviews from guests. Couldn't be happier!",
      service: "Airbnb Turnover"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 bg-secondary/30">
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from our satisfied customers who trust us with their cleaning needs.
          </p>
        </div>

        {/* Main Review Carousel */}
        <div className="max-w-4xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
          <Card className="p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background Quote */}
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10" />
            
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-warning fill-current" />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed font-medium">
              "{reviews[currentReview].text}"
            </blockquote>

            {/* Author Info */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-foreground">
                {reviews[currentReview].name}
              </h4>
              <p className="text-muted-foreground">
                {reviews[currentReview].location} • {reviews[currentReview].service}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentReview 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Review Stats */}
        <div className="grid md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Happy Clients</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
            <p className="text-muted-foreground">Cleans Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-warning fill-current" />
              ))}
            </div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
            <p className="text-muted-foreground">Customer Satisfaction</p>
          </div>
        </div>

        {/* Additional Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {reviews.slice(0, 3).map((review, index) => (
            <Card 
              key={index} 
              className="p-6 interactive-card"
              data-aos="fade-up" 
              data-aos-delay={index * 100 + 500}
            >
              <div className="flex justify-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
              </div>
              <blockquote className="text-muted-foreground mb-4 text-sm leading-relaxed">
                "{review.text.slice(0, 120)}..."
              </blockquote>
              <div className="text-center">
                <h5 className="font-medium text-foreground">{review.name}</h5>
                <p className="text-xs text-muted-foreground">{review.service}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;