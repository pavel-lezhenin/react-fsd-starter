import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';

import { useLogin } from '@features/auth';
import { useSessionStore } from '@features/session';
import { useToast } from '@features/toast';
import { ROUTES } from '@shared/config';
import { Button, Input } from '@shared/ui';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useSessionStore((state) => state.setSession);
  const { success, error } = useToast();
  const loginMutation = useLogin();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.CABINET;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      const response = await loginMutation.mutateAsync(data);
      setSession(response.user, response.accessToken, response.expiresIn);
      success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch {
      error('Invalid email or password');
    }
  };

  const loginAsDemo = (demoEmail: string, demoPassword: string): void => {
    setValue('email', demoEmail);
    setValue('password', demoPassword);
    void onSubmit({ email: demoEmail, password: demoPassword });
  };

  const handleFormSubmit = (event: React.FormEvent): void => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-secondary">Sign in to your account</p>
        </div>

        {/* Demo Accounts */}
        <div className="space-y-3">
          <p className="text-center text-sm font-medium text-secondary">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loginAsDemo('admin@example.com', 'password123')}
              disabled={isSubmitting || loginMutation.isPending}
            >
              Try as Admin
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loginAsDemo('user@example.com', 'password123')}
              disabled={isSubmitting || loginMutation.isPending}
            >
              Try as User
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="text-muted-foreground bg-background px-2">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting || loginMutation.isPending}
          >
            Sign in
          </Button>
        </form>

        <p className="text-center text-sm text-secondary">
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.REGISTER} className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
