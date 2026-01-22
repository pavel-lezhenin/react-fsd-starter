import { useEffect, useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useToast } from '@features/toast';
import { ROUTES } from '@shared/config';

import { useSessionStore } from './sessionStore';

const SESSION_CHECK_INTERVAL = 60 * 1000; // 1 minute
const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry

interface UseSessionExpiryReturn {
  isExpiringSoon: boolean;
  timeRemaining: number | null;
  extendSession: () => void;
}

export function useSessionExpiry(): UseSessionExpiryReturn {
  const navigate = useNavigate();
  const { expiresAt, isAuthenticated, clearSession } = useSessionStore();
  const { warning, error } = useToast();

  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const handleExpired = useCallback(() => {
    error('Your session has expired. Please log in again.');
    clearSession();
    navigate(ROUTES.LOGIN, { state: { sessionExpired: true } });
  }, [clearSession, navigate, error]);

  const extendSession = useCallback(() => {
    // In real app, call API to refresh token
    // For now, just reset the warning
    setIsExpiringSoon(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !expiresAt) {
      setTimeRemaining(null);
      setIsExpiringSoon(false);
      return;
    }

    const checkSession = (): void => {
      const now = Date.now();
      const remaining = expiresAt - now;

      if (remaining <= 0) {
        handleExpired();
        return;
      }

      setTimeRemaining(remaining);

      if (remaining <= SESSION_WARNING_THRESHOLD && !isExpiringSoon) {
        setIsExpiringSoon(true);
        warning('Your session will expire soon. Save your work.');
      }
    };

    checkSession();
    const intervalId = setInterval(checkSession, SESSION_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [expiresAt, isAuthenticated, handleExpired, warning, isExpiringSoon]);

  return {
    isExpiringSoon,
    timeRemaining,
    extendSession,
  };
}
