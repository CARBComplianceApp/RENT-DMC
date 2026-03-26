import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  MessageSquare
} from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

interface RentRollItem {
  id: number;
  unit_number: string;
  rent_amount: number;
  status: string;
  tenant_name: string | null;
  lease_end: string | null;
  balance_due: number;
  last_login_at: string | null;
  last_login_ip: string | null;
  last_payment_date: string | null;
  last_payment_status: string | null;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  created_at: string;
}

interface MaintenanceRequest {
  id: number;
  description: string;
  photo_url: string | null;
  status: string;
  created_at: string;
}

interface Stats {
  total_units: number;
  occupied_units: number;
  total_potential_revenue: number;
}

export const RentRollDashboard: React.FC = () => {
  const [data, setData] = useState<RentRollItem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<RentRollItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Detail views state
  const [messages, setMessages] = useState<Message[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // percentage
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [cookieStatus, setCookieStatus] = useState<'checking' | 'active' | 'blocked'>('checking');

  // Confirmation state
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'warning'
  });

  const fetchData = async () => {
    try {
      const [rentRollRes, statsRes] = await Promise.all([
        fetch('/api/rent-roll'),
        fetch('/api/stats')
      ]);
      const rentRollData = await rentRollRes.json();
      const statsData = await statsRes.json();
      setData(rentRollData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching rent roll:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnitDetails = async (unitId: number) => {
    try {
      const [msgRes, maintRes] = await Promise.all([
        fetch(`/api/messages/${unitId}`),
        fetch(`/api/maintenance/${unitId}`)
      ]);
      setMessages(await msgRes.json());
      setMaintenance(await maintRes.json());
    } catch (error) {
      console.error("Error fetching unit details:", error);
    }
  };

  const checkCookies = async () => {
    try {
      await fetch('/api/cookie-set');
      // Small delay to ensure cookie is processed
      setTimeout(async () => {
        const res = await fetch('/api/cookie-verify');
        const data = await res.json();
        setCookieStatus(data.active ? 'active' : 'blocked');
      }, 500);
    } catch (error) {
      console.error("Cookie check failed:", error);
      setCookieStatus('blocked');
    }
  };

  useEffect(() => {
    fetchData();
    checkCookies();
  }, []);

  useEffect(() => {
    if (selectedUnit) {
      fetchUnitDetails(selectedUnit.id);
    }
  }, [selectedUnit]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUnit) return;
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit_id: selectedUnit.id,
          sender: 'Manager',
          content: newMessage
        })
      });
      setNewMessage('');
      fetchUnitDetails(selectedUnit.id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleAddUnit = () => {
    setConfirmState({
      isOpen: true,
      title: 'Add New Unit',
      message: 'Are you sure you want to initialize a new unit entry? This will create a vacant record in the system.',
      type: 'info',
      onConfirm: () => {
        console.log('Adding unit...');
        // In a real app, this would be a POST request
      }
    });
  };

  const handleMarkOverdue = (unitId: number) => {
    const unit = data.find(u => u.id === unitId);
    if (!unit) return;

    setConfirmState({
      isOpen: true,
      title: 'CONFIRM DELINQUENCY',
      message: `You are about to mark Unit #${unit.unit_number} as OVERDUE. 

This action will:
1. Flag the tenant (${unit.tenant_name}) as delinquent.
2. Trigger an automated late notice email.
3. Apply a $50 administrative late fee to the balance.
4. Enable the 'Chase Direct Deposit' recovery link.

Are you absolutely sure you want to proceed?`,
      type: 'danger',
      onConfirm: async () => {
        try {
          await fetch(`/api/rent-roll/${unitId}/overdue`, { method: 'PATCH' });
          fetchData(); // Refresh the table
        } catch (error) {
          console.error("Error marking overdue:", error);
        }
      }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedUnit) return;

    const description = prompt("Enter a description for this maintenance request:", "Photo Uploaded");
    if (description === null) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        await fetch('/api/maintenance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            unit_id: selectedUnit.id,
            description: description || "Photo Uploaded",
            photo_url: base64String
          })
        });
        fetchUnitDetails(selectedUnit.id);
      } catch (error) {
        console.error("Error uploading photo:", error);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const formatCurrency = (val: number | null | undefined) => {
    return (val ?? 0).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-irish-green/20 border-t-irish-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <ConfirmationModal
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        type={confirmState.type}
      />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-irish-green" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-irish-green/10 flex items-center justify-center text-irish-green">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] font-mono">Occupancy</span>
          </div>
          <div className="text-4xl font-bold text-white font-mono">
            {stats ? Math.round((stats.occupied_units / stats.total_units) * 100) : 0}%
          </div>
          <div className="text-xs text-zinc-500 mt-2 font-mono uppercase tracking-wider">{stats?.occupied_units} of {stats?.total_units} units active</div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-irish-orange" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-irish-orange/10 flex items-center justify-center text-irish-orange">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] font-mono">Potential</span>
          </div>
          <div className="text-4xl font-bold text-white font-mono">
            ${formatCurrency(stats?.total_potential_revenue)}
          </div>
          <div className="text-xs text-zinc-500 mt-2 font-mono uppercase tracking-wider">Gross scheduled rent</div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] font-mono">Delinquent</span>
          </div>
          <div className="text-4xl font-bold text-white font-mono">
            {data.filter(u => u.last_payment_status === 'Late').length}
          </div>
          <div className="text-xs text-zinc-500 mt-2 font-mono uppercase tracking-wider">Units requiring notice</div>
        </div>
      </div>

      {/* Rent Roll Table */}
      <div className="rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white font-serif">Active Rent Roll</h3>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-colors ${
              cookieStatus === 'active' 
                ? 'bg-irish-green/10 text-irish-green border-irish-green/20' 
                : cookieStatus === 'blocked'
                ? 'bg-red-500/10 text-red-500 border-red-500/20'
                : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                cookieStatus === 'active' ? 'bg-irish-green animate-pulse' : cookieStatus === 'blocked' ? 'bg-red-500' : 'bg-zinc-500'
              }`} />
              Cookie Check: {cookieStatus}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search units..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-irish-green/50 font-mono"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button 
              onClick={handleAddUnit}
              className="flex items-center gap-2 px-4 py-2 bg-irish-orange text-white text-sm font-bold rounded-xl hover:bg-irish-orange-lt transition-colors shadow-lg shadow-irish-orange/20"
            >
              <Plus className="w-4 h-4" />
              Add Unit
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.02] font-mono">
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tenant</th>
                <th className="px-6 py-4">Rent</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4">Last Payment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((unit) => (
                <tr 
                  key={unit.id} 
                  onDoubleClick={() => {
                    setSelectedUnit(unit);
                    setIsDetailOpen(true);
                  }}
                  className="group hover:bg-irish-green/[0.05] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-6">
                    <span className="text-lg font-black text-white font-mono tracking-tighter">#{unit.unit_number}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${
                      unit.status === 'Occupied' 
                        ? 'bg-irish-green/20 text-irish-green border-irish-green/30' 
                        : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${unit.status === 'Occupied' ? 'bg-irish-green' : 'bg-zinc-500'}`} />
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      {unit.tenant_name ? (
                        <>
                          <div className="w-10 h-10 rounded-xl bg-irish-green/20 flex items-center justify-center text-sm font-black text-irish-green border border-irish-green/20 shadow-inner">
                            {unit.tenant_name.charAt(0)}
                          </div>
                          <span className="text-base font-bold text-white tracking-tight">{unit.tenant_name}</span>
                        </>
                      ) : (
                        <span className="text-sm text-zinc-600 italic font-mono font-bold tracking-widest">VACANT</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-lg font-black text-white font-mono">${formatCurrency(unit.rent_amount)}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-lg font-black font-mono ${(unit.balance_due ?? 0) > 0 ? 'text-red-500' : 'text-zinc-500'}`}>
                      ${formatCurrency(unit.balance_due)}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-zinc-400 font-mono font-bold">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{unit.last_payment_date || 'N/A'}</span>
                      </div>
                      {unit.status === 'Occupied' && (
                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${unit.last_payment_status === 'Paid' ? 'text-irish-green' : 'text-red-500'}`}>
                          {unit.last_payment_status || 'Pending'}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkOverdue(unit.id);
                        }}
                        className="p-2.5 text-zinc-500 hover:text-red-400 transition-colors bg-white/5 rounded-lg border border-white/5"
                        title="Mark Overdue"
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUnit(unit);
                          setIsDetailOpen(true);
                        }}
                        className="p-2.5 text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailOpen && selectedUnit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-6xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-irish-green/20 flex items-center justify-center text-2xl font-black text-irish-green border border-irish-green/20">
                  #{selectedUnit.unit_number}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter">Management Module</h2>
                  <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                    {selectedUnit.tenant_name || 'VACANT'} • Silverback Intelligence Active
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="p-3 bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            {/* Main Content Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Panel: Unit & Tenant Details */}
              <div 
                style={{ width: `${leftPanelWidth}%` }}
                className="border-r border-white/5 p-8 overflow-y-auto space-y-8 bg-zinc-950/30"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Monthly Rent</div>
                    <div className="text-xl font-bold text-white">${formatCurrency(selectedUnit.rent_amount)}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Balance Due</div>
                    <div className="text-xl font-bold text-red-500">${formatCurrency(selectedUnit.balance_due)}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Lease End</div>
                    <div className="text-xl font-bold text-white">{selectedUnit.lease_end || 'N/A'}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Last Payment</div>
                    <div className="text-xl font-bold text-irish-green">{selectedUnit.last_payment_date || 'None'}</div>
                  </div>
                </div>

                {/* Login History */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Tenant Activity Log
                  </h4>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-300">Last Login</div>
                      <div className="text-sm font-bold text-white">{selectedUnit.last_login_at ? new Date(selectedUnit.last_login_at).toLocaleString() : 'Never'}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-300">Login Location</div>
                      <div className="text-sm font-mono text-zinc-400">{selectedUnit.last_login_ip || 'N/A'}</div>
                    </div>
                    <div className="pt-2 text-[10px] text-zinc-600 uppercase tracking-widest italic">
                      * Activity logging compliant with local privacy regulations
                    </div>
                  </div>
                </div>

                {/* Maintenance Requests */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Maintenance Issues
                    </h4>
                    <button className="text-[10px] font-black text-irish-orange uppercase tracking-widest hover:underline">New Request</button>
                  </div>
                  <div className="space-y-3">
                    {maintenance.length > 0 ? (
                      maintenance.map(req => (
                        <div key={req.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-white">{req.description}</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{new Date(req.created_at).toLocaleDateString()} • {req.status}</div>
                          </div>
                          {req.photo_url && (
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-white/10 overflow-hidden">
                              <img src={req.photo_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-600">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="text-sm text-zinc-500">No active maintenance issues reported.</div>
                      </div>
                    )}
                    
                    {/* Photo Upload Placeholder */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-6 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/[0.03] transition-colors ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      {isUploading ? (
                        <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Plus className="w-6 h-6 text-zinc-600" />
                      )}
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        {isUploading ? 'Uploading...' : 'Upload Photo / Document'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resize Handle */}
              <div 
                className="w-1 bg-white/5 hover:bg-irish-green/50 cursor-col-resize transition-colors"
                onMouseDown={(e) => {
                  const startX = e.pageX;
                  const startWidth = leftPanelWidth;
                  const onMouseMove = (moveEvent: MouseEvent) => {
                    const delta = ((moveEvent.pageX - startX) / window.innerWidth) * 100;
                    setLeftPanelWidth(Math.min(Math.max(startWidth + delta, 30), 70));
                  };
                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };
                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
              />

              {/* Right Panel: Chat / Communication */}
              <div className="flex-1 flex flex-col bg-zinc-900">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                  <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Communication Hub
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-irish-green animate-pulse" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Tenant Online</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'Manager' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                        msg.sender === 'Manager' 
                          ? 'bg-irish-green text-white rounded-tr-none' 
                          : 'bg-white/5 text-zinc-300 border border-white/10 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-1 uppercase tracking-widest font-mono">
                        {msg.sender} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                      <MessageSquare className="w-12 h-12" />
                      <p className="text-sm">No message history yet.<br/>Start the conversation below.</p>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message to the tenant..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-irish-green/50"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-irish-green text-white font-black rounded-xl hover:bg-irish-green-lt transition-colors shadow-lg shadow-irish-green/20"
                    >
                      SEND
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                      Press Enter to send
                    </div>
                    <button className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">
                      Email Copy to Manager
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
