import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "Who provides the cleaning products and equipment?",
      answer: "We can work both ways! We offer a complete cleaning kit for an additional €25 that includes all professional-grade products and equipment. Alternatively, you can provide your own products if you prefer specific brands or have allergies."
    },
    {
      question: "How long does each cleaning session take?",
      answer: "The duration depends on the size of your space and the type of service. A typical home cleaning takes 2-4 hours, ironing service about 1-2 hours per load, and pet sitting can be arranged for any duration you need. We'll provide an estimated time during booking."
    },
    {
      question: "How do I book your services?",
      answer: "Booking is easy! You can contact us via WhatsApp at +356 9902 7897 or +356 7959 8763, use our contact form, or call us directly. We'll discuss your needs, schedule, and provide a quote. We aim to respond within 2 hours during business hours."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We require at least 24 hours notice for cancellations to avoid any charges. For same-day cancellations or no-shows, a 50% service fee may apply. We understand emergencies happen, so we'll work with you on a case-by-case basis."
    },
    {
      question: "Are you insured and bonded?",
      answer: "Yes, absolutely! Band Clean is fully insured and bonded. All our team members are background-checked professionals. We carry comprehensive liability insurance to protect both your property and our workers."
    },
    {
      question: "Do you offer regular cleaning schedules?",
      answer: "Yes! We offer flexible scheduling including weekly, bi-weekly, monthly, or one-time services. Regular clients receive priority booking and may qualify for discounted rates. We can work around your schedule, including evenings and weekends."
    },
    {
      question: "What areas do you serve in Malta?",
      answer: "We serve all major areas in Malta including Valletta, Sliema, St. Julian's, Msida, Gzira, and surrounding areas. Contact us to confirm if we service your specific location - we're always expanding our coverage area!"
    },
    {
      question: "What makes your pet sitting service special?",
      answer: "Our pet sitters are genuine animal lovers with experience caring for various pets. We provide walks, feeding, medication administration, and lots of love! We also send photo updates so you can see how happy your pet is while you're away."
    },
    {
      question: "Can you clean while I'm not home?",
      answer: "Absolutely! Many of our clients prefer this arrangement. We can work with your building management for access, or you can provide us with keys after our initial meeting. All our team members are trustworthy, insured professionals."
    },
    {
      question: "Do you offer Airbnb cleaning between guests?",
      answer: "Yes, Airbnb turnover is one of our specialties! We provide fast, thorough cleaning between guests including fresh linens, bathroom restocking, inventory checks, and ensuring everything is guest-ready. We work with tight schedules and can coordinate with your check-in times."
    }
  ];

  const handleContactSupport = () => {
    const phone = "+35699027897";
    const message = "Hi! I have a question about Band Clean services that wasn't covered in the FAQ.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers! Here are the most common questions about our services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border shadow-soft overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-accent/50 transition-colors duration-200">
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-card rounded-2xl p-8 shadow-soft border max-w-2xl mx-auto">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our friendly team is here to help! 
              Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-3">
              <Button onClick={handleContactSupport} className="cta-button">
                Contact Support
              </Button>
              <div className="text-sm text-muted-foreground">
                <p>📞 +356 9902 7897 / 7959 8763</p>
                <p>💬 WhatsApp available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;