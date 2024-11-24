import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import BottomNav from './components/BottomNav';
import SimpleNavigation from './components/SimpleNavigation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-gray-100/50 dark:from-gray-800/50 dark:via-gray-900/50 dark:to-gray-950/50 opacity-50"></div>
        <div className="relative">
          <Header />
          <main className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </div>
    </BrowserRouter>
  );
}

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          Navigate with Precision
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
          Your intelligent indoor navigation assistant, powered by AI. Get precise, 
          step-by-step directions through complex indoor spaces with ease.
        </p>
      </div>
      <SimpleNavigation />
    </div>
  );
};

export default App;