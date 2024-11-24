import React, { useState, useCallback } from 'react';
import { MapPin, Navigation, Building2, ArrowRight, Compass } from 'lucide-react';
import Map from './map/Map';
import { useLocation } from '../services/LocationService';
import { getNavigationDirections } from '../services/NavigationService';
import type { Place, Building } from '../types/navigation';
import { MAP_CONFIG } from '../config/mapConfig';

// ... (PLACES constant remains the same)

export default function SimpleNavigation() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [directions, setDirections] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { location: userLocation } = useLocation();

  const handlePlaceSelect = useCallback((place: Place) => {
    if (selectedPlace?.id === place.id) {
      // Deselect if clicking the same place
      setSelectedPlace(null);
      setSelectedBuilding(null);
      setSelectedCoords(null);
      setDirections(null);
      
      // Center on user location if available, otherwise use default US center
      if (userLocation?.coords) {
        setSelectedCoords([userLocation.coords.longitude, userLocation.coords.latitude]);
      } else {
        setSelectedCoords(MAP_CONFIG.DEFAULT_CENTER);
      }
    } else {
      // Select new place
      setSelectedPlace(place);
      setSelectedBuilding(null);
      setSelectedCoords(place.coords);
      setDirections(null);
    }
  }, [selectedPlace, userLocation]);

  // ... (rest of the component remains exactly the same)