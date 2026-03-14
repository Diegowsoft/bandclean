import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin,
  MessageSquare,
  Clock,
  Shield,
  Heart,
  Star,
  ChevronUp,
  Facebook,
  Instagram
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    services: [
      { name: 'Home Cleaning', href: '#services' },
      { name: 'Office Cleaning', href: '#services' },
      { name: 'Cleaning of Common Areas', href: '#services' },
      { name: 'Airbnb Turnover', href: '#services' },
      { name: 'Ironing Service', href: '#services' },
      { name: 'Pet Sitting', href: '#services' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#about' },
      { name: 'Reviews', href: '#reviews' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'FAQ', href: '#faq' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Book Service', href: '#contact' },
      { name: 'Service Areas', href: '#contact' }
    ]
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    const phone = "+35699027897";
    const message = "Hi! I'd like to learn more about Band Clean services.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <footer className="bg-foreground text-background relative">
      {/* Main Footer Content */}
      <div className="container mx-auto section-padding py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6 bg-white rounded-lg p-3 inline-block">
              <img 
                src="/band-clean-logo-footer.png" 
                alt="Band Clean" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            <p className="text-background/80 mb-6 leading-relaxed">
              Professional cleaning services in Malta with Brazilian warmth and attention to detail. 
              Your trusted partner for home, office, and pet care needs.
            </p>

            {/* Key Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-background/80">Fully Insured & Bonded</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-background/80">500+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-background/80">Pet-Friendly Service</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div className="space-y-1">
                  <button
                    onClick={() => window.open('https://api.whatsapp.com/send/?phone=%2B35699027897', '_blank')}
                    className="block text-background font-medium hover:text-primary transition-colors"
                  >
                    +356 9902 7897
                  </button>
                  <button
                    onClick={() => window.open('https://api.whatsapp.com/send/?phone=%2B35699049434', '_blank')}
                    className="block text-background font-medium hover:text-primary transition-colors"
                  >
                    +356 9904 9434
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-background/80">Serving all Malta & Gozo</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-background/80">Mon-Sun: 6AM-10PM</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-background mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerSections.services.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-background/80 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-background mb-6">Company</h3>
            <ul className="space-y-3">
              {footerSections.company.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-background/80 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-xl font-semibold text-background mb-6">Get Started</h3>
            <ul className="space-y-3 mb-6">
              {footerSections.support.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-background/80 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            <Button 
              onClick={handleWhatsApp}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-4"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp Us
            </Button>

            {/* Social Media Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => window.open('https://www.facebook.com/people/Band-Clean/61562921752290/?sk=reviews', '_blank')}
                className="flex-1 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-0"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => window.open('https://www.instagram.com/band_clean/', '_blank')}
                className="flex-1 bg-[#E4405F] text-white hover:bg-[#E4405F]/90 border-0"
              >
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/20">
        <div className="container mx-auto section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-background/60 text-sm mb-4 md:mb-0">
              <p>© {currentYear} Band Clean. All rights reserved.</p>
              <p className="mt-1">Professional cleaning services in Malta</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('#contact')}
                className="text-background/60 hover:text-primary text-sm transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="text-background/60 hover:text-primary text-sm transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <ChevronUp className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-strong transition-all duration-300 hover:scale-110 z-40"
        aria-label="Contact via WhatsApp"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>
    </footer>
  );
};

export default Footer;