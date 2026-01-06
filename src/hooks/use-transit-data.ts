import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchVehicles, fetchAlerts, SeptaAlert } from '@/lib/septa-api';
import { toast } from 'sonner';
const ACTIVE_ROUTES = ['MFL', 'BSL', '10', '11', '13', '15', '34', '36'];
export function useTransitData() {
  const [vehicles, setVehicles] = useState<GeoJSON.FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  const [alerts, setAlerts] = useState<SeptaAlert[]>([]);
  const [loading, setLoading] = useState(false);
  // Use a ref to track alerts for the toast comparison without triggering re-renders or dependency loops
  const alertsRef = useRef<SeptaAlert[]>([]);
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch vehicles for major lines
      const results = await Promise.all(ACTIVE_ROUTES.map(route => fetchVehicles(route)));
      const combinedFeatures = results.flatMap(res => res.features);
      setVehicles({
        type: 'FeatureCollection',
        features: combinedFeatures,
      });
      // Fetch alerts
      const newAlerts = await fetchAlerts();
      // Notify for new high-priority alerts (service disruptions)
      newAlerts.forEach(alert => {
        const isNew = !alertsRef.current.find(
          a => a.route_id === alert.route_id && a.last_updated === alert.last_updated
        );
        if (isNew && (alert.advisory_message || alert.detour_message)) {
          toast.warning(`Service Alert: ${alert.route_name}`, {
            description: alert.advisory_message || alert.detour_message,
            duration: 8000,
          });
        }
      });
      setAlerts(newAlerts);
      alertsRef.current = newAlerts;
    } catch (error) {
      console.error('Data polling error:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000); // 30s polling
    return () => clearInterval(interval);
  }, [refreshData]);
  return { vehicles, alerts, loading, refreshData };
}