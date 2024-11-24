import React from 'react';
import { cn } from '../../utils/cn';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'instagram' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function GradientButton({
  children,
  className,
  variant = 'instagram',
  size = 'md',
  loading = false,
  ...props
}: GradientButtonProps) {
  const variants = {
    instagram: 'from-pink-500 via-purple-500 to-blue-500',
    primary: 'from-blue-500 via-indigo-500 to-violet-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <div className={cn(
      'p-[2px] relative rounded-xl overflow-hidden',
      'bg-gradient-to-r animate-gradient-x',
      variants[variant],
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-r animate-gradient-x opacity-75 blur-xl"
        style={{ 
          backgroundImage: variant === 'instagram' 
            ? 'linear-gradient(to right, #f472b6, #9333ea, #3b82f6)'
            : 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)'
        }}
      />
      <button
        {...props}
        disabled={loading || props.disabled}
        className={cn(
          'relative w-full rounded-[10px]',
          'bg-gray-900 dark:bg-gray-950',
          'text-white font-medium',
          'transition-all duration-300',
          'hover:bg-opacity-95',
          'flex items-center justify-center gap-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizes[size]
        )}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : children}
      </button>
    </div>
  );
}