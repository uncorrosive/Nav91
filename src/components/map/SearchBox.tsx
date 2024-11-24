import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLocation } from '../../services/LocationService';

interface GeocodingFeature {
  place_name: string;
  center: [number, number];
  properties: Record<string, any>;
}

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onSuggestionSelect: (suggestion: GeocodingFeature) => void;
  suggestions: GeocodingFeature[];
  onSearchChange: (query: string) => void;
  initialValue?: string;
}

export default function SearchBox({ 
  onSearch, 
  onSuggestionSelect, 
  suggestions = [], // Provide default empty array
  onSearchChange,
  initialValue = ''
}: SearchBoxProps) {
  const { location, loading } = useLocation();
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (initialValue) {
      setSearchQuery(initialValue);
    }
  }, [initialValue]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
    onSearch(query);
    onSearchChange(query);
  };

  const handleSuggestionClick = (suggestion: GeocodingFeature) => {
    if (!suggestion?.place_name) return;
    
    const displayName = suggestion.place_name.split(',')[0];
    setSearchQuery(suggestion.place_name);
    setShowSuggestions(false);
    onSearchChange(displayName);
    onSuggestionSelect(suggestion);
  };

  const placeholder = loading ? 'Loading location...' : 
    location ? `Search near ${location.city}` : 'Search locations...';

  return (
    <div className="absolute top-3 left-3 right-3 z-10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowSuggestions(searchQuery.length > 0)}
          onBlur={() => {
            // Delay hiding suggestions to allow click events to register
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-900/90 backdrop-blur-xl border-2 border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
        />
        {showSuggestions && suggestions && suggestions.length > 0 && (
          <div className="absolute w-full mt-2 bg-gray-900/90 backdrop-blur-xl border-2 border-gray-700 rounded-lg overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.place_name}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-3 py-2.5 text-sm text-left hover:bg-gray-800 text-white border-b border-gray-700 last:border-none"
              >
                {suggestion.place_name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}