import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { useSessionStore } from '@features/session';
import { useToast } from '@features/toast';

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
    <main id="main-content" className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
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
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Profile</h2>
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
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Notification Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
