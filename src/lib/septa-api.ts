export interface SeptaVehicle {
  lat: string;
  lng: string;
  label: string;
  vehicleid: string;
  BlockID: string;
  Direction: string;
  destination: string;
  Offset: string;
  Offset_sec: string;
  delay: string;
}
export interface SeptaAlert {
  route_id: string;
  route_name: string;
  current_message: string;
  advisory_message: string;
  detour_message: string;
  last_updated: string;
}
const BASE_URL = 'https://www3.septa.org/api';
export const fetchVehicles = async (route: string): Promise<GeoJSON.FeatureCollection> => {
  try {
    const response = await fetch(`${BASE_URL}/TransitView/index.php?route=${route}`);
    if (!response.ok) throw new Error(`SEPTA API error: ${response.statusText}`);
    const data = await response.json();
    const vehicles: SeptaVehicle[] = data.bus || data.vehicles || [];
    return {
      type: 'FeatureCollection',
      features: vehicles.map((v) => ({
        type: 'Feature',
        id: v.vehicleid,
        properties: {
          id: v.vehicleid,
          route: route,
          destination: v.destination,
          delay: parseInt(v.delay || '0', 10),
          last_updated: new Date().toISOString(),
          status: parseInt(v.delay || '0', 10) > 5 ? 'Delayed' : 'On Time'
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(v.lng), parseFloat(v.lat)],
        },
      })),
    };
  } catch (error) {
    console.error(`Failed to fetch vehicles for route ${route}:`, error);
    return { type: 'FeatureCollection', features: [] };
  }
};
export const fetchAlerts = async (): Promise<SeptaAlert[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Alerts/index.php`);
    if (!response.ok) throw new Error('Failed to fetch SEPTA alerts');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch SEPTA alerts:', error);
    return [];
  }
};