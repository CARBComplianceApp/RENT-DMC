import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  BarChart3, 
  PieChart,
  Calendar,
  MessageSquare,
  CreditCard,
  ChevronRight,
  Sparkles,
  MapPin,
  Building2,
  Key,
  FileText,
  TrendingUp,
  LayoutDashboard,
  Bell,
  Settings,
  Smartphone,
  Lock,
  Globe
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  features: string[];
  image: string;
  accent: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'homepage',
    title: 'The Ruby Hub',
    subtitle: 'Public Presence & Brand',
    description: 'A sophisticated, high-conversion landing page that tells the 100-year story of 3875 Ruby. Designed for the modern Oakland resident who values both history and utility.',
    icon: Home,
    features: [
      'Immersive 1924 Architecture Storytelling',
      'Real-time Unit Availability Integration',
      'Neighborhood Mosaic & Walk Score Data',
      'High-Contrast Ruby Accent Branding'
    ],
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
    accent: 'bg-app-accent'
  },
  {
    id: 'tenant-portal',
    title: 'Resident Experience',
    subtitle: 'The Tenant Portal',
    description: 'A seamless, mobile-first interface where residents manage their entire living experience. From digital keys to community events, everything is one tap away.',
    icon: Smartphone,
    features: [
      'One-Tap Rent Payments & History',
      'Smart Maintenance Request Tracking',
      'Digital Lease & Document Vault',
      'Community Bulletin & Event RSVP'
    ],
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop',
    accent: 'bg-app-accent'
  },
  {
    id: 'owner-features',
    title: 'Owner Intelligence',
    subtitle: 'Strategic Asset Management',
    description: 'Powerful tools for the modern property owner. Monitor your portfolio with AI-driven insights, legal compliance tracking, and real-time financial health monitoring.',
    icon: ShieldCheck,
    features: [
      'CEO Briefing: Market & Legal Intelligence',
      'SF Plus: Automated Financial Integration',
      'AI Property Visualizer & Marketing Suite',
      'Vendor & Construction Management'
    ],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
    accent: 'bg-app-accent'
  },
  {
    id: 'rent-roll',
    title: 'The Intelligent Rent Roll',
    subtitle: 'Financial Command Center',
    description: 'Beyond a simple spreadsheet. Our Rent Roll is a live, reactive dashboard that connects tenant behavior directly to your bottom line.',
    icon: LayoutDashboard,
    features: [
      'Real-time Occupancy & Delinquency Tracking',
      'Automated Lease Renewal Workflows',
      'Integrated Bank Transaction Matching',
      'Unit-Level P&L and Performance Metrics'
    ],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
    accent: 'bg-app-accent'
  }
];

export function ProductTour() {
  const [activeStep, setActiveStep] = useState(tourSteps[0]);

  return (
    <section id="product-tour" className="py-32 bg-app-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="text-xs font-bold text-app-accent uppercase tracking-[0.3em]">Platform Overview</div>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-app-text">
              The <span className="italic text-app-accent">Ruby</span> Ecosystem.
            </h2>
          </div>
          <p className="text-app-text/50 max-w-md text-lg font-medium">
            A comprehensive presentation of our property management and resident experience platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {tourSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step)}
                className={`w-full text-left p-6 rounded-[2rem] transition-all duration-500 border-2 ${
                  activeStep.id === step.id 
                  ? 'bg-app-card border-app-accent shadow-xl scale-[1.02]' 
                  : 'bg-transparent border-app-border hover:border-app-accent/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${activeStep.id === step.id ? 'bg-app-accent text-white' : 'bg-app-text/5 text-app-text/40'}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm font-black uppercase tracking-widest ${activeStep.id === step.id ? 'text-app-accent' : 'text-app-text/40'}`}>
                      {step.subtitle}
                    </div>
                    <div className={`text-xl font-serif font-bold ${activeStep.id === step.id ? 'text-app-text' : 'text-app-text/60'}`}>
                      {step.title}
                    </div>
                  </div>
                  {activeStep.id === step.id && (
                    <motion.div layoutId="arrow" className="ml-auto">
                      <ChevronRight className="w-6 h-6 text-app-accent" />
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Content Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-app-card rounded-[3rem] border border-app-border overflow-hidden shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-12 space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-4xl font-serif font-black text-app-text">{activeStep.title}</h3>
                      <p className="text-app-text/70 leading-relaxed text-lg font-light">
                        {activeStep.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-app-accent">Key Capabilities</div>
                      <div className="grid grid-cols-1 gap-3">
                        {activeStep.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm font-bold text-app-text/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-app-accent" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="flex items-center gap-3 px-8 py-4 bg-app-accent text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                      View Live Demo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img 
                      src={activeStep.image} 
                      alt={activeStep.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-app-card via-transparent to-transparent hidden md:block" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compelling Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[3.5rem] bg-zinc-950 border border-white/10 relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
          <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl bg-app-accent/40 rounded-full -translate-y-1/2 translate-x-1/2 w-96 h-96" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-3xl bg-app-accent/20 border border-app-accent/40 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-app-accent" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                Schedule Your Live <span className="italic text-app-accent">Demo</span> Today!
              </h3>
              <p className="text-xl text-white/60 font-medium tracking-tight">
                Experience the SOUL OF OAKLAND through the power of the SAilverback platform.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <p className="text-lg text-white font-bold mb-6">
                Email us now to book your personalized demo for this week.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="mailto:demo@silverbackai.agency" 
                  className="w-full sm:w-auto px-10 py-5 bg-app-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3"
                >
                  Book Live Demo <Calendar className="w-5 h-5" />
                </a>
                <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Slots Available This Week
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
