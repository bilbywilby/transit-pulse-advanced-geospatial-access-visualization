import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MapPin, Building2, Bus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface FeatureInspectorProps {
  feature: any | null;
  onClose: () => void;
}
export function FeatureInspector({ feature, onClose }: FeatureInspectorProps) {
  if (!feature) return null;
  const props = feature.properties;
  const isParcel = !!props.transit_access_score_norm;
  const isStop = !!props.stop_id;
  return (
    <div className="absolute top-4 right-4 z-10 w-80 animate-in slide-in-from-right-4 duration-300">
      <Card className="bg-background/90 backdrop-blur-md border-border/50 shadow-xl">
        <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold truncate pr-4">
            {isParcel ? 'Parcel Details' : isStop ? 'Stop Details' : 'Feature Info'}
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {isParcel && (
            <>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">Address</span>
                </div>
                <div className="text-sm font-medium">{props.address}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/50 rounded-lg space-y-1 border border-border/30">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Access Score</div>
                  <div className="text-xl font-display font-bold text-emerald-500">
                    {(props.transit_access_score_norm * 100).toFixed(1)}
                  </div>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg space-y-1 border border-border/30">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Land Use</div>
                  <div className="text-sm font-semibold truncate">{props.land_use}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-3 h-3" />
                  <span className="text-xs">Total Area</span>
                </div>
                <div className="text-sm font-medium">{props.sqft.toLocaleString()} sqft</div>
              </div>
            </>
          )}
          {isStop && (
            <>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Bus className="w-3 h-3" />
                  <span className="text-xs">Stop Name</span>
                </div>
                <div className="text-sm font-medium">{props.stop_name}</div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">Served Routes</div>
                <div className="flex flex-wrap gap-1">
                  {props.routes.split(',').map((r: string) => (
                    <Badge key={r} variant="outline" className="text-[10px] py-0">{r.trim()}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="pt-2">
             <Button variant="secondary" className="w-full text-xs h-8">View Demographics</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}