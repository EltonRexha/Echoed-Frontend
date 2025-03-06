import type React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
}

export function Loader({
  size = 'md',
  variant = 'default',
  className,
  ...props
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-t-transparent',
          {
            'h-4 w-4 border-2': size === 'sm',
            'h-8 w-8 border-4': size === 'md',
            'h-12 w-12 border-4': size === 'lg',
          },
          {
            'border-muted-foreground/20 border-t-muted-foreground':
              variant === 'default',
            'border-primary/20 border-t-primary': variant === 'primary',
            'border-secondary/20 border-t-secondary': variant === 'secondary',
          }
        )}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
