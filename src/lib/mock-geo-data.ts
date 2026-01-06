export const MOCK_PARCELS: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 50 }).map((_, i) => ({
    type: 'Feature',
    id: i,
    properties: {
      id: `p-${i}`,
      address: `${100 + i} Market St, Philadelphia, PA`,
      transit_access_score_norm: Math.random(),
      land_use: i % 3 === 0 ? 'Residential' : i % 3 === 1 ? 'Commercial' : 'Industrial',
      sqft: 1200 + Math.floor(Math.random() * 5000),
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-75.1652 + (Math.random() - 0.5) * 0.02, 39.9526 + (Math.random() - 0.5) * 0.02],
        [-75.1632 + (Math.random() - 0.5) * 0.02, 39.9526 + (Math.random() - 0.5) * 0.02],
        [-75.1632 + (Math.random() - 0.5) * 0.02, 39.9506 + (Math.random() - 0.5) * 0.02],
        [-75.1652 + (Math.random() - 0.5) * 0.02, 39.9506 + (Math.random() - 0.5) * 0.02],
        [-75.1652 + (Math.random() - 0.5) * 0.02, 39.9526 + (Math.random() - 0.5) * 0.02],
      ]],
    },
  })),
};
export const MOCK_STOPS: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 15 }).map((_, i) => ({
    type: 'Feature',
    id: i + 100,
    properties: {
      stop_id: `stop-${i}`,
      stop_name: i % 2 === 0 ? `Station ${i} (Blue Line)` : `Bus Stop ${i}`,
      routes: i % 2 === 0 ? 'MFL, 21, 42' : '17, 33',
    },
    geometry: {
      type: 'Point',
      coordinates: [-75.1652 + (Math.random() - 0.5) * 0.03, 39.9526 + (Math.random() - 0.5) * 0.03],
    },
  })),
};
export const MOCK_VEHICLES: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 8 }).map((_, i) => ({
    type: 'Feature',
    id: i + 200,
    properties: {
      vehicle_id: `v-${i}`,
      route: i % 2 === 0 ? 'MFL' : 'Bus 42',
      status: 'On Time',
    },
    geometry: {
      type: 'Point',
      coordinates: [-75.1652 + (Math.random() - 0.5) * 0.03, 39.9526 + (Math.random() - 0.5) * 0.03],
    },
  })),
};