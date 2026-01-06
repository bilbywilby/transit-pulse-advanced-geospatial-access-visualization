import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Map, Database, ArrowRight } from 'lucide-react';
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
            V1.0 Advanced Analytics Platform
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-foreground mb-6 animate-slide-up">
            Transit <span className="text-gradient">Pulse</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed animate-slide-up [animation-delay:200ms]">
            Visualize urban accessibility like never before. Mapping thousands of parcels against high-frequency transit networks to reveal the heartbeat of city mobility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:400ms]">
            <Link to="/map">
              <Button size="lg" className="btn-gradient h-14 px-8 text-lg gap-2">
                Launch Visualization <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
              View Case Study
            </Button>
          </div>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl animate-fade-in [animation-delay:600ms]">
            {[
              { 
                icon: <Database className="w-6 h-6" />, 
                title: "Enriched Data", 
                desc: "Parcels integrated with ACS demographics and transit GTFS real-time feeds." 
              },
              { 
                icon: <Map className="w-6 h-6" />, 
                title: "Vector Rendering", 
                desc: "High-performance GL canvas capable of handling massive urban datasets smoothly." 
              },
              { 
                icon: <Sparkles className="w-6 h-6" />, 
                title: "Spatial Intelligence", 
                desc: "Proprietary access scoring algorithm identifying transit deserts and opportunities." 
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-left hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="absolute bottom-8 left-0 right-0 text-center text-xs text-muted-foreground/50 tracking-widest uppercase">
        Built with high-frequency geospatial intelligence
      </footer>
    </div>
  );
}