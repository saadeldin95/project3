import type { Theme } from './types';

export const THEME_KEY = 'summer-tracker:theme:v1';
const DEFAULT_THEME: Theme = 'dark';

export function loadTheme(): Theme {
  if (typeof localStorage === 'undefined') return DEFAULT_THEME;
  const raw = localStorage.getItem(THEME_KEY);
  return raw === 'light' ? 'light' : DEFAULT_THEME;
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const cls = document.documentElement.classList;
  if (theme === 'dark') cls.add('dark');
  else cls.remove('dark');
}
