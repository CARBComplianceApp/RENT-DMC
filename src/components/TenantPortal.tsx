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
  ShieldAlert
} from 'lucide-react';

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

export const TenantPortal = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'security' | 'refer' | 'settings'>('dashboard');
  const [settings, setSettings] = useState<UserSettings>({
    preferred_notification_time: '09:00',
    sms_enabled: true,
    email_enabled: true
  });
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [constructionUpdates, setConstructionUpdates] = useState<ConstructionUpdate[]>([]);
  const [referralData, setReferralData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportText, setReportText] = useState('');
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  useEffect(() => {
    // Mock user ID 1 for demo
    fetch('/api/user-settings/1').then(res => res.json()).then(setSettings);
    fetch('/api/security-events/1').then(res => res.json()).then(setSecurityEvents);
    fetch('/api/construction-updates/1').then(res => res.json()).then(setConstructionUpdates);
  }, []);

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

  return (
    <div className="space-y-8">
      {/* Portal Navigation */}
      <div className="flex gap-8 border-b border-oakland-ink/5 overflow-x-auto pb-px">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutGridIcon },
          { id: 'security', label: 'Security', icon: ShieldCheck },
          { id: 'refer', label: 'Refer a Friend', icon: Users },
          { id: 'settings', label: 'Notifications', icon: Bell }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-oakland-terracotta' : 'text-oakland-ink/40 hover:text-oakland-ink'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && <motion.div layoutId="activeTenantTab" className="absolute bottom-0 left-0 right-0 h-1 bg-oakland-terracotta" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
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
              {/* Sublease Reminder Banner */}
              <div className="p-6 rounded-[2rem] bg-oakland-terracotta/5 border border-oakland-terracotta/10 flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-oakland-terracotta/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6 text-oakland-terracotta" />
                </div>
                <div>
                  <h4 className="font-bold text-oakland-ink text-sm">Sublease Policy Reminder</h4>
                  <p className="text-xs text-oakland-ink/60 leading-relaxed">
                    Subleasing is strictly prohibited without written consent. Unauthorized guests staying longer than 14 days may trigger a lease violation.
                  </p>
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold">Rent Status</h3>
                    <p className="text-oakland-ink/40 text-sm mt-1">March 2026</p>
                  </div>
                  <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" /> Received
                  </div>
                </div>
                
                <div className="flex items-end gap-4 mb-8">
                  <div className="text-5xl font-serif font-black text-oakland-ink">$2,450</div>
                  <div className="text-sm font-bold text-oakland-ink/30 mb-2 uppercase tracking-widest">Paid on Mar 1</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 rounded-2xl bg-oakland-ink/5 hover:bg-oakland-ink/10 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
                    <CreditCard className="w-4 h-4" /> View Ledger
                  </button>
                  <button className="p-4 rounded-2xl bg-oakland-terracotta text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-md">
                    <Plus className="w-4 h-4" /> Pre-pay April
                  </button>
                </div>
              </div>

              {/* Construction Updates */}
              <div className="p-10 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-serif font-bold">Building Updates</h3>
                  <Info className="w-5 h-5 text-oakland-ink/20" />
                </div>
                <div className="space-y-6">
                  {constructionUpdates.map((update) => (
                    <div key={update.id} className="p-6 rounded-3xl bg-oakland-ink/[0.02] border border-oakland-ink/5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-oakland-ink">{update.title}</h4>
                        <span className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest">{new Date(update.update_date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-oakland-ink/60 leading-relaxed">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Schedule */}
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-oakland-ink text-white shadow-xl relative overflow-hidden">
                {/* Secure Chip Visual */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Cpu className="w-24 h-24" />
                </div>
                
                <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Community Schedule</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-oakland-terracotta" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Trash Day</div>
                      <div className="font-bold">Every Tuesday</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Wind className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Street Sweeping</div>
                      <div className="font-bold">2nd & 4th Thursday</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">SMS Alerts</span>
                    <div className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${settings.sms_enabled ? 'bg-oakland-terracotta' : 'bg-white/10'}`} onClick={() => handleUpdateSettings({ sms_enabled: !settings.sms_enabled })}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.sms_enabled ? 'left-6' : 'left-1'}`} />
                    </div>
                  </div>
                  <p className="text-[10px] text-white/30 leading-relaxed italic">
                    Receive a text at {settings.preferred_notification_time} on the morning of scheduled services.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-oakland-olive/10 border border-oakland-olive/20">
                <h3 className="text-xl font-serif font-bold text-oakland-olive mb-4">Refer a Friend</h3>
                <p className="text-sm text-oakland-olive/70 mb-6 leading-relaxed">
                  Love living at Ruby? Refer a friend and get <span className="font-bold text-oakland-olive">$250 off</span> your next month's rent when they sign a lease.
                </p>
                <button 
                  onClick={() => setActiveTab('refer')}
                  className="w-full py-3 bg-oakland-olive text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                >
                  Start Referring
                </button>
              </div>

              {/* See Something Say Something */}
              <div className="p-8 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-oakland-terracotta" />
                  <h3 className="text-xl font-serif font-bold">See Something?</h3>
                </div>
                <p className="text-xs text-oakland-ink/50 leading-relaxed italic">
                  Report security concerns or maintenance issues anonymously. Our new recognition cameras monitor for unauthorized patterns.
                </p>
                <div className="space-y-4">
                  <textarea 
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="Describe what you saw..."
                    className="w-full p-4 bg-oakland-ink/5 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-oakland-terracotta/20 min-h-[100px] resize-none"
                  />
                  <button 
                    onClick={handleSendReport}
                    disabled={isSubmitting || !reportText.trim()}
                    className="w-full py-3 bg-oakland-ink text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-oakland-terracotta transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Secure Report'}
                  </button>
                  {showReportSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center text-[10px] font-bold text-emerald-600 uppercase tracking-widest"
                    >
                      Report Sent Securely
                    </motion.div>
                  )}
                </div>
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
              <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold">Recognition Cameras</h3>
                    <p className="text-oakland-ink/40 text-sm mt-1">Enhanced security & deterrence system active.</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live System
                  </div>
                </div>

                <div className="aspect-video rounded-[2rem] bg-oakland-ink overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop" 
                    alt="Security Feed" 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                    REC
                  </div>
                  <div className="absolute bottom-6 left-6 text-white/60 font-mono text-xs">
                    CAM-01: MAIN LOBBY // 2026-03-26 08:42:06
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-oakland-ink/[0.02] border border-oakland-ink/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-oakland-ink">AI Recognition</h4>
                    </div>
                    <p className="text-xs text-oakland-ink/60 leading-relaxed">
                      Our system recognizes authorized residents and staff, reducing false alarms and ensuring only intended visitors enter.
                    </p>
                  </div>
                  <div className="p-6 rounded-3xl bg-oakland-ink/[0.02] border border-oakland-ink/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-oakland-ink">Active Deterrence</h4>
                    </div>
                    <p className="text-xs text-oakland-ink/60 leading-relaxed">
                      Integrated perimeter lighting and audio alerts activate automatically when unauthorized motion is detected in restricted zones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white border border-oakland-ink/5 shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-6">Security Log</h3>
                <div className="space-y-6">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        event.type === 'Recognition' ? 'bg-blue-500' : 
                        event.type === 'Deterrence' ? 'bg-orange-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest mb-1">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-sm font-bold text-oakland-ink">{event.type}</div>
                        <p className="text-xs text-oakland-ink/50 mt-1 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 border border-oakland-ink/10 rounded-full text-xs font-bold uppercase tracking-widest text-oakland-ink/40 hover:text-oakland-ink hover:border-oakland-ink/20 transition-all">
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
            <div className="p-12 rounded-[3rem] bg-white border border-oakland-ink/5 shadow-xl text-center">
              <div className="w-20 h-20 bg-oakland-olive/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-oakland-olive" />
              </div>
              <h3 className="text-4xl font-serif font-black mb-4">Refer a <span className="italic text-oakland-terracotta">Friend</span>.</h3>
              <p className="text-oakland-ink/50 mb-10 leading-relaxed">
                Share the 3875 Ruby experience. When your friend signs a lease, you both get a <span className="font-bold text-oakland-ink">$250 credit</span> towards your next month's rent.
              </p>

              <form onSubmit={handleReferFriend} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40 ml-4">Friend's Name</label>
                  <input 
                    type="text"
                    required
                    value={referralData.name}
                    onChange={(e) => setReferralData({ ...referralData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-oakland-ink/5 border border-transparent rounded-2xl focus:bg-white focus:border-oakland-terracotta/20 focus:outline-none transition-all"
                    placeholder="Enter their full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40 ml-4">Friend's Email</label>
                  <input 
                    type="email"
                    required
                    value={referralData.email}
                    onChange={(e) => setReferralData({ ...referralData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-oakland-ink/5 border border-transparent rounded-2xl focus:bg-white focus:border-oakland-terracotta/20 focus:outline-none transition-all"
                    placeholder="Enter their email address"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-oakland-terracotta text-white rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send className="w-5 h-5" /> Send Referral
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-12 pt-8 border-t border-oakland-ink/5">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-oakland-ink">12</div>
                    <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest">Referrals This Month</div>
                  </div>
                  <div className="w-px h-8 bg-oakland-ink/10" />
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-oakland-ink">$3,000</div>
                    <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest">Tenant Credits Paid</div>
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
            <div className="p-12 rounded-[3rem] bg-white border border-oakland-ink/5 shadow-xl">
              <h3 className="text-3xl font-serif font-black mb-8">Notification <span className="italic text-oakland-terracotta">Settings</span></h3>
              
              <div className="space-y-10">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-oakland-ink/[0.02] border border-oakland-ink/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-oakland-ink">SMS Notifications</div>
                      <p className="text-xs text-oakland-ink/40">Trash, street sweeping & urgent alerts.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => handleUpdateSettings({ sms_enabled: !settings.sms_enabled })}
                    className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer ${settings.sms_enabled ? 'bg-oakland-terracotta' : 'bg-oakland-ink/10'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings.sms_enabled ? 'left-8' : 'left-1'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl bg-oakland-ink/[0.02] border border-oakland-ink/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-oakland-ink">Email Notifications</div>
                      <p className="text-xs text-oakland-ink/40">Rent receipts, lease updates & newsletters.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => handleUpdateSettings({ email_enabled: !settings.email_enabled })}
                    className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer ${settings.email_enabled ? 'bg-oakland-terracotta' : 'bg-oakland-ink/10'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings.email_enabled ? 'left-8' : 'left-1'}`} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 ml-4">
                    <Clock className="w-5 h-5 text-oakland-terracotta" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Preferred Notification Time</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {['07:00', '08:00', '09:00', '10:00'].map((time) => (
                      <button 
                        key={time}
                        onClick={() => handleUpdateSettings({ preferred_notification_time: time })}
                        className={`py-4 rounded-2xl font-bold text-sm transition-all border ${
                          settings.preferred_notification_time === time 
                          ? 'bg-oakland-terracotta text-white border-oakland-terracotta shadow-md' 
                          : 'bg-white text-oakland-ink/40 border-oakland-ink/10 hover:border-oakland-terracotta/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-oakland-ink/30 italic ml-4">
                    Scheduled alerts for community services will be sent at this time on the morning of the event.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LayoutGridIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
