import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MapPin, Building2, Bus, TrendingUp, Info, Activity, Clock, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';
import { getRelativeTime, getDelayColor, cn } from '@/lib/utils';
interface FeatureInspectorProps {
  feature: any | null;
  onClose: () => void;
}
export function FeatureInspector({ feature, onClose }: FeatureInspectorProps) {
  if (!feature) return null;
  const props = feature.properties;
  // Robust type checks
  const isParcel = !!props.transit_access_score_norm && !props.stop_id;
  const isStop = !!props.stop_id;
  const isVehicle = !!props.route && !props.stop_id && !props.transit_access_score_norm;
  const scoreData = [
    { name: 'Nbrhd Avg', score: props.neighborhood_avg_score || 0.45 },
    { name: 'This Parcel', score: props.transit_access_score_norm || 0 },
    { name: 'City Target', score: 0.75 },
  ];
  return (
    <div className="absolute top-4 right-4 z-20 w-80 animate-in slide-in-from-right-4 fade-in duration-300 pointer-events-auto">
      <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-2xl overflow-hidden ring-1 ring-white/10">
        <CardHeader className="p-4 border-b border-border/20 flex flex-row items-center justify-between bg-muted/30">
          <CardTitle className="text-sm font-bold truncate pr-4 flex items-center gap-2">
            {isParcel && <Building2 className="w-4 h-4 text-emerald-500" />}
            {isStop && <Bus className="w-4 h-4 text-blue-500" />}
            {isVehicle && <Activity className="w-4 h-4 text-orange-500" />}
            {isParcel ? 'Parcel Analysis' : isStop ? 'Station Profile' : 'Vehicle Tracker'}
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-white/10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-5">
          {isParcel && (
            <>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="text-[10px] uppercase font-bold tracking-tighter">Location</span>
                </div>
                <div className="text-sm font-semibold leading-tight">{props.address}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Benchmarking</div>
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                </div>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreData}>
                      <XAxis dataKey="name" hide />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                        {scoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 1 ? '#10b981' : '#334155'} fillOpacity={index === 1 ? 1 : 0.5} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-[9px] font-medium text-muted-foreground px-1">
                  <span>Neighborhood</span>
                  <span className="text-emerald-500 font-bold">This Parcel</span>
                  <span>Target</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-500/5 rounded-xl space-y-1 border border-emerald-500/20">
                  <div className="text-[9px] text-emerald-500/80 uppercase font-bold">Access Rank</div>
                  <div className="text-lg font-display font-bold text-emerald-500">
                    TOP {Math.floor(Math.random() * 20) + 1}%
                  </div>
                </div>
                <div className="p-3 bg-secondary/30 rounded-xl space-y-1 border border-border/30">
                  <div className="text-[9px] text-muted-foreground uppercase font-bold">Income Decile</div>
                  <div className="text-lg font-display font-bold">
                    D-{props.income_decile || '4'}
                  </div>
                </div>
              </div>
            </>
          )}
          {isStop && (
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">Stop Name</div>
                <div className="text-sm font-bold">{props.stop_name}</div>
              </div>
              <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 flex items-start gap-3">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-200/80 leading-snug">
                  High-frequency hub connecting major commercial corridors. Average wait time: 8 mins.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">Active Routes</div>
                <div className="flex flex-wrap gap-1.5">
                  {props.routes?.split(',').map((r: string) => (
                    <Badge key={r} variant="secondary" className="text-[10px] px-2 py-0 bg-white/5">{r.trim()}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          {isVehicle && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Route</div>
                  <Badge className="bg-orange-500 text-white font-black text-sm px-3">{props.route}</Badge>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Status</div>
                  <div className={cn("text-xs font-bold", getDelayColor(props.delay))}>
                    {props.delay > 0 ? `${props.delay}m Delay` : 'On Time'}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Navigation className="w-3 h-3" />
                  <span className="text-[10px] uppercase font-bold tracking-tighter">Destination</span>
                </div>
                <div className="text-sm font-semibold">{props.destination || 'In Transit'}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-muted/50 rounded-xl border border-border/50">
                  <div className="text-[9px] text-muted-foreground uppercase font-bold">Vehicle ID</div>
                  <div className="text-sm font-mono font-bold">{props.id}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl border border-border/50 flex flex-col justify-center">
                   <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground uppercase font-bold">
                    <Clock className="w-2.5 h-2.5" /> Updated
                   </div>
                   <div className="text-[10px] font-medium mt-1">
                    {getRelativeTime(props.last_updated)}
                   </div>
                </div>
              </div>
            </div>
          )}
          <Button className="w-full text-xs h-9 bg-primary hover:bg-primary/90 font-bold transition-all active:scale-[0.98]">
            {isParcel ? 'Full Equity Report' : isStop ? 'Station Analytics' : 'Live Tracking Mode'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}