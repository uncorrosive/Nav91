import React from 'react';
import { cn } from '../../utils/cn';

interface GradientProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export function Gradient({ 
  children, 
  className,
  variant = 'primary' 
}: GradientProps) {
  const variants = {
    primary: 'from-blue-500 via-indigo-500 to-purple-500',
    secondary: 'from-gray-600 via-gray-700 to-gray-800',
    success: 'from-emerald-500 via-green-500 to-teal-500',
    danger: 'from-red-500 via-rose-500 to-pink-500'
  };

  return (
    <div className={cn(
      'bg-gradient-to-r',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
}