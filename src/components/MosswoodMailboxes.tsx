import React from 'react';
import { motion } from 'motion/react';
import { Mail, TreePine, Sun, Wind, Cloud } from 'lucide-react';

export const MosswoodMailboxes: React.FC = () => {
  const mailboxes = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    label: `Unit 0${i + 1}`
  }));

  return (
    <section id="mosswood-mailboxes" className="py-32 bg-white relative overflow-hidden">
      {/* Subtle bright environmental background elements */}
      <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
        <Sun className="w-64 h-64 text-amber-400" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 pointer-events-none">
        <Cloud className="w-48 h-48 text-sky-400" />
      </div>
      <div className="absolute top-40 left-40 opacity-5 pointer-events-none">
        <Wind className="w-32 h-32 text-teal-400" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="text-center mb-20 space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">
            <TreePine className="w-3 h-3" /> Mosswood Community
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-slate-900 leading-tight">
            Bright, Open & <span className="italic text-emerald-500">Connected</span>.
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Step outside into the California sun. Our central courtyard brings the community together in a clean, positive space inspired by Mosswood Park.
          </p>
        </div>

        {/* Circular Arrangement */}
        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
          {/* Center Park Element */}
          <div className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-emerald-50 border-8 border-white shadow-xl flex flex-col items-center justify-center z-20 space-y-2">
            <TreePine className="w-12 h-12 text-emerald-500" />
            <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest text-center">
              Mosswood<br/>Atrium
            </div>
          </div>

          {/* Mailboxes in a circle */}
          <div className="absolute inset-0 pointer-events-none">
            {mailboxes.map((mb, i) => {
              // Calculate position in circle
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  key={mb.id}
                  className="absolute pointer-events-auto"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${mb.angle}deg) translateY(-220px) rotate(-${mb.angle}deg)`,
                  }}
                >
                  <div className="group relative flex flex-col items-center gap-3 cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-md border-2 border-slate-100 flex items-center justify-center group-hover:border-emerald-400 group-hover:shadow-emerald-100 group-hover:-translate-y-2 transition-all duration-300">
                      <Mail className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                      {mb.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative Connecting Ring */}
          <div className="absolute inset-0 m-auto w-[440px] h-[440px] rounded-full border border-emerald-100 border-dashed animate-[spin_60s_linear_infinite]" />
        </div>
      </div>
    </section>
  );
};
