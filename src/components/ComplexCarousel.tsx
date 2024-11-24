import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';

interface Complex {
  id: string;
  name: string;
  popularity: number;
  area: string;
}

interface ComplexCarouselProps {
  complexes: Complex[];
  selectedComplex: Complex | null;
  onSelectComplex: (complex: Complex) => void;
}

export default function ComplexCarousel({ 
  complexes, 
  selectedComplex, 
  onSelectComplex 
}: ComplexCarouselProps) {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory scrollbar-hide">
        {complexes.map((complex) => (
          <button
            key={complex.id}
            onClick={() => onSelectComplex(complex)}
            className={`
              flex-none w-64 p-[2px] rounded-xl transition-all transform hover:-translate-y-1 snap-center
              ${selectedComplex?.id === complex.id
                ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500'
                : 'bg-gradient-to-tr from-gray-800 to-gray-700 hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500'
              }
            `}
          >
            <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-[10px] h-full w-full">
              <Building2 className={`w-5 h-5 ${
                selectedComplex?.id === complex.id ? 'text-white' : 'text-gray-400'
              }`} />
              <span className={`font-semibold whitespace-nowrap ${
                selectedComplex?.id === complex.id ? 'text-white' : 'text-gray-300'
              }`}>
                {complex.name}
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