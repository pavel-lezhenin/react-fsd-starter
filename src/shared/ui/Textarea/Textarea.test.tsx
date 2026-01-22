import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('should render basic textarea', () => {
    render(<Textarea placeholder="Enter text" />);

    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('should render with label', () => {
    render(<Textarea label="Description" placeholder="Enter description" />);

    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
  });

  it('should show error message', () => {
    render(<Textarea label="Description" error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-error');
  });

  it('should handle user input', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);

    const textarea = screen.getByPlaceholderText('Type here');
    await user.type(textarea, 'Hello world');

    expect(textarea).toHaveValue('Hello world');
  });

  it('should call onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Textarea onChange={handleChange} placeholder="Type here" />);

    const textarea = screen.getByPlaceholderText('Type here');
    await user.type(textarea, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4); // One call per character
  });

  it('should support different rows', () => {
    render(<Textarea rows={5} data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);

    const textarea = screen.getByPlaceholderText('Disabled textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('should accept custom className', () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('custom-class');
  });
});
