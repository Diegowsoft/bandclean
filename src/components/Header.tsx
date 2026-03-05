import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '/careers' },
  ];

  const handleContactClick = () => {
    const phone = "+35699027897";
    const message = "Hi! I'd like to get in touch with Band Clean.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
      setIsMenuOpen(false);
      return;
    }
    // If we're not on the homepage, go home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/band-clean-logo-large.png"
          alt="Band Clean Logo"
          className="h-12 w-auto md:h-16 object-contain"
        />
      </div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`${
                  isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
                } transition-colors duration-200 font-medium`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleContactClick}
              className={`${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
              } transition-colors duration-200 font-medium`}
            >
              Contact
            </button>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+356 9902 7897</span>
            </div>
            <Button 
              onClick={() => window.open('https://api.whatsapp.com/send/?phone=%2B35699027897&text=Hi%21+I%27d+like+to+learn+more+about+Band+Clean+services.', '_blank')}
              className="cta-button"
            >
              Book a Cleaning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-medium">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="px-6 py-3 text-left text-foreground hover:text-primary hover:bg-accent/50 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={handleContactClick}
                className="px-6 py-3 text-left text-foreground hover:text-primary hover:bg-accent/50 transition-colors duration-200"
              >
                Contact
              </button>
              <div className="px-6 py-3 border-t border-border mt-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                  <Phone className="w-4 h-4" />
                  <span>+356 9902 7897</span>
                </div>
                <Button 
                  onClick={() => window.open('https://api.whatsapp.com/send/?phone=%2B35699027897&text=Hi%21+I%27d+like+to+learn+more+about+Band+Clean+services.', '_blank')}
                  className="cta-button w-full"
                >
                  Book a Cleaning
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;