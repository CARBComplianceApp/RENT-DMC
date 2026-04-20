import React from 'react';
import { 
  Hospital, 
  ShieldCheck, 
  Heart, 
  FileText, 
  ClipboardCheck, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Check, 
  ArrowLeft,
  X,
  Stethoscope,
  Building,
  User,
  Users,
  Calendar,
  Briefcase,
  Download,
  Waves,
  Moon
} from 'lucide-react';

interface TravelNursePortalProps {
  onBack: () => void;
}

export const TravelNursePortal: React.FC<TravelNursePortalProps> = ({ onBack }) => {
  const hospitals = [
    { name: "Kaiser Permanente Oakland", dist: "0.4 miles", time: "3 min" },
    { name: "Summit Medical Center", dist: "0.8 miles", time: "5 min" },
    { name: "Alta Bates Highland", dist: "1.2 miles", time: "7 min" },
    { name: "Benioff Children's Hospital", dist: "1.5 miles", time: "8 min" }
  ];

  return (
    <div className="min-h-screen bg-[#071121] text-white font-sans">
      {/* Header */}
      <div className="bg-cyan-500 text-[#071121] py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">travel.rent-ruby.com</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[9px] font-black uppercase tracking-widest">
              <Heart className="w-3 h-3 animate-pulse" /> Verified Medical Housing provider
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black italic leading-tight">
              Nest <span className="text-cyan-400">Nurse</span> // 3875 Ruby
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              Mission-critical housing located in the heart of Oakland's Medical District. Designed for the professionals who keep our community healthy.
            </p>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Proximity */}
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-2xl">
                  <Hospital className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold italic">Hospital Proximity</h3>
              </div>
              <div className="space-y-4">
                {hospitals.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-4 rounded-xl transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white/90">{h.name}</span>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">Verified Landmark</span>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 text-sm font-bold uppercase tracking-tight">{h.dist}</div>
                      <div className="text-[9px] text-white/30 uppercase font-black tracking-widest">3 min drive</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flexible Leasing */}
            <div className="p-10 rounded-[3rem] bg-cyan-500 text-[#071121] space-y-8 shadow-2xl shadow-cyan-500/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#071121]/10 rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold italic">Contract-Friendly</h3>
              </div>
              <div className="space-y-6">
                <p className="text-lg font-bold leading-relaxed opacity-90 italic">
                  "The Nurse Clause" - Every lease includes a 30-day cancellation privilege for hospital-side contract terminations.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "13-Week Standard Terms",
                    "Month-to-Month Extensions",
                    "Zero-Penalty Early Move-Out",
                    "Direct Billing for Agency Stays"
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-[#071121]/10 p-4 rounded-2xl">
                      <ShieldCheck className="w-4 h-4 shrink-0" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Unit Features */}
          <div className="p-12 rounded-[4rem] border border-white/10 bg-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Moon className="w-8 h-8 text-cyan-400" />
              <h4 className="text-xl font-serif font-bold tracking-tight">Silent Zone Protocol</h4>
              <p className="text-sm text-white/40 leading-relaxed uppercase tracking-widest font-bold">100% Blackout Curtains and Soundproof Glass standard in every suite.</p>
            </div>
            <div className="space-y-4">
              <Waves className="w-8 h-8 text-cyan-400" />
              <h4 className="text-xl font-serif font-bold tracking-tight">Move-In Ready</h4>
              <p className="text-sm text-white/40 leading-relaxed uppercase tracking-widest font-bold">Memory foam mattresses, medical-grade sanitization, and full high-speed mesh Wi-Fi.</p>
            </div>
            <div className="space-y-4">
              <MapPin className="w-8 h-8 text-cyan-400" />
              <h4 className="text-xl font-serif font-bold tracking-tight">The 94609 Hub</h4>
              <p className="text-sm text-white/40 leading-relaxed uppercase tracking-widest font-bold">A 10-minute walk to BART and Piedmont Avenue dining scene.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="text-[10px] font-black uppercase tracking-[0.4em]">RUBY // MEDICAL DISTRICT</div>
          <div className="flex items-center gap-2 font-serif italic text-sm">
             Verified Travel Housing Provider
          </div>
        </div>
      </div>
    </div>
  );
};
