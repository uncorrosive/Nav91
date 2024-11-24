import React from 'react';
import { Building2, ChevronDown } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  address: string;
}

interface BuildingSelectorProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onBuildingSelect: (building: Building) => void;
}

export default function BuildingSelector({ 
  buildings, 
  selectedBuilding, 
  onBuildingSelect 
}: BuildingSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-between hover:border-gray-600 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">
            {selectedBuilding ? selectedBuilding.name : 'Select a building'}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-gray-900 rounded-xl border border-gray-700 shadow-lg z-10">
          {buildings.map((building) => (
            <button
              key={building.id}
              className="w-full px-4 py-3 text-left hover:bg-gray-800 flex flex-col text-gray-300 first:rounded-t-xl last:rounded-b-xl"
              onClick={() => {
                onBuildingSelect(building);
                setIsOpen(false);
              }}
            >
              <span className="font-medium">{building.name}</span>
              <span className="text-sm text-gray-400">{building.address}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}