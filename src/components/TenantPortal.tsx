import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Camera, 
  Trash2, 
  Wind, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Send,
  Plus,
  ChevronRight,
  Smartphone,
  Mail,
  Eye,
  Cpu,
  ShieldAlert,
  FileWarning,
  Gavel,
  Wrench,
  LayoutGrid
} from 'lucide-react';

import { LeaseUpdateWalkthrough } from './LeaseUpdateWalkthrough';

interface UserSettings {
  preferred_notification_time: string;
  sms_enabled: boolean;
  email_enabled: boolean;
}

interface SecurityEvent {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  image_url?: string;
}

interface ConstructionUpdate {
  id: number;
  title: string;
  content: string;
  update_date: string;
}

interface TenantNotice {
  id: number;
  title: string;
  content: string;
  status: string;
  sent_at: string;
  viewed_at?: string;
  acknowledged_at?: string;
}

interface LeaseViolation {
  id: number;
  description: string;
  violation_date: string;
  status: string;
  gm_notes?: string;
}

interface LeaseUpdate {
  id: number;
  year: number;
  status: string;
  walkthrough_completed: number;
  signed_at?: string;
}

export const TenantPortal = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'security' | 'refer' | 'settings' | 'legal' | 'maintenance' | 'mailbox'>('mailbox');
  const [settings, setSettings] = useState<UserSettings>({
    preferred_notification_time: '09:00',
    sms_enabled: true,
    email_enabled: true
  });
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [constructionUpdates, setConstructionUpdates] = useState<ConstructionUpdate[]>([]);
  const [notices, setNotices] = useState<TenantNotice[]>([]);
  const [violations, setViolations] = useState<LeaseViolation[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);
  const [leaseUpdate, setLeaseUpdate] = useState<LeaseUpdate | null>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<TenantNotice | null>(null);
  const [referralData, setReferralData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportText, setReportText] = useState('');
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  const [rentStatus, setRentStatus] = useState<{ amount: number, last_payment: string, status: string } | null>(null);
  const [mailboxCustomizations, setMailboxCustomizations] = useState<Record<string, { color: string, sticker?: string }>>({
    '101': { color: '#F27D26' },
    '208': { color: '#5A5A40' },
    '305': { color: '#141414' }
  });
  const [selectedMailbox, setSelectedMailbox] = useState<string | null>(null);

  const units = [
    '101', '102', '103', '104', '105', '106', '107', '108',
    '201', '208',
    '301', '302', '303', '304', '305', '306', '307', '308'
  ];

  useEffect(() => {
    // Mock user ID 1 for demo
    fetch('/api/user-settings/1').then(res => res.json()).then(setSettings);
    fetch('/api/security-events/1').then(res => res.json()).then(setSecurityEvents);
    fetch('/api/construction-updates/1').then(res => res.json()).then(setConstructionUpdates);
    fetch('/api/tenant-notices/1').then(res => res.json()).then(setNotices);
    fetch('/api/lease-violations/1').then(res => res.json()).then(setViolations);
    fetch('/api/maintenance?unit_id=1').then(res => res.json()).then(setMaintenanceRequests);
    fetch('/api/lease-updates/1').then(res => res.json()).then(data => setLeaseUpdate(data[0] || null));
    
    // Fetch rent status
    fetch('/api/tenant-rent/1').then(res => res.json()).then(setRentStatus);
  }, []);

  const fetchLeaseUpdate = () => {
    fetch('/api/lease-updates/1').then(res => res.json()).then(data => setLeaseUpdate(data[0] || null));
  };

  const handleUpdateSettings = async (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await fetch('/api/user-settings/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    });
  };

  const handleReferFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 1, // Mock
          friend_name: referralData.name,
          friend_email: referralData.email
        })
      });
      alert('Referral sent! Thank you for sharing the Ruby Soul.');
      setReferralData({ name: '', email: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendReport = async () => {
    if (!reportText.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setReportText('');
      setShowReportSuccess(true);
      setTimeout(() => setShowReportSuccess(false), 3000);
    }, 1000);
  };

  const handleViewNotice = async (notice: TenantNotice) => {
    setSelectedNotice(notice);
    if (notice.status === 'Sent') {
      await fetch(`/api/tenant-notices/${notice.id}/view`, { method: 'PATCH' });
      fetch('/api/tenant-notices/1').then(res => res.json()).then(setNotices);
    }
  };

  const handleAcknowledgeNotice = async (noticeId: number) => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/tenant-notices/${noticeId}/acknowledge`, { method: 'PATCH' });
      fetch('/api/tenant-notices/1').then(res => res.json()).then(setNotices);
      setSelectedNotice(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit_id: 1, // Mock
          description: reportText,
          photo_url: ''
        })
      });
      setReportText('');
      setShowReportSuccess(true);
      fetch('/api/maintenance?unit_id=1').then(res => res.json()).then(setMaintenanceRequests);
      setTimeout(() => setShowReportSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Portal Navigation */}
      <div className="flex gap-8 border-b border-app-border overflow-x-auto pb-px">
        {[
          { id: 'mailbox', label: 'Mailbox Hub', icon: Mail },
          { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
          { id: 'maintenance', label: 'Maintenance', icon: Wrench },
          { id: 'security', label: 'Security', icon: ShieldCheck },
          { id: 'legal', label: 'Legal & Notices', icon: Gavel },
          { id: 'refer', label: 'Refer a Friend', icon: Users },
          { id: 'settings', label: 'Notifications', icon: Bell }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-app-accent' : 'text-app-text/40 hover:text-app-text'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && <motion.div layoutId="activeTenantTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showWalkthrough && (
          <LeaseUpdateWalkthrough 
            tenantId={1} 
            onClose={() => setShowWalkthrough(false)}
            onComplete={() => {
              setShowWalkthrough(false);
              fetchLeaseUpdate();
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeTab === 'mailbox' && (
          <motion.div
            key="mailbox"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative min-h-[700px] rounded-[4rem] overflow-hidden shadow-2xl bg-app-card group"
          >
            {/* Background: Ruby Street 100 Years Ago */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=2000&auto=format&fit=crop" 
                alt="Ruby Street 100 Years Ago" 
                className="w-full h-full object-cover grayscale brightness-[0.4] contrast-[1.2]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-app-card via-transparent to-transparent"></div>
            </div>

            {/* Semi-Circle Mailboxes */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Ruby <span className="italic text-app-accent">Mailbox Hub</span>.</h2>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] mt-4">Select your unit to access your private portal</p>
              </div>

              <div className="relative w-full max-w-4xl aspect-[2/1] mt-12">
                {units.map((unit, index) => {
                  const total = units.length;
                  const angle = (index / (total - 1)) * Math.PI; // 0 to PI (180 degrees)
                  const radius = 350; // Radius in pixels
                  const x = Math.cos(angle + Math.PI) * radius; // Offset by PI to start from left
                  const y = Math.sin(angle + Math.PI) * radius;
                  
                  const custom = mailboxCustomizations[unit] || { color: '#ffffff20' };

                  return (
                    <motion.button
                      key={unit}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, type: 'spring' }}
                      onClick={() => setSelectedMailbox(unit)}
                      style={{ 
                        left: `calc(50% + ${x}px)`, 
                        top: `calc(100% + ${y}px)`,
                        backgroundColor: custom.color,
                        borderColor: activeTab === 'mailbox' && unit === '101' ? 'var(--color-ruby)' : 'rgba(255,255,255,0.1)'
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-20 rounded-t-xl rounded-b-md border-2 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(var(--color-ruby-rgb),0.3)] group ${unit === '101' ? 'ring-4 ring-app-accent/20' : ''}`}
                    >
                      <div className="text-[10px] font-black text-white/40 mb-1">UNIT</div>
                      <div className="text-xl font-black text-white">{unit}</div>
                      
                      {/* Flag visual */}
                      <div className="absolute -right-1 top-4 w-1 h-6 bg-app-accent rounded-full origin-bottom transition-transform group-hover:rotate-45" />
                      
                      {/* Interaction Hint */}
                      {unit === '101' && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-app-accent text-white text-[8px] font-bold rounded-full whitespace-nowrap animate-bounce">
                          YOUR UNIT
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Quick Links Overlay when a mailbox is selected */}
              <AnimatePresence>
                {selectedMailbox && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-app-card/95 backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl border border-app-border z-30"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                          style={{ backgroundColor: mailboxCustomizations[selectedMailbox]?.color || 'var(--color-app-bg)' }}
                        >
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-app-text uppercase tracking-tighter">Unit {selectedMailbox} Portal</h3>
                          <p className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest">Secure Access Authenticated</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedMailbox(null)} className="p-2 hover:bg-app-text/5 rounded-full transition-colors">
                        <Plus className="w-6 h-6 rotate-45 text-app-text/40" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: 'dashboard', label: 'Balance', icon: CreditCard, color: 'bg-emerald-500/10 text-emerald-500' },
                        { id: 'legal', label: 'Lease', icon: Gavel, color: 'bg-blue-500/10 text-blue-500' },
                        { id: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'bg-app-accent/10 text-app-accent' },
                        { id: 'legal', label: 'Notices', icon: Bell, color: 'bg-app-accent/10 text-app-accent' },
                      ].map((link) => (
                        <button
                          key={link.label}
                          onClick={() => {
                            setActiveTab(link.id as any);
                            setSelectedMailbox(null);
                          }}
                          className="p-6 rounded-3xl bg-app-text/[0.02] border border-app-border hover:border-app-accent/20 transition-all group text-center"
                        >
                          <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                            <link.icon className="w-5 h-5" />
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-app-text">{link.label}</div>
                        </button>
                      ))}
                    </div>

                    {/* Customization Option */}
                    <div className="mt-8 pt-8 border-t border-app-border flex items-center justify-between">
                      <div className="text-xs font-bold text-app-text/40 uppercase tracking-widest">Customize Mailbox</div>
                      <div className="flex gap-2">
                        {['#F27D26', '#5A5A40', '#141414', '#0066CC', '#CC0000'].map(color => (
                          <button
                            key={color}
                            onClick={() => setMailboxCustomizations({ ...mailboxCustomizations, [selectedMailbox]: { color } })}
                            style={{ backgroundColor: color }}
                            className={`w-6 h-6 rounded-full border-2 ${mailboxCustomizations[selectedMailbox]?.color === color ? 'border-app-text scale-125' : 'border-transparent'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Rent Status Card */}
            <div className="lg:col-span-2 space-y-8">
              {/* Lease Update Banner */}
              {leaseUpdate?.status === 'Pending' && (
                <div className="p-8 rounded-[2.5rem] bg-app-card border border-app-border text-app-text shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-24 h-24" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="p-4 bg-app-accent rounded-2xl">
                      <FileWarning className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h4 className="text-2xl font-black uppercase tracking-tighter">2026 Lease Update <span className="italic text-app-accent">Required</span></h4>
                      <p className="text-sm text-app-text/50 mt-1 leading-relaxed">
                        Review your updated tenant rights, building features, and sign your 2026 lease agreement.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowWalkthrough(true)}
                      className="px-8 py-4 bg-app-accent text-white rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                    >
                      Start Walkthrough
                    </button>
                  </div>
                </div>
              )}

              {/* Sublease Reminder Banner */}
              <div className="p-6 rounded-[2rem] bg-app-accent/5 border border-app-accent/10 flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-app-accent/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6 text-app-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-app-text text-sm uppercase tracking-widest">Sublease Policy Reminder</h4>
                  <p className="text-xs text-app-text/60 leading-relaxed">
                    Subleasing is strictly prohibited without written consent. Unauthorized guests staying longer than 14 days may trigger a lease violation.
                  </p>
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-app-text uppercase tracking-tighter">Rent Status</h3>
                    <p className="text-app-text/40 text-sm mt-1 uppercase tracking-widest font-bold">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                    rentStatus?.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {rentStatus?.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />} 
                    {rentStatus?.status || 'Loading...'}
                  </div>
                </div>
                
                <div className="flex items-end gap-4 mb-8">
                  <div className="text-5xl font-black text-app-text tracking-tighter">
                    ${rentStatus?.amount?.toLocaleString() || '0'}
                  </div>
                  <div className="text-sm font-bold text-app-text/30 mb-2 uppercase tracking-widest">
                    {rentStatus?.last_payment ? `Last payment: ${new Date(rentStatus.last_payment).toLocaleDateString()}` : 'No recent payments'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 rounded-2xl bg-app-text/5 hover:bg-app-text/10 transition-colors flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-widest">
                    <CreditCard className="w-4 h-4" /> View Ledger
                  </button>
                  <button className="p-4 rounded-2xl bg-app-accent text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-md uppercase tracking-widest">
                    <Plus className="w-4 h-4" /> {rentStatus?.status === 'Paid' ? 'Pre-pay Next' : 'Pay Now'}
                  </button>
                </div>
              </div>

              {/* Recent Notices Preview */}
              <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-app-text uppercase tracking-tighter">Recent Notices</h3>
                  <button 
                    onClick={() => setActiveTab('legal')}
                    className="text-[10px] font-bold text-app-accent uppercase tracking-widest hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {notices.slice(0, 2).map((notice) => (
                    <div 
                      key={notice.id} 
                      onClick={() => handleViewNotice(notice)}
                      className="p-4 rounded-2xl bg-app-text/[0.02] border border-app-text/5 hover:border-app-accent/20 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${notice.status === 'Acknowledged' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-app-accent/10 text-app-accent'}`}>
                          <FileWarning className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-app-text uppercase tracking-tight">{notice.title}</div>
                          <div className="text-[9px] font-bold text-app-text/30 uppercase tracking-widest">
                            {new Date(notice.sent_at).toLocaleDateString()} • {notice.status}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-app-text/10 group-hover:text-app-accent transition-colors" />
                    </div>
                  ))}
                  {notices.length === 0 && (
                    <p className="text-sm text-app-text/30 italic">No recent notices.</p>
                  )}
                </div>
              </div>

              {/* Construction Updates */}
              <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-app-text uppercase tracking-tighter">Building Updates</h3>
                  <div className="p-2 bg-app-text/5 rounded-full">
                    <Info className="w-5 h-5 text-app-text/20" />
                  </div>
                </div>
                <div className="space-y-6">
                  {constructionUpdates.map((update) => (
                    <div key={update.id} className="p-6 rounded-3xl bg-app-text/[0.02] border border-app-border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-app-text uppercase tracking-tight">{update.title}</h4>
                        <span className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">{new Date(update.update_date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-app-text/60 leading-relaxed">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Schedule */}
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-app-card border border-app-border text-app-text shadow-xl relative overflow-hidden">
                {/* Secure Chip Visual */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Cpu className="w-24 h-24" />
                </div>
                
                <h3 className="text-xl font-black mb-6 relative z-10 uppercase tracking-tighter">Community Schedule</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-app-text/5 flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-app-accent" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-app-text/40 uppercase tracking-widest">Trash Day</div>
                      <div className="font-bold uppercase tracking-tight">Every Tuesday</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-app-text/5 flex items-center justify-center">
                      <Wind className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-app-text/40 uppercase tracking-widest">Street Sweeping</div>
                      <div className="font-bold uppercase tracking-tight">2nd & 4th Thursday</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-app-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-app-text/40 uppercase tracking-widest">SMS Alerts</span>
                    <div className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${settings.sms_enabled ? 'bg-app-accent' : 'bg-app-text/10'}`} onClick={() => handleUpdateSettings({ sms_enabled: !settings.sms_enabled })}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.sms_enabled ? 'left-6' : 'left-1'}`} />
                    </div>
                  </div>
                  <p className="text-[10px] text-app-text/30 leading-relaxed italic">
                    Receive a text at {settings.preferred_notification_time} on the morning of scheduled services.
                  </p>
                </div>
              </div>              <div className="p-8 rounded-[2.5rem] bg-app-accent/5 border border-app-accent/10">
                <h3 className="text-xl font-black text-app-accent mb-4 uppercase tracking-tighter">Refer a Friend</h3>
                <p className="text-sm text-app-text/70 mb-6 leading-relaxed">
                  Love living at Ruby? Refer a friend and get <span className="font-bold text-app-accent">$250 off</span> your next month's rent when they sign a lease.
                </p>
                <button 
                  onClick={() => setActiveTab('refer')}
                  className="w-full py-3 bg-app-accent text-white rounded-full font-bold text-sm hover:opacity-90 transition-all uppercase tracking-widest"
                >
                  Start Referring
                </button>
              </div>

              {/* See Something Say Something */}
              <div className="p-8 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-app-accent" />
                  <h3 className="text-xl font-black text-app-text uppercase tracking-tighter">See Something?</h3>
                </div>
                <p className="text-xs text-app-text/50 leading-relaxed italic">
                  Report security concerns or maintenance issues anonymously. Our new recognition cameras monitor for unauthorized patterns.
                </p>
                <div className="space-y-4">
                  <textarea 
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="Describe what you saw..."
                    className="w-full p-4 bg-app-bg border border-app-border rounded-2xl text-xs text-app-text focus:outline-none focus:ring-1 focus:ring-app-accent/20 min-h-[100px] resize-none"
                  />
                  <button 
                    onClick={handleSendReport}
                    disabled={isSubmitting || !reportText.trim()}
                    className="w-full py-3 bg-app-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Secure Report'}
                  </button>
                  {showReportSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center text-[10px] font-bold text-emerald-500 uppercase tracking-widest"
                    >
                      Report Sent Securely
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'maintenance' && (
          <motion.div
            key="maintenance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                <h3 className="text-2xl font-black text-app-text mb-8 uppercase tracking-tighter">Request Maintenance</h3>
                <form onSubmit={handleCreateMaintenance} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/40 ml-4">Issue Description</label>
                    <textarea 
                      required
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      placeholder="Describe the issue in detail..."
                      className="w-full p-6 bg-app-bg border border-app-border rounded-[2rem] focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all min-h-[150px] resize-none text-app-text"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !reportText.trim()}
                    className="w-full py-5 bg-app-accent text-white rounded-[2rem] font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest"
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        <Wrench className="w-5 h-5" /> Submit Request
                      </>
                    )}
                  </button>
                  {showReportSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center text-sm font-bold text-emerald-500 uppercase tracking-widest"
                    >
                      Request Logged Successfully
                    </motion.div>
                  )}
                </form>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                <h3 className="text-2xl font-black text-app-text mb-8 uppercase tracking-tighter">Request History</h3>
                <div className="space-y-6">
                  {maintenanceRequests.length === 0 ? (
                    <div className="text-center py-12 text-app-text/30 italic">
                      No maintenance history found.
                    </div>
                  ) : (
                    maintenanceRequests.map((req) => (
                      <div key={req.id} className="p-6 rounded-3xl bg-app-text/[0.02] border border-app-border flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                            req.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {req.status === 'Completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                          </div>
                          <div>
                            <div className="font-bold text-app-text uppercase tracking-tight">{req.description}</div>
                            <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest mt-1">
                              {new Date(req.created_at).toLocaleDateString()} • {req.status}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-app-text/10" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-app-card border border-app-border text-app-text shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <ShieldCheck className="w-20 h-20" />
                </div>
                <h3 className="text-xl font-black mb-6 relative z-10 uppercase tracking-tighter">Repair Standards</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-app-text/5 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-app-accent" />
                    </div>
                    <div>
                      <div className="font-bold text-sm uppercase tracking-tight">Emergency Response</div>
                      <p className="text-[10px] text-app-text/40 leading-relaxed mt-1">
                        Fires, floods, or major leaks are addressed within 4 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-app-text/5 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-bold text-sm uppercase tracking-tight">Standard Repairs</div>
                      <p className="text-[10px] text-app-text/40 leading-relaxed mt-1">
                        Non-emergency issues are typically resolved within 48-72 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-app-accent/5 border border-app-accent/10">
                <h4 className="font-bold text-app-accent text-sm mb-2 uppercase tracking-widest">Legal Notice</h4>
                <p className="text-[10px] text-app-text/60 leading-relaxed italic">
                  All maintenance requests are logged with timestamps and IP addresses for legal record-keeping. Unauthorized repairs by tenants are prohibited.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-app-text uppercase tracking-tighter">Recognition Cameras</h3>
                    <p className="text-app-text/40 text-sm mt-1 uppercase tracking-widest font-bold">Enhanced security & deterrence system active.</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live System
                  </div>
                </div>

                <div className="aspect-video rounded-[2rem] bg-app-bg border border-app-border overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop" 
                    alt="Security Feed" 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-app-card/10 backdrop-blur-md rounded-full border border-white/20">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-app-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                    REC
                  </div>
                  <div className="absolute bottom-6 left-6 text-white/60 font-mono text-xs">
                    CAM-01: MAIN LOBBY // 2026-03-26 08:42:06
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-app-text/[0.02] border border-app-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-app-text uppercase tracking-tight">AI Recognition</h4>
                    </div>
                    <p className="text-xs text-app-text/60 leading-relaxed">
                      Our system recognizes authorized residents and staff, reducing false alarms and ensuring only intended visitors enter.
                    </p>
                  </div>
                  <div className="p-6 rounded-3xl bg-app-text/[0.02] border border-app-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-app-text uppercase tracking-tight">Active Deterrence</h4>
                    </div>
                    <p className="text-xs text-app-text/60 leading-relaxed">
                      Integrated perimeter lighting and audio alerts activate automatically when unauthorized motion is detected in restricted zones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                <h3 className="text-xl font-black text-app-text mb-6 uppercase tracking-tighter">Security Log</h3>
                <div className="space-y-6">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        event.type === 'Recognition' ? 'bg-blue-500' : 
                        event.type === 'Deterrence' ? 'bg-amber-500' : 'bg-app-accent'
                      }`} />
                      <div>
                        <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest mb-1">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-sm font-bold text-app-text uppercase tracking-tight">{event.type}</div>
                        <p className="text-xs text-app-text/50 mt-1 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 border border-app-border rounded-full text-xs font-bold uppercase tracking-widest text-app-text/40 hover:text-app-text hover:border-app-accent/20 transition-all">
                  View Full History
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'refer' && (
          <motion.div
            key="refer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-12 rounded-[3rem] bg-app-card border border-app-border shadow-xl text-center">
              <div className="w-20 h-20 bg-app-accent/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-app-accent" />
              </div>
              <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter">Refer a <span className="italic text-app-accent">Friend</span>.</h3>
              <p className="text-app-text/50 mb-10 leading-relaxed">
                Share the 3875 Ruby experience. When your friend signs a lease, you both get a <span className="font-bold text-app-text">$250 credit</span> towards your next month's rent.
              </p>

              <form onSubmit={handleReferFriend} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/40 ml-4">Friend's Name</label>
                  <input 
                    type="text"
                    required
                    value={referralData.name}
                    onChange={(e) => setReferralData({ ...referralData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-app-text/5 border border-transparent rounded-2xl focus:bg-app-card focus:border-app-accent/20 focus:outline-none transition-all"
                    placeholder="Enter their full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/40 ml-4">Friend's Email</label>
                  <input 
                    type="email"
                    required
                    value={referralData.email}
                    onChange={(e) => setReferralData({ ...referralData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-app-text/5 border border-transparent rounded-2xl focus:bg-app-card focus:border-app-accent/20 focus:outline-none transition-all"
                    placeholder="Enter their email address"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-app-accent text-white rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send className="w-5 h-5" /> Send Referral
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-12 pt-8 border-t border-app-text/5">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-app-text">12</div>
                    <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">Referrals This Month</div>
                  </div>
                  <div className="w-px h-8 bg-app-text/10" />
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-app-text">$3,000</div>
                    <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">Tenant Credits Paid</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-12 rounded-[3rem] bg-app-card border border-app-border shadow-xl">
              <h3 className="text-3xl font-serif font-black mb-8">Notification <span className="italic text-app-accent">Settings</span></h3>
              
              <div className="space-y-10">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-app-text/[0.02] border border-app-text/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-app-text">SMS Notifications</div>
                      <p className="text-xs text-app-text/40">Trash, street sweeping & urgent alerts.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => handleUpdateSettings({ sms_enabled: !settings.sms_enabled })}
                    className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer ${settings.sms_enabled ? 'bg-app-accent' : 'bg-app-text/10'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings.sms_enabled ? 'left-8' : 'left-1'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl bg-app-text/[0.02] border border-app-text/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-app-text">Email Notifications</div>
                      <p className="text-xs text-app-text/40">Rent receipts, lease updates & newsletters.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => handleUpdateSettings({ email_enabled: !settings.email_enabled })}
                    className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer ${settings.email_enabled ? 'bg-app-accent' : 'bg-app-text/10'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings.email_enabled ? 'left-8' : 'left-1'}`} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 ml-4">
                    <Clock className="w-5 h-5 text-app-accent" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-app-text/40">Preferred Notification Time</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {['07:00', '08:00', '09:00', '10:00'].map((time) => (
                      <button 
                        key={time}
                        onClick={() => handleUpdateSettings({ preferred_notification_time: time })}
                        className={`py-4 rounded-2xl font-bold text-sm transition-all border ${
                          settings.preferred_notification_time === time 
                          ? 'bg-app-accent text-white border-app-accent shadow-md' 
                          : 'bg-app-card text-app-text/40 border-app-border hover:border-app-accent/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-app-text/30 italic ml-4">
                    Scheduled alerts for community services will be sent at this time on the morning of the event.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'legal' && (
          <motion.div
            key="legal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                  <h3 className="text-2xl font-serif font-bold mb-8">Official Notices</h3>
                  <div className="space-y-4">
                    {notices.length > 0 ? notices.map(notice => (
                      <div 
                        key={notice.id} 
                        onClick={() => handleViewNotice(notice)}
                        className="p-6 rounded-3xl bg-app-text/[0.02] border border-app-text/5 hover:border-app-accent/20 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${notice.status === 'Acknowledged' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            <FileWarning className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-app-text">{notice.title}</h4>
                            <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">
                              Issued: {new Date(notice.sent_at).toLocaleDateString()} • Status: {notice.status}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-app-text/20 group-hover:text-app-accent transition-colors" />
                      </div>
                    )) : (
                      <div className="text-center py-12 text-app-text/30 italic">No official notices at this time.</div>
                    )}
                  </div>
                </div>

                {violations.length > 0 && (
                  <div className="p-10 rounded-[2.5rem] bg-app-card border border-app-border shadow-sm">
                    <h3 className="text-2xl font-serif font-bold mb-8">Lease Violations</h3>
                    <div className="space-y-4">
                      {violations.map(violation => (
                        <div key={violation.id} className="p-6 rounded-3xl bg-app-accent/5 border border-app-accent/10 flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-app-accent/10 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-6 h-6 text-app-accent" />
                          </div>
                          <div>
                            <h4 className="font-bold text-app-text">{violation.description}</h4>
                            <div className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest mt-1">
                              Logged: {new Date(violation.violation_date).toLocaleDateString()} • Status: {violation.status}
                            </div>
                            {violation.gm_notes && (
                              <p className="text-xs text-app-text/60 mt-2 italic">Note from management: {violation.gm_notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-[2.5rem] bg-app-text text-app-bg shadow-xl">
                  <h3 className="text-xl font-serif font-bold mb-4 text-app-bg">Legal Defense Log</h3>
                  <p className="text-xs text-app-bg/50 leading-relaxed mb-6">
                    Every action in this portal is cryptographically logged. This provides a verifiable paper trail for all official communications and notice deliveries.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-app-bg">IP Logging Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-app-bg">Timestamp Verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-app-bg">Digital Signatures</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-app-accent/5 border border-app-accent/10">
                  <h3 className="text-xl font-serif font-bold text-app-accent mb-4">Landlord Rights</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-app-accent shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-app-text uppercase tracking-widest">Right of Entry</div>
                        <p className="text-[10px] text-app-text/60 leading-relaxed mt-1">
                          Per CC 1954, management may enter for repairs, inspections, or showings with 24-hour written notice.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-app-accent shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-app-text uppercase tracking-widest">Strict Sublet Enforcement</div>
                        <p className="text-[10px] text-app-text/60 leading-relaxed mt-1">
                          Unauthorized subletting is a material breach of lease and a 'Just Cause' for eviction under Oakland law.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-app-accent shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-app-text uppercase tracking-widest">Legal Fee Recovery</div>
                        <p className="text-[10px] text-app-text/60 leading-relaxed mt-1">
                          Landlord reserves the right to recover attorney's fees and costs in any legal action where the landlord is the prevailing party.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notice Detail Modal */}
            {selectedNotice && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-2xl bg-app-card rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                >
                  <div className="p-8 border-b border-app-text/5 flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-app-text">{selectedNotice.title}</h3>
                    <button onClick={() => setSelectedNotice(null)} className="p-2 hover:bg-app-text/5 rounded-full transition-colors">
                      <Plus className="w-6 h-6 rotate-45 text-app-text/40" />
                    </button>
                  </div>
                  <div className="p-8 overflow-y-auto flex-1 font-serif text-app-text/80 leading-relaxed whitespace-pre-wrap">
                    {selectedNotice.content}
                  </div>
                  <div className="p-8 bg-app-text/[0.02] border-t border-app-text/5 flex flex-col gap-4">
                    {selectedNotice.status !== 'Acknowledged' ? (
                      <>
                        <p className="text-[10px] text-app-text/40 italic text-center">
                          By clicking acknowledge, you confirm that you have read and understood this notice. Your IP address and timestamp will be logged for legal compliance.
                        </p>
                        <button 
                          onClick={() => handleAcknowledgeNotice(selectedNotice.id)}
                          disabled={isSubmitting}
                          className="w-full py-4 bg-app-text text-app-bg rounded-2xl font-bold uppercase tracking-widest hover:bg-app-accent hover:text-white transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? 'Processing...' : 'Acknowledge Notice'}
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-sm">
                        <CheckCircle2 className="w-5 h-5" /> Acknowledged on {new Date(selectedNotice.acknowledged_at!).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
