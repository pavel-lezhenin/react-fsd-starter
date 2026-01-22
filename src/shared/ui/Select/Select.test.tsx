import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Select } from './Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('Select', () => {
  it('should render with placeholder', () => {
    render(<Select placeholder="Select an option" options={mockOptions} data-testid="select" />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('should render with default value', () => {
    render(<Select defaultValue="option2" options={mockOptions} data-testid="select" />);

    const select = screen.getByTestId('select');
    expect((select as HTMLSelectElement).value).toBe('option2');
  });

  it('should render all options', () => {
    render(<Select options={mockOptions} data-testid="select" />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should call onChange when option is selected', () => {
    const handleChange = vi.fn();
    render(<Select options={mockOptions} onChange={handleChange} data-testid="select" />);

    const select = screen.getByTestId('select');
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Select disabled options={mockOptions} data-testid="select" />);

    const select = screen.getByTestId('select');
    expect(select).toBeDisabled();
  });

  it('should accept custom className', () => {
    render(<Select className="custom-select" options={mockOptions} data-testid="select" />);

    const select = screen.getByTestId('select');
    expect(select).toHaveClass('custom-select');
  });

  it('should render with error state', () => {
    render(<Select error="This field is required" options={mockOptions} data-testid="select" />);

    const select = screen.getByTestId('select');
    expect(select).toHaveClass('border-error');
  });

  it('should handle empty options array', () => {
    render(<Select placeholder="Select an option" options={[]} data-testid="select" />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1); // Only placeholder option
  });

  it('should display selected option correctly', () => {
    render(<Select value="option2" options={mockOptions} data-testid="select" />);

    const select = screen.getByTestId('select');
    expect((select as HTMLSelectElement).value).toBe('option2');
  });

  it('should handle options with complex objects', () => {
    const complexOptions = [
      { value: 'apple', label: '🍎 Apple' },
      { value: 'banana', label: '🍌 Banana' },
    ];

    render(<Select options={complexOptions} data-testid="select" />);

    expect(screen.getByText('🍎 Apple')).toBeInTheDocument();
    expect(screen.getByText('🍌 Banana')).toBeInTheDocument();
  });

  it('should support disabled options', () => {
    render(<Select options={mockOptions} data-testid="select" />);

    const disabledOption = screen.getByText('Option 3').closest('option');
    expect(disabledOption).toHaveAttribute('disabled');
  });

  it('should support keyboard navigation', () => {
    render(<Select options={mockOptions} data-testid="select" />);

    const select = screen.getByTestId('select');
    select.focus();

    expect(document.activeElement).toBe(select);
  });
});
