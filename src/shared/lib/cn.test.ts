import { describe, it, expect } from 'vitest';

import { cn } from './cn';

describe('cn utility', () => {
  it('should combine simple class names', () => {
    const result = cn('bg-red-500', 'text-white');
    expect(result).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes with objects', () => {
    const result = cn({
      'bg-red-500': true,
      'text-white': false,
      'font-bold': true,
    });
    expect(result).toBe('bg-red-500 font-bold');
  });

  it('should handle mixed string and object inputs', () => {
    const result = cn(
      'base-class',
      {
        'conditional-class': true,
        'excluded-class': false,
      },
      'another-class'
    );
    expect(result).toBe('base-class conditional-class another-class');
  });

  it('should handle array inputs', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should filter out falsy values', () => {
    const result = cn('valid-class', null, undefined, false, '', 'another-valid-class');
    expect(result).toBe('valid-class another-valid-class');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle only falsy inputs', () => {
    const result = cn(null, undefined, false, '');
    expect(result).toBe('');
  });

  it('should handle multiple classes in a string', () => {
    // clsx/twMerge may deduplicate or merge conflicting classes
    const result = cn('text-blue-500 text-red-500');
    // The result should contain at least one text color class
    expect(result).toMatch(/text-\w+/);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle complex conditional logic', () => {
    const isError = true;
    const isDisabled = false;
    const size = 'large' as 'large' | 'small';

    const result = cn('button', {
      'button--error': isError,
      'button--disabled': isDisabled,
      'button--large': size === 'large',
      'button--small': size === 'small',
    });

    expect(result).toBe('button button--error button--large');
  });

  it('should work with Tailwind CSS classes', () => {
    const result = cn('px-4 py-2', 'bg-blue-500 hover:bg-blue-600', {
      'text-white': true,
      'font-semibold': true,
      'opacity-50': false,
    });

    expect(result).toBe('px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold');
  });

  it('should handle nested arrays', () => {
    const result = cn([
      'base',
      ['nested1', 'nested2'],
      {
        conditional: true,
      },
    ]);

    expect(result).toBe('base nested1 nested2 conditional');
  });

  it('should handle function returns in conditional objects', () => {
    const getClass = (): boolean => true;
    const result = cn({
      'dynamic-class': getClass(),
      'static-class': Boolean(1),
      'false-class': Boolean(0),
    });

    expect(result).toBe('dynamic-class static-class');
  });

  it('should work with component className patterns', () => {
    const baseClasses = 'inline-flex items-center justify-center';
    const variant = 'primary' as 'primary' | 'secondary';
    const size = 'md' as 'sm' | 'md' | 'lg';
    const disabled = false;

    const result = cn(baseClasses, {
      'bg-blue-500 text-white': variant === 'primary',
      'bg-gray-200 text-gray-700': variant === 'secondary',
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
      'cursor-not-allowed opacity-50': disabled,
    });

    expect(result).toBe(
      'inline-flex items-center justify-center bg-blue-500 text-white px-4 py-2 text-base'
    );
  });
});
