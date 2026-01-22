import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input label="Email" />);

    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'test@example.com');

    expect(input).toHaveValue('test@example.com');
  });

  it('generates id from label', () => {
    render(<Input label="First Name" />);
    expect(screen.getByLabelText(/first name/i)).toHaveAttribute('id', 'first-name');
  });

  it('uses custom id when provided', () => {
    render(<Input label="Email" id="custom-email-id" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'custom-email-id');
  });
});
