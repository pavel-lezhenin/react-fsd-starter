import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@shared/lib';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  readonly label?: string;
  readonly description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'h-4 w-4 shrink-0 rounded border border-secondary/30',
            'text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="space-y-1">
            {label && (
              <label
                htmlFor={checkboxId}
                className="cursor-pointer text-sm font-medium leading-none"
              >
                {label}
              </label>
            )}
            {description && <p className="text-sm text-secondary">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
