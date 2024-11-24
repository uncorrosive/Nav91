import { useState, useEffect } from 'react';

export interface Location {
  name: string;
  city: string;
  fullAddress: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  accuracy?: number;
  timestamp?: number;
}

async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  try {
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=DFLjkvqxhcNMzypwWLiD`
    );
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const location = data.features[0];
      const parts = location.place_name.split(',').map((part: string) => part.trim());
      if (parts.length >= 2) {
        return `${parts[0]}, ${parts[1]}`;
      }
      return parts[0];
    }
    return 'Location Found';
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return 'Location Found';
  }
}

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    let mounted = true;
    let watchId: number | null = null;

    const handleSuccess = async (position: GeolocationPosition) => {
      if (!mounted) return;

      const { latitude, longitude, accuracy } = position.coords;
      
      try {
        const address = await reverseGeocode(latitude, longitude);
        
        const newLocation: Location = {
          name: address,
          city: address,
          fullAddress: address,
          coords: { latitude, longitude },
          accuracy,
          timestamp: position.timestamp
        };

        setLocation(newLocation);
        setLoading(false);
        setPermissionDenied(false);
        setError(null);
      } catch (error) {
        console.error('Location error:', error);
        setError('Error getting location details');
        setLoading(false);
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      if (!mounted) return;
      console.warn('Geolocation error:', error.message);
      setPermissionDenied(error.code === error.PERMISSION_DENIED);
      setError(error.message);
      setLoading(false);
    };

    const options: PositionOptions = {
      enableHighAccuracy: true, // Request high accuracy
      timeout: 10000, // 10 second timeout
      maximumAge: 0 // Always get fresh position
    };

    if (navigator.geolocation) {
      // Get initial position quickly
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
      
      // Then start watching with high accuracy
      watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, options);
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }

    return () => {
      mounted = false;
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return {
    location,
    loading,
    error,
    permissionDenied,
    setLocation // Expose setLocation for manual updates
  };
}