import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+356 9902 7897', '+356 7959 8763'],
      action: () => window.open('tel:+35699027897')
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      details: ['Available 24/7', 'Quick responses'],
      action: () => window.open('https://wa.me/35699027897')
    },
    {
      icon: MapPin,
      title: 'Service Area',
      details: ['All Malta', 'Gozo available'],
      action: null
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon-Sun: 8AM-8PM', 'Flexible scheduling'],
      action: null
    }
  ];

  const services = [
    'Home Cleaning',
    'Office Cleaning', 
    'Airbnb Turnover',
    'Ironing Service',
    'Pet Sitting',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create WhatsApp message
      const message = `New Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}`;
      
      const whatsappUrl = `https://wa.me/35699027897?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to experience professional cleaning? Contact us today for a free quote 
            and let us take care of your cleaning needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8" data-aos="fade-right">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                We're here to help with all your cleaning and pet care needs. 
                Reach out through any of these channels and we'll respond quickly!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid gap-6">
              {contactInfo.map((item, index) => (
                <Card 
                  key={index}
                  className={`p-6 interactive-card ${item.action ? 'cursor-pointer' : ''}`}
                  onClick={item.action || undefined}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Actions</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => window.open('https://wa.me/35699027897')}
                  className="cta-button flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </Button>
                <Button 
                  onClick={() => window.open('tel:+35699027897')}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="+356 your number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Needed</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-1 min-h-[120px]"
                    placeholder="Tell us about your cleaning needs, preferred schedule, or any special requirements..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="cta-button w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-accent/30 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>We typically respond within 2 hours during business hours</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <Card className="p-8 bg-gradient-primary text-white max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Need Immediate Service?</h3>
            <p className="mb-6 text-white/90">
              For urgent cleaning needs or same-day service requests, 
              call us directly or send a WhatsApp message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('tel:+35699027897')}
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                Call +356 9902 7897
              </Button>
              <Button 
                onClick={() => window.open('https://wa.me/35699027897')}
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                WhatsApp Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;