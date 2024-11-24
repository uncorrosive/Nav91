import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function Card({ children, className, gradient = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        gradient
          ? 'p-[1px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500'
          : 'border border-white/10',
        className
      )}
    >
      <div className="h-full w-full bg-gray-900/95 backdrop-blur-xl rounded-[11px]">
        {children}
      </div>
    </div>
  );
}