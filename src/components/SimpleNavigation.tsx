import React, { useState, useCallback } from 'react';
import { MapPin, Navigation, Building2, Compass } from 'lucide-react';
import Map from './map/Map';
import { useLocation } from '../services/LocationService';
import { getNavigationDirections } from '../services/NavigationService';
import type { Place, Building } from '../types/navigation';
import { MAP_CONFIG } from '../config/mapConfig';
import { GradientButton } from './ui/GradientButton';
import PlaceCard from './cards/PlaceCard';
import BuildingCard from './cards/BuildingCard';

const PLACES: Place[] = [
  {
    id: 'uvm',
    name: 'University of Vermont',
    description: 'Main campus of the University of Vermont, featuring historic buildings and modern facilities.',
    icon: 'university',
    coords: [-73.1945, 44.4755],
    buildings: [
      {
        id: 'waterman',
        name: 'Waterman Building',
        description: 'Historic administrative building and central landmark of UVM.',
        icon: 'building',
        coords: [-73.1945, 44.4755],
        amenities: ['Administrative Offices', 'Classrooms', 'Conference Rooms']
      },
      {
        id: 'given',
        name: 'Given Building',
        description: 'Medical sciences and research facility.',
        icon: 'lab',
        coords: [-73.1913, 44.4770],
        amenities: ['Research Labs', 'Lecture Halls', 'Study Areas']
      },
      {
        id: 'billings',
        name: 'Billings Library',
        description: 'Historic library and study center.',
        icon: 'library',
        coords: [-73.1888, 44.4760],
        amenities: ['Study Rooms', 'Computer Lab', 'Special Collections']
      },
      {
        id: 'davis',
        name: 'Davis Center',
        description: 'Student center and campus hub.',
        icon: 'student-center',
        coords: [-73.1871, 44.4743],
        amenities: ['Dining', 'Bookstore', 'Meeting Rooms']
      },
      {
        id: 'living-learning',
        name: 'Living/Learning Center',
        description: 'Residential and academic complex.',
        icon: 'residential',
        coords: [-73.1900, 44.4778],
        amenities: ['Classrooms', 'Dining Hall', 'Performance Space']
      },
      {
        id: 'patrick-gym',
        name: 'Patrick Gymnasium',
        description: 'Athletic and recreation facility.',
        icon: 'gym',
        coords: [-73.1877, 44.4762],
        amenities: ['Fitness Center', 'Basketball Courts', 'Swimming Pool']
      },
      {
        id: 'fleming',
        name: 'Fleming Museum',
        description: 'Art museum and cultural center.',
        icon: 'museum',
        coords: [-73.1930, 44.4750],
        amenities: ['Galleries', 'Gift Shop', 'Education Center']
      }
    ]
  },
  {
    id: 'medical-center',
    name: 'UVM Medical Center',
    description: "Vermont's largest hospital and Level 1 Trauma Center.",
    icon: 'hospital',
    coords: [-73.2108, 44.4772],
    buildings: [
      {
        id: 'main-hospital',
        name: 'Main Hospital',
        description: 'Primary hospital building with emergency services.',
        icon: 'hospital',
        coords: [-73.2108, 44.4772],
        amenities: ['Emergency Room', 'Patient Rooms', 'Cafeteria']
      },
      {
        id: 'maternity',
        name: 'Maternity Center',
        description: 'Specialized center for maternal and infant care.',
        icon: 'maternity',
        coords: [-73.2100, 44.4770],
        amenities: ['Labor & Delivery', 'NICU', 'Family Rooms']
      },
      {
        id: 'cancer-center',
        name: 'Cancer Center',
        description: 'Comprehensive cancer treatment facility.',
        icon: 'medical',
        coords: [-73.2105, 44.4774],
        amenities: ['Treatment Rooms', 'Infusion Center', 'Support Services']
      },
      {
        id: 'cardiology',
        name: 'Cardiology Center',
        description: 'Specialized cardiac care facility.',
        icon: 'heart',
        coords: [-73.2109, 44.4775],
        amenities: ['Cardiac Labs', 'Testing Facilities', 'Consultation Rooms']
      }
    ]
  },
  {
    id: 'church-street',
    name: 'Church Street Marketplace',
    description: 'Historic downtown shopping and dining district.',
    icon: 'shopping',
    coords: [-73.2130, 44.4753],
    buildings: [
      {
        id: 'city-hall',
        name: 'City Hall Park',
        description: 'Central park and community gathering space.',
        icon: 'park',
        coords: [-73.2130, 44.4753],
        amenities: ['Public Events', 'Farmers Market', 'Benches']
      },
      {
        id: 'echo-center',
        name: 'ECHO Leahy Center',
        description: 'Lake Champlain science center and museum.',
        icon: 'museum',
        coords: [-73.2134, 44.4747],
        amenities: ['Exhibits', 'Theater', 'Gift Shop']
      },
      {
        id: 'waterfront-park',
        name: 'Waterfront Park',
        description: 'Lakeside park with views and recreation.',
        icon: 'park',
        coords: [-73.2132, 44.4745],
        amenities: ['Bike Path', 'Marina', 'Concert Venue']
      }
    ]
  },
  {
    id: 'champlain-college',
    name: 'Champlain College',
    description: 'Private college known for professional programs.',
    icon: 'university',
    coords: [-73.2125, 44.4740],
    buildings: [
      {
        id: 'downtown-campus',
        name: 'Downtown Campus',
        description: 'Main academic and administrative center.',
        icon: 'building',
        coords: [-73.2125, 44.4740],
        amenities: ['Classrooms', 'Student Center', 'Library']
      }
    ]
  }
];

