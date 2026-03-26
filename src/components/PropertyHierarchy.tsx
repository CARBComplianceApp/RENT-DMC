import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  LayoutGrid, 
  List,
  Search,
  Plus
} from 'lucide-react';

interface Property {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  image_url: string;
}

export const PropertyHierarchy = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      });
  }, []);

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-oakland-terracotta border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-serif font-black text-oakland-ink">Portfolio <span className="italic">Hierarchy</span></h2>
          <p className="text-oakland-ink/50 mt-2">Managing {properties.length} properties across Oakland & Berkeley.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-oakland-ink/30" />
            <input 
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-oakland-ink/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-oakland-terracotta/20 transition-all"
            />
          </div>
          
          <div className="flex p-1 bg-oakland-ink/5 rounded-full border border-oakland-ink/5">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-oakland-terracotta' : 'text-oakland-ink/40 hover:text-oakland-ink'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-oakland-terracotta' : 'text-oakland-ink/40 hover:text-oakland-ink'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button className="p-3 bg-oakland-terracotta text-white rounded-full hover:scale-105 transition-transform shadow-lg">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 relative">
                <img 
                  src={property.image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800'} 
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oakland-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    View Dashboard <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-oakland-ink shadow-lg">
                  {property.neighborhood}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold group-hover:text-oakland-terracotta transition-colors">{property.name}</h3>
                <div className="flex items-center gap-2 text-oakland-ink/40 text-sm">
                  <MapPin className="w-4 h-4" />
                  {property.address}
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-white border border-oakland-ink/5 group-hover:border-oakland-terracotta/20 transition-colors">
                    <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest mb-1">Units</div>
                    <div className="text-lg font-serif font-bold">24</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-oakland-ink/5 group-hover:border-oakland-terracotta/20 transition-colors">
                    <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest mb-1">Occupancy</div>
                    <div className="text-lg font-serif font-bold text-emerald-600">98%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-oakland-ink/5 group-hover:border-oakland-terracotta/20 transition-colors">
                    <div className="text-[10px] font-bold text-oakland-ink/30 uppercase tracking-widest mb-1">Revenue</div>
                    <div className="text-lg font-serif font-bold">$42k</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-oakland-ink/5 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-oakland-ink/5">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Property</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Neighborhood</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Units</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Occupancy</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40">Revenue</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-oakland-ink/40"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id} className="border-b border-oakland-ink/5 hover:bg-oakland-ink/[0.02] transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-oakland-ink/5">
                        <img src={property.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-bold text-oakland-ink">{property.name}</div>
                        <div className="text-xs text-oakland-ink/40">{property.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-oakland-ink/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oakland-ink/60">
                      {property.neighborhood}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-serif font-bold">24</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-oakland-ink/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[98%]"></div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">98%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-serif font-bold text-oakland-ink">$42,850</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-oakland-ink/20 group-hover:text-oakland-terracotta transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
