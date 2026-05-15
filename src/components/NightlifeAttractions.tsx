import React from 'react';
import { motion } from 'motion/react';
import { Music, GlassWater, Trophy, Camera, Star, Zap } from 'lucide-react';

const attractions = [
  {
    name: "The Fox Theater",
    category: "Entertainment",
    dist: "0.8 mi",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop",
    desc: "Historic live music venue & architectural gem.",
    icon: Music,
    isMajor: true
  },
  {
    name: "Lake Merritt",
    category: "Nature & City Pulse",
    dist: "1.2 mi",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop",
    desc: "The 'Jewel of Oakland' - 3 miles of scenic shoreline.",
    icon: Camera,
    isMajor: true
  },
  {
    name: "Telegraph Ave",
    category: "Nightlife Hub",
    dist: "0.7 mi",
    image: "https://images.unsplash.com/photo-1514525253361-bee243870eb2?q=80&w=800&auto=format&fit=crop",
    desc: "Vibrant bars, late-night bites, and street art.",
    icon: GlassWater
  },
  {
    name: "Oakland Coliseum",
    category: "Major Events",
    dist: "5.2 mi",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    desc: "Home to epic concerts and sporting spectacles.",
    icon: Trophy
  }
];

export const NightlifeAttractions = () => {
  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-app-accent/20 border border-app-accent/40 rounded-full text-app-accent text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Zap className="w-3 h-3" /> The City Pulse
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
              Oakland <br />
              <span className="italic text-app-accent">After Dark</span>.
            </h2>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em] max-w-sm ml-auto">
              From historic theaters to lakeside walks, the best of the city orbits around Ruby.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {attractions.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/5"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent group-hover:from-app-accent/80 transition-all duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white font-serif italic text-xl">{item.dist}</div>
                </div>
                
                <div>
                  <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">{item.category}</div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight group-hover:tracking-normal transition-all">{item.name}</h3>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                </div>

                <button className="w-full py-4 bg-white text-zinc-950 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
                  Get Directions
                </button>
              </div>

              {/* Hover Badge */}
              <div className="absolute top-8 left-8">
                {item.isMajor && (
                  <div className="px-3 py-1 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl">
                    Iconic
                  </div>
                )}
              </div>
              
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-3 bg-app-accent rounded-full text-white shadow-2xl">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big Attraction Callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-app-accent via-ruby to-zinc-950 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <Music className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase mb-8">
              "Big City Energy, <br />
              <span className="text-white/40 italic">Ruby Soul.</span>"
            </h3>
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-10">
              Living at Ruby means you're never more than a few minutes from the pulse of the Bay. Whether it's a sold-out show at the Fox or a crisp morning at the Lake, your orbit is perfectly centered.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                94 Walk Score
              </div>
              <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                88 Transit Score
              </div>
              <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                Unlimited Nights Out
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
