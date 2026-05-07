import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Video, 
  Activity, 
  Settings, 
  Edit3, 
  Save, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export interface CameraEntry {
  id: string;
  property: string;
  location: string;
  model: string;
  installationDate: string;
  status: 'Operational' | 'Maintenance Required' | 'Offline';
  lastUpdate: string;
  notes: string;
}

const mockCameras: CameraEntry[] = [
  {
    id: 'CAM-001',
    property: '3875 RUBY',
    location: 'Main Entrance - Lobby',
    model: 'Verkada CD52-E',
    installationDate: '2025-01-15',
    status: 'Operational',
    lastUpdate: '2026-04-21T06:30:00Z',
    notes: 'Primary lobby camera. Covers entrance and mailboxes.'
  },
  {
    id: 'CAM-002',
    property: '3875 RUBY',
    location: 'Garage Gate (Exterior)',
    model: 'Verkada CB62-TE',
    installationDate: '2025-01-15',
    status: 'Operational',
    lastUpdate: '2026-04-21T06:30:00Z',
    notes: 'LPR (License Plate Recognition) active.'
  },
  {
    id: 'CAM-003',
    property: '3875 RUBY',
    location: 'Garage - Storage Area',
    model: 'Verkada CD42',
    installationDate: '2025-01-16',
    status: 'Maintenance Required',
    lastUpdate: '2026-04-20T14:15:00Z',
    notes: 'Lens needs cleaning. Image slightly blurry at night.'
  },
  {
    id: 'CAM-004',
    property: '3875 RUBY',
    location: 'Roof Deck - East',
    model: 'Verkada CD52-E',
    installationDate: '2025-02-10',
    status: 'Offline',
    lastUpdate: '2026-04-21T02:00:00Z',
    notes: 'Lost connection during recent storm. Need technician to check PoE wiring.'
  }
];

export const SecurityCameras = () => {
  const [cameras, setCameras] = useState<CameraEntry[]>(mockCameras);
  const [editingCamera, setEditingCamera] = useState<CameraEntry | null>(null);

  const handleStatusChange = (id: string, newStatus: CameraEntry['status']) => {
    setCameras(prev => prev.map(cam => 
      cam.id === id ? { ...cam, status: newStatus, lastUpdate: new Date().toISOString() } : cam
    ));
  };

  const saveNotes = (id: string, newNotes: string) => {
    setCameras(prev => prev.map(cam => 
      cam.id === id ? { ...cam, notes: newNotes, lastUpdate: new Date().toISOString() } : cam
    ));
    setEditingCamera(null);
  };

  const getStatusBadge = (status: CameraEntry['status']) => {
    switch (status) {
      case 'Operational':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3" />
            Operational
          </span>
        );
      case 'Maintenance Required':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest">
            <Settings className="w-3 h-3" />
            Maintenance
          </span>
        );
      case 'Offline':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest">
            <AlertCircle className="w-3 h-3" />
            Offline
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-app-text tracking-tighter uppercase">
            Security <span className="italic text-app-accent">Cameras</span>.
          </h2>
          <p className="text-app-text/40 text-sm mt-2 uppercase tracking-widest font-bold">
            Real-time optical surveillance status
          </p>
        </div>
        <div className="flex gap-4">
          <div className="p-4 rounded-2xl bg-app-card border border-app-border text-center min-w-[120px]">
            <div className="text-3xl font-black text-emerald-500 tracking-tighter">
              {cameras.filter(c => c.status === 'Operational').length}
            </div>
            <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest mt-1">Online</div>
          </div>
          <div className="p-4 rounded-2xl bg-app-card border border-app-border text-center min-w-[120px]">
            <div className="text-3xl font-black text-app-accent tracking-tighter">
              {cameras.filter(c => c.status !== 'Operational').length}
            </div>
            <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest mt-1">Issues</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {cameras.map(camera => (
          <motion.div 
            key={camera.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-8 rounded-[2.5rem] bg-app-card border border-app-border shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-app-bg border border-app-border flex items-center justify-center">
                    <Video className="w-6 h-6 text-app-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">{camera.location}</h3>
                    <p className="text-[10px] font-black text-app-accent/60 uppercase tracking-widest">{camera.property} • {camera.model}</p>
                  </div>
                </div>
                {getStatusBadge(camera.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest">Installed</div>
                  <div className="text-sm font-medium">{camera.installationDate}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest">Last Update</div>
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-app-text/40" />
                    {new Date(camera.lastUpdate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-app-bg border border-app-border mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest">Service Notes</div>
                  <button 
                    onClick={() => setEditingCamera(camera)}
                    className="p-1.5 hover:bg-app-card rounded-md transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-app-accent" />
                  </button>
                </div>
                <p className="text-sm font-medium text-app-text/80">{camera.notes || 'No notes available.'}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-app-border">
              <div className="flex items-center gap-3">
                <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest">Set Status:</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStatusChange(camera.id, 'Operational')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${camera.status === 'Operational' ? 'bg-emerald-500 text-white' : 'bg-app-bg text-app-text/60 hover:text-app-text'}`}
                  >
                    Online
                  </button>
                  <button 
                    onClick={() => handleStatusChange(camera.id, 'Maintenance Required')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${camera.status === 'Maintenance Required' ? 'bg-amber-500 text-white' : 'bg-app-bg text-app-text/60 hover:text-app-text'}`}
                  >
                    Maint
                  </button>
                  <button 
                    onClick={() => handleStatusChange(camera.id, 'Offline')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${camera.status === 'Offline' ? 'bg-red-500 text-white' : 'bg-app-bg text-app-text/60 hover:text-app-text'}`}
                  >
                    Offline
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Notes Modal */}
      <AnimatePresence>
        {editingCamera && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-app-card border border-app-border rounded-[2rem] p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setEditingCamera(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-app-bg transition-colors"
              >
                <X className="w-5 h-5 text-app-text/60 hover:text-app-text" />
              </button>

              <h3 className="text-2xl font-black text-app-text tracking-tighter uppercase mb-2">Edit Notes</h3>
              <p className="text-sm font-medium text-app-text/60 mb-6">{editingCamera.location}</p>

              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement).value;
                saveNotes(editingCamera.id, notes);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/60 ml-2">Notes</label>
                    <textarea 
                      name="notes"
                      defaultValue={editingCamera.notes}
                      rows={5}
                      className="w-full mt-2 p-4 bg-app-bg border border-app-border rounded-2xl focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all text-sm resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-app-accent text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
