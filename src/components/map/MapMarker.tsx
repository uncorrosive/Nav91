import React from 'react';

interface MapMarkerProps {
  type: 'user' | 'location';
}

export default function MapMarker({ type }: MapMarkerProps) {
  const size = type === 'user' ? 'w-6 h-6' : 'w-5 h-5';
  
  return (
    <div className={`${size} bg-blue-500 rounded-full border-2 border-white shadow-lg relative`}>
      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
    </div>
  );
}