import type { ImgHTMLAttributes } from 'react';

import { cn } from '@shared/lib';

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  readonly src?: string;
  readonly alt: string;
  readonly fallback?: string;
  readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeStyles = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-lg',
};

export function Avatar({ src, alt, fallback, size = 'md', className, ...props }: AvatarProps): JSX.Element {
  const initials = fallback ?? alt
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('rounded-full object-cover', sizeStyles[size], className)}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary/10 font-medium text-primary',
        sizeStyles[size],
        className
      )}
      aria-label={alt}
      role="img"
    >
      {initials}
    </div>
  );
}

interface AvatarGroupProps {
  readonly children: React.ReactNode;
  readonly max?: number;
  readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function AvatarGroup({ children, max = 4, size = 'md' }: AvatarGroupProps): JSX.Element {
  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleChildren.map((child, index) => (
        <div key={index} className="ring-2 ring-background rounded-full">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-secondary/20 font-medium ring-2 ring-background',
            sizeStyles[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

import React from 'react';
