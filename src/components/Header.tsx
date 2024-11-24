import React, { useState } from 'react';
import { useLocation } from '../services/LocationService';
import { MapPin } from 'lucide-react';
import { GradientButton } from './ui/GradientButton';

export default function Header() {
  const { location: userLocation, loading } = useLocation();
  const [locationLoading, setLocationLoading] = useState(false);
  
  const handleLocationAccess = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setLocationLoading(true);
    try {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    } catch (error) {
      if (error instanceof GeolocationPositionError && error.code === error.PERMISSION_DENIED) {
        alert('Please enable location access in your browser settings to use this feature');
      }
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="glass-card">
        <div className="max-w-7xl mx-auto">
          <div className="h-20 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-2xl text-blue-600 dark:text-blue-400">NavPoint</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              ) : userLocation ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {userLocation.fullAddress}
                  </span>
                </div>
              ) : (
                <GradientButton
                  onClick={handleLocationAccess}
                  loading={locationLoading}
                  variant="instagram"
                  size="sm"
                  className="w-auto"
                >
                  <MapPin className="w-4 h-4" />
                  Enable Location
                </GradientButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}