import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@shared/types';

interface SessionState {
  user: User | null;
  accessToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  setSession: (user: User, accessToken: string, expiresIn: number) => void;
  clearSession: () => void;
  isSessionExpired: () => boolean;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      expiresAt: null,
      isAuthenticated: false,

      setSession: (user, accessToken, expiresIn) => {
        const expiresAt = Date.now() + expiresIn * 1000;
        set({
          user,
          accessToken,
          expiresAt,
          isAuthenticated: true,
        });
      },

      clearSession: () => {
        set({
          user: null,
          accessToken: null,
          expiresAt: null,
          isAuthenticated: false,
        });
      },

      isSessionExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() > expiresAt;
      },
    }),
    {
      name: 'session-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
