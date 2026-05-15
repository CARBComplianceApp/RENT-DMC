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
  property_id: number;
  property_name: string;
  location: string;
  model: string;
  installation_date: string;
  status: 'Operational' | 'Maintenance Required' | 'Offline';
  last_update: string;
  notes: string;
}

export const SecurityCameras = () => {
  const [cameras, setCameras] = useState<CameraEntry[]>([]);
  const [editingCamera, setEditingCamera] = useState<CameraEntry | null>(null);
  const [isAddingCamera, setIsAddingCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCameras = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch("/api/security-cameras");
      const data = await resp.json();
      setCameras(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCameras();
  }, []);

  const handleStatusChange = async (id: string, newStatus: CameraEntry['status']) => {
    // optimistic update
    setCameras(prev => prev.map(cam => 
      cam.id === id ? { ...cam, status: newStatus, last_update: new Date().toISOString() } : cam
    ));
    try {
      await fetch(`/api/security-cameras/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.error(e);
      fetchCameras(); // rollback on error
    }
  };

  const saveNotes = async (id: string, newNotes: string) => {
    // optimistic update
    setCameras(prev => prev.map(cam => 
      cam.id === id ? { ...cam, notes: newNotes, last_update: new Date().toISOString() } : cam
    ));
    setEditingCamera(null);
    try {
      await fetch(`/api/security-cameras/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: newNotes })
      });
    } catch (e) {
      console.error(e);
      fetchCameras(); // rollback on error
    }
  };

  const handleAddCamera = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // We hardcode property_id to 1 for this demo (Ruby)
    const newCam = {
      property_id: 1,
      location: formData.get('location') as string,
      model: formData.get('model') as string,
      installation_date: formData.get('installationDate') as string || new Date().toISOString().split('T')[0],
      status: formData.get('status') as CameraEntry['status'],
      notes: formData.get('notes') as string,
    };

    try {
      await fetch('/api/security-cameras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCam)
      });
      setIsAddingCamera(false);
      fetchCameras();
    } catch (err) {
      console.error(err);
    }
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
          <button 
            onClick={() => setIsAddingCamera(true)}
            className="hidden md:flex items-center gap-2 px-6 py-4 rounded-2xl bg-app-accent text-white hover:opacity-90 transition-opacity font-bold uppercase tracking-widest text-[10px]"
          >
            <Camera className="w-4 h-4" />
            Add Camera
          </button>
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
                    <p className="text-[10px] font-black text-app-accent/60 uppercase tracking-widest">{camera.property_name} • {camera.model}</p>
                  </div>
                </div>
                {getStatusBadge(camera.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest">Installed</div>
                  <div className="text-sm font-medium">{camera.installation_date}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest">Last Update</div>
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-app-text/40" />
                    {new Date(camera.last_update).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
        {isAddingCamera && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-app-card border border-app-border rounded-[2rem] p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsAddingCamera(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-app-bg transition-colors"
              >
                <X className="w-5 h-5 text-app-text/60 hover:text-app-text" />
              </button>

              <h3 className="text-2xl font-black text-app-text tracking-tighter uppercase mb-6">Add Security Camera</h3>

              <form onSubmit={handleAddCamera}>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/60 ml-2">Location</label>
                    <input 
                      name="location"
                      required
                      placeholder="e.g. Garage Gate"
                      className="w-full mt-2 p-4 bg-app-bg border border-app-border rounded-2xl focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/60 ml-2">Model</label>
                      <input 
                        name="model"
                        required
                        placeholder="e.g. Verkada CD52"
                        className="w-full mt-2 p-4 bg-app-bg border border-app-border rounded-2xl focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/60 ml-2">Install Date</label>
                      <input 
                        name="installationDate"
                        type="date"
                        required
                        className="w-full mt-2 p-4 bg-app-bg border border-app-border rounded-2xl focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/60 ml-2">Status</label>
                      <select 
                        name="status"
                        required
                        className="w-full mt-2 p-4 bg-app-bg border border-app-border rounded-2xl focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all text-sm"
                      >
                        <option value="Operational">Operational</option>
                        <option value="Maintenance Required">Maintenance Required</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-app-text/60 ml-2">Notes</label>
                    <textarea 
                      name="notes"
                      rows={3}
                      className="w-full mt-2 p-4 bg-app-bg border border-app-border rounded-2xl focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all text-sm resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-app-accent text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-4"
                  >
                    <Save className="w-4 h-4" />
                    Save Camera
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        
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
