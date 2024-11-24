import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, HelpCircle, MessageCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: HelpCircle, label: 'Help' },
    { path: '/contact', icon: MessageCircle, label: 'Contact' }
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-card rounded-full px-2 py-1 shadow-2xl shadow-black/5">
        <div className="flex items-center gap-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            );
          })}
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? (
              <>
                <Moon size={20} />
                <span className="text-sm font-medium">Dark</span>
              </>
            ) : (
              <>
                <Sun size={20} />
                <span className="text-sm font-medium">Light</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}