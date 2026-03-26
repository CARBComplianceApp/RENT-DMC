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
  FileText
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
import { FeatureSummarySheet } from './components/FeatureSummarySheet';

const revenueData = [
  { month: 'Jan', revenue: 45000, occupancy: 92 },
  { month: 'Feb', revenue: 52000, occupancy: 94 },
  { month: 'Mar', revenue: 48000, occupancy: 93 },
  { month: 'Apr', revenue: 61000, occupancy: 96 },
  { month: 'May', revenue: 59000, occupancy: 95 },
  { month: 'Jun', revenue: 72000, occupancy: 98 },
];

const distributionData = [
  { name: 'Residential', value: 65, color: '#6366f1' },
  { name: 'Commercial', value: 25, color: '#06b6d4' },
  { name: 'Short-term', value: 10, color: '#8b5cf6' },
];

export default function App() {
  const [view, setView] = useState<'hub' | 'admin'>('hub');
  const [adminTab, setAdminTab] = useState<'rent-roll' | 'maintenance'>('rent-roll');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${view === 'hub' ? 'bg-oakland-paper text-oakland-ink' : 'bg-zinc-950 text-zinc-100'} font-sans selection:bg-oakland-terracotta/30 transition-colors duration-700`}>
      {view === 'admin' && <ShimmerBackground />}
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b ${view === 'hub' ? 'border-oakland-ink/5 bg-oakland-paper/80' : 'border-white/5 bg-black/20'} backdrop-blur-xl transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col -space-y-1">
              <span className={`text-xl font-black tracking-tighter ${view === 'hub' ? 'text-oakland-ink' : 'text-white'}`}>3875 RUBY</span>
              <span className={`text-[8px] font-bold ${view === 'hub' ? 'text-oakland-terracotta' : 'text-irish-green'} uppercase tracking-[0.2em]`}>Oakland Soul</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {view === 'hub' ? (
              <>
                <a href="#about" className="text-oakland-ink/60 hover:text-oakland-ink transition-colors">About</a>
                <a href="#amenities" className="text-oakland-ink/60 hover:text-oakland-ink transition-colors">Amenities</a>
                <a href="#neighborhood" className="text-oakland-ink/60 hover:text-oakland-ink transition-colors">Neighborhood</a>
                <a href="#gallery" className="text-oakland-ink/60 hover:text-oakland-ink transition-colors">Gallery</a>
              </>
            ) : (
              <>
                <a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a>
                <a href="#intelligence" className="text-zinc-400 hover:text-white transition-colors">Intelligence</a>
                <a href="#rent-roll" className="text-zinc-400 hover:text-white transition-colors">Rent Roll</a>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className={`flex p-1 rounded-full ${view === 'hub' ? 'bg-oakland-ink/5' : 'bg-white/5'} border ${view === 'hub' ? 'border-oakland-ink/10' : 'border-white/10'}`}>
              <button 
                onClick={() => setView('hub')}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  view === 'hub' 
                  ? 'bg-oakland-terracotta text-white shadow-lg' 
                  : view === 'admin' ? 'text-zinc-500 hover:text-white' : 'text-oakland-ink/40 hover:text-oakland-ink'
                }`}
              >
                Hub
              </button>
              <button 
                onClick={() => setView('admin')}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  view === 'admin' 
                  ? 'bg-oakland-terracotta text-white shadow-lg' 
                  : view === 'hub' ? 'text-oakland-ink/40 hover:text-oakland-ink' : 'text-zinc-500 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            <button className={`md:hidden p-2 ${view === 'hub' ? 'text-oakland-ink' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            className={`fixed inset-0 z-40 pt-24 px-6 ${view === 'hub' ? 'bg-oakland-paper text-oakland-ink' : 'bg-zinc-950 text-white'} md:hidden`}
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
            <section className="relative h-[85vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop" 
                  alt="3875 Ruby Street - Authentic 1924 Oakland Architecture" 
                  className="w-full h-full object-cover grayscale-[0.2] brightness-[0.7]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-oakland-paper/30 to-oakland-paper"></div>
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="max-w-4xl"
                >
                  <h1 className="text-6xl md:text-9xl font-sans font-black tracking-tighter leading-[0.9] text-white drop-shadow-2xl uppercase">
                    3875 RUBY <br /> STREET.
                  </h1>
                  <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="text-xl md:text-3xl font-serif italic text-white/90 max-w-2xl">
                      Authentic 1924 Architecture. <br className="hidden md:block" />
                      Home to Hipsters, Trans, and Every Culture.
                    </div>
                    <div className="h-px flex-grow bg-white/30 hidden md:block"></div>
                    <div className="flex gap-4">
                      <button className="px-8 py-4 bg-oakland-terracotta text-white font-bold rounded-full hover:scale-105 transition-transform">
                        See Units & Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
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
                    className="p-8 rounded-[2rem] bg-white border border-oakland-ink/5 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-oakland-ink/60 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* The Vibe Section */}
            <section id="about" className="py-32 bg-oakland-olive/5">
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
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-oakland-terracotta rounded-[2rem] p-8 text-white flex flex-col justify-end shadow-xl hidden md:flex">
                    <History className="w-10 h-10 mb-4" />
                    <div className="text-sm font-bold uppercase tracking-widest">Built 1924</div>
                    <div className="text-2xl font-serif italic">A Century of Soul.</div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="text-xs font-bold text-oakland-terracotta uppercase tracking-[0.3em]">The Vision</div>
                  <h2 className="text-5xl md:text-7xl font-serif font-black leading-tight">
                    Historic Charm. <br /> Modern <span className="italic text-oakland-olive">Utility</span>.
                  </h2>
                  <p className="text-xl text-oakland-ink/70 leading-relaxed font-light">
                    3875 Ruby Street is a living testament to Oakland's diverse history. This 24-unit, 3-story building preserves its 1924 architectural soul while fostering a community that celebrates every culture. From secure Amazon Hubs to the vibrant Mosswood vibe, this is authentic Oakland living.
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                    <div>
                      <div className="text-4xl font-serif font-bold text-oakland-terracotta">24</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-oakland-ink/40 mt-2">Boutique Units</div>
                    </div>
                    <div>
                      <div className="text-4xl font-serif font-bold text-oakland-terracotta">3</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-oakland-ink/40 mt-2">Stories</div>
                    </div>
                    <div>
                      <div className="text-4xl font-serif font-bold text-oakland-terracotta">100%</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-oakland-ink/40 mt-2">Oakland Owned</div>
                    </div>
                    <div>
                      <div className="text-4xl font-serif font-bold text-oakland-terracotta">94/100</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-oakland-ink/40 mt-2">Walk Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities Grid */}
            <section id="amenities" className="py-32 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-20 space-y-4">
                <h2 className="text-5xl font-serif font-black">Life at <span className="italic text-oakland-terracotta">Ruby</span>.</h2>
                <p className="text-oakland-ink/50 max-w-xl mx-auto">Everything you need to thrive in the heart of the city.</p>
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
                  <div key={item.title} className="p-10 rounded-[2.5rem] bg-oakland-paper border border-oakland-ink/5 hover:border-oakland-terracotta/20 transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-oakland-olive/10 flex items-center justify-center mb-8 group-hover:bg-oakland-terracotta/10 transition-colors">
                      <item.icon className="w-7 h-7 text-oakland-olive group-hover:text-oakland-terracotta transition-colors" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                    <p className="text-oakland-ink/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-32 bg-oakland-ink text-oakland-paper overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-oakland-terracotta uppercase tracking-[0.3em]">Visual Story</div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black">Ruby <span className="italic text-oakland-olive">Gallery</span>.</h2>
                  </div>
                  <p className="text-oakland-paper/50 max-w-md">A collection of moments and details that define our corner of Oakland.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 group relative overflow-hidden rounded-[3rem]">
                    <img 
                      src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop" 
                      alt="Building Exterior" 
                      className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-oakland-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
                      <div className="text-2xl font-serif italic">Classic Oakland Architecture</div>
                    </div>
                  </div>
                  <div className="md:col-span-4 grid grid-rows-2 gap-6">
                    <div className="group relative overflow-hidden rounded-[2.5rem]">
                      <img 
                        src="https://images.unsplash.com/photo-1502082553245-f0bc5a63e44e?q=80&w=600&auto=format&fit=crop" 
                        alt="Mosswood Park Detail" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="group relative overflow-hidden rounded-[2.5rem]">
                      <img 
                        src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop" 
                        alt="Local Coffee Culture" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Neighborhood Pride */}
            <section id="neighborhood" className="py-32 border-t border-oakland-ink/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                  <div className="space-y-8">
                    <div className="text-xs font-bold text-oakland-terracotta uppercase tracking-[0.3em]">The Neighborhood</div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black leading-tight">
                      Oakland Soul. <br /> <span className="italic text-oakland-terracotta">Unfiltered</span>.
                    </h2>
                    <p className="text-xl text-oakland-ink/70 leading-relaxed font-light">
                      Since 1924, 3875 Ruby Street has stood at the crossroads of Oakland's most vibrant evolution. This isn't just a place to live; it's a front-row seat to the city's beating heart. We are a community where hipsters, trans activists, and families from every culture converge to create something uniquely Oakland.
                    </p>
                    <p className="text-lg text-oakland-ink/60 leading-relaxed">
                      Located in the historic Mosswood district, you're perfectly positioned between the high-energy transit of MacArthur BART and the essential care of the city's major medical hubs. Whether you're catching a train to the city or walking to work at Kaiser, everything is within reach.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop" 
                        alt="Oakland Streets" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2rem] shadow-xl max-w-xs border border-oakland-ink/5">
                      <div className="text-3xl font-serif font-bold text-oakland-terracotta mb-2">94</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-oakland-ink/40">Walk Score</div>
                      <p className="text-xs text-oakland-ink/60 mt-2 italic">"A walker's paradise in the heart of the East Bay."</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { name: 'Mosswood Park', type: 'Recreation', img: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=800&auto=format&fit=crop' },
                    { name: 'MacArthur BART', type: 'Transit Hub', img: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=800&auto=format&fit=crop' },
                    { name: 'Medical District', type: 'Essential', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop' },
                  ].map((spot) => (
                    <div key={spot.name} className="group cursor-pointer">
                      <div className="aspect-video rounded-[2rem] overflow-hidden mb-6">
                        <img 
                          src={spot.img} 
                          alt={spot.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-xs font-bold text-oakland-terracotta uppercase tracking-widest mb-2">{spot.type}</div>
                      <h3 className="text-2xl font-serif font-bold">{spot.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-oakland-ink/5 bg-oakland-paper">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-2 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-oakland-terracotta" />
                    <span className="text-3xl font-serif font-black tracking-tighter">3875 RUBY</span>
                  </div>
                  <p className="text-oakland-ink/50 max-w-sm leading-relaxed">
                    A boutique residential community in the heart of Oakland. Managed with soul, powered by intelligence.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-oakland-ink/40">Navigation</div>
                  <ul className="space-y-4 text-sm font-medium">
                    <li><a href="#" className="hover:text-oakland-terracotta transition-colors">Available Units</a></li>
                    <li><a href="#" className="hover:text-oakland-terracotta transition-colors">Tenant Portal</a></li>
                    <li><a href="#" className="hover:text-oakland-terracotta transition-colors">Maintenance Request</a></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-oakland-ink/40">Contact</div>
                  <ul className="space-y-4 text-sm font-medium">
                    <li>hello@3875ruby.com</li>
                    <li>(510) 555-0123</li>
                    <li>Oakland, CA 94609</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-oakland-ink/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-[0.5em] font-mono">
                  © 2026 RENT DMC TECHNOLOGIES. OAKLAND SOUL.
                </div>
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/30">
                  <a href="#">Privacy</a>
                  <a href="#">Terms</a>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-oakland-paper pt-32 pb-20 px-6"
          >
            <div className="max-w-7xl mx-auto">
              {/* Portal Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-serif font-black text-oakland-ink">Tenant & Admin Portal</h2>
                  <p className="text-oakland-ink/50 mt-2">Secure management for 3875 Ruby Street.</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard.writeText(url);
                      alert('Link copied! Ready to share with your team.');
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-oakland-ink/10 rounded-full font-bold text-sm hover:bg-oakland-ink hover:text-white transition-all shadow-sm"
                  >
                    <Share2 className="w-4 h-4" /> Share Hub
                  </button>
                  <button className="px-6 py-3 bg-oakland-terracotta text-white rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-md">
                    Download Report
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { label: 'Total Revenue', value: '$42,850', trend: '+12.5%', icon: DollarSign, color: 'text-emerald-600' },
                  { label: 'Occupancy Rate', value: '98.2%', trend: '+2.1%', icon: Users, color: 'text-blue-600' },
                  { label: 'Maintenance Tasks', value: '4', trend: '-2', icon: Activity, color: 'text-orange-600' },
                ].map((stat) => (
                  <div key={stat.label} className="p-8 rounded-[2rem] bg-white border border-oakland-ink/5 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-2xl bg-oakland-ink/5">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
                    </div>
                    <div className="text-sm font-bold text-oakland-ink/40 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-4xl font-serif font-bold mt-2">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Main Portal Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-serif font-bold">Revenue Intelligence</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-oakland-terracotta"></div>
                      <div className="w-3 h-3 rounded-full bg-oakland-olive"></div>
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

                <div className="p-10 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm">
                  <h3 className="text-2xl font-serif font-bold mb-8">Recent Activity</h3>
                  <div className="space-y-6">
                    {[
                      { user: 'Unit 4B', action: 'Rent Payment Received', time: '2 hours ago', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
                      { user: 'Unit 2A', action: 'Maintenance Request: Sink', time: '5 hours ago', icon: Activity, color: 'bg-orange-50 text-orange-600' },
                      { user: 'System', action: 'New Lease Generated: 3C', time: '1 day ago', icon: FileText, color: 'bg-blue-50 text-blue-600' },
                      { user: 'Unit 1A', action: 'Package Delivered to Hub', time: '1 day ago', icon: Package, color: 'bg-purple-50 text-purple-600' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-oakland-ink/5 transition-colors cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <activity.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <div className="font-bold text-oakland-ink">{activity.user}</div>
                          <div className="text-sm text-oakland-ink/50">{activity.action}</div>
                        </div>
                        <div className="text-xs font-bold text-oakland-ink/30 uppercase tracking-widest">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portal Navigation Tabs */}
              <div className="flex gap-8 border-b border-oakland-ink/5 mb-12">
                <button 
                  onClick={() => setAdminTab('rent-roll')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${adminTab === 'rent-roll' ? 'text-oakland-terracotta' : 'text-oakland-ink/40 hover:text-oakland-ink'}`}
                >
                  Rent Roll
                  {adminTab === 'rent-roll' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-oakland-terracotta" />}
                </button>
                <button 
                  onClick={() => setAdminTab('maintenance')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${adminTab === 'maintenance' ? 'text-oakland-terracotta' : 'text-oakland-ink/40 hover:text-oakland-ink'}`}
                >
                  Maintenance Pipeline
                  {adminTab === 'maintenance' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-oakland-terracotta" />}
                </button>
              </div>

              {/* Dynamic Admin Content */}
              {adminTab === 'rent-roll' ? (
                <section id="rent-roll" className="py-12">
                  <div className="mb-12 space-y-4">
                    <h2 className="text-4xl font-bold text-oakland-ink font-serif">Your <span className="italic">Intelligent</span> Rent Roll.</h2>
                    <p className="text-oakland-ink/50 max-w-xl font-medium">Real-time management of your property portfolio with integrated financial tracking.</p>
                  </div>
                  <RentRollDashboard />
                </section>
              ) : (
                <section id="maintenance" className="py-12">
                  <MaintenanceModule />
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
        )}
      </AnimatePresence>
    </div>
  );
}
