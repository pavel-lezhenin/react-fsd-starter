import type { HTMLAttributes } from 'react';

import { cn } from '@shared/lib';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: 'text' | 'circular' | 'rectangular';
  readonly width?: string | number;
  readonly height?: string | number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps): JSX.Element {
  return (
    <div
      className={cn(
        'animate-pulse bg-secondary/20',
        variant === 'text' && 'h-4 rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-md',
        className
      )}
      style={{
        width: width ?? (variant === 'circular' ? '40px' : '100%'),
        height: height ?? (variant === 'circular' ? '40px' : variant === 'text' ? '1rem' : '100px'),
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonCard(): JSX.Element {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }): JSX.Element {
  return <Skeleton variant="circular" width={size} height={size} />;
}
