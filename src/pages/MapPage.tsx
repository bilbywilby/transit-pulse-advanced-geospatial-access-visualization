import React, { useState } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { MapControls } from '@/components/map/MapControls';
import { FeatureInspector } from '@/components/map/FeatureInspector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function MapPage() {
  const [layers, setLayers] = useState({
    parcels: true,
    stops: false,
    vehicles: false,
  });
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  return (
    <div className="w-screen h-screen overflow-hidden bg-background relative">
      {/* Top Header/Nav */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
         <Link to="/" className="pointer-events-auto">
            <Button variant="outline" size="icon" className="h-10 w-10 bg-background/80 backdrop-blur shadow-sm border-border/50">
              <ChevronLeft className="h-5 w-5" />
            </Button>
         </Link>
      </div>
      <ThemeToggle className="absolute top-4 right-4" />
      {/* Main Map */}
      <MapContainer 
        layers={layers} 
        onFeatureClick={(f) => setSelectedFeature(f)} 
      />
      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto">
          <MapControls 
            layers={layers} 
            setLayers={setLayers} 
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
        <p className="text-[10px] text-white/60 font-medium uppercase tracking-[0.2em]">
          Philadelphia Metro Analysis
        </p>
      </div>
    </div>
  );
}