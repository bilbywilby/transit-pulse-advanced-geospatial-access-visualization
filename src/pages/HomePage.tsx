import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Map, Database, ArrowRight, BarChart3, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ThemeToggle />
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold mb-8 animate-fade-in">
            <Sparkles className="w-3 h-3" />
            <span className="flex items-center gap-2">
               V1.2 - Real-time SEPTA Feed Active
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-foreground mb-6 animate-slide-up">
            Transit <span className="text-emerald-500">Pulse</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed animate-slide-up [animation-delay:200ms]">
            Visualize urban accessibility in real-time. Mapping 500,000+ parcels against high-frequency transit networks to reveal the heartbeat of city mobility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:400ms]">
            <Link to="/map">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white h-14 px-8 text-lg gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                Launch Visualizer <Map className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/reports">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 gap-2 bg-background/50 backdrop-blur">
                <BarChart3 className="w-5 h-5" /> View Analytics
              </Button>
            </Link>
          </div>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl animate-fade-in [animation-delay:600ms]">
            {[
              {
                icon: <Activity className="w-6 h-6" />,
                title: "Live Vehicle Intel",
                desc: "Direct integration with SEPTA GTFS-realtime APIs for live delay monitoring and status tracking."
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: "Equity Analysis",
                desc: "Accessibility scoring overlaid with ACS socio-economic data to identify transit gaps."
              },
              {
                icon: <Map className="w-6 h-6" />,
                title: "Vector Pipeline",
                desc: "Hardware-accelerated rendering for thousands of parcel polygons at 60fps."
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm text-left hover:border-emerald-500/50 transition-all hover:bg-card/50">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="absolute bottom-8 left-0 right-0 text-center text-xs text-muted-foreground/30 tracking-widest uppercase font-mono">
        Geospatial Node: PHL-METRO-01 // Real-time
      </footer>
    </div>
  );
}