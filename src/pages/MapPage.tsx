import React, { useState } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { MapControls } from '@/components/map/MapControls';
import { FeatureInspector } from '@/components/map/FeatureInspector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BarChart3, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTransitData } from '@/hooks/use-transit-data';
export default function MapPage() {
  const [layers, setLayers] = useState({
    parcels: true,
    stops: false,
    vehicles: true,
    demographics: false,
  });
  const { vehicles: liveVehicles, loading: vehiclesLoading } = useTransitData();
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  return (
    <div className="w-screen h-screen overflow-hidden bg-background relative">
      {/* Top Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
         <Link to="/">
            <Button variant="outline" size="icon" className="h-10 w-10 bg-background/80 backdrop-blur shadow-sm border-border/50 hover:bg-white/10 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Button>
         </Link>
         <Link to="/reports">
            <Button variant="outline" size="sm" className="h-10 px-4 bg-background/80 backdrop-blur shadow-sm border-border/50 gap-2 font-semibold hover:bg-white/10 transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
         </Link>
         {vehiclesLoading && (
            <div className="flex items-center gap-2 px-3 h-10 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
               <Activity className="w-3 h-3 animate-spin" />
               Live Feed Syncing
            </div>
         )}
      </div>
      <ThemeToggle className="absolute top-4 right-4" />
      {/* Main Map */}
      <MapContainer
        layers={layers}
        liveVehicles={liveVehicles}
        onFeatureClick={(f) => setSelectedFeature(f)}
      />
      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto">
          <MapControls
            layers={layers}
            setLayers={setLayers as any}
          />
          <FeatureInspector
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
          />
        </div>
      </div>
      {/* Branding Overlay */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <h2 className="text-xl font-display font-bold text-white drop-shadow-md">
          Transit <span className="text-emerald-400">Pulse</span>
        </h2>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-white/60 font-medium uppercase tracking-[0.2em]">
            Philadelphia Metro Analysis
          </p>
          <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>
      </div>
    </div>
  );
}