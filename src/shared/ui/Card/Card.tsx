import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@shared/lib';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps): JSX.Element {
  return (
    <div
      className={cn('rounded-lg border bg-background p-6 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps): JSX.Element {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  readonly children: ReactNode;
  readonly as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Component = 'h3', ...props }: CardTitleProps): JSX.Element {
  return (
    <Component className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly children: ReactNode;
}

export function CardDescription({ children, className, ...props }: CardDescriptionProps): JSX.Element {
  return (
    <p className={cn('text-sm text-secondary', className)} {...props}>
      {children}
    </p>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps): JSX.Element {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps): JSX.Element {
  return (
    <div className={cn('mt-4 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}
