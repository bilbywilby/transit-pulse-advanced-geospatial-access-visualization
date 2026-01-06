import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Layers, Map as MapIcon } from 'lucide-react';
interface MapControlsProps {
  layers: {
    parcels: boolean;
    stops: boolean;
    vehicles: boolean;
  };
  setLayers: React.Dispatch<React.SetStateAction<{
    parcels: boolean;
    stops: boolean;
    vehicles: boolean;
  }>>;
}
export function MapControls({ layers, setLayers }: MapControlsProps) {
  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <div className="absolute top-4 left-4 z-10 w-64 space-y-4">
      <Card className="bg-background/80 backdrop-blur-md border-border/50 shadow-lg overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Layers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="parcels-toggle" className="text-xs">Enriched Parcels</Label>
            <Switch 
              id="parcels-toggle" 
              checked={layers.parcels} 
              onCheckedChange={() => toggleLayer('parcels')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="stops-toggle" className="text-xs">Transit Stops</Label>
            <Switch 
              id="stops-toggle" 
              checked={layers.stops} 
              onCheckedChange={() => toggleLayer('stops')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="vehicles-toggle" className="text-xs">Live Vehicles</Label>
            <Switch 
              id="vehicles-toggle" 
              checked={layers.vehicles} 
              onCheckedChange={() => toggleLayer('vehicles')} 
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background/80 backdrop-blur-md border-border/50 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <MapIcon className="w-4 h-4" />
            Legend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Access Score</div>
            <div className="h-2 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full" />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Low (0.0)</span>
              <span>High (1.0)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}