export default function SimpleNavigation() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [directions, setDirections] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const { location: userLocation } = useLocation();

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

  const handlePlaceSelect = useCallback((place: Place) => {
    if (selectedPlace?.id === place.id) {
      setSelectedPlace(null);
      setSelectedBuilding(null);
      setSelectedCoords(null);
      setDirections(null);
      
      if (userLocation?.coords) {
        setSelectedCoords([userLocation.coords.longitude, userLocation.coords.latitude]);
      } else {
        setSelectedCoords(MAP_CONFIG.DEFAULT_CENTER);
      }
    } else {
      setSelectedPlace(place);
      setSelectedBuilding(null);
      setSelectedCoords(place.coords);
      setDirections(null);
    }
  }, [selectedPlace, userLocation]);

  const handleBuildingSelect = (building: Building) => {
    setSelectedBuilding(building);
    setSelectedCoords(building.coords);
    setDirections(null);
  };

  const handleNavigationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlace || !selectedBuilding || !startLocation || !endLocation) return;

    setLoading(true);
    try {
      const directions = await getNavigationDirections({
        place: selectedPlace,
        building: selectedBuilding,
        startLocation,
        endLocation
      });
      setDirections(directions);
    } catch (error) {
      console.error('Navigation error:', error);
      setDirections('Error generating directions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-3xl">
        <Map 
          selectedCoords={selectedCoords}
          userLocation={userLocation}
        />
      </div>

      {/* Location Access Request */}
      {!userLocation && (
        <div className="glass-card p-8 rounded-3xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[2px]">
              <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Enable Location Services</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                To use NavPoint's indoor navigation features, we need access to your location to provide accurate directions and nearby places.
              </p>
            </div>
            <div className="max-w-xs mx-auto">
              <GradientButton
                onClick={handleLocationAccess}
                loading={locationLoading}
                variant="instagram"
                size="lg"
              >
                <MapPin className="w-5 h-5" />
                Enable Location Access
              </GradientButton>
            </div>
          </div>
        </div>
      )}

      {/* Place Selection */}
      {userLocation && (
        <div className="glass-card p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Choose Location</h2>
              <p className="text-gray-500 dark:text-gray-400">Select where you want to navigate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLACES.map(place => (
              <PlaceCard
                key={place.id}
                place={place}
                isSelected={selectedPlace?.id === place.id}
                onSelect={handlePlaceSelect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Building Selection */}
      {selectedPlace && (
        <div className="glass-card p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Select Building</h2>
              <p className="text-gray-500 dark:text-gray-400">Choose your specific destination</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedPlace.buildings.map(building => (
              <BuildingCard
                key={building.id}
                building={building}
                isSelected={selectedBuilding?.id === building.id}
                onSelect={handleBuildingSelect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation Form */}
      {selectedBuilding && (
        <div className="glass-card p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Plan Your Route</h2>
              <p className="text-gray-500 dark:text-gray-400">Enter your start and end points</p>
            </div>
          </div>

          <form onSubmit={handleNavigationSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Starting Point</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    placeholder="e.g., Main Entrance"
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Destination</label>
                <div className="relative">
                  <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    placeholder="e.g., Room 305"
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>
            </div>

            <GradientButton
              type="submit"
              loading={loading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Get Directions
            </GradientButton>
          </form>

          {directions && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Route</h3>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                {directions.split('\n').map((line, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300">{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}