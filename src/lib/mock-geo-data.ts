export const MOCK_PARCELS: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 250 }).map((_, i) => ({
    type: 'Feature',
    id: i,
    properties: {
      id: `p-${i}`,
      address: `${100 + i} Market St, Philadelphia, PA`,
      transit_access_score_norm: Math.random(),
      neighborhood_avg_score: 0.4 + Math.random() * 0.2,
      income_decile: Math.floor(Math.random() * 10) + 1,
      land_use: i % 3 === 0 ? 'Residential' : i % 3 === 1 ? 'Commercial' : 'Industrial',
      sqft: 1200 + Math.floor(Math.random() * 5000),
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-75.1652 + (Math.random() - 0.5) * 0.1, 39.9526 + (Math.random() - 0.5) * 0.1],
        [-75.1632 + (Math.random() - 0.5) * 0.1, 39.9526 + (Math.random() - 0.5) * 0.1],
        [-75.1632 + (Math.random() - 0.5) * 0.1, 39.9506 + (Math.random() - 0.5) * 0.1],
        [-75.1652 + (Math.random() - 0.5) * 0.1, 39.9506 + (Math.random() - 0.5) * 0.1],
        [-75.1652 + (Math.random() - 0.5) * 0.1, 39.9526 + (Math.random() - 0.5) * 0.1],
      ]],
    },
  })),
};
export const MOCK_STOPS: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 40 }).map((_, i) => ({
    type: 'Feature',
    id: i + 300,
    properties: {
      stop_id: `stop-${i}`,
      stop_name: i % 2 === 0 ? `Station ${i} (Blue Line)` : `Bus Stop ${i}`,
      routes: i % 2 === 0 ? 'MFL, 21, 42' : '17, 33, 48',
    },
    geometry: {
      type: 'Point',
      coordinates: [-75.1652 + (Math.random() - 0.5) * 0.15, 39.9526 + (Math.random() - 0.5) * 0.15],
    },
  })),
};
export const MOCK_TRACTS: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 15 }).map((_, i) => ({
    type: 'Feature',
    id: i + 500,
    properties: {
      tract_id: `tract-${i}`,
      income_decile: Math.floor(Math.random() * 10) + 1,
      population: 2000 + Math.floor(Math.random() * 3000),
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-75.2000 + (i * 0.01), 39.9200 + (i * 0.005)],
        [-75.1800 + (i * 0.01), 39.9200 + (i * 0.005)],
        [-75.1800 + (i * 0.01), 39.9400 + (i * 0.005)],
        [-75.2000 + (i * 0.01), 39.9400 + (i * 0.005)],
        [-75.2000 + (i * 0.01), 39.9200 + (i * 0.005)],
      ]],
    },
  })),
};
export const MOCK_VEHICLES: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 12 }).map((_, i) => ({
    type: 'Feature',
    id: i + 1000,
    properties: {
      vehicle_id: `v-${i}`,
      route: i % 3 === 0 ? 'MFL' : i % 3 === 1 ? 'BSL' : 'Bus 42',
      delay: Math.floor(Math.random() * 15),
      status: 'Tracking',
    },
    geometry: {
      type: 'Point',
      coordinates: [-75.1652 + (Math.random() - 0.5) * 0.1, 39.9526 + (Math.random() - 0.5) * 0.1],
    },
  })),
};