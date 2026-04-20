import React from 'react';
import { motion } from 'motion/react';
import { 
  Hospital, 
  ShieldCheck, 
  Moon, 
  Clock, 
  Coffee, 
  MapPin, 
  Zap, 
  Camera,
  Heart,
  Stethoscope,
  Briefcase
} from 'lucide-react';

interface TravelingNurseHeroProps {
  onClaim?: () => void;
}

export const TravelingNurseHero: React.FC<TravelingNurseHeroProps> = ({ onClaim }) => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#0A192F]">
      {/* Healing Pulse Background Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2D6A4F_0%,_transparent_70%)] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/10 rounded-full animate-ping [animation-duration:4s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/5 rounded-full animate-ping [animation-duration:6s]"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-12 h-full w-full">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-500/10"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 rounded-full">
              <Heart className="w-3 h-3 animate-pulse" /> Sanitized & Ready // Health District
            </div>
            
            <h1 className="text-7xl md:text-[8rem] font-sans font-black tracking-tighter leading-[0.85] text-white drop-shadow-2xl">
              NEST <br /> <span className="text-cyan-400 italic font-serif">NURSE.</span>
            </h1>
            
            <div className="mt-12 text-2xl md:text-5xl font-serif italic text-white/90 max-w-2xl leading-tight">
              A Sanctuary for <span className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-8">Oakland's</span> Frontline Pioneers.
            </div>
            
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { icon: Hospital, label: '3m to Kaiser' },
                { icon: Moon, label: 'Noise Neutral' },
                { icon: ShieldCheck, label: 'Secure Access' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div className="p-2 bg-cyan-500/20 rounded-xl text-cyan-400">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <button 
                onClick={onClaim}
                className="px-12 py-5 bg-cyan-500 text-[#0A192F] font-black text-sm uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-xl shadow-cyan-500/20"
              >
                Claim Nurse Suite
              </button>
              <div className="flex items-center gap-4 px-8 py-5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">
                  Available for <br /> <span className="text-emerald-400 text-xs font-black">Travel Contract 2026</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visualization of the "Quiet Suite" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="hidden lg:block relative h-[650px] w-full rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 bg-[#061121]"
          >
            <div className="absolute inset-0 z-0">
               <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200&auto=format&fit=crop" 
                alt="Zen Apartment Interior" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent"></div>
            </div>

            <div className="absolute top-10 right-10 flex gap-3">
              <div className="px-4 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Top Rated
              </div>
            </div>

            <div className="absolute bottom-12 left-12 right-12">
              <div className="grid grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                  <div className="flex -space-x-3 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-zinc-800 overflow-hidden">
                        <img src={`https://picsum.photos/seed/nurse${i}/100/100`} alt="Nurse" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[#0A192F] bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-[#0A192F]">
                      +12
                    </div>
                  </div>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Medical Professional Network</div>
                  <h3 className="text-3xl font-serif italic text-white">"Finally a place that understands my shifts."</h3>
                </div>
                
                <div className="flex flex-col items-end gap-6">
                  <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full">
                    <div className="flex items-center gap-4 mb-3">
                      <Stethoscope className="w-5 h-5 text-cyan-400" />
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Amenities Log</span>
                    </div>
                    <ul className="space-y-2">
                       <li className="flex items-center gap-2 text-xs font-bold text-white/80">
                         <Zap className="w-3 h-3 text-cyan-400" /> Blackout Curtains
                       </li>
                       <li className="flex items-center gap-2 text-xs font-bold text-white/80">
                         <Zap className="w-3 h-3 text-cyan-400" /> Post-Shift Coffee Bar
                       </li>
                       <li className="flex items-center gap-2 text-xs font-bold text-white/80">
                         <Zap className="w-3 h-3 text-cyan-400" /> Yoga & Zen Room
                       </li>
                    </ul>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center border-4 border-white/10 shadow-2xl animate-bounce">
                    <Briefcase className="w-8 h-8 text-[#0A192F]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
