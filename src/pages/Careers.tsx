import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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

/* ───────────────────────────────────────────────
   Careers / Join Us — Band Clean Malta
   Target audience: local & immigrant workers
   Tone: professional, welcoming, transparent
   ─────────────────────────────────────────────── */

const valueProps = [
  {
    icon: Globe,
    title: 'Multicultural Environment',
    description:
      'Join a diverse team from across the globe. We celebrate every background and language.',
  },
  {
    icon: Award,
    title: 'European-Standard Training',
    description:
      'Receive hands-on training in the latest cleaning techniques & safety protocols.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours & Fair Pay',
    description:
      'We offer competitive wages, on-time payments and schedules that fit your life.',
  },
  {
    icon: ShieldCheck,
    title: 'Top-Quality Equipment',
    description:
      'Work with professional-grade tools and eco-friendly products — all provided by us.',
  },
];

const responsibilities = [
  'Deliver high-standard residential & commercial cleaning services',
  'Organise and maintain cleaning supplies and equipment',
  'Follow Band Clean protocols for hygiene and safety',
  'Communicate professionally with clients and team members',
  'Report any maintenance issues or supply needs promptly',
];

const requirements = [
  'Basic to intermediate English communication skills',
  'Proactive attitude and attention to detail',
  'Valid work permit / EU citizenship or Single Permit in Malta',
  'Ability to work independently and as part of a team',
  'Previous cleaning experience is a plus, but not required',
];

const faqs = [
  {
    q: 'Do I need previous cleaning experience?',
    a: 'Not at all. We provide full training to every new team member. What matters most is a positive attitude and willingness to learn.',
  },
  {
    q: 'How do contracts work in Malta?',
    a: 'All our team members receive a formal employment contract compliant with Maltese labour law, including social security contributions, paid leave and public holidays.',
  },
  {
    q: 'Does Band Clean provide cleaning materials and transport?',
    a: 'Yes. We supply all professional-grade equipment and eco-friendly products. Transport assistance may be available depending on your location and schedule.',
  },
];

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulated submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1800);
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
            <Sparkles className="w-4 h-4" /> We're Hiring
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Build Your Career in Malta with an International Cleaning&nbsp;Team
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            We're looking for dedicated people to join our Professional Service
            team. No matter where you come from — if you take pride in your work,
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
              Why Join Band&nbsp;Clean?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              More than a job — it's a career built on respect, growth and
              excellence.
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
              <Briefcase className="w-4 h-4" /> Open Position
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Professional Cleaning Specialist
            </h2>
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

          {submitted ? (
            <Card className="border-none shadow-medium text-center py-12">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Application Received!
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for your interest. Our team will review your details
                  and contact you soon.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-medium">
              <CardContent className="pt-8 pb-8 px-6 md:px-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" placeholder="e.g. Maria Silva" required />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="you@email.com" required />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-1.5">
                      Phone Number (WhatsApp preferred)
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    </Label>
                    <Input id="phone" type="tel" placeholder="+356 ..." />
                  </div>

                  {/* Work Permit Status */}
                  <div className="space-y-2">
                    <Label>Work Permit Status *</Label>
                    <Select required>
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
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
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
