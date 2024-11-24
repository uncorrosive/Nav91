import React, { useState } from 'react';
import Map from '../components/Map';
import NavigationForm from '../components/NavigationForm';
import DirectionsPanel from '../components/DirectionsPanel';
import { useLocation } from '../services/LocationService';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedComplex, setSelectedComplex] = useState('');
  const { location: userLocation } = useLocation();

  const handleLocationSelect = (coords: [number, number]) => {
    if (!coords || coords.length !== 2) return;
    console.log('Selected coordinates:', coords);
  };

  const handleNavigationSubmit = async (data: { building: string; from: string; to: string }) => {
    if (!data.building || !data.from || !data.to) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GPT_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: `Generate navigation instructions from ${data.from} to ${data.to} in ${data.building}.`
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate directions');
      }
      
      const result = await response.json();
      setDirections(result.choices[0]?.message?.content || 'No directions available.');
    } catch (error) {
      console.error('Navigation error:', error);
      setDirections('Error generating directions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchLocationChange = (location: string) => {
    if (typeof location !== 'string') return;
    setSearchLocation(location);
  };

  const handleComplexSelect = (complexName: string) => {
    if (typeof complexName !== 'string') return;
    setSelectedComplex(complexName);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-white">
            Navigate Indoors
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            NavPoint is an indoor navigation service designed to give users precise, step-by-step directions to help them navigate complex indoor spaces like shopping centers, airports, hospitals, and large office buildings. NavPoint provides clear, detailed guidance at each step, including exact turns, directions to face, and landmarks to look for, ensuring that users can easily follow the path to their destination. The instructions are tailored to be accessible and understandable for all users, assuming the need for maximum clarity and simplicity in each step. NavPoint takes data from maps and feeds them to AI algorithms in order to provide information of navigation.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border-2 border-gray-800 shadow-2xl">
            <Map 
              onLocationSelect={handleLocationSelect} 
              onSearchLocationChange={handleSearchLocationChange}
            />
            <NavigationForm 
              onSubmit={handleNavigationSubmit}
              onComplexSelect={handleComplexSelect}
            />
            <DirectionsPanel loading={loading} directions={directions} />
          </div>
        </div>
      </div>
    </main>
  );
}