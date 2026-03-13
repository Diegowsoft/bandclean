import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Globe,
  Award,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowDown,
  Loader2,
  Briefcase,
  Users,
  Sparkles,
  Phone,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import careersHero from '@/assets/careers-hero.jpg';
import careersHeroMobile from '@/assets/careers-hero-mobile.jpg';
import { useIsMobile } from '@/hooks/use-mobile';

/* ───────────────────────────────────────────────
   Join Us — Band Clean Malta
   Focus: Service labor (cleaning, pet sitting, ironing)
   Tone: professional, welcoming, transparent
   ─────────────────────────────────────────────── */

const valueProps = [
  {
    icon: Globe,
    title: 'Multicultural Team',
    description:
      'Work alongside people from all over the world in a respectful, inclusive environment.',
  },
  {
    icon: Award,
    title: 'Hands-On Training',
    description:
      'We train you on professional cleaning, ironing, pet care and European service standards.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours & Fair Pay',
    description:
      'Choose shifts that fit your life. Competitive wages paid on time, every time.',
  },
  {
    icon: ShieldCheck,
    title: 'All Equipment Provided',
    description:
      'Professional-grade tools, eco-friendly products and uniforms — everything you need is on us.',
  },
];

const serviceAreas = [
  'Residential cleaning (apartments, villas, houses)',
  'Office & commercial space cleaning',
  'Condominium common areas & lobbies',
  'Stairways, elevators & handrails',
  'Ironing & laundry services',
  'Pet sitting & pet care',
];

const responsibilities = [
  'Perform professional cleaning across homes, offices and common areas',
  'Handle ironing, laundry and fabric care when assigned',
  'Provide reliable pet sitting and basic pet care services',
  'Maintain and organise cleaning supplies and equipment',
  'Follow Band Clean service protocols and safety guidelines',
  'Communicate clearly with clients and team members',
];

const requirements = [
  'Basic to intermediate English communication skills',
  'Reliable, proactive attitude with attention to detail',
  'Valid work permit / EU citizenship or Single Permit in Malta',
  'Comfortable working independently and within a team',
  'Experience is a plus but not required — we provide full training',
];

const faqs = [
  {
    q: 'Do I need previous experience in cleaning or pet sitting?',
    a: 'No. We provide complete training for all our services — cleaning, ironing and pet care. A positive attitude and willingness to learn is what matters most.',
  },
  {
    q: 'What types of jobs will I be doing?',
    a: 'Depending on your skills and availability, you could be assigned to residential cleaning, office cleaning, condominium maintenance, ironing services or pet sitting.',
  },
  {
    q: 'How do contracts work in Malta?',
    a: 'All team members receive a formal employment contract compliant with Maltese labour law, including social security contributions, paid leave and public holidays.',
  },
  {
    q: 'Does Band Clean provide materials and transport?',
    a: 'Yes. We supply all professional-grade equipment, eco-friendly products and uniforms. Transport assistance may be available depending on your location and schedule.',
  },
];

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permitStatus, setPermitStatus] = useState('');
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '9555c100-c7c6-4001-8f02-cad74462d265');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Application Sent!',
          description: 'Thank you for your interest. Our team will contact you soon.',
          variant: 'default',
        });
        form.reset();
        setPermitStatus('');
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send application. Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background image with dark overlay for text contrast */}
        <img
          src={careersHero}
          alt="Band Clean professional team collaborating"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center md:text-left max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white mb-6">
            <Sparkles className="w-4 h-4" /> Labor Service
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Join Our Service Team in&nbsp;Malta
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            We're looking for dedicated people to help deliver professional
            cleaning, ironing and pet sitting services across Malta.
            No matter your background — if you take pride in your work,
            there's a place for you at Band&nbsp;Clean.
          </p>
          <Button size="lg" onClick={scrollToForm} className="cta-button gap-2 text-base">
            Apply Now <ArrowDown className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* ─── 2. VALUE PROPOSITION ─── */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Work With Band&nbsp;Clean?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A supportive workplace where you're valued, trained and equipped
              to deliver excellent service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((v) => (
              <Card
                key={v.title}
                className="border-none shadow-soft hover:shadow-medium transition-shadow duration-300 bg-card"
              >
                <CardContent className="pt-8 pb-6 px-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <v.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. JOB DESCRIPTION & REQUIREMENTS ─── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-2">
              <Briefcase className="w-4 h-4" /> What We're Looking For
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Service Team Member
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Cleaning · Ironing · Pet Sitting · Condominium Maintenance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Responsibilities */}
            <Card className="border border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Responsibilities
                </CardTitle>
                <CardDescription>What you'll do day-to-day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {responsibilities.map((r) => (
                  <div key={r} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{r}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Requirements
                </CardTitle>
                <CardDescription>What we're looking for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {requirements.map((r) => (
                  <div key={r} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{r}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── 4. APPLICATION FORM ─── */}
      <section id="application-form" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Apply to Join Our Team
            </h2>
            <p className="text-muted-foreground">
              Fill in the form below and we'll get back to you within 48&nbsp;hours.
            </p>
          </div>

          <Card className="border-none shadow-medium">
            <CardContent className="pt-8 pb-8 px-6 md:px-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" name="name" placeholder="e.g. Maria Silva" required />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" placeholder="you@email.com" required />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1.5">
                    Phone Number (WhatsApp preferred)
                    <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  </Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+356 ..." />
                </div>

                {/* Work Permit Status */}
                <div className="space-y-2">
                  <Label>Work Permit Status *</Label>
                  <Select
                    name="permit_status"
                    value={permitStatus}
                    onValueChange={setPermitStatus}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eu-citizen">EU Citizen</SelectItem>
                      <SelectItem value="single-permit">Single Permit Holder</SelectItem>
                      <SelectItem value="needs-sponsorship">Needs Visa Sponsorship</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience / Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Brief Experience / Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us a little about yourself — previous experience, availability, etc."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="cta-button w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── 5. FAQ / TRANSPARENCY ─── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              We believe in full transparency. Here are answers to the most
              common questions from candidates.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
