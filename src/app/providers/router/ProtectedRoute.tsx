import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSessionStore } from '@features/session/model/sessionStore';

export function ProtectedRoute(): JSX.Element {
  const location = useLocation();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
