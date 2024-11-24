import React from 'react';
import { cn } from '../../utils/cn';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ 
  className,
  orientation = 'horizontal' 
}: DividerProps) {
  return (
    <div className={cn(
      'bg-gradient-to-r from-transparent via-gray-700 to-transparent',
      orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
      className
    )} />
  );
}