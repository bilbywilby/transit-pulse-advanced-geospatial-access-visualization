import React, { useMemo } from 'react';
import Map, { Source, Layer, NavigationControl, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MOCK_PARCELS, MOCK_STOPS, MOCK_VEHICLES } from '@/lib/mock-geo-data';
interface MapContainerProps {
  layers: {
    parcels: boolean;
    stops: boolean;
    vehicles: boolean;
  };
  onFeatureClick: (feature: any | null) => void;
}
export function MapContainer({ layers, onFeatureClick }: MapContainerProps) {
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
  const vehicleLayerStyle: any = useMemo(() => ({
    id: 'vehicles-layer',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#ec4899',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
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
        interactiveLayerIds={['parcels-layer', 'stops-layer']}
        onClick={handleClick}
      >
        <NavigationControl position="bottom-right" />
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
        {layers.vehicles && (
          <Source id="vehicles" type="geojson" data={MOCK_VEHICLES}>
            <Layer {...vehicleLayerStyle} />
          </Source>
        )}
      </Map>
    </div>
  );
}