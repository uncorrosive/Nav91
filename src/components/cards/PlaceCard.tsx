import React from 'react';
import type { Place } from '../../types/navigation';

interface PlaceCardProps {
  place: Place;
  isSelected: boolean;
  onSelect: (place: Place) => void;
}

export default function PlaceCard({ place, isSelected, onSelect }: PlaceCardProps) {
  const imageUrl = place.id === 'uvm' 
    ? 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800&h=600'
    : 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800&h=600';

  return (
    <button
      onClick={() => onSelect(place)}
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
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-xl font-bold text-white">{place.name}</h3>
        <p className="text-gray-200">Select to view buildings</p>
      </div>
    </button>
  );
}