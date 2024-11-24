import React from 'react';
import type { Building } from '../../types/navigation';

interface BuildingCardProps {
  building: Building;
  isSelected: boolean;
  onSelect: (building: Building) => void;
}

const BUILDING_IMAGES = {
  library: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800&h=600',
  building: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800&h=600',
  museum: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=800&h=600',
  hospital: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800&h=600',
  clinic: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=600',
  gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800&h=600',
  'student-center': 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800&h=600',
  lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800&h=600',
  residential: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800&h=600',
  maternity: 'https://images.unsplash.com/photo-1535185384036-28bbc8035f28?auto=format&fit=crop&q=80&w=800&h=600',
  medical: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800&h=600',
  heart: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800&h=600',
  park: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800&h=600',
  shopping: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800&h=600'
};

export default function BuildingCard({ building, isSelected, onSelect }: BuildingCardProps) {
  const imageUrl = BUILDING_IMAGES[building.icon as keyof typeof BUILDING_IMAGES] || BUILDING_IMAGES.building;

  return (
    <button
      onClick={() => onSelect(building)}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
        isSelected 
          ? 'ring-4 ring-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-950' 
          : 'hover:ring-2 hover:ring-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-gray-950'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
      <div className="relative w-full h-48 bg-gray-800">
        <img 
          src={imageUrl}
          alt={building.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-lg font-bold text-white mb-1">{building.name}</h3>
        <p className="text-sm text-gray-200 line-clamp-2">{building.description}</p>
        {building.amenities && (
          <div className="mt-2 flex flex-wrap gap-1">
            {building.amenities.slice(0, 2).map((amenity, index) => (
              <span key={index} className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                {amenity}
              </span>
            ))}
            {building.amenities.length > 2 && (
              <span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                +{building.amenities.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}