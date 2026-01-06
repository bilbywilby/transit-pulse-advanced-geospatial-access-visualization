import React, { useMemo } from 'react';
import Map, { Source, Layer, NavigationControl, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MOCK_PARCELS, MOCK_STOPS } from '@/lib/mock-geo-data';
interface MapContainerProps {
  layers: {
    parcels: boolean;
    stops: boolean;
    vehicles: boolean;
    demographics: boolean;
  };
  liveVehicles: GeoJSON.FeatureCollection;
  onFeatureClick: (feature: any | null) => void;
}
export function MapContainer({ layers, liveVehicles, onFeatureClick }: MapContainerProps) {
  const initialViewState = {
    longitude: -75.1652,
    latitude: 39.9526,
    zoom: 13,
  };
  const parcelLayerStyle: any = useMemo(() => ({
    id: 'parcels-layer',
    type: 'fill',
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'transit_access_score_norm'],
        0, '#ef4444',
        0.5, '#f59e0b',
        1, '#10b981'
      ],
      'fill-opacity': 0.6,
      'fill-outline-color': '#ffffff',
    },
  }), []);
  const liveVehicleLayerStyle: any = useMemo(() => ({
    id: 'live-vehicles-layer',
    type: 'circle',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10, 4,
        15, 8
      ],
      'circle-color': [
        'case',
        ['>', ['get', 'delay'], 10], '#ef4444',
        ['>', ['get', 'delay'], 5], '#f59e0b',
        '#10b981'
      ],
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
      'circle-opacity': 0.9,
    },
  }), []);
  const stopLayerStyle: any = useMemo(() => ({
    id: 'stops-layer',
    type: 'circle',
    paint: {
      'circle-radius': 6,
      'circle-color': '#3b82f6',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
    },
  }), []);
  // Mock Demographics (ACS Tracts)
  const demographicLayerStyle: any = useMemo(() => ({
    id: 'demographic-layer',
    type: 'fill',
    paint: {
      'fill-color': '#6366f1',
      'fill-opacity': 0.3,
      'fill-outline-color': '#818cf8',
    },
  }), []);
  const handleClick = (e: MapLayerMouseEvent) => {
    const feature = e.features && e.features[0];
    if (feature) {
      onFeatureClick(feature);
    } else {
      onFeatureClick(null);
    }
  };
  return (
    <div className="w-full h-full relative">
      <Map
        initialViewState={initialViewState}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        interactiveLayerIds={['parcels-layer', 'stops-layer', 'live-vehicles-layer']}
        onClick={handleClick}
      >
        <NavigationControl position="bottom-right" />
        {layers.demographics && (
          <Source id="demographics" type="geojson" data={MOCK_PARCELS}>
            <Layer {...demographicLayerStyle} />
          </Source>
        )}
        {layers.parcels && (
          <Source id="parcels" type="geojson" data={MOCK_PARCELS}>
            <Layer {...parcelLayerStyle} />
          </Source>
        )}
        {layers.stops && (
          <Source id="stops" type="geojson" data={MOCK_STOPS}>
            <Layer {...stopLayerStyle} />
          </Source>
        )}
        {layers.vehicles && liveVehicles && (
          <Source id="live-vehicles" type="geojson" data={liveVehicles}>
            <Layer {...liveVehicleLayerStyle} />
          </Source>
        )}
      </Map>
    </div>
  );
}