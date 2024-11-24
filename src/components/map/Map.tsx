import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import SearchBox from './SearchBox';
import LoadingOverlay from './LoadingOverlay';
import { useLocation } from '../../services/LocationService';
import { MAP_CONFIG } from '../../config/mapConfig';
import '@maptiler/sdk/dist/maptiler-sdk.css';

interface MapProps {
  selectedCoords?: [number, number] | null;
  userLocation?: any;
}

export default function Map({ selectedCoords, userLocation }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const locationMarker = useRef<maptilersdk.Marker | null>(null);
  const userLocationMarker = useRef<maptilersdk.Marker | null>(null);
  const mapInitialized = useRef(false);
  const initialLocationSet = useRef(false);
  const { location: currentLocation } = useLocation();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInitialized.current) return;

    try {
      maptilersdk.config.apiKey = MAP_CONFIG.API_KEY;

      // Create container for controls
      const controlContainer = document.createElement('div');
      controlContainer.className = 'map-controls-container';
      mapContainer.current.appendChild(controlContainer);

      const mapOptions = {
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: MAP_CONFIG.DEFAULT_CENTER,
        zoom: MAP_CONFIG.DEFAULT_ZOOM,
        pitch: 0,
        bearing: 0,
        antialias: true,
        minZoom: MAP_CONFIG.MIN_ZOOM,
        maxZoom: MAP_CONFIG.MAX_ZOOM,
        trackResize: true,
        attributionControl: false
      };

      map.current = new maptilersdk.Map(mapOptions);

      // Create marker for selected location
      const markerElement = document.createElement('div');
      markerElement.className = 'fixed-position-marker';
      markerElement.innerHTML = `
        <div class="relative w-6 h-6" style="transform: translate(-50%, -50%);">
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-blue-400 rounded-full opacity-75 animate-ping"></div>
          </div>
          <div class="absolute inset-0 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      `;

      locationMarker.current = new maptilersdk.Marker({
        element: markerElement,
        anchor: 'center'
      });

      // Create marker for user location
      const userMarkerElement = document.createElement('div');
      userMarkerElement.className = 'user-location-marker';
      userMarkerElement.innerHTML = `
        <div class="relative w-6 h-6" style="transform: translate(-50%, -50%);">
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-blue-400 rounded-full opacity-75 animate-ping"></div>
          </div>
          <div class="absolute inset-0 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      `;

      userLocationMarker.current = new maptilersdk.Marker({
        element: userMarkerElement,
        anchor: 'center',
        draggable: false,
        rotationAlignment: 'map',
        pitchAlignment: 'map'
      });

      map.current.on('load', () => {
        if (!map.current) return;

        // Add 3D buildings layer
        map.current.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6
          }
        });

        // Set initial bounds
        const sw = new maptilersdk.LngLat(MAP_CONFIG.BURLINGTON_BOUNDS[0][0], MAP_CONFIG.BURLINGTON_BOUNDS[0][1]);
        const ne = new maptilersdk.LngLat(MAP_CONFIG.BURLINGTON_BOUNDS[1][0], MAP_CONFIG.BURLINGTON_BOUNDS[1][1]);
        const bounds = new maptilersdk.LngLatBounds(sw, ne);

        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: MAP_CONFIG.DEFAULT_ZOOM,
          duration: 0
        });
        
        setLoading(false);
        mapInitialized.current = true;
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map');
      setLoading(false);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (locationMarker.current) {
        locationMarker.current.remove();
        locationMarker.current = null;
      }
      if (userLocationMarker.current) {
        userLocationMarker.current.remove();
        userLocationMarker.current = null;
      }
      mapInitialized.current = false;
      initialLocationSet.current = false;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !userLocationMarker.current || !currentLocation?.coords) return;

    const { latitude, longitude } = currentLocation.coords;
    const newPosition: [number, number] = [longitude, latitude];
    setUserPosition(newPosition);

    userLocationMarker.current
      .setLngLat(newPosition)
      .addTo(map.current);

    if (!initialLocationSet.current) {
      map.current.flyTo({
        center: newPosition,
        zoom: MAP_CONFIG.USER_LOCATION_ZOOM,
        pitch: 45,
        duration: MAP_CONFIG.ANIMATION_DURATION,
        essential: true
      });
      initialLocationSet.current = true;
    }
  }, [currentLocation]);

  useEffect(() => {
    if (!map.current || !locationMarker.current) return;

    locationMarker.current.remove();
    
    if (selectedCoords) {
      locationMarker.current
        .setLngLat(selectedCoords)
        .addTo(map.current);

      map.current.flyTo({
        center: selectedCoords,
        zoom: MAP_CONFIG.SELECTED_ZOOM,
        pitch: 45,
        duration: MAP_CONFIG.ANIMATION_DURATION
      });
    } else if (userPosition) {
      map.current.flyTo({
        center: userPosition,
        zoom: MAP_CONFIG.USER_LOCATION_ZOOM,
        pitch: 45,
        duration: MAP_CONFIG.ANIMATION_DURATION
      });
    }
  }, [selectedCoords, userPosition]);

  if (mapError) {
    return (
      <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-500 text-center">
        {mapError}
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && <LoadingOverlay />}
      
      <div className="relative">
        <div 
          ref={mapContainer}
          className={`h-[300px] w-full bg-black rounded-lg overflow-hidden ${
            loading ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          style={{ 
            isolation: 'isolate',
            contain: 'strict'
          }}
        />
        
        {/* Map overlay to prevent marker overflow */}
        <div className="absolute inset-0 pointer-events-none rounded-lg" style={{ 
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
        }} />
      </div>
    </div>
  );
}