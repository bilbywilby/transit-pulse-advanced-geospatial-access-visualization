import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Layers, Map as MapIcon, Eye } from 'lucide-react';
export interface LayerState {
  visible: boolean;
  opacity: number;
}
export interface MapLayersConfig {
  parcels: LayerState;
  stops: LayerState;
  vehicles: LayerState;
  demographics: LayerState;
}
interface MapControlsProps {
  layers: MapLayersConfig;
  setLayers: React.Dispatch<React.SetStateAction<MapLayersConfig>>;
}
export function MapControls({ layers, setLayers }: MapControlsProps) {
  const updateLayer = (key: keyof MapLayersConfig, updates: Partial<LayerState>) => {
    setLayers(prev => ({
      ...prev,
      [key]: { ...prev[key], ...updates }
    }));
  };
  const LayerControl = ({ id, label, config, layerKey }: { id: string, label: string, config: LayerState, layerKey: keyof MapLayersConfig }) => (
    <div className="space-y-2 py-2 border-b border-border/20 last:border-0">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-xs font-medium cursor-pointer">{label}</Label>
        <Switch
          id={id}
          checked={config.visible}
          onCheckedChange={(checked) => updateLayer(layerKey, { visible: checked })}
        />
      </div>
      {config.visible && (
        <div className="flex items-center gap-3 px-1">
          <Eye className="w-3 h-3 text-muted-foreground" />
          <Slider
            value={[config.opacity * 100]}
            max={100}
            step={1}
            onValueChange={(val) => updateLayer(layerKey, { opacity: val[0] / 100 })}
            className="flex-1"
          />
          <span className="text-[10px] tabular-nums text-muted-foreground w-6">
            {Math.round(config.opacity * 100)}%
          </span>
        </div>
      )}
    </div>
  );
  return (
    <div className="absolute top-20 left-4 z-10 w-64 space-y-4 pointer-events-auto">
      <Card className="bg-background/80 backdrop-blur-md border-border/50 shadow-lg overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            Layer Inspector
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-1">
          <LayerControl id="parcels-toggle" label="Enriched Parcels" config={layers.parcels} layerKey="parcels" />
          <LayerControl id="stops-toggle" label="Transit Stops" config={layers.stops} layerKey="stops" />
          <LayerControl id="vehicles-toggle" label="Live Vehicles" config={layers.vehicles} layerKey="vehicles" />
          <LayerControl id="demographics-toggle" label="Demographics (ACS)" config={layers.demographics} layerKey="demographics" />
        </CardContent>
      </Card>
      <Card className="bg-background/80 backdrop-blur-md border-border/50 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <MapIcon className="w-4 h-4 text-blue-500" />
            Legend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Access Score</div>
              <div className="h-2 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full" />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>0.0</span>
                <span>0.5</span>
                <span>1.0</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}