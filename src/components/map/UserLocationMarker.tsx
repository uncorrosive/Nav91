import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';

interface UserLocationMarkerProps {
  map: maptilersdk.Map | null;
  position: [number, number] | null;
}

export default function UserLocationMarker({ map, position }: UserLocationMarkerProps) {
  const markerRef = useRef<maptilersdk.Marker | null>(null);
  const positionRef = useRef<[number, number] | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create marker element
    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.innerHTML = `
      <div class="relative w-6 h-6" style="transform: translate(-50%, -50%);">
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-blue-400 rounded-full opacity-75 animate-ping"></div>
        </div>
        <div class="absolute inset-0 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
      </div>
    `;

    // Create marker instance
    markerRef.current = new maptilersdk.Marker({
      element: el,
      anchor: 'center',
      draggable: false,
      rotationAlignment: 'map',
      pitchAlignment: 'map'
    });

    // Clean up
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map]);

  // Handle position updates
  useEffect(() => {
    if (!map || !markerRef.current || !position) return;

    // Store position
    positionRef.current = position;

    // Update marker position
    markerRef.current.setLngLat(position).addTo(map);

    // Force marker to maintain position during map movements
    const maintainPosition = () => {
      if (markerRef.current && positionRef.current) {
        markerRef.current.setLngLat(positionRef.current);
      }
    };

    // Add event listeners
    map.on('move', maintainPosition);
    map.on('zoom', maintainPosition);
    map.on('pitch', maintainPosition);
    map.on('rotate', maintainPosition);

    return () => {
      map.off('move', maintainPosition);
      map.off('zoom', maintainPosition);
      map.off('pitch', maintainPosition);
      map.off('rotate', maintainPosition);
    };
  }, [map, position]);

  return null;
}