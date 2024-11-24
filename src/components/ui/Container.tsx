import React from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}