import React from 'react';
import { Navigation } from 'lucide-react';

interface DirectionsPanelProps {
  loading: boolean;
  directions: string;
}

export default function DirectionsPanel({ loading, directions }: DirectionsPanelProps) {
  if (!loading && !directions) return null;

  return (
    <div className="mt-6 space-y-4 slide-up">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
        <Navigation className="w-5 h-5" />
        Your Step-by-Step Directions
      </h2>
      
      {loading ? (
        <div className="text-center text-gray-400 py-8 bg-gray-900 rounded-xl border border-gray-700">
          <div className="inline-block w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p>Creating your personalized directions...</p>
          <p className="text-sm text-gray-500">This will just take a moment</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <p className="text-gray-300">Follow these directions carefully:</p>
          </div>
          <div className="p-4 space-y-2 text-gray-300">
            {directions.split('\n').map((line, index) => (
              <p key={index} className="flex items-start gap-2">
                <span className="text-blue-400 font-medium">{index + 1}.</span>
                <span>{line}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}