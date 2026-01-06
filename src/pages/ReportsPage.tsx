import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Download, FileSpreadsheet, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreDistribution } from '@/components/reports/ScoreDistribution';
import { LowAccessZones } from '@/components/reports/LowAccessZones';
import { toast } from 'sonner';
export default function ReportsPage() {
  const handleExport = (type: string) => {
    toast.info(`Generating ${type} export...`, {
      description: "Your report will be ready in a few moments."
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/map" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Return to Map
            </Link>
            <h1 className="text-3xl font-display font-bold tracking-tight">Accessibility Analytics</h1>
            <p className="text-muted-foreground">Comprehensive evaluation of Philadelphia's transit connectivity and demographic equity.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('CSV')} className="gap-2">
              <FileSpreadsheet className="w-4 h-4" /> CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('PDF')} className="gap-2">
              <FileText className="w-4 h-4" /> PDF
            </Button>
          </div>
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Avg Access Score", value: "0.64", sub: "+2.1% from baseline" },
            { label: "Transit Deserts", value: "14", sub: "Priority zones identified" },
            { label: "Active Vehicles", value: "128", sub: "Real-time SEPTA feed" },
            { label: "Population Reached", value: "820k", sub: "Within 0.5mi of high-freq" }
          ].map((stat, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="p-4 pb-0">
                <CardDescription className="text-[10px] uppercase font-bold tracking-wider">{stat.label}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-[10px] text-emerald-500 font-medium">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScoreDistribution />
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex flex-col justify-center p-8 text-center space-y-4">
             <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Info className="w-6 h-6" />
             </div>
             <h3 className="font-bold">Demographic Context</h3>
             <p className="text-sm text-muted-foreground">
               Integration with 2022 ACS data reveals that 65% of low-access zones correlate with high-density rental markets. These areas are designated as high-priority for transit expansion.
             </p>
             <Link to="/map" className="text-primary text-sm font-semibold hover:underline">View Choropleth Overlay →</Link>
          </Card>
        </div>
        {/* Table Section */}
        <LowAccessZones />
      </div>
    </div>
  );
}