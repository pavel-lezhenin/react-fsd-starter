import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Badge } from './Badge';

describe('Badge', () => {
  it('should render basic badge', () => {
    render(<Badge>Default</Badge>);

    const badge = screen.getByText('Default');
    expect(badge).toBeInTheDocument();
  });

  it('should render different variants', () => {
    const { rerender } = render(
      <Badge variant="default" data-testid="badge">
        Default
      </Badge>
    );
    expect(screen.getByTestId('badge')).toHaveClass('bg-primary/10', 'text-primary');

    rerender(
      <Badge variant="success" data-testid="badge">
        Success
      </Badge>
    );
    expect(screen.getByTestId('badge')).toHaveClass('bg-success/10', 'text-success');

    rerender(
      <Badge variant="warning" data-testid="badge">
        Warning
      </Badge>
    );
    expect(screen.getByTestId('badge')).toHaveClass('bg-warning/10', 'text-warning');

    rerender(
      <Badge variant="error" data-testid="badge">
        Error
      </Badge>
    );
    expect(screen.getByTestId('badge')).toHaveClass('bg-error/10', 'text-error');

    rerender(
      <Badge variant="outline" data-testid="badge">
        Outline
      </Badge>
    );
    expect(screen.getByTestId('badge')).toHaveClass(
      'border',
      'border-secondary/30',
      'text-secondary'
    );
  });

  it('should accept custom className', () => {
    render(
      <Badge className="custom-class" data-testid="badge">
        Custom
      </Badge>
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Badge onClick={handleClick} data-testid="badge">
        Clickable
      </Badge>
    );

    const badge = screen.getByTestId('badge');
    await user.click(badge);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with different content types', () => {
    render(<Badge data-testid="badge">123</Badge>);
    expect(screen.getByText('123')).toBeInTheDocument();

    render(
      <Badge data-testid="badge-icon">
        <span>👍</span> Like
      </Badge>
    );
    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('Like')).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(
      <Badge role="status" aria-label="Status badge" data-testid="badge">
        Active
      </Badge>
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('role', 'status');
    expect(badge).toHaveAttribute('aria-label', 'Status badge');
  });
});
