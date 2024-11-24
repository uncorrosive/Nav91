import React from 'react';
import { Building, ChevronRight } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  complex: string;
}

interface BuildingCarouselProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onSelectBuilding: (building: Building) => void;
}

export default function BuildingCarousel({
  buildings,
  selectedBuilding,
  onSelectBuilding
}: BuildingCarouselProps) {
  if (!buildings.length) return null;

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory scrollbar-hide">
        {buildings.map((building) => (
          <button
            key={building.id}
            onClick={() => onSelectBuilding(building)}
            className={`
              flex-none w-64 p-[2px] rounded-xl transition-all transform hover:-translate-y-1 snap-center
              ${selectedBuilding?.id === building.id
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                : 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500'
              }
            `}
          >
            <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-[10px] h-full w-full">
              <Building className={`w-5 h-5 ${
                selectedBuilding?.id === building.id ? 'text-white' : 'text-gray-400'
              }`} />
              <span className={`font-semibold whitespace-nowrap ${
                selectedBuilding?.id === building.id ? 'text-white' : 'text-gray-300'
              }`}>
                {building.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Scroll indicator animation */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-black via-black/80 to-transparent px-4 py-8 flex items-center pointer-events-none">
        <ChevronRight className="w-6 h-6 text-white/50 animate-pulse" />
      </div>
    </div>
  );
}