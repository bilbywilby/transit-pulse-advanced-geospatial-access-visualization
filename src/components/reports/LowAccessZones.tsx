import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const zones = [
  { id: 1, name: "Lower North Philly", avgScore: 0.18, landUse: "Residential", popDensity: "12,400/sqmi", priority: "CRITICAL" },
  { id: 2, name: "Southwest / Elmwood", avgScore: 0.24, landUse: "Mixed", popDensity: "8,200/sqmi", priority: "HIGH" },
  { id: 3, name: "Far Northeast", avgScore: 0.29, landUse: "Residential", popDensity: "4,500/sqmi", priority: "HIGH" },
  { id: 4, name: "Cobbs Creek", avgScore: 0.32, landUse: "Residential", popDensity: "15,100/sqmi", priority: "MEDIUM" },
  { id: 5, name: "Juniata Park", avgScore: 0.35, landUse: "Industrial", popDensity: "9,800/sqmi", priority: "MEDIUM" },
];
export function LowAccessZones() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">High Priority Transit Deserts</CardTitle>
        <CardDescription>Zones identified with high population density but suboptimal transit access scores.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[200px] text-xs font-bold uppercase tracking-wider">Zone / Neighborhood</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider">Avg. Score</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider">Primary Use</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider">Pop. Density</TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider">Intervention</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.id} className="hover:bg-white/5 border-border/50">
                <TableCell className="font-medium text-sm">{zone.name}</TableCell>
                <TableCell className="text-sm font-display text-red-400">{(zone.avgScore * 100).toFixed(1)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{zone.landUse}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{zone.popDensity}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    variant={zone.priority === 'CRITICAL' ? 'destructive' : zone.priority === 'HIGH' ? 'secondary' : 'outline'}
                    className="text-[10px] py-0"
                  >
                    {zone.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}