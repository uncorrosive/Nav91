import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import SearchBox from './map/SearchBox';
import LoadingOverlay from './map/LoadingOverlay';
import MapMarker from './map/MapMarker';
import MapControls from './map/MapControls';
import { useLocation } from '../services/LocationService';

interface MapProps {
  onLocationSelect?: (coords: [number, number]) => void;
  onSearchLocationChange?: (location: string) => void;
  searchedLocation?: string;
}

interface GeocodingFeature {
  place_name: string;
  center: [number, number];
  properties: Record<string, any>;
}

// Adjusted center to show entire continental USA
const DEFAULT_CENTER: [number, number] = [-130, 39.8283];
const DEFAULT_ZOOM = 3.5;
const MAPTILER_KEY = 'DFLjkvqxhcNMzypwWLiD';

export default function Map({ onLocationSelect, onSearchLocationChange, searchedLocation }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<GeocodingFeature[]>([]);
  const userMarker = useRef<maptilersdk.Marker | null>(null);
  const locationMarker = useRef<maptilersdk.Marker | null>(null);
  const { location: userLocation } = useLocation();
  const mapInitialized = useRef(false);
  const touchStartTime = useRef<number>(0);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!mapContainer.current || mapInitialized.current) return;

    const createMarkerElement = (type: 'user' | 'location') => {
      const el = document.createElement('div');
      el.className = `${type}-marker w-6 h-6 -translate-x-1/2 -translate-y-1/2`;
      const root = document.createElement('div');
      el.appendChild(root);
      root.innerHTML = `<div class="w-full h-full bg-blue-500 rounded-full border-2 border-white shadow-lg relative">
        <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
      </div>`;
      return el;
    };

    const initializeMap = async () => {
      try {
        // Ensure MapTiler SDK is properly configured
        if (!maptilersdk.config.apiKey) {
          maptilersdk.config.apiKey = MAPTILER_KEY;
        }

        // Create map instance with error handling
        try {
          map.current = new maptilersdk.Map({
            container: mapContainer.current!,
            style: maptilersdk.MapStyle.STREETS,
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            pitch: 0,
            bearing: 0,
            antialias: true,
            maxZoom: 18,
            minZoom: 2,
            dragRotate: false,
            touchZoomRotate: true,
            touchPitch: false,
            failIfMajorPerformanceCaveat: true
          });
        } catch (error) {
          console.error('Map creation error:', error);
          setMapError('Failed to create map instance');
          setLoading(false);
          return;
        }

        // Initialize markers
        userMarker.current = new maptilersdk.Marker({
          element: createMarkerElement('user'),
          draggable: false
        });

        locationMarker.current = new maptilersdk.Marker({
          element: createMarkerElement('location'),
          draggable: false
        });

        // Handle map load event
        map.current.on('load', () => {
          if (!map.current) return;

          try {
            // Add 3D buildings layer
            map.current.addLayer({
              id: '3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 14,
              paint: {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': ['get', 'min_height'],
                'fill-extrusion-opacity': 0.6
              }
            });

            // Add user location marker if available
            if (userLocation?.coords && userMarker.current) {
              const coords: [number, number] = [
                userLocation.coords.longitude,
                userLocation.coords.latitude
              ];
              userMarker.current.setLngLat(coords).addTo(map.current);
            }

            setLoading(false);
            mapInitialized.current = true;
          } catch (error) {
            console.error('Error adding map layers:', error);
            setMapError('Error initializing map layers');
            setLoading(false);
          }
        });

        // Handle map error events
        map.current.on('error', (e) => {
          console.error('Map error:', e);
          setMapError('An error occurred while loading the map');
          setLoading(false);
        });

        // Add touch event listeners
        const touchStartHandler = (e: TouchEvent) => {
          if (e.touches.length === 1) {
            touchStartTime.current = Date.now();
            touchStartPos.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
            };
          }
        };

        const touchEndHandler = (e: TouchEvent) => {
          if (!map.current) return;

          const touchDuration = Date.now() - touchStartTime.current;
          const touchDistance = Math.hypot(
            e.changedTouches[0].clientX - touchStartPos.current.x,
            e.changedTouches[0].clientY - touchStartPos.current.y
          );

          if (touchDuration < 300 && touchDistance < 10) {
            const rect = mapContainer.current!.getBoundingClientRect();
            const x = e.changedTouches[0].clientX - rect.left;
            const y = e.changedTouches[0].clientY - rect.top;
            const point = map.current.unproject([x, y]);
            
            const coords: [number, number] = [point.lng, point.lat];
            if (locationMarker.current) {
              locationMarker.current.setLngLat(coords).addTo(map.current);
              
              map.current.easeTo({
                center: coords,
                zoom: 16,
                pitch: 45,
                duration: 1000
              });

              if (onLocationSelect) {
                onLocationSelect(coords);
              }
            }
          }
        };

        mapContainer.current.addEventListener('touchstart', touchStartHandler, { passive: true });
        mapContainer.current.addEventListener('touchend', touchEndHandler, { passive: true });

        // Cleanup function
        return () => {
          mapContainer.current?.removeEventListener('touchstart', touchStartHandler);
          mapContainer.current?.removeEventListener('touchend', touchEndHandler);
        };

      } catch (error) {
        console.error('Map initialization error:', error);
        setMapError('Failed to initialize map. Please refresh the page.');
        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (userMarker.current) {
        userMarker.current.remove();
        userMarker.current = null;
      }
      if (locationMarker.current) {
        locationMarker.current.remove();
        locationMarker.current = null;
      }
      mapInitialized.current = false;
    };
  }, [userLocation]);

  const handleSearch = async (query: string) => {
    if (!query || query.length <= 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?proximity=${userLocation?.coords.longitude || DEFAULT_CENTER[0]},${userLocation?.coords.latitude || DEFAULT_CENTER[1]}&limit=5&key=${MAPTILER_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Search service unavailable');
      }
      
      const data = await response.json();
      setSuggestions(Array.isArray(data.features) ? data.features : []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: GeocodingFeature) => {
    if (!map.current || !locationMarker.current || !suggestion?.center) return;

    const [lng, lat] = suggestion.center;
    locationMarker.current.setLngLat([lng, lat]).addTo(map.current);
    
    map.current.easeTo({
      center: [lng, lat],
      zoom: 16,
      pitch: 45,
      duration: 1500
    });

    if (onSearchLocationChange && suggestion.place_name) {
      onSearchLocationChange(suggestion.place_name);
    }

    setSuggestions([]);
  };

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
      
      <SearchBox
        onSearch={handleSearch}
        onSuggestionSelect={handleSuggestionSelect}
        suggestions={suggestions}
        onSearchChange={onSearchLocationChange || (() => {})}
        initialValue={searchedLocation}
      />
      
      <div className="rounded-lg overflow-hidden mb-4 shadow-xl border border-white/20">
        <div 
          ref={mapContainer}
          className={`h-[300px] w-full bg-black rounded-lg overflow-hidden ${
            loading ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          style={{ touchAction: 'pan-x pan-y' }}
        />
      </div>
      
      <MapControls map={map.current} />
    </div>
  );
}