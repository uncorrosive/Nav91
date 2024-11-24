import React, { useState, useEffect } from 'react';
import { MapPin, Navigation2, HelpCircle, ArrowRight } from 'lucide-react';
import { useLocation } from '../services/LocationService';
import ComplexCarousel from './ComplexCarousel';
import BuildingCarousel from './BuildingCarousel';
import Tooltip from './Tooltip';

// ... (COMPLEXES and BUILDINGS constants remain the same)

export default function NavigationForm({ onSubmit, onComplexSelect, searchedLocation }: NavigationFormProps) {
  const [selectedComplex, setSelectedComplex] = useState<typeof COMPLEXES[0] | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<typeof BUILDINGS['uvm'][0] | null>(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { location: userLocation, setLocation } = useLocation();

  // ... (existing state and handlers remain the same)

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="glass-card p-8 rounded-3xl space-y-8">
        {/* Location Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center shadow-lg">
                1
              </span>
              Select Your Location
            </h2>
            <Tooltip content="Scroll left and right to see more locations">
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </Tooltip>
          </div>
          <ComplexCarousel
            complexes={COMPLEXES}
            selectedComplex={selectedComplex}
            onSelectComplex={handleComplexSelect}
          />
        </div>

        {/* Building Selection */}
        {selectedComplex && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#34A853] text-white flex items-center justify-center shadow-lg">
                  2
                </span>
                Select Your Building
              </h3>
              <Tooltip content="Choose the building you want to navigate">
                <HelpCircle className="w-5 h-5 text-gray-400" />
              </Tooltip>
            </div>
            <BuildingCarousel
              buildings={BUILDINGS[selectedComplex.id as keyof typeof BUILDINGS]}
              selectedBuilding={selectedBuilding}
              onSelectBuilding={setSelectedBuilding}
            />
          </div>
        )}

        {/* Route Input */}
        {selectedBuilding && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-lg">
                3
              </span>
              <h3 className="text-xl font-semibold text-gray-800">Enter Your Route</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Starting Point
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you starting from? (e.g., Main Entrance)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value.trim())}
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <Navigation2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where do you want to go? (e.g., Room 101)"
                    value={to}
                    onChange={(e) => setTo(e.target.value.trim())}
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedBuilding || !from || !to}
              className="w-full btn-primary"
            >
              Get Step-by-Step Directions
            </button>
          </div>
        )}
      </div>
    </form>
  );
}