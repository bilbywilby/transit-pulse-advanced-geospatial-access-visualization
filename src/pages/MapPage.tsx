import React, { useState } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { MapControls, MapLayersConfig } from '@/components/map/MapControls';
import { FeatureInspector } from '@/components/map/FeatureInspector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, BarChart3, Activity, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTransitData } from '@/hooks/use-transit-data';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export default function MapPage() {
  const [layers, setLayers] = useState<MapLayersConfig>({
    parcels: { visible: true, opacity: 0.8 },
    stops: { visible: true, opacity: 1.0 },
    vehicles: { visible: true, opacity: 1.0 },
    demographics: { visible: false, opacity: 0.4 },
  });
  const { vehicles: liveVehicles, loading: vehiclesLoading } = useTransitData();
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [flyToRequest, setFlyToRequest] = useState<{ lng: number; lat: number; zoom?: number } | null>(null);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const landmarks: Record<string, [number, number]> = {
      'city hall': [-75.1639, 39.9524],
      'rittenhouse': [-75.1716, 39.9495],
      'fishtown': [-75.1347, 39.9719],
      'university city': [-75.1915, 39.9522],
    };
    const term = searchQuery.toLowerCase();
    const coord = landmarks[term] || [-75.1652 + (Math.random() - 0.5) * 0.05, 39.9526 + (Math.random() - 0.5) * 0.05];
    setFlyToRequest({ lng: coord[0], lat: coord[1], zoom: 15.5 });
    toast.success(`Navigating to ${searchQuery}`, { icon: <Search className="w-4 h-4" /> });
    if (window.innerWidth < 768) setIsSearchOpen(false);
  };
  return (
    <div className="w-screen h-screen overflow-hidden bg-background relative flex flex-col">
      {/* HUD Header */}
      <div className="absolute top-4 left-4 right-4 z-30 pointer-events-none flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 pointer-events-auto">
          <Link to="/">
            <Button variant="outline" size="icon" className="h-10 w-10 bg-background/80 backdrop-blur-md shadow-xl border-border/50 hover:bg-accent transition-all active:scale-95">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          {/* Responsive Search */}
          <div className="relative flex items-center">
             <form 
               onSubmit={handleSearch} 
               className={cn(
                 "overflow-hidden transition-all duration-300 flex items-center",
                 isSearchOpen ? "w-48 md:w-64" : "w-0 md:w-64"
               )}
             >
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                placeholder="Search PHL..."
                className="h-10 w-full pl-9 pr-2 bg-background/80 backdrop-blur-md border-border/50 focus:ring-emerald-500/50 rounded-full md:rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 md:hidden bg-background/80 backdrop-blur-md border-border/50 rounded-full ml-1"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-4 h-4" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
          <Link to="/reports">
            <Button variant="outline" size="sm" className="h-10 px-3 md:px-4 bg-background/80 backdrop-blur-md shadow-xl border-border/50 gap-2 font-bold hover:bg-accent transition-all">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
          </Link>
          {vehiclesLoading && (
            <div className="flex items-center gap-2 px-3 h-10 rounded-full md:rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest animate-pulse backdrop-blur-md">
              <Activity className="w-3 h-3 animate-spin" />
              <span className="hidden xs:inline">Syncing SEPTA</span>
            </div>
          )}
        </div>
        <ThemeToggle className="pointer-events-auto mt-0.5" />
      </div>
      {/* Main Map */}
      <MapContainer
        layers={layers}
        liveVehicles={liveVehicles}
        onFeatureClick={(f) => setSelectedFeature(f)}
        flyToRequest={flyToRequest}
      />
      {/* Overlays Wrapper */}
      <div className="absolute inset-0 pointer-events-none">
        <MapControls
          layers={layers}
          setLayers={setLayers}
        />
        <FeatureInspector
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      </div>
      {/* Footer Meta */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none hidden sm:block">
        <div className="bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-glass">
          <h2 className="text-2xl font-display font-black text-white drop-shadow-lg tracking-tight">
            Transit <span className="text-emerald-400">Pulse</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[10px] text-emerald-400/90 font-mono uppercase tracking-[0.3em]">
              V1.2 // Live Pipeline
            </p>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
          </div>
        </div>
      </div>
    </div>
  );
}