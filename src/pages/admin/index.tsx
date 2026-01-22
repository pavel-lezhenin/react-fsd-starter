
import { useNavigate } from 'react-router-dom';

import { useSessionStore } from '@features/session';
import { useToast } from '@features/toast';
import { ROUTES } from '@shared/config';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@shared/ui';
import { MainLayout } from '@widgets/layout';

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
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">
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
          <Card>
            <CardHeader>
              <CardDescription>Total Users</CardDescription>
              <CardTitle as="h2" className="text-3xl">1,234</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active Sessions</CardDescription>
              <CardTitle as="h2" className="text-3xl">567</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Revenue</CardDescription>
              <CardTitle as="h2" className="text-3xl">$12,345</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary">No recent activity to display.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
