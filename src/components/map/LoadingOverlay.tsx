import React from 'react';

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-gray-900 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-white p-0.5 mx-auto mb-3">
          <div className="w-full h-full bg-black rounded-full p-1">
            <img 
              src="https://preview.redd.it/navpoint-black-white-small-logo-v0-wss4rkc5rz1e1.png?width=1080&crop=smart&auto=webp&s=d4d4a62fa9ecc3cd3a8a866aebc3b1d0c5239f0b"
              alt="NavPoint Logo"
              className="w-full h-full rounded-full object-cover brightness-200 contrast-200 logo-spin"
            />
          </div>
        </div>
        <div className="text-gray-400">
          Loading map
          <div className="loading-dots mt-2">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}