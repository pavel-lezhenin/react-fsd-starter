import { cn } from '@shared/lib';
import type { User } from '@shared/types';

import { UserAvatar } from './UserAvatar';

interface UserCardProps {
  readonly user: User;
  readonly onClick?: () => void;
  readonly className?: string;
}

export function UserCard({ user, onClick, className }: UserCardProps): JSX.Element {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg border p-4 text-left transition-colors',
        onClick && 'cursor-pointer hover:bg-secondary/5',
        className
      )}
    >
      <UserAvatar user={user} />
      <div className="flex-1 overflow-hidden">
        <p className="truncate font-medium">{user.name}</p>
        <p className="truncate text-sm text-secondary">{user.email}</p>
      </div>
      <span
        className={cn(
          'rounded-full px-2 py-1 text-xs font-medium',
          user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
        )}
      >
        {user.role}
      </span>
    </Component>
  );
}
