import { cn } from '@shared/lib';
import type { User } from '@shared/types';

interface UserAvatarProps {
  readonly user: User;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps): JSX.Element {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={`${user.name}'s avatar`}
        className={cn('rounded-full object-cover', sizeStyles[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary/10 font-medium text-primary',
        sizeStyles[size],
        className
      )}
      aria-label={`${user.name}'s avatar`}
    >
      {initials}
    </div>
  );
}
