import { Navigate, Outlet } from 'react-router-dom';

import { useSessionStore } from '@features/session/model/sessionStore';


export function AdminRoute(): JSX.Element {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const user = useSessionStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/cabinet" replace />;
  }

  return <Outlet />;
}
