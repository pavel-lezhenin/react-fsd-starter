import { Link, useLocation } from 'react-router-dom';

import { cn } from '@shared/lib';
import { Button } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { useSessionStore } from '@features/session';
import { UserAvatar } from '@entities/user';

export function Header(): JSX.Element {
  const location = useLocation();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const user = useSessionStore((state) => state.user);

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to={ROUTES.HOME} className="text-xl font-bold">
            FSD Starter
          </Link>

          {isAuthenticated && (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                to={ROUTES.CABINET}
                className={cn(
                  'text-sm transition-colors hover:text-primary',
                  isActive(ROUTES.CABINET) ? 'text-primary' : 'text-secondary'
                )}
              >
                Cabinet
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to={ROUTES.ADMIN}
                  className={cn(
                    'text-sm transition-colors hover:text-primary',
                    isActive(ROUTES.ADMIN) ? 'text-primary' : 'text-secondary'
                  )}
                >
                  Admin
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <Link to={ROUTES.CABINET} className="flex items-center gap-2">
              <UserAvatar user={user} size="sm" />
              <span className="hidden text-sm font-medium sm:block">{user.name}</span>
            </Link>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
