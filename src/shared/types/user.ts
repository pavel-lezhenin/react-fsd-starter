export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Session {
  user: User | null;
  accessToken: string | null;
  expiresAt: number | null;
}
