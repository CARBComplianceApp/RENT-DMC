import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  BarChart3, 
  PieChart as PieChartIcon,
  Calendar,
  MessageSquare,
  CreditCard,
  ChevronRight,
  Sparkles,
  MapPin,
  Package,
  Wind,
  Coffee,
  Train,
  Hospital,
  TreePine,
  Camera,
  History,
  Info,
  Menu,
  X,
  Share2,
  DollarSign,
  Activity,
  FileText,
  Mail,
  Wrench
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ShimmerBackground, ShimmerEffect } from './components/VisualEffects';
import { AIPropertyVisualizer } from './components/AIImageGenerator';
import { RentRollDashboard } from './components/RentRollDashboard';
import { MaintenanceModule } from './components/MaintenanceModule';
import { MarketingModule } from './components/MarketingModule';
import { FeatureSummarySheet } from './components/FeatureSummarySheet';
import { PropertyHierarchy } from './components/PropertyHierarchy';
import { TenantPortal } from './components/TenantPortal';
import { CommunityModule } from './components/CommunityModule';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './components/ThemeContext';

import { CEOBriefingPortal } from './components/CEOBriefingPortal';
import { SFPlusModule } from './components/SFPlusModule';
import { MarketMaxModule } from './components/MarketMaxModule';
import { AdminLegalLog } from './components/AdminLegalLog';
import { VendorManagement } from './components/VendorManagement';
import { BuildingIntelligence } from './components/BuildingIntelligence';
import { ProductTour } from './components/ProductTour';
import { OwnerPresentation } from './components/OwnerPresentation';

const revenueData = [
  { month: 'Jan', revenue: 45000, occupancy: 92 },
  { month: 'Feb', revenue: 52000, occupancy: 94 },
  { month: 'Mar', revenue: 48000, occupancy: 93 },
  { month: 'Apr', revenue: 61000, occupancy: 96 },
  { month: 'May', revenue: 59000, occupancy: 95 },
  { month: 'Jun', revenue: 72000, occupancy: 98 },
];

const distributionData = [
  { name: 'Residential', value: 65, color: '#C14931' },
  { name: 'Commercial', value: 25, color: '#991b1b' },
  { name: 'Short-term', value: 10, color: '#450a0a' },
];

