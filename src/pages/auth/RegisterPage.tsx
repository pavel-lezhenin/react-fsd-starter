import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useSessionStore } from '@features/session';
import { useToast } from '@features/toast';
import { ROUTES } from '@shared/config';
import { Button, Input } from '@shared/ui';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const setSession = useSessionStore((state) => state.setSession);
  const { success } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData): void => {
    // Mock registration - replace with actual API call
    const mockUser = {
      id: '1',
      email: data.email,
      name: data.name,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
    };

    setSession(mockUser, 'mock-token', 3600);
    success('Account created successfully!');
    navigate(ROUTES.CABINET, { replace: true });
  };

  const handleFormSubmit = (event: React.FormEvent): void => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-secondary">Get started with your free account</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <Input
            label="Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />

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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Create account
          </Button>
        </form>

        <p className="text-center text-sm text-secondary">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
