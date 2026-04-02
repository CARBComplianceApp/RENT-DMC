import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  CreditCard,
  BarChart3,
  Wrench,
  X,
  ArrowRight
} from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  content: string[];
  icon: any;
  image: string;
  color: string;
}

const slides: Slide[] = [
  {
    title: "The Ecosystem",
    subtitle: "A Unified Vision for 3875 Ruby",
    content: [
      "Homepage: A cinematic entry point for owners, tenants, and prospects.",
      "Stakeholder Alignment: Features tailored for every role in the portfolio.",
      "Brand Identity: Consistent 'Ruby' aesthetic across all touchpoints."
    ],
    icon: Users,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    color: "#9B111E"
  },
  {
    title: "Tenant Portal",
    subtitle: "The 'Stadium Hub' Experience",
    content: [
      "Immersive UI: Giants stadium theme behind home plate for the Mailbox Hub.",
      "Self-Service: Maintenance reporting, rent payments, and lease updates.",
      "Customization: Tenants can personalize their digital unit identity."
    ],
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
    color: "#9B111E"
  },
  {
    title: "Owner Features",
    subtitle: "Real-Time Portfolio Intelligence",
    content: [
      "CEO Briefing: High-level metrics on ROI, occupancy, and liquidity.",
      "AI Lease Generator: Legally vetted templates generated in seconds.",
      "Market Max: Neighborhood data driving strategic rent adjustments."
    ],
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    color: "#9B111E"
  },
  {
    title: "Rent Roll Precision",
    subtitle: "Automated Collection & Reporting",
    content: [
      "Dynamic Rent Roll: Real-time status of every unit in the portfolio.",
      "SF Plus: Direct bank sync for automated transaction matching.",
      "Late Fee Automation: Instant $50 application for overdue accounts."
    ],
    icon: CreditCard,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200",
    color: "#9B111E"
  },
  {
    title: "Legal Defense",
    subtitle: "Chain of Custody Tracking",
    content: [
      "Audit Trail: Every notice tracked with IP and Timestamp verification.",
      "Compliance Shield: Automated updates for 2026 Oakland Rent Laws.",
      "Verified Defense: Legally binding digital signatures and read receipts."
    ],
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200",
    color: "#9B111E"
  }
];

export const OwnerPresentation = ({ onClose }: { onClose: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1);
  const prev = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1);

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-[200] bg-[#0B1A2D] flex flex-col">
      <div className="absolute top-8 right-8 z-10">
        <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        {/* Visual Side */}
        <div className="w-full lg:w-1/2 relative h-64 lg:h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={slide.image}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover grayscale brightness-50"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A2D] via-transparent to-transparent hidden lg:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2D] via-transparent to-transparent lg:hidden"></div>
          
          <div className="absolute bottom-12 left-12 hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <slide.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
                Slide {currentSlide + 1} of {slides.length}
              </div>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
                  <div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  className="h-1.5 bg-[#9B111E] mb-8 rounded-full"
                />
                <h2 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                  {slide.title.split(' ').map((word, i) => (
                    <span key={i} className={i === slide.title.split(' ').length - 1 ? "text-[#9B111E]" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>
                <p className="text-2xl lg:text-3xl font-serif italic text-white/60 mt-6">
                  {slide.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                {slide.content.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="mt-2 w-2 h-2 rounded-full bg-[#9B111E] shrink-0 group-hover:scale-150 transition-transform" />
                    <p className="text-xl text-white/80 font-light leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {currentSlide === slides.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onClose}
                  className="px-12 py-6 bg-[#9B111E] text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-4"
                >
                  Launch Platform <ArrowRight className="w-6 h-6" />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="p-8 lg:p-12 border-t border-white/5 flex justify-between items-center bg-[#0B1A2D]">
        <div className="flex gap-4">
          <button 
            onClick={prev} 
            disabled={currentSlide === 0}
            className="p-4 rounded-full border border-white/10 text-white disabled:opacity-20 hover:bg-white/5 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next} 
            disabled={currentSlide === slides.length - 1}
            className="p-4 rounded-full border border-white/10 text-white disabled:opacity-20 hover:bg-white/5 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-12 bg-[#9B111E]' : 'w-3 bg-white/10'}`}
            />
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Owner Vision Deck</div>
            <div className="text-xs font-black text-white uppercase tracking-tighter">3875 Ruby // 2026</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#9B111E] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
