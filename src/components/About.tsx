import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Award,
  MapPin,
  CheckCircle2,
  Star
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passionate Care',
      description: 'We genuinely care about every space we clean and every pet we care for.'
    },
    {
      icon: Shield,
      title: 'Trusted & Insured',
      description: 'Fully insured professionals you can trust in your home and with your pets.'
    },
    {
      icon: Clock,
      title: 'Punctual Service',
      description: 'We value your time and always arrive when promised, ready to work.'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'Not satisfied? We\'ll make it right. Your happiness is our priority.'
    }
  ];

  const differentials = [
    'Brazilian professional team with attention to detail',
    'Flexible scheduling to fit your lifestyle',
    'Eco-friendly cleaning products available',
    'Cleaning kit provided for extra convenience',
    'Pet sitting with genuine love and care',
    'Local service with personal touch'
  ];

  const teamMembers = [
    {
      name: "Ana Silva",
      role: "Lead Cleaner",
      experience: "5+ years experience",
      specialty: "Deep cleaning specialist"
    },
    {
      name: "Carlos Santos",
      role: "Pet Care Specialist", 
      experience: "3+ years experience",
      specialty: "Loves all animals"
    },
    {
      name: "Maria Costa",
      role: "Ironing Expert",
      experience: "7+ years experience", 
      specialty: "Delicate fabric care"
    }
  ];

  const handleContact = () => {
    const phone = "+35699027897";
    const message = "Hi! I'd like to know more about Band Clean services.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Band Clean</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're a Brazilian-led cleaning company in Malta, dedicated to providing exceptional 
            cleaning services and pet care with the warmth and attention to detail that defines our culture.
          </p>
        </div>

        {/* Mission & Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20" data-aos="fade-up" data-aos-delay="200">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              At Band Clean, we believe that a clean space is essential for a happy life. Our mission 
              is to provide reliable, professional cleaning services that give you more time to focus 
              on what matters most to you.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Born from the Brazilian tradition of hospitality and attention to detail, we bring 
              warmth and care to every service we provide - whether it's making your home sparkle 
              or caring for your beloved pets.
            </p>
            
            <div className="flex items-center space-x-2 text-primary">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Proudly serving Malta</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">Why Choose Us</h3>
            <div className="space-y-4">
              {differentials.map((differential, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{differential}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Area Map */}
        <div className="mb-20" data-aos="fade-up">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              Our <span className="text-primary">Service Area</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We proudly serve all of Malta, bringing our professional cleaning services to every corner of this beautiful island.
            </p>
          </div>
          <Card className="overflow-hidden shadow-medium">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207033.65902555674!2d14.315260999999998!3d35.937496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e45281d8647c5%3A0x745ad4f7cbb5a97!2sMalta!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </Card>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-12" data-aos="fade-up">
            Our <span className="text-primary">Values</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.title}
                className="text-center p-6 interactive-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-3 text-foreground">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-12" data-aos="fade-up">
            Meet Our <span className="text-primary">Professional Team</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.name}
                className="text-center p-6 interactive-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{member.name}</h4>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-2">{member.experience}</p>
                <p className="text-sm text-muted-foreground italic">{member.specialty}</p>
                <div className="flex justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center mb-20" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Our Impact in Numbers</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <p className="text-white/80">Satisfied Clients</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <p className="text-white/80">Homes Cleaned</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
              <p className="text-white/80">Airbnb Turnovers</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
              <p className="text-white/80">Happy Pets</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center" data-aos="fade-up">
          <h3 className="text-2xl font-semibold mb-4">Ready to Experience the Band Clean Difference?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust us with their cleaning and pet care needs. 
            Let us bring the Brazilian touch to your space!
          </p>
          <Button onClick={handleContact} className="cta-button text-lg px-8 py-4 h-auto">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;