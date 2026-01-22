import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { usePrefersDarkMode } from './useMediaQuery';

type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

export function useTheme(): UseThemeReturn {
  const prefersDark = usePrefersDarkMode();
  const { value: theme, setValue: setTheme } = useLocalStorage<Theme>('theme', 'system');

  const resolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;

    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  return { theme, setTheme, resolvedTheme };
}
