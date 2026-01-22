import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Button, Input } from '@shared/ui';
import { ROUTES } from '@shared/config';
import { useSessionStore } from '@features/session';
import { useToast } from '@features/toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useSessionStore((state) => state.setSession);
  const { success, error: showError } = useToast();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.CABINET;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: '1',
        email: data.email,
        name: 'John Doe',
        role: 'user' as const,
        createdAt: new Date().toISOString(),
      };

      setSession(mockUser, 'mock-token', 3600);
      success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch {
      showError('Invalid email or password');
    }
  };

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-secondary">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
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
