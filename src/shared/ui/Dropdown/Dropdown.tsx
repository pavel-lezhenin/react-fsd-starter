import { useState, useRef, useEffect, type ReactNode } from 'react';

import { cn } from '@shared/lib';

interface DropdownProps {
  readonly trigger: ReactNode;
  readonly children: ReactNode;
  readonly align?: 'left' | 'right';
  readonly className?: string;
}

export function Dropdown({
  trigger,
  children,
  align = 'left',
  className,
}: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[180px] rounded-md border bg-background p-1 shadow-lg',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  readonly children: ReactNode;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly destructive?: boolean;
  readonly className?: string;
}

export function DropdownItem({
  children,
  onClick,
  disabled,
  destructive,
  className,
}: DropdownItemProps): JSX.Element {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center rounded-sm px-2 py-1.5 text-sm',
        'transition-colors focus:bg-secondary/10 focus:outline-none',
        disabled && 'pointer-events-none opacity-50',
        destructive ? 'text-error hover:bg-error/10' : 'hover:bg-secondary/10',
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator(): JSX.Element {
  return <div className="my-1 h-px bg-secondary/20" role="separator" />;
}

interface DropdownLabelProps {
  readonly children: ReactNode;
}

export function DropdownLabel({ children }: DropdownLabelProps): JSX.Element {
  return <div className="px-2 py-1.5 text-xs font-medium text-secondary">{children}</div>;
}
