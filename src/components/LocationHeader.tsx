import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationHeader() {
  return (
    <div className="flex items-center justify-center py-6 bg-gradient-to-r from-emerald-900/20 via-emerald-900/10 to-emerald-900/20 text-base backdrop-blur-sm border-b border-emerald-900/20">
      <MapPin className="w-5 h-5 mr-2 text-emerald-400" />
      <span className="text-gray-200 font-light tracking-wide">
        Currently navigating <strong className="text-emerald-400 font-medium">University of Vermont, Burlington Campus</strong>
        <span className="mx-2">•</span>
        <span className="text-gray-400">Your Intelligent Indoor Navigation Assistant</span>
      </span>
    </div>
  );
}