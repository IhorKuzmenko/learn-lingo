'use client';

import {
  createContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import {
  themes,
  type AppTheme,
} from '@/constants/themes';

interface ThemeContextValue {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

export const ThemeContext =
  createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'learn-lingo-theme';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);

  window.addEventListener(
    'learn-lingo-theme-change',
    callback,
  );

  return () => {
    window.removeEventListener('storage', callback);

    window.removeEventListener(
      'learn-lingo-theme-change',
      callback,
    );
  };
}

function getSnapshot(): AppTheme {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme && savedTheme in themes) {
    return savedTheme as AppTheme;
  }

  return 'yellow';
}

function getServerSnapshot(): AppTheme {
  return 'yellow';
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setTheme = useCallback(
    (newTheme: AppTheme) => {
      localStorage.setItem(
        STORAGE_KEY,
        newTheme,
      );

      window.dispatchEvent(
        new Event('learn-lingo-theme-change'),
      );
    },
    [],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}