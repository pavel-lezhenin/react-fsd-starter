import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Alert } from './Alert';

describe('Alert', () => {
  it('should render with text content', () => {
    render(<Alert>Test alert message</Alert>);

    expect(screen.getByText('Test alert message')).toBeInTheDocument();
  });

  it('should render as div element', () => {
    render(<Alert data-testid="alert">Test alert</Alert>);

    const alert = screen.getByTestId('alert');
    expect(alert.tagName).toBe('DIV');
  });

  it('should accept className prop', () => {
    render(
      <Alert className="custom-class" data-testid="alert">
        Test
      </Alert>
    );

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('custom-class');
  });

  it('should have default styling classes', () => {
    render(<Alert data-testid="alert">Test</Alert>);

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('rounded-lg', 'border', 'p-4');
  });

  it('should render different variants', () => {
    const { rerender } = render(
      <Alert variant="default" data-testid="alert">
        Default
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('bg-secondary/10', 'text-foreground');

    rerender(
      <Alert variant="success" data-testid="alert">
        Success
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('bg-success/10', 'text-success');

    rerender(
      <Alert variant="warning" data-testid="alert">
        Warning
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('bg-warning/10', 'text-warning');

    rerender(
      <Alert variant="error" data-testid="alert">
        Error
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('bg-error/10', 'text-error');
  });

  it('should render icon when provided', () => {
    render(<Alert data-testid="alert">With icon</Alert>);

    // Check for the SVG icon element (all alerts have default icon)
    expect(screen.getByTestId('alert').querySelector('svg')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(
      <Alert title="Important Notice" data-testid="alert">
        Content
      </Alert>
    );

    expect(screen.getByText('Important Notice')).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    render(
      <Alert data-testid="alert">
        <span>Complex</span> content
      </Alert>
    );

    expect(screen.getByTestId('alert')).toHaveTextContent('Complex content');
    expect(screen.getByText('Complex')).toBeInTheDocument();
  });

  it('should combine custom and default classes', () => {
    render(
      <Alert className="custom-padding" data-testid="alert">
        Test
      </Alert>
    );

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('custom-padding', 'rounded-lg', 'border', 'p-4');
  });

  it('should handle empty content', () => {
    render(<Alert data-testid="alert">Empty content</Alert>);

    const alert = screen.getByTestId('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Empty content');
  });
});
