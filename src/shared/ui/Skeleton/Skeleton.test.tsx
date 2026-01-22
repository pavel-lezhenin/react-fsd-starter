import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('should render basic skeleton', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('should have default height class', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('h-4');
  });

  it('should accept custom className', () => {
    render(<Skeleton className="h-8 w-32" data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('h-8', 'w-32');
  });

  it('should have animation classes', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('should have proper styling classes', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-pulse', 'bg-secondary/20');
  });

  it('should render as div element', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.tagName).toBe('DIV');
  });

  it('should combine custom and default classes', () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class', 'animate-pulse', 'bg-secondary/20');
  });

  it('should support different heights through className', () => {
    const { rerender } = render(<Skeleton className="h-2" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('h-2');

    rerender(<Skeleton className="h-6" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('h-6');

    rerender(<Skeleton className="h-12" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('h-12');
  });

  it('should support custom shapes through className', () => {
    render(<Skeleton className="h-10 w-10 rounded-full" data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('rounded-full', 'w-10', 'h-10');
  });
});
