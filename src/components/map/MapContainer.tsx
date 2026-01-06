import React, { useMemo, useEffect, useRef } from 'react';
import Map, { Source, Layer, NavigationControl, MapLayerMouseEvent, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MOCK_PARCELS, MOCK_STOPS, MOCK_TRACTS } from '@/lib/mock-geo-data';
import { MapLayersConfig } from './MapControls';
interface MapContainerProps {
  layers: MapLayersConfig;
  liveVehicles: GeoJSON.FeatureCollection;
  onFeatureClick: (feature: any | null) => void;
  flyToRequest?: { lng: number; lat: number; zoom?: number } | null;
}
export function MapContainer({ layers, liveVehicles, onFeatureClick, flyToRequest }: MapContainerProps) {
  const mapRef = useRef<MapRef>(null);
  const initialViewState = {
    longitude: -75.1652,
    latitude: 39.9526,
    zoom: 13,
    pitch: 45,
  };
  useEffect(() => {
    if (flyToRequest && mapRef.current) {
      mapRef.current.flyTo({
        center: [flyToRequest.lng, flyToRequest.lat],
        zoom: flyToRequest.zoom || 15,
        duration: 2000,
        essential: true
      });
    }
  }, [flyToRequest]);
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
      'fill-opacity': layers.parcels.opacity,
      'fill-outline-color': '#ffffff',
      'fill-outline-opacity': layers.parcels.opacity * 0.5,
    },
  }), [layers.parcels.opacity]);
  const liveVehicleLayerStyle: any = useMemo(() => ({
    id: 'live-vehicles-layer',
    type: 'circle',
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 4, 15, 10],
      'circle-color': [
        'case',
        ['>', ['get', 'delay'], 10], '#ef4444',
        ['>', ['get', 'delay'], 5], '#f59e0b',
        '#10b981'
      ],
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
      'circle-opacity': layers.vehicles.opacity,
      'circle-stroke-opacity': layers.vehicles.opacity,
    },
  }), [layers.vehicles.opacity]);
  const stopLayerStyle: any = useMemo(() => ({
    id: 'stops-layer',
    type: 'circle',
    paint: {
      'circle-radius': 6,
      'circle-color': '#3b82f6',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
      'circle-opacity': layers.stops.opacity,
      'circle-stroke-opacity': layers.stops.opacity,
    },
  }), [layers.stops.opacity]);
  const demographicLayerStyle: any = useMemo(() => ({
    id: 'demographic-layer',
    type: 'fill',
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'income_decile'],
        1, '#fee2e2',
        10, '#1e3a8a'
      ],
      'fill-opacity': layers.demographics.opacity,
      'fill-outline-color': '#ffffff',
      'fill-outline-opacity': layers.demographics.opacity * 0.3,
    },
  }), [layers.demographics.opacity]);
  const handleClick = (e: MapLayerMouseEvent) => {
    const feature = e.features && e.features[0];
    onFeatureClick(feature || null);
  };
  return (
    <div className="w-full h-full relative">
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        interactiveLayerIds={['parcels-layer', 'stops-layer', 'live-vehicles-layer']}
        onClick={handleClick}
      >
        <NavigationControl position="bottom-right" />
        {layers.demographics.visible && (
          <Source id="demographics" type="geojson" data={MOCK_TRACTS}>
            <Layer {...demographicLayerStyle} />
          </Source>
        )}
        {layers.parcels.visible && (
          <Source id="parcels" type="geojson" data={MOCK_PARCELS}>
            <Layer {...parcelLayerStyle} />
          </Source>
        )}
        {layers.stops.visible && (
          <Source id="stops" type="geojson" data={MOCK_STOPS}>
            <Layer {...stopLayerStyle} />
          </Source>
        )}
        {layers.vehicles.visible && liveVehicles && (
          <Source id="live-vehicles" type="geojson" data={liveVehicles}>
            <Layer {...liveVehicleLayerStyle} />
          </Source>
        )}
      </Map>
    </div>
  );
}