export default function App() {
  const { theme } = useTheme();
  const [view, setView] = useState<'hub' | 'admin' | 'tenant'>('hub');
  const [adminTab, setAdminTab] = useState<'portfolio' | 'rent-roll' | 'maintenance' | 'marketing' | 'community' | 'ceo' | 'sfplus' | 'marketmax' | 'legal-log' | 'vendors'>('portfolio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOwnerVision, setShowOwnerVision] = useState(false);

  return (
    <div className={`min-h-screen font-sans selection:bg-app-accent/30 transition-colors duration-700`}>
      {view === 'admin' && <ShimmerBackground />}
      
      <AnimatePresence>
        {showOwnerVision && (
          <OwnerPresentation onClose={() => setShowOwnerVision(false)} />
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b border-app-border bg-app-bg/80 backdrop-blur-xl transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col -space-y-1">
              <span className={`text-xl font-black tracking-tighter text-app-text`}>3875 RUBY</span>
              <span className={`text-[8px] font-bold text-app-accent uppercase tracking-[0.2em]`}>Oakland Soul</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {view === 'hub' ? (
              <>
                <a href="#about" className="text-app-text/60 hover:text-app-text transition-colors">About</a>
                <a href="#amenities" className="text-app-text/60 hover:text-app-text transition-colors">Amenities</a>
                <a href="#neighborhood" className="text-app-text/60 hover:text-app-text transition-colors">Neighborhood</a>
                <a href="#product-tour" className="text-app-text/60 hover:text-app-text transition-colors">Platform</a>
                <a href="#gallery" className="text-app-text/60 hover:text-app-text transition-colors">Gallery</a>
              </>
            ) : (
              <>
                <a href="#features" className="text-app-text/60 hover:text-app-text transition-colors">Features</a>
                <a href="#intelligence" className="text-app-text/60 hover:text-app-text transition-colors">Intelligence</a>
                <a href="#rent-roll" className="text-app-text/60 hover:text-app-text transition-colors">Rent Roll</a>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {view === 'admin' && (
              <button 
                onClick={() => setShowOwnerVision(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-app-accent/10 border border-app-accent/20 text-app-accent text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-app-accent hover:text-white transition-all"
              >
                <ShieldCheck className="w-3 h-3" /> Vision Deck
              </button>
            )}
            {/* View Toggle */}
            <div className={`flex p-1 rounded-full bg-app-text/10 border border-app-border`}>
              <button 
                onClick={() => setView('hub')}
                className={`px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  view === 'hub' 
                  ? 'bg-app-accent text-white shadow-lg' 
                  : 'text-app-text/60 hover:text-app-text'
                }`}
              >
                Hub
              </button>
              <button 
                onClick={() => setView('admin')}
                className={`px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  view === 'admin' 
                  ? 'bg-app-accent text-white shadow-lg' 
                  : 'text-app-text/60 hover:text-app-text'
                }`}
              >
                Admin
              </button>
              <button 
                onClick={() => setView('tenant')}
                className={`px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  view === 'tenant' 
                  ? 'bg-app-accent text-white shadow-lg' 
                  : 'text-app-text/60 hover:text-app-text'
                }`}
              >
                Tenant
              </button>
            </div>

            <button className={`md:hidden p-2 ${view === 'hub' ? 'text-app-text' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 pt-24 px-6 ${view === 'hub' ? 'bg-app-bg text-app-text' : 'bg-zinc-950 text-white'} md:hidden`}
          >
            <div className="flex flex-col gap-8 text-2xl font-serif font-bold">
              {view === 'hub' ? (
                <>
                  <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                  <a href="#amenities" onClick={() => setIsMenuOpen(false)}>Amenities</a>
                  <a href="#neighborhood" onClick={() => setIsMenuOpen(false)}>Neighborhood</a>
                  <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
                </>
              ) : (
                <>
                  <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
                  <a href="#intelligence" onClick={() => setIsMenuOpen(false)}>Intelligence</a>
                  <a href="#rent-roll" onClick={() => setIsMenuOpen(false)}>Rent Roll</a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'hub' ? (
          <motion.div
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20"
          >
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#0B1A2D]">
              <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-app-accent/20 via-transparent to-transparent"></div>
                <div className="grid grid-cols-8 h-full w-full">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/5"></div>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <div className="inline-block px-4 py-2 bg-app-accent text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-8 rounded-full shadow-xl">
                      Est. 1924 // Oakland, CA
                    </div>
                    <h1 className="text-7xl md:text-[10rem] font-sans font-black tracking-tighter leading-[0.85] text-white drop-shadow-2xl uppercase">
                      RUBY <br /> <span className="text-app-accent">SOUL.</span>
                    </h1>
                    <div className="mt-12 text-2xl md:text-4xl font-serif italic text-white max-w-xl leading-tight">
                      Where 1920s Craftsmanship <br /> meets the <span className="underline decoration-app-accent underline-offset-8">progress of 100 years</span>.
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row gap-6">
                      <button className="px-10 py-5 bg-app-accent text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-app-text transition-all shadow-2xl hover:scale-105">
                        Explore Units
                      </button>
                      <div className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">2 Units Available Now</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="text-xs font-bold text-app-accent uppercase tracking-[0.4em] mb-4">Neighborhood Landmarks</div>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { name: 'Mosswood Park', dist: '0.1 miles', desc: 'Historic green space & recreation' },
                        { name: 'MacArthur BART', dist: '0.4 miles', desc: '10-minute walk to transit heart' },
                        { name: 'Kaiser Permanente', dist: '0.3 miles', desc: 'Premier medical district access' },
                        { name: 'Piedmont Avenue', dist: '0.6 miles', desc: 'Boutique dining & shopping' },
                        { name: 'Alta Bates Summit', dist: '0.5 miles', desc: 'Leading healthcare center' }
                      ].map((item, i) => (
                        <motion.div 
                          key={item.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + (i * 0.1) }}
                          className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-app-accent/40 transition-all group flex items-center justify-between"
                        >
                          <div>
                            <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.name}</h4>
                            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{item.desc}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-app-accent font-serif italic text-lg">{item.dist}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Neighborhood Snapshot */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Transit Heart', desc: 'A 10-minute stroll to MacArthur BART connects you to the entire Bay Area.', icon: Train, color: 'bg-blue-50 text-blue-600' },
                  { title: 'Secure Living', desc: '24/7 Amazon Hub lockers ensure your packages are as safe as your home.', icon: Package, color: 'bg-orange-50 text-orange-600' },
                  { title: 'Mosswood Vibe', desc: 'Acres of historic green space and recreation right at your doorstep.', icon: TreePine, color: 'bg-emerald-50 text-emerald-600' },
                  { title: 'Medical Hub', desc: 'Steps from Kaiser and Alta Bates—the city\'s premier medical district.', icon: Hospital, color: 'bg-red-50 text-red-600' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2rem] bg-app-card border border-app-border shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-app-text/80 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* The Vibe Section */}
            <section id="about" className="py-32 bg-app-accent/5">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" 
                      alt="Oakland Residential Architecture" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-app-accent rounded-[2rem] p-8 text-white flex flex-col justify-end shadow-xl hidden md:flex">
                    <History className="w-10 h-10 mb-4" />
                    <div className="text-sm font-bold uppercase tracking-widest">Built 1924</div>
                    <div className="text-2xl font-serif italic">A Century of Soul.</div>
                  </div>
                </div>
                <div className="space-y-8 p-12 bg-black rounded-[3rem] text-white">
                  <div className="text-xs font-bold text-app-accent uppercase tracking-[0.3em]">The Vision</div>
                  <h2 className="text-5xl md:text-7xl font-serif font-black leading-tight">
                    Historic Charm. <br /> Modern <span className="italic text-app-accent/60">Utility</span>.
                  </h2>
                  <p className="text-xl text-white/90 leading-relaxed font-light">
                    3875 Ruby Street is a living testament to Oakland's diverse history. This 24-unit, 3-story building preserves its 1924 architectural soul while fostering a community that celebrates every culture. From secure Amazon Hubs to the vibrant Mosswood vibe, this is authentic Oakland living.
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                    <div>
                      <div className="text-4xl font-serif font-bold text-app-accent">24</div>
                      <div className="text-xs font-black uppercase tracking-widest text-white/60 mt-2">Boutique Units</div>
                    </div>
                    <div>
                      <div className="text-4xl font-serif font-bold text-app-accent">3</div>
                      <div className="text-xs font-black uppercase tracking-widest text-white/60 mt-2">Stories</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="text-6xl font-serif font-black text-app-accent leading-none">100%</div>
                      <div className="text-sm font-black uppercase tracking-[0.2em] text-white mt-2">Oakland Owned</div>
                    </div>
                    <div>
                      <div className="text-4xl font-serif font-bold text-app-accent">94/100</div>
                      <div className="text-xs font-black uppercase tracking-widest text-white/60 mt-2">Walk Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities Grid */}
            <section id="amenities" className="py-32 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-20 space-y-4">
                <h2 className="text-6xl font-serif font-black tracking-tighter">Life at <span className="italic text-app-accent underline decoration-app-accent/30 underline-offset-12">Ruby</span>.</h2>
                <p className="text-app-text/70 max-w-xl mx-auto text-lg font-medium">Everything you need to thrive in the heart of the city.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Private Back Patio', desc: 'A secluded urban oasis for morning coffee or weekend grilling.', icon: Wind },
                  { title: 'On-Site Laundry', desc: 'Modern, high-capacity machines just steps from your door.', icon: Zap },
                  { title: 'Amazon Hub', desc: 'Never miss a delivery with our secure, on-site package lockers.', icon: Package },
                  { title: 'Walk to BART', desc: 'Easy access to the entire Bay Area via MacArthur Station.', icon: Train },
                  { title: 'Hospital Proximity', desc: 'Perfect for medical professionals working at nearby centers.', icon: Hospital },
                  { title: 'Mosswood Park', desc: 'Your backyard just got bigger. Recreation, dog park, and more.', icon: TreePine },
                ].map((item, i) => (
                  <div key={item.title} className="p-12 rounded-[3rem] bg-app-card border-2 border-app-border hover:border-app-accent/30 transition-all group shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-app-accent/10 flex items-center justify-center mb-10 group-hover:bg-app-accent/20 transition-colors">
                      <item.icon className="w-8 h-8 text-app-accent group-hover:text-app-accent transition-colors" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-app-text/70 leading-relaxed text-lg font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Building Intelligence Section */}
            <BuildingIntelligence />

            {/* Platform Ecosystem Presentation */}
            <section id="platform-ecosystem" className="py-32 bg-[#0B1A2D] text-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                  <div className="text-xs font-bold text-app-accent uppercase tracking-[0.4em] mb-4">The Ecosystem</div>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                    One Platform. <br /> <span className="text-app-accent">Infinite Control.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Owner Features Presentation */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:border-app-accent/30 transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-3xl bg-app-accent flex items-center justify-center shadow-2xl">
                        <ShieldCheck className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter">Owner Intelligence</h3>
                        <p className="text-app-accent text-[10px] font-bold uppercase tracking-widest">Asset Management Suite</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: 'CEO Briefing Portal', desc: 'AI-generated lease agreements, real-time legal updates, and market data visualization.', icon: FileText },
                        { title: 'SF Plus Financials', desc: 'Automated bank transaction matching and rent collection tracking.', icon: DollarSign },
                        { title: 'Market Max Projections', desc: 'ROI forecasting and occupancy optimization using neighborhood data.', icon: TrendingUp },
                        { title: 'Vendor Management', desc: 'Centralized directory for plumbing, electrical, and security services.', icon: Users }
                      ].map((feature) => (
                        <div key={feature.title} className="flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                            <feature.icon className="w-6 h-6 text-white/40" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                            <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tenant Features Presentation */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:border-[#FD5A1E]/30 transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-3xl bg-[#FD5A1E] flex items-center justify-center shadow-2xl">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter">Tenant Experience</h3>
                        <p className="text-[#FD5A1E] text-[10px] font-bold uppercase tracking-widest">Community & Lifestyle</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: 'Stadium Mailbox Hub', desc: 'Customizable mailbox icons in a Giants-inspired stadium layout.', icon: Mail },
                        { title: 'Maintenance Portal', desc: 'One-click reporting with photo uploads and real-time status tracking.', icon: Wrench },
                        { title: 'Community Referrals', desc: 'Earn rewards by referring friends to the Ruby community.', icon: Share2 },
                        { title: 'Lease Walkthrough', desc: 'Interactive, step-by-step digital lease updates and legal disclosures.', icon: ArrowRight }
                      ].map((feature) => (
                        <div key={feature.title} className="flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                            <feature.icon className="w-6 h-6 text-white/40" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                            <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Rent Roll Capability Showcase */}
                <div className="mt-12 p-12 rounded-[4rem] bg-gradient-to-br from-app-accent/20 to-transparent border border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-1">
                      <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">The Intelligent <br /> <span className="text-app-accent">Rent Roll</span>.</h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        Our proprietary rent roll system does more than track payments. It monitors tenant activity, identifies sublease risks, and automates late fee applications.
                      </p>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-6">
                      {[
                        { label: 'Automated Late Fees', value: 'Instant $50 Application' },
                        { label: 'Sublease Detection', value: 'AI Pattern Recognition' },
                        { label: 'Financial Sync', value: 'Direct Bank Integration' },
                        { label: 'Legal Compliance', value: 'Auto-Notice Generation' }
                      ].map((stat) => (
                        <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/5">
                          <div className="text-[10px] font-bold text-app-accent uppercase tracking-widest mb-2">{stat.label}</div>
                          <div className="text-xl font-bold">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Tour Section */}
            <ProductTour />

            {/* Gallery Section */}
            <section id="gallery" className="py-32 bg-app-text text-app-bg overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-app-accent uppercase tracking-[0.3em]">Visual Story</div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black">Ruby <span className="italic text-app-accent">Gallery</span>.</h2>
                  </div>
                  <p className="text-white/50 max-w-md">A collection of moments and details that define our corner of Oakland.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 group relative overflow-hidden rounded-[3rem] shadow-2xl">
                    <img 
                      src="https://picsum.photos/seed/ruby-main-building/1200/800" 
                      alt="3875 Ruby St Building" 
                      className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-app-text/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
                      <div className="text-2xl font-serif italic text-white">Classic Oakland Architecture</div>
                    </div>
                  </div>
                  <div className="md:col-span-4 grid grid-rows-2 gap-6">
                    <div className="group relative overflow-hidden rounded-[2.5rem] shadow-lg">
                      <img 
                        src="https://picsum.photos/seed/ruby-unit-interior-1/600/600" 
                        alt="Unit Interior Detail" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="group relative overflow-hidden rounded-[2.5rem] shadow-lg">
                      <img 
                        src="https://picsum.photos/seed/ruby-unit-interior-2/600/600" 
                        alt="Unit Interior Detail 2" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Neighborhood Mosaic Section */}
            <section id="neighborhood-mosaic" className="py-32 bg-app-bg overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                  <div className="space-y-6 max-w-2xl">
                    <div className="text-xs font-bold text-app-accent uppercase tracking-[0.3em]">The Ruby Mosaic</div>
                    <h2 className="text-6xl font-serif font-black leading-tight">
                      Where <span className="italic text-app-accent">Oakland</span> Converges.
                    </h2>
                    <p className="text-xl text-app-text/80 leading-relaxed font-light">
                      A curated collection of life at 3875 Ruby. From the essential care of Kaiser to the high-speed pulse of MacArthur BART, everything is within your orbit.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <div className="text-4xl font-serif font-bold text-app-text">94</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-app-text/50">Walk Score</div>
                    </div>
                    <div className="w-px h-12 bg-app-border" />
                    <div className="text-right">
                      <div className="text-4xl font-serif font-bold text-app-text">88</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-app-text/50">Transit Score</div>
                    </div>
                  </div>
                </div>

                {/* The Mosaic Grid */}
                <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[1200px] md:h-[900px]">
                  {/* Building Exterior - Large Anchor */}
                  <div className="col-span-12 md:col-span-6 row-span-4 group relative overflow-hidden rounded-[3rem] shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200" 
                      alt="3875 Ruby St Exterior" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-app-text/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-app-accent uppercase tracking-widest">The Anchor</div>
                        <div className="text-3xl font-serif font-bold italic text-white">3875 Ruby Street</div>
                      </div>
                    </div>
                  </div>

                  {/* Unit Interior - Modern Living */}
                  <div className="col-span-6 md:col-span-3 row-span-3 group relative overflow-hidden rounded-[2.5rem] shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop" 
                      alt="Modern Unit Interior" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-app-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-white font-serif italic text-xl">Modern Soul</div>
                    </div>
                  </div>

                  {/* Kaiser Permanente - Essential Care */}
                  <div className="col-span-6 md:col-span-3 row-span-2 group relative overflow-hidden rounded-[2.5rem] shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" 
                      alt="Kaiser Permanente Medical Center" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-app-bg/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-app-text shadow-sm">
                      Medical District
                    </div>
                  </div>

                  {/* MacArthur BART - Transit Pulse */}
                  <div className="col-span-6 md:col-span-3 row-span-2 group relative overflow-hidden rounded-[2.5rem] shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1473445733995-882ed5127a11?q=80&w=800&auto=format&fit=crop" 
                      alt="MacArthur BART Station" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-app-accent/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                      Transit Hub
                    </div>
                  </div>

                  {/* Mosswood Park - Green Space */}
                  <div className="col-span-12 md:col-span-6 row-span-2 group relative overflow-hidden rounded-[3rem] shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop" 
                      alt="Mosswood Park" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-white font-serif italic text-3xl">Mosswood Green</div>
                    </div>
                  </div>

                  {/* Piedmont Avenue - Walkable Shopping */}
                  <div className="col-span-6 md:col-span-3 row-span-2 group relative overflow-hidden rounded-[2.5rem] shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" 
                      alt="Piedmont Avenue Shops" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-6 left-6 px-4 py-2 bg-app-bg/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-app-text shadow-sm">
                      Piedmont Ave
                    </div>
                  </div>

                  {/* Temescal District - Food & Culture */}
                  <div className="col-span-6 md:col-span-3 row-span-2 group relative overflow-hidden rounded-[2.5rem] shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" 
                      alt="Temescal District" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-6 left-6 px-4 py-2 bg-emerald-500/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                      Temescal Vibe
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="py-24 px-6 border-t border-app-border bg-app-bg">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-2 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-app-accent" />
                    <span className="text-3xl font-black tracking-tighter text-app-text uppercase">3875 RUBY</span>
                  </div>
                  <p className="text-app-text/80 max-w-sm leading-relaxed font-medium">
                    A boutique residential community in the heart of Oakland. Managed with soul, powered by intelligence.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="text-xs font-black uppercase tracking-widest text-app-text/50">Navigation</div>
                  <ul className="space-y-4 text-sm font-bold">
                    <li><a href="#" className="text-app-text/70 hover:text-app-accent transition-colors">Available Units</a></li>
                    <li><a href="#" className="text-app-text/70 hover:text-app-accent transition-colors">Tenant Portal</a></li>
                    <li><a href="#" className="text-app-text/70 hover:text-app-accent transition-colors">Maintenance Request</a></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="text-xs font-black uppercase tracking-widest text-app-text/50">Contact</div>
                  <ul className="space-y-4 text-sm font-bold">
                    <li className="text-app-text/70">hello@3875ruby.com</li>
                    <li className="text-app-text/70">(510) 555-0123</li>
                    <li className="text-app-text/70">Oakland, CA 94609</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-app-border flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-[11px] font-bold text-app-text/60 uppercase tracking-[0.3em] font-mono text-center md:text-left">
                  © 2026 RENT DMC TECHNOLOGIES. <span className="text-app-accent">OAKLAND SOUL.</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-[10px] font-black text-app-accent uppercase tracking-widest">Powered by</div>
                  <div className="text-2xl font-black tracking-tighter text-app-text uppercase">RENT DMC</div>
                </div>
                <div className="flex gap-10 text-[11px] font-bold uppercase tracking-widest text-app-text/60">
                  <a href="#" className="hover:text-app-accent transition-colors border-b border-transparent hover:border-app-accent pb-1">Privacy</a>
                  <a href="#" className="hover:text-app-accent transition-colors border-b border-transparent hover:border-app-accent pb-1">Terms</a>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : view === 'admin' ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-app-bg pt-32 pb-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              {/* Portal Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-serif font-black text-app-text">Tenant & Admin Portal</h2>
                  <p className="text-app-text/50 mt-2">Secure management for 3875 Ruby Street.</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard.writeText(url);
                      alert('Link copied! Ready to share with your team.');
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-app-card border border-app-border rounded-full font-bold text-sm hover:bg-app-text hover:text-app-bg transition-all shadow-sm"
                  >
                    <Share2 className="w-4 h-4" /> Share Hub
                  </button>
                  <button className="px-6 py-3 bg-app-accent text-white rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-md">
                    Download Report
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { label: 'Total Revenue', value: '$42,850', trend: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                  { label: 'Occupancy Rate', value: '98.2%', trend: '+2.1%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                  { label: 'Maintenance Tasks', value: '4', trend: '-2', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50/50' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-8 rounded-[2rem] bg-app-card border-2 border-app-border shadow-lg hover:border-app-accent/20 transition-all group`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{stat.trend}</span>
                    </div>
                    <div className="text-xs font-bold text-app-text/40 uppercase tracking-[0.2em]">{stat.label}</div>
                    <div className="text-5xl font-serif font-black mt-2 text-app-text">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Quick Guide / What's New */}
              <div className="mb-12 p-8 rounded-[2.5rem] bg-app-text text-app-bg shadow-2xl flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-grow space-y-4">
                  <h3 className="text-2xl font-serif font-bold italic">Operational Intelligence Hub</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm text-app-bg/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-app-accent" />
                      <span>Monitor real-time revenue & occupancy trends</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-app-bg/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-app-accent" />
                      <span>Track AI-powered security & sublease alerts</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-app-bg/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-app-accent" />
                      <span>Manage maintenance & community schedules</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-app-bg/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-app-accent" />
                      <span>Access CEO Briefing & Legal Notice tools</span>
                    </div>
                  </div>
                </div>
                <div className="w-px h-16 bg-app-bg/10 hidden md:block" />
                <div className="text-center md:text-left">
                  <div className="text-[10px] font-bold text-app-accent uppercase tracking-[0.3em] mb-1">System Status</div>
                  <div className="text-xl font-serif font-bold italic">All Systems Nominal</div>
                </div>
              </div>

              {/* Main Portal Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-serif font-bold text-app-text">Revenue Intelligence</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-app-accent"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C14931" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#C14931" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#C14931" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                  <h3 className="text-2xl font-serif font-bold mb-8">Recent Activity</h3>
                  <div className="space-y-6">
                    {[
                      { user: 'Unit 4B', action: 'Rent Payment Received', time: '2 hours ago', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
                      { user: 'Unit 2A', action: 'Maintenance Request: Sink', time: '5 hours ago', icon: Activity, color: 'bg-orange-50 text-orange-600' },
                      { user: 'System', action: 'New Lease Generated: 3C', time: '1 day ago', icon: FileText, color: 'bg-blue-50 text-blue-600' },
                      { user: 'Unit 1A', action: 'Package Delivered to Hub', time: '1 day ago', icon: Package, color: 'bg-purple-50 text-purple-600' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-app-text/5 transition-colors cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <activity.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <div className="font-bold text-app-text">{activity.user}</div>
                          <div className="text-sm text-app-text/50">{activity.action}</div>
                        </div>
                        <div className="text-xs font-bold text-app-text/30 uppercase tracking-widest">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portal Navigation Tabs */}
              <div className="flex gap-8 border-b border-app-text/5 mb-12 overflow-x-auto pb-px">
                <button 
                  onClick={() => setAdminTab('portfolio')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'portfolio' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Portfolio
                  {adminTab === 'portfolio' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('rent-roll')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'rent-roll' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Rent Roll
                  {adminTab === 'rent-roll' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('maintenance')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'maintenance' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Maintenance
                  {adminTab === 'maintenance' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('marketing')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'marketing' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Marketing
                  {adminTab === 'marketing' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('community')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'community' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Community
                  {adminTab === 'community' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('ceo')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'ceo' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  CEO Briefing
                  {adminTab === 'ceo' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('sfplus')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'sfplus' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  SF Plus
                  {adminTab === 'sfplus' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('marketmax')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'marketmax' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Market Max
                  {adminTab === 'marketmax' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('legal-log')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'legal-log' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Legal Log
                  {adminTab === 'legal-log' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
                <button 
                  onClick={() => setAdminTab('vendors')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${adminTab === 'vendors' ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
                >
                  Vendors
                  {adminTab === 'vendors' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
                </button>
              </div>

              {/* Dynamic Admin Content */}
              {adminTab === 'portfolio' ? (
                <section id="portfolio" className="py-12">
                  <PropertyHierarchy />
                </section>
              ) : adminTab === 'rent-roll' ? (
                <section id="rent-roll" className="py-12">
                  <div className="mb-12 space-y-4">
                    <h2 className="text-4xl font-bold text-app-text font-serif">Your <span className="italic">Intelligent</span> Rent Roll.</h2>
                    <p className="text-app-text/50 max-w-xl font-medium">Real-time management of your property portfolio with integrated financial tracking.</p>
                  </div>
                  <RentRollDashboard />
                </section>
              ) : adminTab === 'maintenance' ? (
                <section id="maintenance" className="py-12">
                  <MaintenanceModule />
                </section>
              ) : adminTab === 'marketing' ? (
                <section id="marketing" className="py-12">
                  <MarketingModule />
                </section>
              ) : adminTab === 'community' ? (
                <section id="community" className="py-12">
                  <CommunityModule />
                </section>
              ) : adminTab === 'ceo' ? (
                <section id="ceo" className="py-12">
                  <CEOBriefingPortal />
                </section>
              ) : adminTab === 'sfplus' ? (
                <section id="sfplus" className="py-12">
                  <SFPlusModule />
                </section>
              ) : adminTab === 'marketmax' ? (
                <section id="marketmax" className="py-12">
                  <MarketMaxModule />
                </section>
              ) : adminTab === 'legal-log' ? (
                <section id="legal-log" className="py-12">
                  <AdminLegalLog />
                </section>
              ) : (
                <section id="vendors" className="py-12">
                  <VendorManagement />
                </section>
              )}

              {/* AI Section */}
              <section id="ai">
                <AIPropertyVisualizer />
              </section>

              {/* Summary Sheet */}
              <section id="summary-sheet">
                <FeatureSummarySheet />
              </section>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tenant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-app-bg pt-32 pb-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-serif font-black text-app-text">Ruby <span className="italic">Resident</span> Portal</h2>
                <p className="text-app-text/50 mt-2">Welcome home, Jordan. Your community at your fingertips.</p>
              </div>
              <TenantPortal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
