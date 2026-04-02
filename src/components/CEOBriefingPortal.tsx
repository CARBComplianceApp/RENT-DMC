import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Scale, TrendingUp, ChevronRight, Plus, Download, Search, Info } from 'lucide-react';

interface LegalForm {
  id: number;
  title: string;
  category: string;
  content_template: string;
}

interface Law {
  id: number;
  title: string;
  jurisdiction: string;
  summary: string;
  link: string;
  last_updated: string;
}

interface MarketComp {
  id: number;
  property_name: string;
  address: string;
  sale_price: number;
  rental_rate: number;
  occupancy_rate: number;
  distance_miles: number;
  last_updated: string;
}

export function CEOBriefingPortal() {
  const [activeTab, setActiveTab] = useState<'forms' | 'laws' | 'market'>('forms');
  const [forms, setForms] = useState<LegalForm[]>([]);
  const [laws, setLaws] = useState<Law[]>([]);
  const [marketComps, setMarketComps] = useState<MarketComp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formsRes, lawsRes, marketRes] = await Promise.all([
          fetch('/api/legal-forms'),
          fetch('/api/laws-regulations'),
          fetch('/api/market-comparables')
        ]);
        
        setForms(await formsRes.json());
        setLaws(await lawsRes.json());
        setMarketComps(await marketRes.json());
      } catch (error) {
        console.error('Error fetching CEO portal data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-12 text-center text-app-text/40">Loading Briefing Data...</div>;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="text-xs font-bold text-app-accent uppercase tracking-[0.3em]">Executive Suite</div>
          <h2 className="text-5xl font-serif font-black text-app-text">CEO <span className="italic text-app-accent">Briefing</span> Portal.</h2>
        </div>
        
        <div className="flex p-1 bg-app-text/5 rounded-full border border-app-border">
          {(['forms', 'laws', 'market'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                activeTab === tab ? 'bg-app-accent text-white shadow-lg' : 'text-app-text/40 hover:text-app-text'
              }`}
            >
              {tab === 'forms' ? 'Legal Forms' : tab === 'laws' ? 'Laws & Regs' : 'Market Data'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === 'forms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {forms.map((form) => (
              <div key={form.id} className="p-8 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-app-text/5 group-hover:bg-app-accent/10 transition-colors">
                    <FileText className="w-6 h-6 text-app-text group-hover:text-app-accent transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">{form.category}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-app-text">{form.title}</h3>
                <p className="text-app-text/50 text-sm line-clamp-2 mb-8">{form.content_template}</p>
                <div className="flex gap-4">
                  <button className="flex-grow py-4 bg-app-text text-app-bg rounded-full text-xs font-bold uppercase tracking-widest hover:bg-app-accent hover:text-white transition-colors">
                    Create Notice
                  </button>
                  <button className="p-4 bg-app-text/5 rounded-full hover:bg-app-text/10 transition-colors text-app-text">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button className="p-8 rounded-[2.5rem] border-2 border-dashed border-app-border flex flex-col items-center justify-center gap-4 hover:border-app-accent/40 transition-all group">
              <div className="w-12 h-12 rounded-full bg-app-text/5 flex items-center justify-center group-hover:bg-app-accent/10">
                <Plus className="w-6 h-6 text-app-text/40 group-hover:text-app-accent" />
              </div>
              <span className="text-xs font-bold text-app-text/40 uppercase tracking-widest">Add New Template</span>
            </button>
          </motion.div>
        )}

        {activeTab === 'laws' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {laws.map((law) => (
              <div key={law.id} className="p-8 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="p-6 rounded-3xl bg-app-accent/10">
                  <Scale className="w-8 h-8 text-app-accent" />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-serif font-bold text-app-text">{law.title}</h3>
                    <span className="px-3 py-1 bg-app-text/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-app-text/40">{law.jurisdiction}</span>
                  </div>
                  <p className="text-app-text/60 leading-relaxed">{law.summary}</p>
                  <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">Last Updated: {law.last_updated}</div>
                </div>
                <a 
                  href={law.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-app-text/5 hover:bg-app-text hover:text-app-bg rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 text-app-text"
                >
                  Full Text <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'market' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {marketComps.map((comp) => (
                <div key={comp.id} className="p-8 rounded-[3rem] bg-app-card border border-app-border shadow-sm overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8">
                    <TrendingUp className="w-12 h-12 text-app-accent/10 group-hover:text-app-accent/20 transition-colors" />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-app-text">{comp.property_name}</h3>
                      <p className="text-app-text/40 text-sm">{comp.address}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-app-text/5">
                        <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest mb-1">Sale Price</div>
                        <div className="text-lg font-serif font-bold text-app-text">${(comp.sale_price / 1000000).toFixed(1)}M</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-app-text/5">
                        <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest mb-1">Rent/Unit</div>
                        <div className="text-lg font-serif font-bold text-app-text">${comp.rental_rate}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-app-text/5">
                        <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest mb-1">Occupancy</div>
                        <div className="text-lg font-serif font-bold text-app-text">{(comp.occupancy_rate * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-app-border">
                      <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">{comp.distance_miles} miles away</div>
                      <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">Updated: {comp.last_updated}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-12 rounded-[3rem] bg-app-text text-app-bg flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-serif font-bold italic">Market Opportunity Analysis</h3>
                <p className="text-app-bg/50 max-w-md">Your portfolio is currently performing 12% above the neighborhood average in occupancy, with a 4.2% higher rental yield.</p>
              </div>
              <button className="px-12 py-6 bg-app-accent text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                Generate Full Market Report
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
