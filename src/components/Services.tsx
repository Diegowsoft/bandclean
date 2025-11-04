import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Key, 
  Shirt, 
  Heart,
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Home & Office Cleaning',
      description: 'Complete cleaning service for residential and commercial spaces with attention to every detail.',
      features: ['Dust and wipe surfaces', 'Mop and vacuum floors', 'Kitchen & bathroom deep clean', 'General organization'],
      price: '€12/hour',
      delay: 0
    },
    {
      icon: Key,
      title: 'Airbnb Turnover',
      description: 'Professional turnover service to prepare your property for the next guests quickly and efficiently.',
      features: ['Complete property cleaning', 'Fresh linens & towels', 'Inventory check', 'Guest-ready setup'],
      price: 'Custom quote',
      delay: 100
    },
    {
      icon: Shirt,
      title: 'Ironing Service',
      description: 'Professional ironing and garment care to keep your clothes looking perfect and wrinkle-free.',
      features: ['Shirts, dresses, pants', 'Delicate fabric care', 'Fold and organize', 'Same-day service'],
      price: '€15/hour',
      delay: 200
    },
    {
      icon: Heart,
      title: 'Pet Sitting',
      description: 'Loving care for your pets with walks, feeding, grooming, and lots of attention while you\'re away.',
      features: ['Walks and playtime', 'Feeding & grooming', 'Medication if needed', 'Lots of love and care!'],
      price: '€20/hour',
      delay: 300
    }
  ];

  const handleLearnMore = (serviceName: string) => {
    const phone = "+35699027897";
    const message = `Hi! I'd like to know more about your ${serviceName} service.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Professional Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From routine cleaning to specialized services, we provide comprehensive solutions 
            for all your cleaning and care needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="service-card group"
              data-aos="fade-up"
              data-aos-delay={service.delay}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-primary">{service.price}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Flexible</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleLearnMore(service.title)}
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;