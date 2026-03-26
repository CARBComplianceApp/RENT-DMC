import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  MessageSquare, 
  User, 
  Shield, 
  Hammer,
  Eye,
  XCircle,
  ArrowRight
} from 'lucide-react';

interface MaintenanceRequest {
  id: number;
  unit_id: number;
  unit_number: string;
  description: string;
  photo_url: string | null;
  status: string;
  gm_notes: string | null;
  approval_notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG: Record<string, { color: string, bg: string, icon: any }> = {
  'Pending Review': { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Eye },
  'Awaiting Approval': { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: Shield },
  'Approved': { color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
  'In Progress': { color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Hammer },
  'Pending Verification': { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock },
  'Completed': { color: 'text-irish-green', bg: 'bg-irish-green/10', icon: CheckCircle2 },
  'Rejected': { color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle },
};

export const MaintenanceModule: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/maintenance');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: number, payload: any) => {
    try {
      await fetch(`/api/maintenance/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      fetchRequests();
      if (selectedRequest?.id === id) {
        setSelectedRequest(prev => prev ? { ...prev, ...payload } : null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getNextStep = (status: string) => {
    switch (status) {
      case 'Pending Review': return { label: 'Send for Approval', next: 'Awaiting Approval', color: 'bg-orange-500' };
      case 'Awaiting Approval': return { label: 'Mark Approved', next: 'Approved', color: 'bg-emerald-500' };
      case 'Approved': return { label: 'Start Work', next: 'In Progress', color: 'bg-purple-500' };
      case 'In Progress': return { label: 'Complete Work', next: 'Pending Verification', color: 'bg-amber-500' };
      case 'Pending Verification': return { label: 'Verify & Close', next: 'Completed', color: 'bg-irish-green' };
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-irish-green/20 border-t-irish-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-black text-white tracking-tight">Maintenance Pipeline</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">GM Workflow Interface • Silverback Engine</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold text-zinc-400">
            {requests.filter(r => r.status !== 'Completed').length} Active Requests
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List View */}
        <div className="lg:col-span-2 space-y-4">
          {requests.map((req) => {
            const config = STATUS_CONFIG[req.status] || STATUS_CONFIG['Pending Review'];
            const StatusIcon = config.icon;
            
            return (
              <motion.div
                key={req.id}
                layoutId={`req-${req.id}`}
                onClick={() => setSelectedRequest(req)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group ${
                  selectedRequest?.id === req.id 
                    ? 'bg-zinc-800 border-irish-green shadow-lg shadow-irish-green/10' 
                    : 'bg-zinc-900 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center ${config.color}`}>
                      <StatusIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg font-black text-white font-mono tracking-tighter">UNIT #{req.unit_number}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm line-clamp-1">{req.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                        <span>{new Date(req.created_at).toLocaleDateString()}</span>
                        {req.assigned_to && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" /> {req.assigned_to}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-zinc-700 group-hover:text-zinc-400 transition-colors ${selectedRequest?.id === req.id ? 'rotate-90 text-irish-green' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail View */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {selectedRequest ? (
              <motion.div
                key={selectedRequest.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="sticky top-8 p-8 rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-2xl space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white tracking-tighter">Request Details</h3>
                  <button onClick={() => setSelectedRequest(null)} className="text-zinc-600 hover:text-white">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {selectedRequest.photo_url && (
                  <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                    <img src={selectedRequest.photo_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Issue Description</label>
                    <p className="text-zinc-300 leading-relaxed">{selectedRequest.description}</p>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Workflow Actions */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Workflow Management</label>
                    
                    {getNextStep(selectedRequest.status) && (
                      <button
                        onClick={() => {
                          const next = getNextStep(selectedRequest.status);
                          if (next) handleUpdateStatus(selectedRequest.id, { status: next.next });
                        }}
                        className={`w-full py-4 rounded-2xl text-white font-black flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 ${getNextStep(selectedRequest.status)?.color}`}
                      >
                        {getNextStep(selectedRequest.status)?.label}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}

                    {selectedRequest.status === 'Pending Review' && (
                      <button
                        onClick={() => handleUpdateStatus(selectedRequest.id, { status: 'Rejected' })}
                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-red-500 font-black hover:bg-red-500/10 transition-all"
                      >
                        Reject Request
                      </button>
                    )}
                  </div>

                  {/* Notes Sections */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">GM Internal Notes</label>
                      <textarea
                        value={selectedRequest.gm_notes || ''}
                        onChange={(e) => handleUpdateStatus(selectedRequest.id, { gm_notes: e.target.value })}
                        placeholder="Add internal notes for management..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-irish-green/50 min-h-[100px]"
                      />
                    </div>

                    {selectedRequest.status === 'Awaiting Approval' && (
                      <div>
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Approval Feedback</label>
                        <textarea
                          value={selectedRequest.approval_notes || ''}
                          onChange={(e) => handleUpdateStatus(selectedRequest.id, { approval_notes: e.target.value })}
                          placeholder="Notes from ownership/approval body..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 min-h-[100px]"
                        />
                      </div>
                    )}

                    {selectedRequest.status === 'Approved' && (
                      <div>
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Assign Contractor / Staff</label>
                        <input
                          type="text"
                          value={selectedRequest.assigned_to || ''}
                          onChange={(e) => handleUpdateStatus(selectedRequest.id, { assigned_to: e.target.value })}
                          placeholder="Enter name of person taking care of it..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-[600px] rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-30">
                <Wrench className="w-16 h-16" />
                <p className="text-lg font-medium">Select a request from the pipeline<br/>to manage the workflow.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
