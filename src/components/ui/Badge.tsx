import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'solid';
}

export function Badge({ 
  children, 
  className,
  variant = 'default'
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-800 text-gray-100',
    outline: 'border border-gray-700 text-gray-300',
    solid: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}