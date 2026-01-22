import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { useSessionStore } from '@features/session';
import { useToast } from '@features/toast';

export default function AdminDashboard(): JSX.Element {
  const navigate = useNavigate();
  const user = useSessionStore((state) => state.user);
  const clearSession = useSessionStore((state) => state.clearSession);
  const { success } = useToast();

  const handleLogout = (): void => {
    clearSession();
    success('Successfully logged out');
    navigate(ROUTES.HOME);
  };

  return (
    <main id="main-content" className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-secondary">Manage your application</p>
          </div>
          <div className="flex gap-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              {user?.role}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h2 className="text-sm text-secondary">Total Users</h2>
            <p className="mt-2 text-3xl font-bold">1,234</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-sm text-secondary">Active Sessions</h2>
            <p className="mt-2 text-3xl font-bold">567</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-sm text-secondary">Revenue</h2>
            <p className="mt-2 text-3xl font-bold">$12,345</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <p className="text-secondary">No recent activity to display.</p>
        </div>
      </div>
    </main>
  );
}
