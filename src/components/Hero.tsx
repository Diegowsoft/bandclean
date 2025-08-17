import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Shield, Star } from 'lucide-react';
import heroImage from '@/assets/hero-cleaning.jpg';

const Hero = () => {
  const handleBooking = () => {
    const phone = "+35699027897";
    const message = "Hi! I'd like to book a cleaning service with Band Clean.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 animate-float">
        <Sparkles className="w-8 h-8 text-primary opacity-60" />
      </div>
      <div className="absolute bottom-32 left-10 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6 text-primary opacity-40" />
      </div>

      <div className="container mx-auto section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="800">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex items-center space-x-1 bg-primary/10 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-primary fill-current" />
                <span className="text-sm font-medium text-primary">Professional Cleaning Services</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-inter">
              A cleaning service{' '}
              <span className="text-primary">tailored to your needs</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Professional, reliable cleaning services across Malta. From homes to Airbnb properties, we deliver spotless results every time.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="200">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Flexible Hours</span>
              </div>
              <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="300">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Insured & Safe</span>
              </div>
              <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="400">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Quality Guaranteed</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="500">
              <Button 
                onClick={handleBooking}
                className="cta-button text-lg px-8 py-4 h-auto font-inter transition-all duration-300 hover:scale-105"
              >
                Book Now
              </Button>
              <Button 
                variant="outline" 
                onClick={handleContact}
                className="text-lg px-8 py-4 h-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground font-inter transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Professional cleaning service" 
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              {/* Overlay Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-medium border" data-aos="bounce-in" data-aos-delay="1000">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">500+ Happy Clients</p>
                    <p className="text-sm text-muted-foreground">Trusted cleaning service</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent opacity-20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;