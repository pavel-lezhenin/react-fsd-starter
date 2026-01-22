
import { useNavigate } from 'react-router-dom';

import { useSessionStore } from '@features/session';
import { useToast } from '@features/toast';
import { ROUTES } from '@shared/config';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@shared/ui';
import { MainLayout } from '@widgets/layout';

export default function CabinetPage(): JSX.Element {
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
      <div className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Personal Cabinet</h1>
            <p className="text-secondary">Welcome back, {user?.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-secondary">Name</dt>
                  <dd className="font-medium">{user?.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary">Email</dt>
                  <dd className="font-medium">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-secondary">Role</dt>
                  <dd className="font-medium capitalize">{user?.role}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Notification Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
