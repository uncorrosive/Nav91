import React from 'react';
import { Compass, ZoomIn, ZoomOut, Crosshair, Focus } from 'lucide-react';
import * as maptilersdk from '@maptiler/sdk';
import { useLocation } from '../../services/LocationService';
import { MAP_CONFIG } from '../../config/mapConfig';

interface MapControlsProps {
  map: maptilersdk.Map | null;
}

export default function MapControls({ map }: MapControlsProps) {
  const { location: userLocation } = useLocation();

  const handleZoomIn = () => {
    if (!map) return;
    const newZoom = Math.min(map.getZoom() + 1, map.getMaxZoom());
    
    map.easeTo({
      zoom: newZoom,
      duration: MAP_CONFIG.ANIMATION_DURATION
    });
  };

  const handleZoomOut = () => {
    if (!map) return;
    const newZoom = Math.max(map.getZoom() - 1, map.getMinZoom());
    
    map.easeTo({
      zoom: newZoom,
      duration: MAP_CONFIG.ANIMATION_DURATION
    });
  };

  const handleResetBearing = () => {
    if (!map) return;
    map.easeTo({
      bearing: 0,
      pitch: 0,
      duration: MAP_CONFIG.ANIMATION_DURATION
    });
  };

  const handleCenterOnUser = () => {
    if (!map || !userLocation?.coords) return;
    
    map.flyTo({
      center: [userLocation.coords.longitude, userLocation.coords.latitude],
      zoom: MAP_CONFIG.USER_LOCATION_ZOOM,
      duration: MAP_CONFIG.ANIMATION_DURATION * 1.5
    });
  };

  const handleResetView = () => {
    if (!map) return;
    
    map.fitBounds(MAP_CONFIG.US_BOUNDS, {
      padding: 50,
      maxZoom: MAP_CONFIG.DEFAULT_ZOOM,
      duration: MAP_CONFIG.ANIMATION_DURATION
    });
  };

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={handleZoomIn}
        className="w-10 h-10 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-gray-700 active:scale-95 transform"
        aria-label="Zoom in"
      >
        <ZoomIn size={20} />
      </button>
      
      <button
        onClick={handleZoomOut}
        className="w-10 h-10 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-gray-700 active:scale-95 transform"
        aria-label="Zoom out"
      >
        <ZoomOut size={20} />
      </button>
      
      <button
        onClick={handleResetBearing}
        className="w-10 h-10 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-gray-700 active:scale-95 transform"
        aria-label="Reset bearing"
      >
        <Compass size={20} />
      </button>
      
      {userLocation && (
        <button
          onClick={handleCenterOnUser}
          className="w-10 h-10 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-gray-700 active:scale-95 transform"
          aria-label="Center on user location"
        >
          <Crosshair size={20} />
        </button>
      )}
      
      <button
        onClick={handleResetView}
        className="w-10 h-10 bg-black/80 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-gray-700 active:scale-95 transform"
        aria-label="Reset to US view"
      >
        <Focus size={20} />
      </button>
    </div>
  );
}