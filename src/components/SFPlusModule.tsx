import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Upload, CheckCircle, XCircle, Search, FileSpreadsheet, ArrowRight, ShieldCheck } from 'lucide-react';

interface Transaction {
  id: number;
  transaction_date: string;
  description: string;
  amount: number;
  matched_unit_id: number | null;
  status: 'Matched' | 'Unmatched' | 'Ignored';
}

export function SFPlusModule() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState<number | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/bank-transactions');
      setTransactions(await res.json());
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async (transactionId: number, unitId: number) => {
    setMatching(transactionId);
    try {
      await fetch('/api/bank-transactions/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, unitId })
      });
      await fetchTransactions();
    } catch (error) {
      console.error('Error matching transaction:', error);
    } finally {
      setMatching(null);
    }
  };

  if (loading) return <div className="p-12 text-center text-oakland-ink/40">Connecting to Chase Bank...</div>;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="text-xs font-bold text-oakland-terracotta uppercase tracking-[0.3em]">SF Plus Integration</div>
          <h2 className="text-5xl font-serif font-black">Chase <span className="italic text-oakland-terracotta">Direct</span> Deposit.</h2>
        </div>
        
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white border border-oakland-ink/10 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-oakland-ink hover:text-white transition-all shadow-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Import CSV
          </button>
          <button className="px-8 py-4 bg-oakland-terracotta text-white rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-md flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Sync Chase Bank
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif font-bold italic">Transaction Feed</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-oakland-ink/30" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="pl-12 pr-6 py-3 bg-oakland-ink/5 rounded-full text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-oakland-terracotta/20 w-64"
                />
              </div>
            </div>

            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-6 rounded-3xl bg-oakland-ink/5 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-oakland-ink/5">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.status === 'Matched' ? 'bg-emerald-50 text-emerald-600' : 'bg-oakland-terracotta/10 text-oakland-terracotta'}`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-oakland-ink">{tx.description}</div>
                      <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest">{tx.transaction_date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12">
                    <div className="text-xl font-serif font-bold">${tx.amount.toFixed(2)}</div>
                    
                    {tx.status === 'Matched' ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        <CheckCircle className="w-3 h-3" /> Matched Unit {tx.matched_unit_id}
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleMatch(tx.id, 101)} // Simulation: Match to Unit 101
                        disabled={matching === tx.id}
                        className="px-6 py-3 bg-oakland-ink text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-oakland-terracotta transition-colors flex items-center gap-2"
                      >
                        {matching === tx.id ? 'Matching...' : 'Auto-Match'} <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-10 rounded-[2.5rem] bg-oakland-ink text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <ShieldCheck className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-oakland-terracotta uppercase tracking-[0.3em]">Bank Status</div>
                <h3 className="text-3xl font-serif font-bold italic">Chase Business</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">Connection</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Active</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">Last Sync</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">12 mins ago</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">Unmatched</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-oakland-terracotta">3 Items</span>
                </div>
              </div>

              <button className="w-full py-5 bg-white text-oakland-ink rounded-full text-xs font-bold uppercase tracking-widest hover:bg-oakland-terracotta hover:text-white transition-all">
                Re-Authenticate Bank
              </button>
            </div>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-oakland-paper border border-oakland-ink/5 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold italic">CSV Auto-Matching</h3>
            <p className="text-sm text-oakland-ink/50 leading-relaxed">Our AI matches bank descriptions to tenant names and unit numbers with 98.4% accuracy.</p>
            <div className="flex items-center gap-4 p-4 bg-oakland-ink/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-oakland-terracotta/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-oakland-terracotta" />
              </div>
              <div className="text-[10px] font-bold text-oakland-ink/40 uppercase tracking-widest">324 Matches this month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
