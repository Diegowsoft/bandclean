import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Star, Sparkles } from 'lucide-react';

const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Cleaning',
      price: '€12',
      period: 'per hour',
      description: 'Professional home and office cleaning services',
      features: [
        'Dust and wipe all surfaces',
        'Mop and vacuum floors',
        'Complete kitchen cleaning',
        'Deep bathroom sanitization',
        'General organization',
        'Quality guarantee'
      ],
      popular: false,
      color: 'bg-card',
      delay: 0
    },
    {
      name: 'Ironing',
      price: '€15',
      period: 'per hour',
      description: 'Professional garment care and ironing service',
      features: [
        'Shirts, dresses, pants',
        'Delicate fabric care',
        'Professional folding',
        'Organize wardrobe',
        'Same-day service available',
        'Quality finish guarantee'
      ],
      popular: true,
      color: 'bg-gradient-primary text-white',
      delay: 100
    },
    {
      name: 'Pet Sitting',
      price: '€20',
      period: 'per hour',
      description: 'Loving care for your beloved pets',
      features: [
        'Daily walks and exercise',
        'Feeding and fresh water',
        'Grooming and brushing',
        'Medication administration',
        'Playtime and attention',
        'Photo updates included'
      ],
      popular: false,
      color: 'bg-card',
      delay: 200
    }
  ];

  const handleBookService = (serviceName: string, price: string) => {
    const phone = "+35699027897";
    const message = `Hi! I'd like to book ${serviceName} service at ${price}/hour.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fair, hourly-based pricing with no hidden fees. Quality service you can trust.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative p-8 transition-all duration-300 hover:scale-105 hover:shadow-strong ${
                plan.popular ? 'ring-2 ring-primary shadow-medium' : 'hover:shadow-medium'
              }`}
              data-aos="fade-up"
              data-aos-delay={plan.delay}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className={`rounded-lg p-6 ${plan.color} ${plan.popular ? 'text-white' : ''}`}>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  plan.popular ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  <Sparkles className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                </div>

                {/* Title & Price */}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ml-2 ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/90' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                onClick={() => handleBookService(plan.name, plan.price)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-white text-primary hover:bg-white/90' 
                    : 'cta-button'
                }`}
              >
                Book {plan.name}
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-accent/30 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="300">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">Airbnb Turnover Service</h3>
            <p className="text-muted-foreground">
              Custom pricing based on property size and requirements. Get a personalized quote.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Complete Cleaning</h4>
              <p className="text-sm text-muted-foreground">Every room thoroughly cleaned</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Fresh Linens</h4>
              <p className="text-sm text-muted-foreground">Clean sheets and towels</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Inventory Check</h4>
              <p className="text-sm text-muted-foreground">Ensure everything is ready</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-2">Fast Turnaround</h4>
              <p className="text-sm text-muted-foreground">Quick preparation for guests</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => {
                const phone = "+35699027897";
                const message = "Hi! I'd like to get a quote for Airbnb turnover service.";
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="cta-button"
            >
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;