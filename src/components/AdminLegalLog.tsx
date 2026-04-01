import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Search,
  Plus,
  Eye,
  User,
  Hash,
  Calendar,
  Info
} from 'lucide-react';

interface LegalForm {
  id: number;
  title: string;
  category: string;
  content_template: string;
  created_at: string;
}

interface Law {
  id: number;
  title: string;
  jurisdiction: string;
  summary: string;
  link: string;
  last_updated: string;
}

interface Violation {
  id: number;
  tenant_id: number;
  tenant_name: string;
  unit_number: string;
  description: string;
  violation_date: string;
  photo_url?: string;
  gm_notes?: string;
  status: string;
  created_at: string;
}

interface Notice {
  id: number;
  tenant_id: number;
  tenant_name: string;
  unit_number: string;
  title: string;
  content: string;
  status: string;
  sent_at: string;
  viewed_at?: string;
  acknowledged_at?: string;
  viewed_ip?: string;
  acknowledged_ip?: string;
}

interface Tenant {
  id: number;
  name: string;
  unit_number: string;
}

interface LegalLibraryDoc {
  id: number;
  title: string;
  description: string;
  category: string;
  pdf_url?: string;
  external_link?: string;
  is_mandatory: number;
  created_at: string;
}

export const AdminLegalLog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forms' | 'laws' | 'violations' | 'notices' | 'library'>('notices');
  const [forms, setForms] = useState<LegalForm[]>([]);
  const [laws, setLaws] = useState<Law[]>([]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [library, setLibrary] = useState<LegalLibraryDoc[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ tenant_id: '', title: '', content: '' });

  useEffect(() => {
    fetchData();
    fetchTenants();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [formsRes, lawsRes, violationsRes, noticesRes, libraryRes] = await Promise.all([
        fetch('/api/legal-forms'),
        fetch('/api/laws-regulations'),
        fetch('/api/lease-violations'),
        fetch('/api/tenant-notices'),
        fetch('/api/legal-library-2026')
      ]);

      const [formsData, lawsData, violationsData, noticesData, libraryData] = await Promise.all([
        formsRes.json(),
        lawsRes.json(),
        violationsRes.json(),
        noticesRes.json(),
        libraryRes.json()
      ]);

      setForms(formsData);
      setLaws(lawsData);
      setViolations(violationsData);
      setNotices(noticesData);
      setLibrary(libraryData);
    } catch (error) {
      console.error('Error fetching legal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTenants = async () => {
    try {
      const res = await fetch('/api/rent-roll');
      const data = await res.json();
      const activeTenants = data
        .filter((u: any) => u.tenant_id && u.tenant_name)
        .map((u: any) => ({
          id: u.tenant_id,
          name: u.tenant_name,
          unit_number: u.unit_number
        }));
      setTenants(activeTenants);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const handleSendNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/tenant-notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice)
      });
      setIsNoticeModalOpen(false);
      setNewNotice({ tenant_id: '', title: '', content: '' });
      fetchData();
    } catch (error) {
      console.error('Error sending notice:', error);
    }
  };

  const tabs = [
    { id: 'notices', label: 'Tenant Notices', icon: ShieldCheck },
    { id: 'violations', label: 'Lease Violations', icon: AlertTriangle },
    { id: 'library', label: 'Legal Library 2026', icon: FileText },
    { id: 'forms', label: 'Legal Forms', icon: FileText },
    { id: 'laws', label: 'Laws & Regs', icon: Scale },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-serif font-black text-oakland-ink">Legal Defense <span className="italic text-oakland-terracotta">Log</span></h2>
          <p className="text-oakland-ink/50 mt-2 font-medium">Comprehensive compliance tracking and legal documentation.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsNoticeModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-oakland-ink/10 rounded-full font-bold text-sm hover:bg-oakland-ink hover:text-white transition-all shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" /> Send Notice
          </button>
          <button className="px-6 py-3 bg-oakland-terracotta text-white rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-md">
            Export Audit Log
          </button>
        </div>
      </div>

      {/* Send Notice Modal */}
      <AnimatePresence>
        {isNoticeModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-oakland-ink/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-oakland-ink/10"
            >
              <div className="p-8 border-b border-oakland-ink/5 bg-oakland-paper/30">
                <h3 className="text-2xl font-serif font-black text-oakland-ink">Issue Official <span className="italic text-oakland-terracotta">Notice</span></h3>
                <p className="text-xs text-oakland-ink/40 font-bold uppercase tracking-widest mt-1">Legal Defense Log Entry</p>
              </div>
              <form onSubmit={handleSendNotice} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-oakland-ink/40 uppercase tracking-widest ml-4">Recipient Tenant</label>
                  <select 
                    required
                    value={newNotice.tenant_id}
                    onChange={(e) => setNewNotice({ ...newNotice, tenant_id: e.target.value })}
                    className="w-full px-6 py-4 bg-oakland-ink/5 border border-oakland-ink/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-oakland-terracotta/20 font-bold text-oakland-ink"
                  >
                    <option value="">Select a tenant...</option>
                    {tenants.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (Unit {t.unit_number})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-oakland-ink/40 uppercase tracking-widest ml-4">Notice Title</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g., 3-Day Notice to Pay or Quit"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    className="w-full px-6 py-4 bg-oakland-ink/5 border border-oakland-ink/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-oakland-terracotta/20 font-bold text-oakland-ink"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-oakland-ink/40 uppercase tracking-widest ml-4">Notice Content</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Enter the full legal text of the notice..."
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    className="w-full px-6 py-4 bg-oakland-ink/5 border border-oakland-ink/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-oakland-terracotta/20 font-bold text-oakland-ink resize-none"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsNoticeModalOpen(false)}
                    className="flex-1 py-4 bg-oakland-ink/5 text-oakland-ink/40 font-bold uppercase tracking-widest rounded-2xl hover:bg-oakland-ink/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-oakland-terracotta text-white font-bold uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-oakland-terracotta/20"
                  >
                    Send Notice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tab Navigation */}
      <div className="flex gap-4 p-1 bg-oakland-ink/5 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-oakland-terracotta shadow-sm' 
              : 'text-oakland-ink/40 hover:text-oakland-ink'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white rounded-[2.5rem] border border-oakland-ink/5 shadow-xl overflow-hidden"
        >
          {activeTab === 'library' && (
            <div className="p-8 space-y-8">
              <div className="bg-oakland-terracotta/5 border border-oakland-terracotta/10 rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-oakland-terracotta text-white">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-black text-oakland-ink">Top 10 <span className="italic">Must-Haves</span> in Tenant Files</h4>
                    <p className="text-xs text-oakland-ink/40 font-bold uppercase tracking-widest">California 94609 Compliance Checklist</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Signed 2026 Standard Lease Agreement",
                    "Oakland RAP Notice (Mandatory)",
                    "Security Deposit Statement & Receipt",
                    "Lead-Based Paint Disclosure (Pre-1978)",
                    "Mold Disclosure Addendum",
                    "Bed Bug Information Sheet",
                    "Flood Zone Disclosure",
                    "Megan's Law Disclosure",
                    "Move-In Inspection Checklist (Signed)",
                    "Proof of Service for all Notices"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-oakland-terracotta/10 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-oakland-terracotta/10 text-oakland-terracotta flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-bold text-oakland-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {library.map((doc) => (
                  <div key={doc.id} className="p-6 rounded-[2rem] border border-oakland-ink/5 bg-oakland-paper/30 hover:border-oakland-terracotta/20 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-2xl bg-oakland-ink text-white group-hover:bg-oakland-terracotta transition-colors">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-oakland-ink/30 bg-oakland-ink/5 px-2 py-1 rounded">
                          {doc.category}
                        </span>
                        {doc.is_mandatory === 1 && (
                          <span className="text-[8px] font-bold uppercase tracking-widest text-irish-red bg-irish-red/10 px-2 py-0.5 rounded border border-irish-red/20">
                            Mandatory
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="text-lg font-serif font-bold mb-2 group-hover:text-oakland-terracotta transition-colors">{doc.title}</h4>
                    <p className="text-xs text-oakland-ink/50 line-clamp-2 mb-6 leading-relaxed">
                      {doc.description}
                    </p>
                    <div className="flex gap-2">
                      {doc.external_link && (
                        <a 
                          href={doc.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow flex items-center justify-center gap-2 py-3 bg-oakland-ink text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-oakland-terracotta transition-colors"
                        >
                          View Official <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button className="p-3 bg-oakland-ink/5 text-oakland-ink/40 rounded-xl hover:text-oakland-ink transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-oakland-ink/5 border-b border-oakland-ink/5">
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Tenant / Unit</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Notice Title</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Status</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Sent At</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-oakland-ink/5">
                  {notices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-oakland-ink/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-oakland-olive/10 flex items-center justify-center text-oakland-olive font-bold text-xs">
                            {notice.unit_number}
                          </div>
                          <div>
                            <div className="font-bold text-oakland-ink">{notice.tenant_name}</div>
                            <div className="text-xs text-oakland-ink/40">Unit {notice.unit_number}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-oakland-ink">{notice.title}</div>
                        <div className="text-xs text-oakland-ink/40 truncate max-w-[200px]">{notice.content}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          notice.status === 'Acknowledged' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          notice.status === 'Viewed' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          'bg-orange-50 text-orange-600 border border-orange-100'
                        }`}>
                          {notice.status === 'Acknowledged' && <CheckCircle2 className="w-3 h-3" />}
                          {notice.status === 'Viewed' && <Eye className="w-3 h-3" />}
                          {notice.status === 'Sent' && <Clock className="w-3 h-3" />}
                          {notice.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium text-oakland-ink">
                          {new Date(notice.sent_at).toLocaleDateString()}
                        </div>
                        <div className="text-[10px] text-oakland-ink/30 font-mono">
                          {new Date(notice.sent_at).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          {notice.viewed_at && (
                            <div className="flex items-center gap-2 text-[10px] text-oakland-ink/60">
                              <Eye className="w-3 h-3 text-blue-500" />
                              <span>Viewed: {new Date(notice.viewed_at).toLocaleString()}</span>
                              <span className="font-mono text-[8px] bg-oakland-ink/5 px-1 rounded">IP: {notice.viewed_ip}</span>
                            </div>
                          )}
                          {notice.acknowledged_at && (
                            <div className="flex items-center gap-2 text-[10px] text-oakland-ink/60">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              <span>Ack: {new Date(notice.acknowledged_at).toLocaleString()}</span>
                              <span className="font-mono text-[8px] bg-oakland-ink/5 px-1 rounded">IP: {notice.acknowledged_ip}</span>
                            </div>
                          )}
                          {!notice.viewed_at && !notice.acknowledged_at && (
                            <div className="text-[10px] text-oakland-ink/30 italic">No tracking data yet</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'violations' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-oakland-ink/5 border-b border-oakland-ink/5">
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Tenant / Unit</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Violation Details</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Date</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Status</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-oakland-ink/5">
                  {violations.map((v) => (
                    <tr key={v.id} className="hover:bg-oakland-ink/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-irish-green/10 flex items-center justify-center text-irish-green font-bold text-xs">
                            {v.unit_number}
                          </div>
                          <div>
                            <div className="font-bold text-oakland-ink">{v.tenant_name}</div>
                            <div className="text-xs text-oakland-ink/40">Unit {v.unit_number}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-oakland-ink">{v.description}</div>
                        {v.gm_notes && <div className="text-xs text-oakland-ink/40 italic mt-1">Note: {v.gm_notes}</div>}
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium text-oakland-ink">{new Date(v.violation_date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-irish-red/10 text-irish-red border border-irish-red/20">
                          <AlertTriangle className="w-3 h-3" />
                          {v.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <button className="p-2 hover:bg-oakland-ink/5 rounded-lg transition-colors text-oakland-ink/40 hover:text-oakland-terracotta">
                          <FileText className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((form) => (
                <div key={form.id} className="p-6 rounded-3xl border border-oakland-ink/5 bg-oakland-paper/50 hover:border-oakland-terracotta/20 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-oakland-terracotta/10 text-oakland-terracotta group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-oakland-ink/30 bg-oakland-ink/5 px-2 py-1 rounded">
                      {form.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold mb-2">{form.title}</h4>
                  <p className="text-xs text-oakland-ink/50 line-clamp-3 mb-6 leading-relaxed">
                    {form.content_template}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-grow py-2 bg-oakland-ink text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-oakland-terracotta transition-colors">
                      Use Template
                    </button>
                    <button className="p-2 bg-oakland-ink/5 text-oakland-ink/40 rounded-xl hover:text-oakland-ink transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'laws' && (
            <div className="p-8 space-y-6">
              {laws.map((law) => (
                <div key={law.id} className="p-8 rounded-[2rem] border border-oakland-ink/5 bg-white shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 rounded-2xl bg-oakland-olive/10 text-oakland-olive">
                    <Scale className="w-8 h-8" />
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-serif font-bold">{law.title}</h4>
                      <span className="px-3 py-1 bg-oakland-ink/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">
                        {law.jurisdiction}
                      </span>
                    </div>
                    <p className="text-oakland-ink/60 leading-relaxed max-w-3xl">
                      {law.summary}
                    </p>
                    <div className="flex items-center gap-6 pt-2">
                      <a 
                        href={law.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-oakland-terracotta hover:underline"
                      >
                        Official Source <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-oakland-ink/30">
                        Last Updated: {law.last_updated}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Notices', value: notices.length, icon: ShieldCheck, color: 'text-blue-600' },
          { label: 'Active Violations', value: violations.filter(v => v.status !== 'Resolved').length, icon: AlertTriangle, color: 'text-orange-600' },
          { label: 'Ack Rate', value: `${Math.round((notices.filter(n => n.status === 'Acknowledged').length / (notices.length || 1)) * 100)}%`, icon: CheckCircle2, color: 'text-emerald-600' },
          { label: 'Last Audit', value: 'Today', icon: Clock, color: 'text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-3xl bg-white border border-oakland-ink/5 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-oakland-ink/5 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest">{stat.label}</div>
              <div className="text-2xl font-serif font-black text-oakland-ink">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
